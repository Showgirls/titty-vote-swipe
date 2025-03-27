
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ImageProfile } from '@/lib/imageData';
import { TwitterIcon } from 'lucide-react';

interface ImageCardProps {
  profile: ImageProfile;
  onNext: () => void;
  onPrev: () => void;
  onVote: () => void;
  isTransitioning: boolean;
  direction: 'left' | 'right' | null;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  showThankYou: boolean;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  profile,
  onNext,
  onPrev,
  onVote,
  isTransitioning,
  direction,
  onTouchStart,
  onTouchEnd,
  showThankYou,
  className
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.image);
  
  // Update image when profile changes
  useEffect(() => {
    setImageLoaded(false);
    setImageUrl(profile.image);
  }, [profile]);

  // Get animation classes based on transition state
  const getAnimationClasses = () => {
    if (!isTransitioning) return 'transition-opacity duration-300';
    
    return direction === 'left'
      ? 'animate-slide-out'
      : 'animate-slide-in';
  };

  return (
    <div 
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg",
        "bg-card border border-border/40",
        "transform transition-all duration-300 ease-out",
        "hover:shadow-xl",
        getAnimationClasses(),
        className
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Card Header with Navigation Hint */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center glass">
        <div 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 
                    cursor-pointer hover:bg-black/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        
        <div 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 
                    cursor-pointer hover:bg-black/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/30">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse-soft">
            <svg className="w-12 h-12 text-muted-foreground/30" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
        <img
          src={imageUrl}
          alt={profile.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Image Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                       p-6 pt-12 flex flex-col text-white">
          <h2 className="text-2xl font-medium tracking-tight">{profile.name}</h2>
          <p className="text-sm text-white/80 mt-1">{profile.bio}</p>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="p-4 flex flex-col items-center space-y-4">
        {showThankYou ? (
          <div className="text-center text-lg font-medium text-primary animate-scale-in">
            Thank you for voting!
            <p className="text-sm text-muted-foreground mt-1">
              You are allowed 1 vote per account per day.
            </p>
          </div>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onVote(); }}
            className="inline-flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3
                     bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 
                     transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <TwitterIcon size={18} />
            <span>Vote on Twitter</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
