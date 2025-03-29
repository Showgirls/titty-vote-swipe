
export interface ImageProfile {
  id: number;
  name: string;
  image: string;
  bio: string;
}

// Create an array of all 62 image URLs
const imageUrls = [
  "https://fkitt.shop/pics/1.jpg",
  "https://fkitt.shop/pics/2.jpg",
  "https://fkitt.shop/pics/3.jpg",
  "https://fkitt.shop/pics/4.jpg",
  "https://fkitt.shop/pics/5.jpg",
  "https://fkitt.shop/pics/6.jpg",
  "https://fkitt.shop/pics/7.jpg",
  "https://fkitt.shop/pics/8.jpg",
  "https://fkitt.shop/pics/9.jpg",
  "https://fkitt.shop/pics/10.jpeg",
  "https://fkitt.shop/pics/11.jpg",
  "https://fkitt.shop/pics/12.jpg",
  "https://fkitt.shop/pics/13.jpg",
  "https://fkitt.shop/pics/14.jpg",
  "https://fkitt.shop/pics/15.jpg",
  "https://fkitt.shop/pics/16.jpg",
  "https://fkitt.shop/pics/17.jpg",
  "https://fkitt.shop/pics/18.jpeg",
  "https://fkitt.shop/pics/19.jpeg",
  "https://fkitt.shop/pics/20.jpg",
  "https://fkitt.shop/pics/21.jpg",
  "https://fkitt.shop/pics/22.jpg",
  "https://fkitt.shop/pics/23.jpg",
  "https://fkitt.shop/pics/24.jpeg",
  "https://fkitt.shop/pics/25.jpg",
  "https://fkitt.shop/pics/26.jpg",
  "https://fkitt.shop/pics/27.jpg",
  "https://fkitt.shop/pics/28.jpg",
  "https://fkitt.shop/pics/29.jpg",
  "https://fkitt.shop/pics/30.jpg",
  "https://fkitt.shop/pics/31.jpg",
  "https://fkitt.shop/pics/32.jpg",
  "https://fkitt.shop/pics/33.jpg",
  "https://fkitt.shop/pics/34.jpg",
  "https://fkitt.shop/pics/35.jpg",
  "https://fkitt.shop/pics/36.png",
  "https://fkitt.shop/pics/37.webp",
  "https://fkitt.shop/pics/38.webp",
  "https://fkitt.shop/pics/39.webp",
  "https://fkitt.shop/pics/40.webp",
  "https://fkitt.shop/pics/41.webp",
  "https://fkitt.shop/pics/42.webp",
  "https://fkitt.shop/pics/43.webp",
  "https://fkitt.shop/pics/44.webp",
  "https://fkitt.shop/pics/45.webp",
  "https://fkitt.shop/pics/46.webp",
  "https://fkitt.shop/pics/47.webp",
  "https://fkitt.shop/pics/48.webp",
  "https://fkitt.shop/pics/49.webp",
  "https://fkitt.shop/pics/50.webp",
  "https://fkitt.shop/pics/51.webp",
  "https://fkitt.shop/pics/52.webp",
  "https://fkitt.shop/pics/53.webp",
  "https://fkitt.shop/pics/54.webp",
  "https://fkitt.shop/pics/55.webp",
  "https://fkitt.shop/pics/56.webp",
  "https://fkitt.shop/pics/57.webp",
  "https://fkitt.shop/pics/58.webp",
  "https://fkitt.shop/pics/59.webp",
  "https://fkitt.shop/pics/60.webp",
  "https://fkitt.shop/pics/61.webp",
  "https://fkitt.shop/pics/62.webp",
];

// Fisher-Yates shuffle algorithm to randomize the array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Shuffle the image URLs
const shuffledImageUrls = shuffleArray(imageUrls);

// Create the profiles array with the shuffled images
export const profiles: ImageProfile[] = shuffledImageUrls.map((image, index) => ({
  id: index + 1,
  name: "A Hottie",
  image,
  bio: getRandomBio(),
}));

// Preload the first few images to improve initial load performance
export const preloadImages = () => {
  // Preload first 5 images
  profiles.slice(0, 5).forEach(profile => {
    const img = new Image();
    img.src = profile.image;
  });
};

// Run preload on module load
preloadImages();

// Array of different bios to choose from randomly
function getRandomBio(): string {
  const bios = [
    "Looking for someone to appreciate my... assets. HODL or GTFO.",
    "My love language is Titcoin tips. Send first, ask later.",
    "Swipe right if you believe in the breast tek revolution.",
    "Degen in the streets, whale in the sheets.",
    "If it's not about Titcoin, I'm not interested.",
    "Too big to fail. LFG.",
    "Country roads, take me to liquidity.",
    "Swiping right is bullish. Let's pump together.",
    "Make me your next moonshot, baby.",
    "My portfolio is as inflated as these assets."
  ];
  
  return bios[Math.floor(Math.random() * bios.length)];
}

export const twitterShareText = () => {
  return `I'm voting for a hottie on Phukk Me! Each free vote earns 10 entries to the $10,000 GIVEAWAY. 

Join now: https://phukk.me or join @fkittcom for info!
#fkitt $fkitt #PhukkMe`;
};
