
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
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
          Titder
        </h1>
        <div className="absolute -top-2 -right-8 w-16 h-8 rounded-full bg-primary/20 blur-xl animate-pulse-soft"></div>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base font-light tracking-wide">
        Swipe for Tits, Match for Titcoin
      </p>
    </header>
  );
};

export default Header;
