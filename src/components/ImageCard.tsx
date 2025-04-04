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
  const [prevImage, setPrevImage] = useState<string | null>(null);
  
  // Cache the previous image to avoid showing blank during transitions
  useEffect(() => {
    if (imageLoaded) {
      setPrevImage(imageUrl);
    }
    
    setImageLoaded(false);
    setImageUrl(profile.image);
    
    // Preload the current image
    const img = new Image();
    img.src = profile.image;
    img.onload = () => {
      setImageLoaded(true);
    };
    
    return () => {
      img.onload = null;
    };
  }, [profile]);

  // Get animation classes based on transition state
  const getAnimationClasses = () => {
    if (!isTransitioning) return 'transition-opacity duration-300';
    
    return direction === 'left'
      ? 'animate-slide-out'
      : 'animate-slide-in';
  };
  
  const errorHandler = () => {
    console.log("Image failed to load:", imageUrl);
    // Keep showing the previous image if the current one fails
    if (prevImage) {
      setImageUrl(prevImage);
      setImageLoaded(true);
    }
  };

  // Handle click on the image
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
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
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-muted/30 cursor-pointer"
        onClick={handleImageClick}
      >
        {/* Loading UI */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse-soft">
            <svg className="w-12 h-12 text-muted-foreground/30" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
        
        {/* Show the previous image while loading the new one (to avoid blank state) */}
        {!imageLoaded && prevImage && (
          <img
            src={prevImage}
            alt="Previous hottie"
            className="w-full h-full object-cover absolute inset-0 opacity-50"
          />
        )}
        
        {/* Current image */}
        <img
          src={imageUrl}
          alt="A hottie"
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
          onError={errorHandler}
          loading="eager" // Force eager loading instead of lazy loading
        />
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
