import { Experience, Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'the-year-of-handcrafts',
    title: 'Ministry of Culture Saudi Arabia',
    category: 'UI/UX Design, Graphic Design',
    filterCategory: 'graphic',
    image:  new URL('./Assets/Images/Projects/Saudi Gvt/tablet_mackup_03.jpg', import.meta.url).href,
    description: 'The Year of Handcrafts Event Program Ui/UX Design.',
    tags: ['UI/UX', 'Graphic Design', 'Event'],
    specs: {
      typography: 'Effra, TheYearofHandicrafts',
      colors: ['#243c21', '#bcb833', '#ffff'],
      grid: 'Responsive 12-Col'
    },
    narrative: {
      challenge: 'Creating UI/UX designs for event game and activity screens while adhering to strict brand guidelines.',
      execution: 'Collaborated closely with the Ministry of Culture to ensure all designs reflected the cultural significance of handcrafts, while maintaining usability across devices.',
      result: 'Successfully launched the event program with positive feedback on user experience and visual appeal.'
    },
    gallery: [
      { type: 'image', url: '/public/assets/Images/Projects/Saudi Gvt/tablet_mackup_01.jpg' },
      { type: 'image', url: '/public/assets/Images/Projects/Saudi Gvt/LED-Screen-Mockup.jpg' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/748429223154547.67f40e54aedfb.jpg' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/678682223154547.67f40e52cf0b7.jpg' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/44cbd0223154547.67f40e561122a.jpg' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/0b0228223154547.67f40e5612156.jpg' },
      // { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
    ],
    gridArea: 'md:col-span-8 md:row-span-2'
  },
  {
    id: 'ayursain',
    title: 'Ayursain Logo Creation & Branding',
    category: 'Brand Identity',
    filterCategory: 'graphic',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/1803d3235472491.68d7c67279531.jpg',
    description: 'Broadcast graphics and event branding for a leading media house.',
    tags: ['Logo Design', 'Branding', 'Identity'],
    specs: {
      typography: 'Pacifico / Inter',
      colors: ['#23a9b9', '#558135', '#ffff'],
      grid: 'Modular 6-Col'
    },
    narrative: {
      challenge: 'Developed a cohesive visual system including logo design, color palette, and brand guidelines.',
      execution: 'Created versatile logo variations and applied them across digital and print media to ensure brand consistency.',
      result: 'A strong brand identity that enhanced market presence and audience recognition.'
    },
    gallery: [
       { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/1803d3235472491.68d7c67279531.jpg' },
       { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/a2473d235472491.68d7c67278de6.jpg' }
    ],
    gridArea: 'md:col-span-4 md:row-span-1'
  },
  {
    id: 'pink-apple',
    title: 'Pink Apple Events',
    category: 'Event Identity',
    filterCategory: 'graphic',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
    description: 'Comprehensive event collateral and video production for high-profile gatherings.',
    tags: ['Event', 'Video', 'Social'],
    specs: {
      typography: 'Playfair Display / Inter',
      colors: ['#E91E63', '#FCE4EC', '#000000'],
      grid: 'Flexible Masonry'
    },
    narrative: {
      challenge: 'Deliver rapid-turnaround creative assets for diverse events ranging from corporate galas to weddings, ensuring unique identities for each.',
      execution: 'Established a "Master Template" system in Adobe Suite that allowed for quick customization while maintaining high design standards.',
      result: 'Streamlined workflow efficiency by 40% and delivered over 50 successful event branding packages.'
    },
    gridArea: 'md:col-span-4 md:row-span-1'
  },
  {
    id: 'personal-exp',
    title: 'Visual Experiments',
    category: 'Art Direction',
    filterCategory: 'motion',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    description: 'Abstract 3D compositions and lighting studies.',
    tags: ['3D', 'Abstract', 'Texture'],
    specs: {
      typography: 'Experimental',
      colors: ['#B026FF', '#00F0FF', '#0B0014'],
      grid: 'No-Grid'
    },
    narrative: {
      challenge: 'Pushing the boundaries of light and shadow in digital composition.',
      execution: 'Utilizing DaVinci Resolve and Photoshop to manipulate light sources and texture blending modes.',
      result: 'A collection of award-winning abstract posters and motion snippets.'
    },
    gridArea: 'md:col-span-12 md:row-span-1'
  },
  {
    id: 'crypto-dashboard',
    title: 'Nexus Trade',
    category: 'UI/UX Engineering',
    filterCategory: 'coding',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop',
    description: 'Real-time cryptocurrency trading interface built with React and WebGL data visualization.',
    tags: ['React', 'TypeScript', 'WebGL'],
    specs: {
      typography: 'JetBrains Mono / Inter',
      colors: ['#111111', '#00FF9D', '#FF0055'],
      grid: 'Dashboard 12-Col'
    },
    narrative: {
      challenge: 'Visualizing high-frequency data streams without performance lag in a browser environment.',
      execution: 'Implemented a custom WebGL renderer for charts and used WebSockets for live data updates. optimized React re-renders.',
      result: 'A sub-100ms latency dashboard used by over 500 active traders.'
    },
    gridArea: 'md:col-span-6 md:row-span-1'
  },
  {
    id: 'fashion-shoot',
    title: 'Vogue Arabia Editorial',
    category: 'Photography',
    filterCategory: 'photo-video',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    description: 'High-fashion editorial shoot focusing on traditional textiles in modern settings.',
    tags: ['Photography', 'Editorial', 'Lighting'],
    specs: {
      typography: 'Didot',
      colors: ['#C0C0C0', '#000000', '#FF0000'],
      grid: 'Golden Ratio'
    },
    narrative: {
      challenge: 'Capturing the texture of intricate fabrics under harsh desert sunlight.',
      execution: 'Used diffusers and reflectors to soften natural light, combined with high-speed sync flash for drama.',
      result: 'Featured as the cover story for the September issue.'
    },
    gridArea: 'md:col-span-6 md:row-span-1'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '35lighting',
    role: 'Graphic Designer & Photographer',
    company: '35 Lighting Solutions LLC',
    period: '2023 - Present',
    description: 'Leading visual documentation and graphic collateral for corporate/commercial lighting projects including ADNOC HQ.',
    type: 'work'
  },
  {
    id: 'pinkapple',
    role: 'Designer, Videographer & Editor',
    company: 'Pink Apple Events',
    period: '2018 - 2023',
    description: 'Managed full-cycle creative production for Gulf Vaartha and major regional events.',
    type: 'work'
  },
  {
    id: 'itpc',
    role: 'Diploma in Media',
    company: 'ITPC',
    period: 'Graduated',
    description: 'Foundational training in media production, editing, and graphic design principles.',
    type: 'education'
  },
  {
    id: 'ignou',
    role: 'Bachelor of Arts (BA)',
    company: 'IGNOU',
    period: 'Graduated',
    description: 'Humanities and creative arts focus, developing a strong theoretical framework for visual storytelling.',
    type: 'education'
  }
];

export const SKILLS = [
  "Adobe Creative Suite",
  "FCPX (Final Cut Pro)",
  "DaVinci Resolve",
  "UI/UX Design",
  "Photography",
  "Motion Graphics"
];

export const LANGUAGES = [
  "English", "Malayalam", "Hindi", "Arabic", "Tamil"
];

export const CONTACT = {
  phone: "+971 58 197 6818",
  email: "junaidparamberi@gmail.com",
  location: "Abu Dhabi - UAE"
};
