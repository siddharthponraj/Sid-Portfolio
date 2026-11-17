// Language-neutral facts: links, images and tech names.
// All wording (in every language) lives in src/i18n/.

import type { IconName } from './components/Icon';

export const profile = {
  name: 'Siddharth P',
  email: 'siddharthponraj@gmail.com',
  phone: '+91 94876 13673',
  phoneHref: 'tel:+919487613673',
  resume: 'assets/Resume.pdf',
  portrait: 'assets/info-perfil.png',
  joined: '2026-03',
  cgpa: '8.62',
  whatsapp: 'https://wa.me/919487613673',
  socials: [
    { label: 'LinkedIn', handle: 'Siddharth P', icon: 'linkedin', href: 'https://www.linkedin.com/in/siddharth-p-91670a251/' },
    { label: 'GitHub', handle: 'siddharthponraj', icon: 'github', href: 'https://github.com/siddharthponraj' },
    { label: 'Instagram', handle: 'siddhu_0407_', icon: 'instagram', href: 'https://www.instagram.com/siddhu_0407_' },
  ] satisfies { label: string; handle: string; icon: IconName; href: string }[],
};

// Same order as skills.groups in each language file. Tech names stay in English.
export const skills: { name: string; icon: IconName }[][] = [
  [
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'react' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Vite', icon: 'vite' },
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
  ],
  [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express', icon: 'express' },
    { name: 'C#', icon: 'csharp' },
    { name: '.NET', icon: 'dotnet' },
    { name: 'Java', icon: 'java' },
    { name: 'Python', icon: 'python' },
    { name: 'REST APIs', icon: 'api' },
  ],
  [
    { name: 'MySQL', icon: 'mysql' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Encryption', icon: 'lock' },
    { name: 'Hashing', icon: 'hash' },
    { name: 'Authentication', icon: 'key' },
  ],
  [
    { name: 'Figma', icon: 'figma' },
    { name: 'UI/UX', icon: 'layout' },
    { name: 'Wireframing', icon: 'wireframe' },
    { name: 'Prototyping', icon: 'cursor' },
  ],
  [
    { name: 'Capacitor', icon: 'capacitor' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'Dart', icon: 'dart' },
    { name: 'TensorFlow', icon: 'tensorflow' },
  ],
  [
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Vercel', icon: 'vercel' },
    { name: 'Google Cloud', icon: 'googlecloud' },
    { name: 'Jest', icon: 'jest' },
    { name: 'Vitest', icon: 'vitest' },
    { name: 'Azure', icon: 'cloud' },
    { name: 'Oracle Cloud', icon: 'cloud' },
    { name: 'Agile', icon: 'loop' },
  ],
];

// Same order as work.projects in each language file.
// href: null = no public link. image: null = shown as a details block (company / platform / modules / stack).
export const projectMeta: {
  image: string | null;
  href: string | null;
  stack: string[];
  company?: string;
}[] = [
  {
    image: null,
    href: null,
    stack: ['React', 'TypeScript', 'Capacitor', 'Node.js', 'Express', 'MySQL', 'Redis', 'Google Cloud'],
    company: 'Hexaennea Technologies',
  },
  {
    image: null,
    href: null,
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Chart.js'],
    company: 'Hexaennea Technologies',
  },
  {
    image: null,
    href: null,
    stack: ['React', 'React Router', 'Vite', 'Supabase', 'Edge Functions', 'Vercel'],
    company: 'Hexaennea Technologies',
  },
  {
    image: 'assets/images/plant_disease.png',
    href: null, // repository not public at the moment
    stack: ['Python', 'TensorFlow', 'EfficientNet', 'Gemini'],
  },
  {
    image: 'assets/images/compiler.avif',
    href: 'https://github.com/siddharthponraj/AI-Mobile-Compiler',
    stack: ['Flutter', 'Dart', 'JDoodle API', 'Gemini Flash'],
  },
  {
    image: 'assets/images/mental_health.png',
    href: 'https://github.com/siddharthponraj/Path-to-peace',
    stack: ['Flutter', 'Dart', 'Wearables'],
  },
  {
    image: 'assets/images/forest_fire.png',
    href: 'https://github.com/siddharthponraj/Forest-fire-prediction',
    stack: ['Python', 'scikit-learn', 'JavaScript'],
  },
  {
    image: 'assets/images/frontend.png',
    href: 'https://www.figma.com/proto/MopkS5MZy3JNSk9f4M9Tbu/UseApp-Project?node-id=50-181&starting-point-node-id=50%3A181&t=i75HDhnK7oUbrgVk-1',
    stack: ['Figma', 'UI/UX', 'Prototyping'],
  },
];

const cert = (file: string) => `assets/certificates/${encodeURIComponent(file)}.pdf`;

// Official credential names stay in English in every language.
export const certifications = [
  { title: 'Oracle Cloud Infrastructure Foundations Associate', issuer: 'Oracle', date: '2023-12', href: cert('Oracle') },
  { title: 'Full Stack Development Workshop', issuer: 'IIT Madras', date: '2024-01', href: cert('Full stack development workshop IIT') },
  { title: 'Android App Development', issuer: 'Teachnook', date: '2024-01', href: cert('Teachnook COURSE Completion Certificate _ P. Siddharth') },
  { title: 'Complete AI, ML & Data Science Bootcamp', issuer: 'Udemy', date: '2024-02', href: cert('Complete machine learning Udemy') },
  { title: 'Introduction to Embedded Machine Learning', issuer: 'Udemy', date: '2024-02', href: cert('Intro to embedded machine learning certificate') },
  { title: 'Database Management Systems', issuer: 'CodeChef', date: '2024-03', href: cert('DATABASE MANAGEMENT SYSTEMS') },
  { title: 'Forests and their Management', issuer: 'NPTEL', date: '2024-04', href: cert('Forest and their management') },
  { title: 'Design and Analysis of Algorithms', issuer: 'CodeChef', date: '2024-10', href: cert('Design and Analysis of Algorithms') },
  { title: 'Wildlife Ecology', issuer: 'NPTEL', date: '2024-10', href: cert('Wildlife ecology') },
  { title: 'One Health', issuer: 'NPTEL', date: '2025-04', href: cert('One Health') },
  { title: 'Conservation Economics', issuer: 'NPTEL', date: '2025-04', href: cert('Conservation Economics') },
  { title: 'Conservation Geography', issuer: 'NPTEL', date: '2025-10', href: cert('Conservation Geography') },
];
