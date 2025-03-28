
import React, { useEffect } from 'react';
import { useImageNavigation } from '@/hooks/useImageNavigation';
import ImageCard from '@/components/ImageCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const {
    currentProfile,
    nextProfile,
    prevProfile,
    handleVote,
    direction,
    isTransitioning,
    handleTouchStart,
    handleTouchEnd,
    showThankYou
  } = useImageNavigation();

  // Debug logging
  useEffect(() => {
    console.log("Index page loaded");
    console.log("Current profile:", currentProfile);
  }, [currentProfile]);

  // Google Analytics tracking
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Titder - Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  // Track profile navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && currentProfile) {
      window.gtag('event', 'view_profile', {
        profile_id: currentProfile.id,
        profile_name: currentProfile.name
      });
    }
  }, [currentProfile]);

  // Fallback content if profile isn't loaded yet
  if (!currentProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-4xl px-4 mx-auto flex flex-col items-center">
          <Header />
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-muted rounded-full mb-4"></div>
              <div className="h-4 bg-muted rounded w-48 mb-2.5"></div>
              <div className="h-3 bg-muted rounded w-40"></div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-4xl px-4 mx-auto flex flex-col items-center">
        <Header />
        
        <main className="w-full flex-1 flex flex-col items-center justify-center py-6">
          <div className="w-full max-w-md mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            
            <ImageCard
              profile={currentProfile}
              onNext={nextProfile}
              onPrev={prevProfile}
              onVote={handleVote}
              isTransitioning={isTransitioning}
              direction={direction}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              showThankYou={showThankYou}
              className="z-10 relative"
            />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Swipe or use arrow keys to navigate</p>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
