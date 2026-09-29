export const siteCopy = {
  heroIntro:
    "Full Stack Engineer in Dubai. I design and ship production interfaces for ERP, POS, and customer-facing products — with React, Next.js, and a careful eye for detail.",
  photoTagline: "React · Next.js · Laravel",
  aboutHeading: "Building interfaces people can actually work with.",
  aboutSummary:
    "Full-stack engineer with hands-on experience building responsive, user-friendly web applications using React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, and Material UI. Experienced in API integration and modern UI systems, with additional practice in Node.js, Laravel, and MySQL. I care about clean interfaces, reliable delivery, and products that feel easy to use.",
  experienceHeading: "Production work across bakeries, restaurants, and retail systems.",
  workHeading: "Products shipped for Germany and Sri Lanka.",
  workIntro: "Independent builds, plus ERP, POS, and marketing systems for clients.",
  skillsHeading: "Web, mobile, and the backend that connects them.",
  educationHeading: "Foundations.",
  contactHeading: "Let’s build the next interface together.",
  contactIntro:
    "Available for full-stack and product-engineering roles in Dubai and remote teams. Messages go to my inbox — I’ll reply by email.",
  servicesHeading: "What I can do for you.",
  servicesIntro:
    "Short engagements or a full-time seat. I build the whole product — web and mobile apps, the APIs behind them, and the database underneath.",
  nowHeading: "Available now.",
  nowStatus: "Open to offers",
  nowStart: "Can start immediately",
  nowType: "Full-time or contract",
  nowWhere: "Dubai onsite · remote teams",
};

export const services = [
  {
    title: "Web applications",
    summary:
      "Full-stack web apps with React and Next.js on the front, Laravel or Node.js behind, and admin dashboards your team can run day to day.",
  },
  {
    title: "Mobile apps",
    summary:
      "Cross-platform iOS and Android apps with React Native and Expo, sharing the same APIs and data as your web product.",
  },
  {
    title: "APIs & backend",
    summary:
      "REST APIs, database design in MySQL or MongoDB, authentication, and integrations — built to stay reliable as usage grows.",
  },
  {
    title: "ERP & POS systems",
    summary:
      "Sales, inventory, kitchen, and counter modules for bakeries, restaurants, and retail — built for real shift work.",
  },
];

export type SiteCopy = typeof siteCopy;

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

export type EditableProfile = {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  availability: string;
};

export type SiteContent = {
  profile: EditableProfile;
  copy: SiteCopy;
  projects?: Project[];
};

export const profile = {
  firstName: "Sathuryan",
  lastName: "Ezhilarasi",
  fullName: "Sathuryan Ezhilarasi",
  role: "Full Stack Engineer",
  headline: "Full Stack Engineer",
  location: "Al Rashidiya, Dubai, UAE",
  email: "ezhilarasisiva15@gmail.com",
  phone: "+971 56 865 7207",
  phoneHref: "tel:+971568657207",
  whatsapp: "https://wa.me/971568657207",
  linkedin: "https://www.linkedin.com/in/sathuryan-ezhilarasi-999928333",
  github: "https://github.com/Sathuezhil",
  githubHandle: "Sathuezhil",
  availability: "Open to full-stack roles",
  summary: siteCopy.aboutSummary,
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
  { href: "#services", label: "Services" },
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
      "Website for SS Studio, a photography studio in Trincomalee. A cinematic hero slider, services for wedding, model, puberty, baby, and maternity shoots, a category-filtered gallery, highlight videos, the founder's story, and a contact form linked to WhatsApp, social channels, and Google Maps.",
  },
  {
    slug: "moodly",
    title: "Moodly",
    client: "Independent",
    year: "2026",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    href: "https://moodtrackerss.netlify.app/",
    github: "https://github.com/Sathuezhil/moodtracker",
    featured: false,
    independent: true,
    description:
      "A daily mood tracker for checking in on how you feel. Log a mood, write journal entries and sticky notes, save memories, tick off self-care habits, and follow streaks, badges, and weekly insights on a calendar.",
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
    title: "Mobile",
    items: ["React Native", "Expo", "iOS & Android", "Mobile UI"],
  },
  {
    title: "Backend & data",
    items: [
      "Laravel",
      "PHP",
      "Node.js",
      "REST APIs",
      "MySQL",
      "MongoDB",
      "Authentication",
      "Database design",
    ],
  },
  {
    title: "Product & delivery",
    items: [
      "UI / UX",
      "Responsive design",
      "API integration",
      "Git & GitHub",
      "Netlify deployment",
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
