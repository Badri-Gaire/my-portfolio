import wrappersStore from "../assets/images/projects/wrappers-store.webp";
import wrappersPortals from "../assets/images/projects/wrappers-portals.webp";
import letsdoPortal from "../assets/images/projects/letsdo-portal.webp";

export const projectsData = [
  {
    title: "Wrappers Wrap",
    description: "An eCommerce website focused on selling mobile covers with a modern, responsive, and user-friendly shopping experience.",
    link: "https://www.wrapperswrap.com/",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    image: wrappersStore,
  },
  {
    title: "Wrappers Wrap Portal",
    description: "An admin panel for managing products, orders, and content of the Wrappers Wrap eCommerce platform.",
    link: "#",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    image: wrappersPortals,
  },
  {
    title: "Letsdo Portal",
    description: "A powerful admin portal for managing the Letsdo multi-tenant eCommerce system, providing advanced controls and company-level features.",
    link: "#",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    image: letsdoPortal,
  },
];

export default projectsData;
