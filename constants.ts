import {  Overview, } from './types';

export const OVERVIEW: Overview = {
  title: "Professional Profile",
  subtitle: "Creative Technologist",
  description: "A creative Graphic Designer and Visual Storyteller with 6+ years of experience across branding, photography, video editing, and motion graphics. Experienced in delivering end-to-end visual solutions, from concept and on-site photography to post-production and final delivery for digital and print platforms.",
  stats: [
    { label: "Experience", value: "6+ Years" },
    { label: "Projects", value: "40+" },
    { label: "Clients", value: "12+ Regions" }
  ]
};

// export const PROJECTS: Project[] = [
//   {
//     id: 'the-year-of-handcrafts',
//     title: 'Ministry of Culture Saudi Arabia',
//     category: 'Ui/UX Design ',
//     filterCategory: 'graphic',
//     featured: true,
//     image: '/assets/images/projects/saudi-Gvt/tablet_mackup_03.jpg',
//     description: 'Product Designs for Event Interactive Systems - The Year of Handcrafts Campaign',
//     tags: ['UI/UX Design', 'Event Interactive Systems', 'Product Design'],
//     specs: {
//       typography: 'Effra, TheYearofHandicrafts',
//       colors: ['#243c21', '#bcb833', '#ffff'],
//       grid: 'Multi-format (1:1, 9:16, 16:9)'
//     },
//     narrative: {
//       challenge: 'Creating compelling social media posters that promote cultural handcrafts across multiple platforms with consistent branding.',
//       execution: 'Designed a series of promotional posters optimized for Instagram, Facebook, and TikTok, featuring vibrant visuals and clear calls-to-action.',
//       result: 'Campaign reached 500K+ impressions with 25% engagement rate and successful event attendance.'
//     },
//     gallery: [
//       { type: 'image', url: '/assets/images/projects/saudi-Gvt/tablet_mackup_01.jpg' },
//       { type: 'image', url: '/assets/images/projects/saudi-Gvt/LED-Screen-Mockup.jpg' },
//       { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/748429223154547.67f40e54aedfb.jpg' },
//       { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/678682223154547.67f40e52cf0b7.jpg' },
//     ],
//     gridArea: 'md:col-span-8 md:row-span-2'
//   },
//   {
//     id: 'ayursain',
//     title: 'Ayursain Brand Promotion',
//     category: 'brand identity',
//     filterCategory: 'graphic',
//     featured: true,
//     image: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/1803d3235472491.68d7c67279531.jpg',
//     description: 'Ayursain Brand identity and creation',
//     tags: ['Social Media', 'Branding', 'Promotion'],
//     specs: {
//       typography: 'Pacifico / Inter',
//       colors: ['#23a9b9', '#558135', '#ffff'],
//       grid: 'Story & Feed Formats'
//     },
//     narrative: {
//       challenge: 'Building brand awareness through cohesive social media assets across Instagram, Facebook, and Stories.',
//       execution: 'Created a series of promotional posters with logo variations, product highlights, and lifestyle imagery optimized for each platform.',
//       result: 'Achieved 10K+ followers in first month with 30% click-through rate to website.'
//     },
//     gallery: [
//        { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/1803d3235472491.68d7c67279531.jpg' },
//        { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/a2473d235472491.68d7c67278de6.jpg' }
//     ],
//     gridArea: 'md:col-span-4 md:row-span-1'
//   },
  
