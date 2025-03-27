import { useState, useEffect, useCallback } from 'react';
import { ImageProfile, profiles } from '@/lib/imageData';
import { toast } from '@/components/ui/use-toast';

export function useImageNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState<ImageProfile>(profiles[0]);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Load profile based on current index
  useEffect(() => {
    setCurrentProfile(profiles[currentIndex]);
  }, [currentIndex]);

  // Handle next profile
  const nextProfile = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection('left');
    
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % profiles.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, profiles.length]);

  // Handle previous profile
  const prevProfile = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection('right');
    
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex - 1 + profiles.length) % profiles.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, profiles.length]);

  // Handle vote
  const handleVote = useCallback(() => {
    const tweetText = encodeURIComponent(`I'm voting for ${currentProfile.name} on Phukk Me! Each free vote earns 10 entries to the $10,000 GIVEAWAY. Join now: https://phukk.me #fkitt $fkitt`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
    
    // Show thank you message - we'll no longer auto-hide it
    setShowThankYou(true);
    toast({
      title: "Thank you for voting!",
      description: `Your vote for ${currentProfile.name} has been recorded. You are allowed 1 vote per account per day.`,
      duration: Infinity, // This makes the toast stay until dismissed
    });
  }, [currentProfile]);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // If swipe distance is significant enough
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextProfile();
      } else {
        prevProfile();
      }
    }
    
    setTouchStartX(null);
  }, [touchStartX, nextProfile, prevProfile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextProfile();
      } else if (e.key === 'ArrowLeft') {
        prevProfile();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProfile, prevProfile]);

  return {
    currentProfile,
    nextProfile,
    prevProfile,
    handleVote,
    direction,
    isTransitioning,
    handleTouchStart,
    handleTouchEnd,
    showThankYou
  };
}
