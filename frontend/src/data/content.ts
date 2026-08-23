export const profile = {
  firstName: "Sathuryan",
  lastName: "Ezhilarasi",
  fullName: "Sathuryan Ezhilarasi",
  role: "Software Engineer",
  headline: "Frontend Engineer",
  location: "Al Rashidiya, Dubai, UAE",
  email: "ezhilarasisiva15@gmail.com",
  phone: "+971 56 865 7207",
  phoneHref: "tel:+971568657207",
  github: "https://github.com/Sathuezhil",
  githubHandle: "Sathuezhil",
  availability: "Open to frontend and full-stack roles",
  summary:
    "Frontend developer with hands-on experience building responsive, user-friendly web applications using React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, and Material UI. Experienced in API integration and modern UI systems, with additional practice in Node.js, Laravel, and MySQL. I care about clean interfaces, reliable delivery, and products that feel easy to use.",
  stats: [
    { value: "1.5+", label: "Years in production" },
    { value: "10+", label: "Shipped systems" },
    { value: "2", label: "Companies" },
    { value: "DE + LK", label: "Client markets" },
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const techMarquee = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Material UI",
  "Laravel",
  "PHP",
  "MySQL",
  "MongoDB",
  "Node.js",
  "Vite",
  "GitHub",
  "UI / UX",
];

export const experience = [
  {
    company: "Jyothis ICT Zone (Pvt) Ltd",
    role: "Frontend Engineer",
    period: "Jun 2025 — Aug 2026",
    location: "International / Germany clients",
    summary:
      "Designed and shipped ERP and POS front ends for bakery, restaurant, catering, wholesale, and e-commerce operations — focusing on sales, inventory, kitchen flow, and customer engagement.",
    highlights: [
      "Mr. Baker ERP & POS — sales, inventory, and customer orders for a German bakery.",
      "Pizza Casa ERP — restaurant workflows covering orders, kitchen coordination, and delivery.",
      "Kayser Catering ERP — meal planning, daily orders, and delivery for school catering.",
      "Wholesale ERP — bulk orders, stock, invoicing, and supplier coordination.",
      "Spare Market — React + TypeScript e-commerce with catalog, cart, orders, and accounts.",
      "Zono Vision — Next.js marketing platform for multi-business campaigns.",
      "Nambikkai Nithiyam — Tamil charity site for education scholarships and member services.",
    ],
  },
  {
    company: "Binary Software Solutions Pvt Ltd",
    role: "Frontend Developer",
    period: "Dec 2024 — Jun 2025",
    location: "Sri Lanka",
    summary:
      "Built clean, responsive React interfaces for small-scale web products and led the frontend of Subash Bakery’s ERP, keeping modules consistent on desktop and mobile.",
    highlights: [
      "Subash Bakery ERP — intuitive module UX for bakery operations in Sri Lanka.",
      "Delivered modern UI with CSS and Material UI across multiple React websites.",
      "Owned mobile compatibility and consistent component patterns.",
    ],
  },
];

export const independentWork = {
  company: "Independent",
  role: "Full-stack developer",
  period: "2026",
  location: "Sri Lanka",
  summary:
    "Taken on independently — not through an employer. I owned the product end to end: frontend, backend, database, auth, and deployment.",
  highlights: [
    "SS Studio — full-stack Laravel, PHP, and MySQL studio application.",
  ],
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  stack: string[];
  href: string | null;
  github: string | null;
  featured: boolean;
  independent?: boolean;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "zono-vision",
    title: "Zono Vision Marketing",
    client: "Germany",
    year: "2026",
    stack: ["React", "Next.js"],
    href: "https://www.zonovision.de/technology",
    github: null,
    featured: true,
    description:
      "Company-focused marketing management system built to plan, manage, and optimize campaigns across multiple businesses.",
  },
  {
    slug: "ss-studio",
    title: "SS Studio Web App",
    client: "Independent",
    year: "2026",
    stack: ["Laravel", "PHP", "MySQL"],
    href: "https://ssstudio.lk/",
    github: "https://github.com/Sathuezhil/SS-Studio",
    featured: true,
    independent: true,
    description:
      "Personal full-stack studio platform I built on my own — frontend, backend, database design, APIs, authentication, and core booking workflows.",
  },
  {
    slug: "spare-market",
    title: "Spare Market",
    client: "Germany",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind"],
    href: null,
    github: null,
    featured: true,
    description:
      "Responsive e-commerce storefront with categories, product browsing, cart, orders, accounts, addresses, and auth.",
  },
  {
    slug: "mr-baker",
    title: "Mr Baker ERP & POS",
    client: "Germany",
    year: "2025",
    stack: ["React", "Vite", "MUI"],
    href: null,
    github: "https://github.com/Sathuezhil/MrBaker-Pos",
    featured: true,
    description:
      "Bakery operations suite for sales processing, inventory tracking, and a visually clear POS interface.",
  },
  {
    slug: "jyothis",
    title: "Jyothis ICT Zone",
    client: "Company site",
    year: "2025",
    stack: ["React", "Next.js"],
    href: "https://jyothisictzone.com/",
    github: null,
    featured: false,
    description:
      "Corporate site for an ICT firm delivering integrated business-management and digital-transformation products.",
  },
  {
    slug: "nambikkai-nithiyam",
    title: "Nambikkai Nithiyam",
    client: "Jyothis ICT Zone",
    year: "2025",
    stack: ["React", "Netlify"],
    href: "https://charitytestinguser.netlify.app/",
    github: null,
    featured: true,
    description:
      "Charity website for a Tamil education fund — members can browse scholarships and services, with a separate admin console for day-to-day operations.",
  },
  {
    slug: "liquor-pos",
    title: "Liquor POS",
    client: "Retail",
    year: "2026",
    stack: ["JavaScript", "React"],
    href: "https://liquorpos-mu.vercel.app/login",
    github: "https://github.com/Sathuezhil/liquorpos",
    featured: false,
    description:
      "Point-of-sale application for liquor retail, covering login, sales, and day-to-day counter operations.",
  },
  {
    slug: "pizza-casa",
    title: "Pizza Casa ERP",
    client: "Germany",
    year: "2025",
    stack: ["React", "UI/UX"],
    href: null,
    github: null,
    featured: false,
    description:
      "Restaurant ERP modules for order processing, kitchen coordination, and delivery integration.",
  },
  {
    slug: "kayser-catering",
    title: "Kayser Catering ERP",
    client: "Germany",
    year: "2025",
    stack: ["React", "ERP"],
    href: null,
    github: null,
    featured: false,
    description:
      "School catering frontend for meal planning, daily order management, and delivery coordination.",
  },
  {
    slug: "backpunkt",
    title: "Backpunkt Management",
    client: "Germany",
    year: "2025",
    stack: ["React", "Vite"],
    href: null,
    github: null,
    featured: false,
    description:
      "Modern web-based management system for Mr. Baker operations, built with React and Vite.",
  },
  {
    slug: "subash-bakery",
    title: "Subash Bakery ERP",
    client: "Sri Lanka",
    year: "2025",
    stack: ["React", "MUI"],
    href: null,
    github: "https://github.com/Sathuezhil/bakery",
    featured: false,
    description:
      "Frontend for a bakery ERP, designed so staff can move through modules without friction.",
  },
];

