
export interface ImageProfile {
  id: number;
  name: string;
  image: string;
  bio: string;
}

export const profiles: ImageProfile[] = [
  { 
    id: 1, 
    name: "Titty McTitterson", 
    image: "https://pbs.twimg.com/media/Glw8bfNWIAAi6XB?format=jpg&name=small", 
    bio: "Looking for someone to appreciate my... assets. HODL or GTFO." 
  },
  { 
    id: 2, 
    name: "Boobarella", 
    image: "https://pbs.twimg.com/media/Gls4bsSXUAA93DH?format=jpg&name=small", 
    bio: "My love language is Titcoin tips. Send first, ask later." 
  },
  { 
    id: 3, 
    name: "Miss Mammary", 
    image: "https://pbs.twimg.com/media/Glw_xIyWQAAR0TH?format=jpg&name=small", 
    bio: "Swipe right if you believe in the breast tek revolution." 
  },
  { 
    id: 4, 
    name: "Cleavage Queen", 
    image: "https://pbs.twimg.com/media/GlxfzXhWoAETIRI?format=jpg&name=small", 
    bio: "Degen in the streets, whale in the sheets." 
  },
  { 
    id: 5, 
    name: "Busty Blockchain", 
    image: "https://pbs.twimg.com/media/GlM38rMXUAAGxtw?format=jpg&name=small", 
    bio: "If it's not about Titcoin, I'm not interested." 
  },
  { 
    id: 6, 
    name: "Mega Mammaries", 
    image: "https://media.radaronline.com/brand-img/6whsRaGi9/1600x1021/2018/05/megan-fox-boobs-mega-resize.jpg", 
    bio: "Too big to fail. LFG." 
  },
  { 
    id: 7, 
    name: "Dolly Double D", 
    image: "https://www.rollingstone.com/wp-content/uploads/2024/06/dolly-parton-broadway-musical.jpg?w=1581&h=1054&crop=1", 
    bio: "Country roads, take me to liquidity." 
  },
  { 
    id: 8, 
    name: "Michelle Titcoin", 
    image: "https://i2-prod.dailystar.co.uk/article19667743.ece/ALTERNATES/s615b/1_Michelle-Keegan-s-boobs-185792.jpg", 
    bio: "Swiping right is bullish. Let's pump together." 
  },
  { 
    id: 9, 
    name: "Marilyn Moonroe", 
    image: "https://cdn-cjhgk.nitrocdn.com/CXxGixRVyChwAxySbAyltuCiQXRKaWDN/assets/images/optimized/rev-87ca401/www.newbeauty.com/wp-content/uploads/2024/02/marilyn-monroe-breasts.jpg", 
    bio: "Make me your next moonshot, baby." 
  },
  { 
    id: 10, 
    name: "Pamela Andermint", 
    image: "https://cdn-cjhgk.nitrocdn.com/CXxGixRVyChwAxySbAyltuCiQXRKaWDN/assets/images/optimized/rev-87ca401/www.newbeauty.com/wp-content/uploads/2024/02/pamela-anderson-breasts-1990s.jpg", 
    bio: "My portfolio is as inflated as these assets." 
  }
];

export const twitterShareText = (name: string) => {
  return `I'm voting for ${name} on Titder! The ultimate platform for $Titcoin fans. Check it out at titder.com`;
};
