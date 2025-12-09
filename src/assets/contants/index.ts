import { SiHomepage, SiLinkedin, SiX, SiGithub } from "react-icons/si";

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