export const academicProjects = [
  {
    title: "Tourism Website",
    stack: "JavaScript, HTML, CSS",
    description:
      "Interactive travel experience for exploring destinations and services.",
  },
  {
    title: "Royal Book Shop",
    stack: "Java",
    description: "Bookstore operations with inventory and sales management.",
  },
  {
    title: "Clinic Time-Slot Reservation",
    stack: "Java",
    description:
      "Appointment booking that allocates slots for patients and providers.",
  },
  {
    title: "Coffee Haven",
    stack: "UI / UX",
    description:
      "Warm coffee-shop design for browsing, ordering, and enjoying a menu.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML / CSS",
      "Tailwind CSS",
      "Material UI",
      "Vite",
    ],
  },
  {
    title: "Backend & data",
    items: ["Laravel", "PHP", "Node.js", "MySQL", "MongoDB", "REST APIs"],
  },
  {
    title: "Product & craft",
    items: [
      "UI / UX",
      "Responsive design",
      "API integration",
      "GitHub",
      "Fast delivery",
      "Leadership",
    ],
  },
];

export const education = [
  {
    title: "HND in Software Engineering",
    school: "British College of Applied Studies",
    period: "2023 — 2024",
  },
  {
    title: "Diploma in Spoken English",
    school: "Greenwich Academy, Kandy",
    period: "2022 — 2023",
  },
  {
    title: "GCE Advanced Level — Biological Stream",
    school: "Jaffna Methodist Girls’ High School",
    period: "2022 (2021)",
  },
];

export const languages = [
  { name: "Tamil", level: "Native" },
  { name: "English", level: "Professional" },
];
