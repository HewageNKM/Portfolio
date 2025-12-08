import {
  SiSpring,
  SiReact,
  SiFlutter,
  SiAmazon,
  SiJavascript,
  SiHomepage,
  SiLinkedin,
  SiX,
  SiGithub,
} from "react-icons/si";

export const services = [
  {
    icon: SiReact,
    title: "Web Development",
    description:
      "Crafting responsive and dynamic web applications using modern technologies.",
    color: "#61DAFB", // React Cyan
    items: [
      "Frontend (React, Angular, Next.js)",
      "Backend (Node.js, Django, Laravel)",
      "Databases (MySQL, MongoDB, PostgreSQL)",
    ],
  },
  {
    icon: SiFlutter,
    title: "Mobile App Development",
    description:
      "Building intuitive and high-performance mobile applications using modern technologies.",
    color: "#02569B", // Flutter Blue
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
    color: "#FF9900", // AWS Orange
    items: [
      "Cloud Platforms (AWS, Google Cloud, Azure)",
      "CI/CD (GitHub Actions, Jenkins)",
      "Containerization (Docker)",
    ],
  },
  {
    icon: SiSpring,
    title: "API Development & Integration",
    description:
      "Creating and integrating RESTful APIs for seamless communication between systems.",
    color: "#6DB33F", // Spring Green
    items: [
      "RESTful API Design",
      "Third-party API Integration",
      "Microservices Architecture",
    ],
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

export const MenuItems = [
  { label: "Home", icon: SiHomepage, url: "/" },
  { label: "Projects", icon: SiHomepage, url: "/projects" },
  { label: "Blogs", icon: SiHomepage, url: "/blogs" },
  {
    label: "Resume",
    icon: SiHomepage,
    url: "https://registry.jsonresume.org/HewageNKM",
  },
  { label: "Guestbook", icon: SiHomepage, url: "/guestbook" },
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

export const defaultFont = "font-mono";
export const defaultTheme = "white";
