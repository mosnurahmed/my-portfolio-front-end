import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFlutter,
  SiFigma,
  SiGit,
  SiGithub,
  SiFramer,
  SiThreedotjs,
  SiFirebase,
  SiVercel,
  SiPostman,
  SiJsonwebtokens,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export const profile = {
  name: "Mosnur Ahmed",
  title: "Mid-level Software Engineer",
  tagline:
    "I architect, build and ship production-grade products across mobile and web.",
  location: "Middle Badda, Dhaka, Bangladesh",
  email: "mosnurahmed01@gmail.com",
  phone: "+880 1981 916908",
  github: "https://github.com/mosnurahmed",
  linkedin: "https://www.linkedin.com/in/mosnurahmed",
  resumeUrl: "/Mosnur_Ahmed_CV.pdf",
  avatar: "/Monsur.png",
  bio: `Mid-level software engineer focused on shipping reliable, user-loved products. I work end-to-end across the React, Next.js, React Native, Flutter and MERN (MongoDB · Express · React · Node) ecosystems — turning ambiguous problems into clean architecture, performant interfaces and resilient services.`,
  highlights: [
    { value: "3+", label: "Years building" },
    { value: "10+", label: "Apps shipped" },
    { value: "1", label: "Published paper" },
    { value: "∞", label: "Cups of tea" },
  ],
};

export const skills = [
  { name: "React", icon: SiReact, color: "#22d3ee" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React Native", icon: TbBrandReactNative, color: "#22d3ee" },
  { name: "TypeScript", icon: SiTypescript, color: "#3b82f6" },
  { name: "JavaScript", icon: SiJavascript, color: "#facc15" },
  { name: "Redux", icon: SiRedux, color: "#a78bfa" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#22d3ee" },
  { name: "Framer Motion", icon: SiFramer, color: "#ec4899" },
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#84cc16" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#22c55e" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#ec4899" },
  { name: "Postman", icon: SiPostman, color: "#f97316" },
  { name: "Flutter", icon: SiFlutter, color: "#22d3ee" },
  { name: "Firebase", icon: SiFirebase, color: "#f59e0b" },
  { name: "Figma", icon: SiFigma, color: "#ec4899" },
  { name: "Git", icon: SiGit, color: "#f97316" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
];

export const stackGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo", "Redux Toolkit", "RTK Query", "Flutter"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST", "JWT", "WebSockets"],
  },
  {
    title: "Database & Cloud",
    items: ["MongoDB", "Mongoose", "Firebase", "Vercel", "Play Console"],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Software Engineer — Mobile (React Native)",
    company: "Byte Trek Limited",
    period: "Sep 2024 — Present",
    location: "Dhaka, BD",
    description:
      "Driving the mobile product surface for Byte Trek's flagship apps — Amarhaalkhata (fintech) and SignatureCare (health-services). Own end-to-end execution: system design, implementation, code review, QA, release engineering and post-launch monitoring.",
    achievements: [
      "Designed the mobile app architecture: modular feature layout, typed API contracts, and a normalized Redux Toolkit + RTK Query data layer with offline-first cache and conflict-safe sync.",
      "Established engineering foundations — TypeScript strict mode, ESLint/Prettier, Husky pre-commit hooks, environment-based config and a CI build pipeline.",
      "Built a reusable component system (design tokens, primitives, form layer) that cut feature delivery time by ~40% across the team.",
      "Integrated Node.js + Express + MongoDB backend via JWT auth with refresh-token rotation, role-based access control and audit trails for financial events.",
      "Implemented secure payment flows, deep linking, push notifications, biometric login and crash/analytics observability.",
      "Modernized the legacy SignatureCare app: 16 KB page-size compliance, target-API 35 (Android 14+) upgrade, RN core+library upgrades, removed deprecated APIs and re-architected critical screens.",
      "Owned release management: versioning strategy, signed builds, Play Store rollout, staged rollouts and crashlytics tracking.",
      "Mentored juniors via PR reviews, pair-programming and architectural design docs.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Firebase",
      "CI/CD",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Edusoft Consultant Ltd.",
    period: "Jan 2024 — Aug 2024",
    location: "Dhaka, BD",
    description:
      "Modernized a portfolio of education-sector software products and shipped responsive, data-rich dashboards.",
    achievements: [
      "Made 5 legacy apps fully responsive — measurable lift in engagement & retention.",
      "Built dynamic HTML/JS reporting engine used by BUP, BSMRMU and UAP.",
      "Improved page-load and interactivity, contributing to revenue growth.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", ".NET"],
  },
  {
    role: "Mobile App Developer (Part-time)",
    company: "RexioTech",
    period: "Aug 2023 — Dec 2023",
    location: "Remote",
    description:
      "Designed and shipped student-facing modules for a Madrasha management system.",
    achievements: [
      "Designed and developed the Student Fees module end-to-end.",
      "Built the Student Result module with offline cache and PDF export.",
    ],
    stack: ["React Native", "TypeScript", "Tailwind"],
  },
];

export type ProjectLink = {
  label: string;
  href: string;
  type: "play" | "apk" | "live" | "github";
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  accent: string;
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Amarhaalkhata",
    tagline: "Digital ledger for small businesses · Byte Trek",
    description:
      "Production fintech app I co-built at Byte Trek — replaces paper khata-books for SMEs. Multi-language UI, secure payments, automated due-collection reminders, offline-first sync and bank-grade auth.",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Express", "MongoDB"],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.amrhalkhata",
        type: "play",
      },
    ],
    accent: "from-pink-500 to-violet-500",
    year: "2024 — Present",
    featured: true,
  },
  {
    title: "SignatureCare",
    tagline: "Modernized legacy health-services app · Byte Trek",
    description:
      "Inherited a 2022 React Native app and brought it to current Play Store standards. Achieved 16 KB page-size compliance, upgraded target-API to level 35 (Android 14+), upgraded RN core and 40+ libraries, removed deprecated APIs, refactored navigation and auth, and re-released cleanly.",
    tags: [
      "React Native",
      "Android API 35",
      "16KB pages",
      "Migration",
      "Performance",
    ],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.rn_ercare24_app",
        type: "play",
      },
    ],
    accent: "from-emerald-400 to-cyan-400",
    year: "2025",
    featured: true,
  },
  {
    title: "LifeTrack Pro",
    tagline: "Personal life-OS for habits, finance & goals",
    description:
      "My own product. Cross-platform productivity app with offline sync, biometric security and rich analytics. Owned full architecture from zero to launch — Express + MongoDB backend, RN + TS frontend.",
    tags: ["React Native", "TypeScript", "Redux", "Express", "MongoDB"],
    links: [
      { label: "Download APK", href: "/app-release.apk", type: "apk" },
    ],
    accent: "from-violet-500 to-cyan-400",
    year: "2025",
    featured: true,
  },
  {
    title: "Pothik",
    tagline: "Travel optimization platform · MDPI publication",
    description:
      "Final-year capstone — also published in MDPI Applied Sciences. Maximizes bus-seat occupancy and bundles tour packages with a guide & blog portal.",
    tags: ["React", "Redux", "Express", "Tailwind"],
    links: [
      { label: "Source", href: "https://github.com/mosnurahmed/Pothik", type: "github" },
      { label: "Read paper", href: "https://www.mdpi.com/2076-3417/13/19/10973", type: "live" },
    ],
    accent: "from-cyan-400 to-emerald-400",
    year: "2023",
  },
  {
    title: "QMM Soft Mobile",
    tagline: "Madrasha management — student modules",
    description:
      "Designed and shipped Student Fees and Student Result modules with PDF export and offline caching.",
    tags: ["React Native", "TypeScript", "Tailwind"],
    accent: "from-amber-400 to-pink-500",
    year: "2023",
  },
  {
    title: "Edusoft Reporting Suite",
    tagline: "Responsive refactor + dynamic financial reports",
    description:
      "Refactored 5 legacy education-sector apps for full responsiveness, then built an HTML/JS reporting engine adopted by BUP, BSMRMU and UAP — interactive, exportable financial dashboards.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    accent: "from-violet-500 to-pink-500",
    year: "2024",
  },
];

