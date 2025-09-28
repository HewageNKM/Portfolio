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
  SiSqlite,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { ProjectItem } from "../../pages/Projects";
export const stacks = [
  // Backend Frameworks
  { label: "Spring Boot", img: SiSpring, ct: ["be"] },
  { label: "Express", img: SiExpress, ct: ["be"] },
  { label: "Flask", img: SiFlask, ct: ["be"] },
  { label: "Django", img: SiDjango, ct: ["be"] },
  { label: "Laravel", img: SiLaravel, ct: ["be"] },
  { label: ".NET", img: SiDotnet, ct: ["be"] },

  // Frontend Frameworks
  { label: "React / Native", img: SiReact, ct: ["fe", "mob"] },
  { label: "Flutter", img: SiFlutter, ct: ["fe", "mob"] },
  { label: "Angular", img: SiAngular, ct: ["fe"] },
  { label: "TailwindCSS", img: SiTailwindcss, ct: ["fe"] },

  // Databases
  { label: "MySQL", img: SiMysql, ct: ["be"] },
  { label: "MongoDB", img: SiMongodb, ct: ["be"] },
  { label: "SQLite", img: SiSqlite, ct: ["be", "mob"] },
  // Cloud Services
  { label: "AWS", img: SiAmazon, ct: ["cd"] },
  { label: "Firebase", img: SiFirebase, ct: ["cd"] },
  { label: "Azure", img: "", ct: ["cd"] },

  // Languages
  { label: "JavaScript", img: SiJavascript, ct: ["lang"] },
  { label: "TypeScript", img: SiTypescript, ct: ["lang"] },
  { label: "Python", img: SiPython, ct: ["lang"] },
  { label: "Java", img: "", ct: ["lang"] },
  { label: "PHP", img: SiPhp, ct: ["lang"] },
  { label: "C#", img: "", ct: ["lang"] },
  { label: "Dart", img: SiDart, ct: ["lang", "mob"] },
  { label: "Kotlin", img: SiKotlin, ct: ["lang", "mob"] },
  { label: "HTML", img: SiHtml5, ct: ["lang"] },
  { label: "CSS", img: SiCss3, ct: ["lang"] },
  { label: "SQL", img: "", ct: ["lang"] },
];

export const services = [
  {
    icon: SiReact,
    title: "Web Development",
    description:
      "Crafting responsive and dynamic web applications using modern frontend and backend technologies.",
    items: [
      "Frontend Development (React, Angular, Next.js)",
      "Backend Development (Spring Boot, Node.js, Django, Laravel)",
      "Database Management (MySQL, MongoDB, PostgreSQL)",
    ],
  },
  {
    icon: SiFlutter,
    title: "Mobile App Development",
    description:
      "Building intuitive and high-performance mobile applications for various platforms.",
    items: [
      "Cross-Platform (React Native, Flutter)",
      "Native Android (Kotlin, Java)",
    ],
  },
  {
    icon: SiAmazon,
    title: "Cloud Services & DevOps",
    description:
      "Deploying and managing applications on cloud platforms with robust CI/CD pipelines.",
    items: [
      "Cloud Platforms (AWS, Firebase, Azure)",
      "CI/CD (GitHub Actions, Jenkins)",
      "Containerization (Docker)",
    ],
  },
  {
    icon: SiSpring,
    title: "API Development & Integration",
    description:
      "Creating and integrating RESTful APIs for seamless communication between systems.",
    items: [
      "RESTful API Design",
      "Third-party API Integration",
      "Microservices Architecture",
    ],
  },
  {
    icon: SiJavascript,
    title: "Technical Writing & Documentation",
    description:
      "Producing clear, concise, and comprehensive technical documentation.",
    items: ["API Documentation", "User Manuals", "System Design Documents"],
  },
];

export const educations = [
  {
    degree: "BSc in Software Engineering",
    institution: "Kingston University, London Offerd by ESOFT UNI",
    duration: "2025 - 2026 (Expected)",
    details: [
      "Specialized in software development, algorithms, and system design.",
      "Completed projects in web and mobile application development.",
      "Active member of the coding club and tech community.",
    ],
    gpa: "Pending",
  },
  {
    degree: "Higher National Diploma in Software Engineering",
    institution: "Institute of Software Engineering (ISE)",
    duration: "2022 - 2025",
    details: [
      "Focused on practical software engineering skills and project management.",
      "Gained hands-on experience with various programming languages and frameworks.",
      "Collaborated on team projects simulating real-world software development scenarios.",
    ],
    gpa: "3.27/4.0",
  },
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
export const achievements = [
  {
    title: "IBM Full Stack Software Developer Certificate",
    description:
      "Successfully completed the professional certificate program on Coursera, gaining expertise in cloud computing, frontend, backend, DevOps, and full-stack development practices.",
    date: "2025", // You can replace with exact completion date
    issuer: "Coursera & IBM",
    link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer", // Optional: your certificate link
  },
];

export const MenuItems = [
  { label: "Home", icon: SiHomepage, url: "/" },
  { label: "Works", icon: SiHomepage, url: "/projects" },
  { label: "Blogs", icon: SiHomepage, url: "/blogs" },
  {
    label: "Resume",
    icon: SiHomepage,
    url: "https://registry.jsonresume.org/HewageNKM",
  },
  { label: "Contact", icon: SiHomepage, url: "/contact" },
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
export const defaultTheme = "white";
