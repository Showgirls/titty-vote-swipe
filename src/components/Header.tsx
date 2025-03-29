
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-6 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 animate-fade-in",
      className
    )}>
      <div className="relative">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/63336976-dd12-41f9-ba26-280abe5a6fbf.png" 
            alt="Phukk Me Logo" 
            className="h-16 sm:h-20 object-contain"
          />
        </div>
        <div className="absolute -top-2 -right-8 w-16 h-8 rounded-full bg-primary/20 blur-xl animate-pulse-soft"></div>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base font-light tracking-wide -mt-1">
        Swipe left for Hotties, vote for $CASH
      </p>
    </header>
  );
};

export default Header;
