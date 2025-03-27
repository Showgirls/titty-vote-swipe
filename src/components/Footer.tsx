
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Twitter, MessageCircle } from 'lucide-react';

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
        Each vote earns 10 entries to the $10,000 Giveaway
      </p>
      
      <div className="flex flex-row space-x-3 w-full justify-center">
        <Button
          className="flex-1 max-w-36"
          asChild
          size="sm"
        >
          <a 
            href="https://fkitt.com/token/buy" 
            target="_blank"
            rel="noopener noreferrer"
          >
            BUY $FKITT
          </a>
        </Button>
        
        <Button
          className="flex-1 max-w-36"
          asChild
          size="sm"
        >
          <a 
            href="https://fkitt.com" 
            target="_blank"
            rel="noopener noreferrer"
          >
            JOIN FKITT
          </a>
        </Button>
      </div>
      
      <div className="flex space-x-4 mt-3">
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <Twitter size={20} className="text-muted-foreground hover:text-primary" />
        </a>
        <a 
          href="https://t.me" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <MessageCircle size={20} className="text-muted-foreground hover:text-primary" />
        </a>
      </div>
      
      <p className="text-xs text-muted-foreground/70 mt-4">
        © {new Date().getFullYear()} Phukk Me. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