//   {
//     id: '3s-media-solutions',
//     title: '3S Media Solutions Campaign',
//     category: 'Social Media Promotion',
//     filterCategory: 'graphic',
//     featured: true,
//     image: '/assets/images/projects/three_s/1.png',
//     description: 'Social media campaign showcasing 3S Media LED technology and architectural solutions.',
//     tags: ['Social Media', 'LED Tech', 'Campaign'],
//     specs: {
//       typography: 'Montserrat / Helvetica',
//       colors: ['#201b51', '#4d4184', '#407cbf', '#00cfb4', '#e26386', '#ffc600'],
//       grid: 'Multi-format Posts & Reels'
//     },
//     narrative: {
//       challenge: 'Promoting complex LED installation services through visually engaging social media content.',
//       execution: 'Developed carousel posts, Reels, and Stories showcasing before/after installations with motion graphics.',
//       result: 'Generated 50+ qualified leads through social engagement and 15K+ video views.'
//     },
//      gallery: [
//        { type: 'image', url: '/assets/images/projects/three_s/3.png' },
//        { type: 'image', url: '/assets/images/projects/three_s/1.png' },
//        { type: 'image', url: '/assets/images/projects/three_s/2.png' },
//        { type: 'image', url: '/assets/images/projects/three_s/1.png' },
//        { type: 'image', url: '/assets/images/projects/three_s/2.png' },
//     ],
//     gridArea: 'md:col-span-4 md:row-span-1' // Set larger to highlight the high-impact visuals
// },
//   {
//     id: 'boehringeringelheim',
//     title: 'Boehringer Ingelheim',
//     category: 'Interractive Presentation Design & Development',
//     filterCategory: 'coding',
//     featured: true,
//     link: 'https://boehringeringelheim-interactive.netlify.app/',
//     image: '/assets/images/projects/bi/cover-image-bi.png',
//     description: "Boehringer Ingelheim | Interactive Presentation for Web and PC",
//     tags: ['React', 'Electron', 'UI/UX'],
//     specs: {
//       typography: 'BoehringerForwardHead',
//       colors: ['#08312A', '#00E47C', '#E5E3DE', '#F6F5F3'],
//       grid: 'Responsive 12-Col'
//     },
//     narrative: {
//       challenge: 'Designing an interactive platform that effectively communicates complex pharmaceutical information to diverse stakeholders.',
//       execution: 'Developed a user-friendly interface using React and Electron, incorporating motion design principles to enhance engagement and information retention.',
//       result: 'The platform received positive feedback for its intuitive navigation and dynamic content presentation, improving user interaction and knowledge dissemination.'
//     },
//     gallery: [
//       { type: 'image', url: '/assets/images/projects/bi/cover-image-bi.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi01.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi02.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi03.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi04.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi05.png' },
//       { type: 'image', url: '/assets/images/projects/bi/bi06.png' },

     
//     ],
//     gridArea: 'md:col-span-12 md:row-span-1'
//   },
//   {
//     id: 'kat-group',
//     title: 'Kat Group Brand Identity & Logo Creation',
//     category: 'Branding & Logo Design',
//     filterCategory: 'graphic',
//     featured: true,
//     image: '/assets/images/projects/KAT/KAT-BRANDING.jpg',
//     description: 'Brand identity and logo design for Kat Group, a multifaceted business conglomerate.',
//     tags: ['Branding', 'Logo Design', 'Identity'],
//     specs: {
//       typography: 'Montserrat / Roboto',
//       colors: ['#101230', '#c3902c', '#efaf1d', '#f6ca37', '#ffffff'],
//       grid: 'Dashboard 12-Col'
//     },
//     narrative: {
//       challenge: 'Creating a versatile brand identity that reflects the diverse business interests of Kat Group while maintaining a cohesive visual language.',
//       execution: 'Designed a modern logo and brand guidelines, including color palettes and typography, to ensure consistency across all platforms.',
//       result: 'The new brand identity successfully positioned Kat Group as a professional and trustworthy conglomerate, leading to increased brand recognition and client engagement.'
//     },

//     gallery: [
//       { type: 'image', url: '/assets/images/projects/KAT/Letterpress-Logo-Mockup.jpg' },
//       { type: 'image', url: '/assets/images/projects/KAT/1.jpg' },
//       { type: 'image', url: '/assets/images/projects/KAT/KAT-BRANDING.jpg' },
//       { type: 'image', url: '/assets/images/projects/KAT/KAT-LOGO-BRAND-SCHEME.jpg' },
//     ],
//     gridArea: 'md:col-span-6 md:row-span-1'
//   },
//   {
//     id: '3s_creative_brochure',
//     title: '3S Creative Solutions Brochure',
//     category: 'Print & Digital Brochure Design',
//     filterCategory: 'graphic',
//     image: '/assets/images/projects/3s_creative_brochure/1.jpg',
//     description: 'Print and digital brochure design for 3S Creative Solutions, highlighting their services and portfolio.',
//     tags: ['Brochure Design', 'Print Design', 'Digital Design'],
//     specs: {
//       typography: 'montserrat / roboto',
//       colors: ['#482671', '#97258d', '#eb2b50', '#ffffff'],
//       grid: 'A4 Print & Digital'
//     },
//     narrative: {
//       challenge: 'Designing a visually appealing brochure that effectively communicates 3S Creative Solutions\' offerings to potential clients.',
//       execution: 'Created a cohesive layout with striking visuals and clear typography, optimized for both print and digital formats.',
//       result: 'The brochure received positive feedback for its professional design and clarity, contributing to new client acquisitions and increased brand visibility.'
//     },
//     gallery: [
//       { type: 'image', url: '/assets/images/projects/3s_creative_brochure/1.jpg' },
//       { type: 'image', url: '/assets/images/projects/3s_creative_brochure/2.jpg' },
//       { type: 'image', url: '/assets/images/projects/3s_creative_brochure/3.jpg' },
//       { type: 'image', url: '/assets/images/projects/3s_creative_brochure/4.jpg' },
//     ],
//     gridArea: 'md:col-span-6 md:row-span-1'
//   },
//   {
//     id: 'verifyman-app-branding-logo',
//     title: 'Verifyman App Branding',
//     category: 'Branding & Logo Design',
//     filterCategory: 'graphic',
//     featured: true,
//     image: '/assets/images/projects/verifyman/02_Tablet-Mockup.jpg',
//     description: 'Brand identity and logo design for Verifyman, a cutting-edge verification solutions provider.',
//     tags: ['Branding', 'Logo Design', 'Identity'],
//     specs: {
//       typography: 'poppins / open sans',
//       colors: ['#3ab54a', '#3f423f', , '#ffffff'],
//       grid: 'Dashboard 12-Col'
//     },
//     narrative: {
//       challenge: 'Creating a modern and trustworthy brand identity for Verifyman that resonates with tech-savvy users and reflects the company\'s innovative solutions.',
//       execution: 'Developed a cohesive brand system with a distinctive logo and visual elements that communicate professionalism and innovation',
//       result: 'The new brand identity enhanced Verifyman\'s market presence, leading to increased user engagement and positive client feedback.'
//     },
//     gallery: [
//       { type: 'image', url: '/assets/images/projects/verifyman/02_Tablet-Mockup.jpg' },
//       { type: 'image', url: '/assets/images/projects/verifyman/High-Quality-Business-Card-Mockup-2.jpg' },
//       { type: 'image', url: '/assets/images/projects/verifyman/Logo-branding.png' },
//       { type: 'image', url: '/assets/images/projects/verifyman/Logo-branding2.png' },
//       { type: 'image', url: '/assets/images/projects/verifyman/Logo-branding3.png' },
//     ],
//     gridArea: 'md:col-span-6 md:row-span-1'
//   },
// ];

