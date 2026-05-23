// SAAA Centralized Data Repository

export const academyInfo = {
  name: "Sri Annamacharya Arts Academy",
  shortName: "SAAA",
  tagline: "Where tradition meets perfection",
  phoneNumbers: ["+91 73964 65311", "+91 88854 83221"],
  address: "FFJM+24G, Rd Number 3, Mallikarjuna Colony, HAL Colony, Old Bowenpally, Secunderabad, 500011",
  locationUrl: "https://maps.google.com/?q=Sri+Annamacharya+Arts+Academy",
  foundationDate: "December 18, 2021",
  founder: "Pasumarthi Sailaja Garu",
};

export const instruments = [
  {
    id: 'veena',
    name: 'Veena',
    role: 'Traditional String',
    emoji: '🪕',
    description: 'Master the resonant notes of the Veena, carrying the soul of every raga.',
    color: '#D4AF37',
  },
  {
    id: 'flute',
    name: 'Flute',
    role: 'Divine Wind',
    emoji: '🪈',
    description: 'Learn the ethereal sounds of the Carnatic flute, the divine breath of music.',
    color: '#00C853',
  },
  {
    id: 'mridangam',
    name: 'Mridangam',
    role: 'Rhythm Engine',
    emoji: '🥁',
    description: 'Anchor the rhythm with the ancient double-headed drum of South India.',
    color: '#8B1E2D',
  },
  {
    id: 'violin',
    name: 'Violin',
    role: 'Classical Bow',
    emoji: '🎻',
    description: 'The soul-stirring accompaniment that bridges the gap between vocal and instrumental music.',
    color: '#FFEA00',
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    role: 'Modern Melody',
    emoji: '🎹',
    description: 'Bridge the gap between traditional ragas and modern harmonic structures.',
    color: '#00D6FF',
  },
  {
    id: 'guitar',
    name: 'Guitar',
    role: 'String Mastery',
    emoji: '🎸',
    description: 'Explore Carnatic and Western techniques on the versatile acoustic guitar.',
    color: '#FF3E00',
  },
];

export const courses = [
  {
    _id: 'carnatic-vocal',
    name: 'Carnatic Vocal',
    category: 'Vocals',
    icon: '🎤',
    description: 'Master the ancient classical art of South Indian vocal music, from foundational exercises to complex ragas.',
    color: '#D4AF37', 
    price: '₹1500/mo'
  },
  {
    _id: 'kuchipudi',
    name: 'Kuchipudi Dance',
    category: 'Dance',
    icon: '💃',
    description: 'Learn the graceful and vibrant classical dance form of Andhra Pradesh, blending expression and storytelling.',
    color: '#FF8C42',
    price: '₹1500/mo'
  },
  {
    _id: 'slokas',
    name: 'Slokas & Chants',
    category: 'Sacred Vocal',
    icon: '🕉️',
    description: 'Learn the sacred chants and slokas that form the spiritual foundation of Indian arts.',
    color: '#FFD700',
    price: '₹1500/mo'
  },
  {
    _id: 'violin-course',
    name: 'Violin',
    category: 'Instrumental',
    icon: '🎻',
    description: 'Master the versatile violin in the Carnatic style, known for its vocal-like phrasing.',
    color: '#FFEA00',
    price: '₹2000/mo'
  },
  {
    _id: 'keyboard-course',
    name: 'Keyboard',
    category: 'Western / Fusion',
    icon: '🎹',
    description: 'Explore melody and harmony through contemporary and classical techniques on the keyboard.',
    color: '#00D6FF',
    price: '₹2000/mo'
  },
  {
    _id: 'guitar-course',
    name: 'Guitar',
    category: 'Strings',
    icon: '🎸',
    description: 'Learn to play the acoustic guitar with a focus on both classical and contemporary techniques.',
    color: '#FF3E00',
    price: '₹2000/mo'
  },
  {
    _id: 'flute-course',
    name: 'Flute',
    category: 'Wind',
    icon: '🪈',
    description: 'Breathe life into ragas with the divine sounds of the bamboo flute.',
    color: '#00C853',
    price: '₹2000/mo'
  },
  {
    _id: 'mridangam-course',
    name: 'Mridangam',
    category: 'Percussion',
    icon: '🥁',
    description: 'Become the rhythmic heartbeat of any classical concert by mastering this ancient drum.',
    color: '#8B1E2D',
    price: '₹2000/mo'
  },
  {
    _id: 'veena-course',
    name: 'Veena',
    category: 'Saraswati Style',
    icon: '🪕',
    description: 'Divine string mastery on the ancient Veena, carrying the soul of Every Raga.',
    color: '#D4AF37',
    price: '₹2000/mo'
  },
];

export const faculty = [
  {
    _id: 'vocal-expert',
    name: 'Smt. Rajeshwari Rao',
    role: 'Head of Carnatic Vocal',
    bio: 'With over 30 years of teaching experience, she has trained hundreds of students in the pure Annamacharya tradition.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    expertise: ['Vocal', 'Annamacharya']
  },
  {
    _id: 'dance-expert',
    name: 'Sri Venkatesh Kumar',
    role: 'Lead Kuchipudi Acharya',
    bio: 'An award-winning performer who specializes in the traditional dramas of Andhra Pradesh.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    expertise: ['Kuchipudi', 'Traditional Drama']
  },
  {
    _id: 'percussion-expert',
    name: 'Sri Murali Krishna',
    role: 'Mridangam Maestro',
    bio: 'Known for his intricate rhythmic patterns and collaborative performances with legendary vocalists.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    expertise: ['Mridangam', 'Rhythm']
  },
  {
    _id: 'veena-expert',
    name: 'Smt. Lakshmi Devi',
    role: 'Veena Vidwan',
    bio: 'Dedicated to preserving the authentic Saraswati Veena playing style for the next generation.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    expertise: ['Veena', 'Saraswati Style']
  },
];

export const galleryPosts = [
  {
    _id: '1',
    title: 'Annual Day Celebrations',
    date: '2023-12-18',
    category: 'Performances',
    mediaType: 'photo',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    featured: true
  },
  {
    _id: '2',
    title: 'Maha Shivaratri Special',
    date: '2024-03-08',
    category: 'Clips',
    mediaType: 'video',
    videoUrl: 'https://youtube.com',
    featured: false
  },
  {
    _id: '3',
    title: 'Thyagaraja Aradhana',
    date: '2024-01-30',
    category: 'Performances',
    mediaType: 'photo',
    image: 'https://images.unsplash.com/photo-1544253916-25805f63cd33?w=800&q=80',
    featured: false
  },
  {
    _id: '4',
    title: 'Flute Masterclass',
    date: '2023-11-05',
    category: 'Performances',
    mediaType: 'photo',
    image: 'https://images.unsplash.com/photo-1573229415849-fb920dae0161?w=800&q=80',
    featured: true
  },
  {
    _id: '5',
    title: 'Summer Camp Finale',
    date: '2023-05-20',
    category: 'Clips',
    mediaType: 'video',
    videoUrl: 'https://youtube.com',
    featured: false
  },
  {
    _id: '6',
    title: 'Veena Recital by Students',
    date: '2024-02-15',
    category: 'Performances',
    mediaType: 'photo',
    image: 'https://images.unsplash.com/photo-1621531707010-388de9fcac57?w=800&q=80',
    featured: false
  }
];
