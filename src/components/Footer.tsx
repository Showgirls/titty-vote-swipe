
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      "w-full mt-12 py-8 px-4 sm:px-6 flex flex-col items-center justify-center gap-4 animate-fade-in",
      "bg-secondary/50 backdrop-blur-sm",
      className
    )}>
      <div className="flex items-center justify-center">
        <img 
          className="w-28 sm:w-32 object-contain transform transition-transform hover:scale-105" 
          src="/lovable-uploads/63336976-dd12-41f9-ba26-280abe5a6fbf.png" 
          alt="Phukk Me Logo" 
        />
      </div>
      
      <p className="text-muted-foreground text-center max-w-md">
        Support The BreastTek. Buy $titcoin
      </p>
      
      <a 
        className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium 
                  bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 
                  transition-colors duration-200 ease-in-out"
        href="https://dexscreener.com/solana/4qqm2x2pfhu3toscaqkqxtfhtm7dmje8lgwu9kvqenh4" 
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy $Titcoin on DEX
      </a>
      
      <p className="text-xs text-muted-foreground/70 mt-4">
        © {new Date().getFullYear()} Phukk Me. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