export const publications = [
  {
    title: "A Framework of Vehicle Usage Optimization for Tour Purpose",
    venue: "MDPI · 2023",
    authors:
      "Nusrat Jahan Sarna, Mosnur Ahmed, Farzana Ahmed Rithen, Dr. Md. Motaharul Islam",
    summary:
      "This paper tackles three persistent problems in regional travel — expensive tickets, inefficient vehicle management, and the absence of trusted tour guides. We propose a framework that maximizes bus-seat occupancy, offers guide-inclusive bundled tour packages, and provides a tourist-information blog portal. The result: lower travel cost, better fleet utilization for operators, and a more reliable, end-to-end experience for travelers.",
    link: "https://www.mdpi.com/2076-3417/13/19/10973",
  },
];

export const education = [
  {
    school: "United International University",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "Feb 2019 — Sep 2023",
    detail: "CGPA 2.79 · Final-year capstone published in MDPI",
  },
];

export const organizations = [
  { name: "UIU Debate Club", role: "Executive Member", period: "May 2019 — Jul 2022" },
  { name: "UIU Computer Club", role: "Executive Member", period: "Feb 2020 — Sep 2023" },
];

export const reference = {
  name: "Dr. Md. Motaharul Islam",
  role: "Professor & Director — MSCSE Program, UIU",
  email: "motaharul@cse.uiu.ac.bd",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
