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
  {label:"Dark",value:"dark"},
  {label:"Light",value:"light"},
]

export const fonts = [
  {
    label: "Mono",
    value:"font-mono"
  },
  {
    label: "Inter",
    value:"font-inter"
  },
  {
    label: "Roboto",
    value:"font-roboto"
  },
  {
    label: "Lora",
    value:"font-lora"
  }
]

export const mobileMenu = [
  {label:'Home',icon:SiHomepage,url:"/"},
  {label:'Works',icon:SiHomepage,url:"#works"},
  {label:'Message',icon:SiHomepage,url:"#message"},
  {label:'Blog',icon:SiHomepage,url:"/blogs"}
]

export const socials = [
  {
    icon:SiLinkedin,
    url:"https://www.linkedin.com/in/nadun-malwenna"
  },
  {
    icon:SiX,
    url:"https://x.com/HewageNKM"
  },
  {
    icon:SiGithub,
    url:"https://github.com/HewageNKM"
  },
]
// Static project data based on the provided links
export const initialProjectsData: ProjectItem[] = [
  {
    id: "neverbe-erp",
    title: "NEVERBE-ERP",
    description:
      "An enterprise resource planning (ERP) system designed to streamline business processes and improve operational efficiency.",
    githubUrl: "https://github.com/HewageNKM/NEVERBE-ERP",
    //liveUrl: "https://your-neverbe-erp-live-url.com", // Replace with actual live URL
    technologies: ["Next.js", "Firebase", "Tailwind CSS"], // Example: Uncomment and add technologies
  },
  {
    id: "never-panel",
    title: "NEVER-PANEL",
    description:
      "A versatile administrative panel for managing applications, users, and system settings with a clean interface.",
    githubUrl: "https://github.com/HewageNKM/NEVER-PANEL",
    //liveUrl: "https://your-never-panel-live-url.com", // Replace with actual live URL
    technologies: ["Next.js", "Firebase", "Tailwind CSS"], // Example
  },
  {
    id: "term-deposit-prediction",
    title: "Term Deposit Prediction Model",
    description:
      "A machine learning model developed to predict the likelihood of bank clients subscribing to term deposits, aiding in targeted marketing campaigns.",
    githubUrl: "https://github.com/HewageNKM/Term-Deposit-Prediction-Model",
    // liveUrl: "https://your-ml-model-demo-url.com", // No obvious live demo for an ML model usually, but can be added if exists
    technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter Notebook"], // Example
  },
  {
    id: "nev",
    title: "NEVERBE-WEB",
    description:
      "A modern platform to explore unique places, events, and businesses in Sri Lanka. Built with a responsive design and scalable architecture, it offers an engaging user experience and streamlined content discovery.",
    githubUrl: "https://github.com/HewageNKM/NEV",
    liveUrl: "https://neverbe.lk", // Assuming this is your portfolio site itself
    technologies: ["NEXT.js", "TypeScript", "Tailwind CSS", "Firebase"], // Example
  },
  {
    id: "hwaytickets-erbe-web",
    title: "HWayTickets",
    description:
      "An online ticket purchasing system developed using Spring Boot and a microservices architecture. The platform enables users to search, book, and manage tickets efficiently while ensuring scalability, maintainability, and service isolation.",
    githubUrl: "https://github.com/HewageNKM/HWayTicketsERBE-WEB",
    // liveUrl: "https://your-hwaytickets-live-url.com", // Replace with actual live URL if available
    technologies: ["HTML", "CSS", "JavaScript", "Spring Boot"],
  },
];

export const defaultFont = "font-mono";
export const defaultTheme = "light";