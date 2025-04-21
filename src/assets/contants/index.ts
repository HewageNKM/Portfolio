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
  SiGo,
  SiTailwindcss,
  SiKotlin,
  SiDart,
} from "react-icons/si";

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
  { label: "Go", img: SiGo, ct: "lang" },
  { label: "Dart", img: SiDart, ct: "lang" },
  { label: "Kotlin", img: SiKotlin, ct: "lang" },
];