// export const EXPERIENCE: Experience[] = [
//   {
//     id: '3slighting',
//     role: 'Graphic Designer & Photographer',
//     company: '35 Lighting Solutions LLC',
//     period: '2023 - Present',
//     description: 'Leading visual documentation and graphic collateral for corporate/commercial lighting projects including ADNOC HQ.',
//     type: 'work'
//   },
//   {
//     id: 'pinkapple',
//     role: 'Designer, Videographer & Editor',
//     company: 'Pink Apple Events',
//     period: '2018 - 2023',
//     description: 'Managed full-cycle creative production for Gulf Vaartha and major regional events.',
//     type: 'work'
//   },
//   {
//     id: 'itpc',
//     role: 'Diploma in Media',
//     company: 'ITPC',
//     period: 'Graduated',
//     description: 'Foundational training in media production, editing, and graphic design principles.',
//     type: 'education'
//   },
//   {
//     id: 'ignou',
//     role: 'Bachelor of Arts (BA)',
//     company: 'IGNOU',
//     period: 'Graduated',
//     description: 'Humanities and creative arts focus, developing a strong theoretical framework for visual storytelling.',
//     type: 'education'
//   }
// ];

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


// export const CLIENTS : Client[] = [
//    { 
//     id: 'boehringer', 
//     name: "Boehringer Ingelheim", 
//     role: "Interactive Presentation Design & Development", 
//     year: "2024",
//     description: "Interactive pharmaceutical presentation for web and PC platforms."
//   },
//   { 
//     id: 'SaudiCulture', 
//     name: "Ministry of Culture Saudi Arabia", 
//     role: "Event Systems UI/UX Design", 
//     year: "2024",
//     description: "Product design for cultural event digital interfaces."
//   },
//   { 
//     id: 'adnoc', 
//     name: "ADNOC", 
//     role: "LED Show Content Creation, Photography & Videography", 
//     year: "2023",
//     description: "Corporate lighting installation documentation and LED content production."
//   },
//   { 
//     id: 'verifyman', 
//     name: "Verifyman", 
//     role: "App Branding & Logo Design", 
//     year: "2024",
//     description: "Brand identity creation for a verification solutions application."
//   },
//   { 
//     id: '3smedia', 
//     name: "3S Media Solutions", 
//     role: "Social Media Campaign Design", 
//     year: "2023",
//     description: "Promotional campaign for LED technology and architectural solutions."
//   },
  
//   { 
//     id: 'House Call', 
//     name: "Doctors Photography", 
//     role: "Medical Photography & Videography", 
//     year: "2024",
//     description: "Medical staff and facility visual documentation."
//   },
//   { 
//     id: 'pinkapple', 
//     name: "Pink Apple Events", 
//     role: "Event Branding", 
//     year: "2020",
//     description: "Large-scale event collateral systems."
//   },
//   { 
//     id: 'KATGroup', 
//     name: "KAT Group", 
//     role: "Creating Brand Identity, Logo & Graphic assets", 
//     year: "2024",
//     description: "Comprehensive branding solutions for a multifaceted business conglomerate."
//   },
//   { 
//     id: 'almadinagroup', 
//     name: "Al Madina Group", 
//     role: "Creating Promotional Booklet & Graphic assets", 
//     year: "2019 Onwards",
//     description: "Marketing collateral for diverse business ventures."
//   },
// ];