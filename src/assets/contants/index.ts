import {
  SiSpring,
  SiExpress,
  SiFlask,
  SiDjango,
  SiLaravel,
  SiReact,
  SiFlutter,
  SiAngular,
  SiMysql,
  SiMongodb,
  SiAmazon,
  SiFirebase,
  SiDotnet,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiTailwindcss,
  SiKotlin,
  SiDart,
  SiHomepage,
  SiLinkedin,
  SiX,
  SiGithub,
} from "react-icons/si";
import { ProjectItem } from "../../pages/Projects";

export const menu = [
  { label: "WORKS", url: "#works" },
  { label: "MESSAGE", url: "#message" },
];

export const stacks = [
  // Backend Frameworks
  { label: "Spring Boot", img: SiSpring, ct: "be" },
  { label: "Express", img: SiExpress, ct: "be" },
  { label: "Flask", img: SiFlask, ct: "be" },
  { label: "Django", img: SiDjango, ct: "be" },
  { label: "Laravel", img: SiLaravel, ct: "be" },
  { label: ".NET", img: SiDotnet, ct: "be" },

  // Frontend Frameworks
  { label: "React / Native", img: SiReact, ct: "fe" },
  { label: "Flutter", img: SiFlutter, ct: "fe" },
  { label: "Angular", img: SiAngular, ct: "fe" },
  { label: "TailwindCSS", img: SiTailwindcss, ct: "fe" },

  // Databases
  { label: "MySQL", img: SiMysql, ct: "be" },
  { label: "MongoDB", img: SiMongodb, ct: "be" },

  // Cloud Services
  { label: "AWS", img: SiAmazon, ct: "cd" },
  { label: "Firebase", img: SiFirebase, ct: "cd" },
  { label: "Azure", img: "", ct: "cd" },

  // Languages
  { label: "JavaScript", img: SiJavascript, ct: "lang" },
  { label: "TypeScript", img: SiTypescript, ct: "lang" },
  { label: "Python", img: SiPython, ct: "lang" },
  { label: "Java", img: "", ct: "lang" },
  { label: "PHP", img: SiPhp, ct: "lang" },
  { label: "C#", img: "", ct: "lang" },
  { label: "Dart", img: SiDart, ct: "lang" },
  { label: "Kotlin", img: SiKotlin, ct: "lang" },
];

export const themes = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

export const fonts = [
  {
    label: "Mono",
    value: "font-mono",
  },
  {
    label: "Inter",
    value: "font-inter",
  },
  {
    label: "Roboto",
    value: "font-roboto",
  },
  {
    label: "Lora",
    value: "font-lora",
  },
];

export const mobileMenu = [
  { label: "Home", icon: SiHomepage, url: "/" },
  { label: "Works", icon: SiHomepage, url: "#works" },
  { label: "Message", icon: SiHomepage, url: "#message" },
  { label: "Blog", icon: SiHomepage, url: "/blogs" },
];

export const socials = [
  {
    icon: SiLinkedin,
    url: "https://www.linkedin.com/in/nadun-malwenna",
  },
  {
    icon: SiX,
    url: "https://x.com/HewageNKM",
  },
  {
    icon: SiGithub,
    url: "https://github.com/HewageNKM",
  },
];
// Static project data based on the provided links
export const initialProjectsData: ProjectItem[] = [
  {
    id: "neverbe-erp",
    title: "NEVERBE-ERP",
    description:
      "An enterprise resource planning (ERP) system designed to streamline business processes and improve operational efficiency.",
    githubUrl: "https://github.com/HewageNKM/NEVERBE-ERP",
    //liveUrl: "https://your-neverbe-erp-live-url.com",
    technologies: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: "never-panel",
    title: "NEVER-PANEL",
    description:
      "A versatile administrative panel for managing applications, users, and system settings with a clean interface.",
    githubUrl: "https://github.com/HewageNKM/NEVER-PANEL",
    //liveUrl: "https://your-never-panel-live-url.com",
    technologies: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "This very website, designed to showcase my skills, projects, and journey as a developer.",
    githubUrl: "https://github.com/HewageNKM/hewagenkm.github.io", // Assuming this is the repo
    liveUrl: "https://hewagenkm.com", // Current site
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "term-deposit-prediction",
    title: "Term Deposit Prediction Model",
    description:
      "A machine learning model developed to predict the likelihood of bank clients subscribing to term deposits, aiding in targeted marketing campaigns.",
    githubUrl: "https://github.com/HewageNKM/Term-Deposit-Prediction-Model",
    // liveUrl: "https://your-ml-model-demo-url.com",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Jupyter Notebook",
      "AWS",
    ],
  },
  {
    id: "nev",
    title: "NEVERBE-WEB",
    description:
      "NeverBe is an e‑commerce platform based in Delgoda, Sri Lanka, specializing in high-quality replica sneakers and accessories from top global brands like Nike, adidas, and New Balance. With fast domestic shipping and a focus on affordability, it has become a go-to for sneaker enthusiasts seeking both style and value.",
    githubUrl: "https://github.com/HewageNKM/NEV",
    liveUrl: "https://neverbe.lk",
    technologies: ["NEXT.js", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    id: "hwaytickets-erbe-web",
    title: "HWayTickets",
    description:
      "An online ticket purchasing system developed using Spring Boot and a microservices architecture. The platform enables users to search, book, and manage tickets efficiently while ensuring scalability, maintainability, and service isolation.",
    githubUrl: "https://github.com/HewageNKM/HWayTicketsERBE-WEB",
    // liveUrl: "https://your-hwaytickets-live-url.com",
    technologies: ["Spring Boot", "Microservice", "MySQL"],
  },
  {
    id: "vaive",
    title: "VAIVE",
    description:
      "VAIVE is a collaborative platform aimed at promoting mental well-being through AI-driven chat support, self-assessment tools, and personalized wellness resources.",
    githubUrl: "https://github.com/HewageNKM/VAIVE",
    // liveUrl: "https://your-vaive-live-url.com", // Replace if available
    technologies: ["React Native", "Nativewind", "AppWrite", "AI APIs"],
  },
    {
    id: "hpos",
    title: "HPOS",
    description:
      "HSPos-Server is a backend service for managing and processing point-of-sale operations. Built using Spring Boot, it provides a REST API to handle inventory, transactions, receipts, and user management. The server persists data in MySQL, employs JWT authentication. Deployed and hosted on AWS Elastic Beastalk.",
    githubUrl: "https://github.com/HewageNKM/HSPos-Server",
    // liveUrl: "https://your-vaive-live-url.com", // Replace if available
    technologies: ["JQuery", "CSS", "HTML", "Spring Boot"],
  },
];

export const experiences = [
  {
    role: "Associate Software Engineer",
    company: "DSM IT PVT LTD",
    duration: "April 2025 - Present",
    description: [
      "Developing and maintaining web applications using modern technologies.",
      "Collaborating with cross-functional teams to define, design, and ship new features.",
      "Contributing to all phases of the development lifecycle.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "Sentura Technologies",
    duration: "August 2024 - March 2025",
    description: [
      "Developed responsive UI components using React and TypeScript.",
      "Worked closely with designers to ensure design fidelity and performance.",
      "Optimized front-end performance and maintained component libraries.",
    ],
  },
];

export const defaultFont = "font-mono";
export const defaultTheme = "light";
