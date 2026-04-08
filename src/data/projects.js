import paps from "../assets/images/projects/website/paps.webp";
import nueva from "../assets/images/projects/website/nueva.webp";
import clinic from "../assets/images/projects/website/clinic.webp";
import nuevaCare1 from "../assets/images/projects/website/nuevacare/care1.webp";
import nuevaCare2 from "../assets/images/projects/website/nuevacare/care2.webp";
import nuevaCare3 from "../assets/images/projects/website/nuevacare/care3.webp";
import nuevaCare4 from "../assets/images/projects/website/nuevacare/care4.webp";
import nuevaCare5 from "../assets/images/projects/website/nuevacare/care5.webp";
import nuevaCare6 from "../assets/images/projects/website/nuevacare/care6.webp";
import nuevaCare7 from "../assets/images/projects/website/nuevacare/care7.webp";
import nuevaCare8 from "../assets/images/projects/website/nuevacare/care8.webp";
import nuevaCare9 from "../assets/images/projects/website/nuevacare/care9.webp";
import nuevaCare10 from "../assets/images/projects/website/nuevacare/care10.webp";
import nuevaCare11 from "../assets/images/projects/website/nuevacare/care11.webp";
import pos from "../assets/images/projects/website/pos.webp";
import smartfit from "../assets/images/projects/website/smartfit.webp";
import fixit from "../assets/images/projects/website/fixit.webp";
import hydro from "../assets/images/projects/iot/hydro.webp";
import champion from "../assets/images/projects/iot/champion.webp";
import quail from "../assets/images/projects/iot/quail.webp";
import sfads from "../assets/images/projects/iot/sfads.webp";

export const projects = [
  {
    slug: "nuevacare-clinic",
    title: "NuevaCare Clinic",
    type: "Web App / Case Study",
    category: "Web Dev",
    summary:
      "A modern healthcare website with 3D object and chatbot integration for appointment scheduling and patient support.",
    image: clinic,
    gallery: [
      nuevaCare1,
      nuevaCare2,
      nuevaCare3,
      nuevaCare4,
      nuevaCare5,
      nuevaCare6,
      nuevaCare7,
      nuevaCare8,
      nuevaCare9,
      nuevaCare10,
      nuevaCare11,
    ],
    goals: [
      "Improve patient trust with a modern visual system",
      "Simplify appointment booking via a guided flow",
      "Offer 24/7 answers through chatbot support",
    ],
    deliverables: [
      "Responsive web app UI",
      "Chatbot integration with pre-built model",
      "Content system for services and doctors",
    ],
    story: [
      "NuevaCare needed a friendly, tech-forward presence that felt credible and calming. The project started with UX mapping to reduce friction for first-time visitors.",
      "We combined a clean design system with interactive elements to communicate trust. The chatbot and booking flow were built to answer common questions and convert visits into scheduled appointments.",
    ],
    website: "https://nuevacare-clinic.com",
    tools: ["React", "Vite", "Tailwind CSS", "GSAP", "Figma"],
    involvement:
      "Led end-to-end UI design and front-end build, from wireframes to responsive implementation and motion polish.",
    approach: [
      "We started by mapping the patient journey to reduce friction across discovery, services, and booking. Content hierarchy was shaped around immediate trust signals like credentials, service clarity, and clinic credibility.",
      "From there, we built a modular UI system that keeps the experience calm and modern while supporting interactive elements like the chatbot and guided booking flow.",
    ],
    featured: true,
  },
  {
    slug: "sweetcrumbs-pos",
    title: "SweetCrumbs POS/Inventory System",
    type: "Web App / Case Study",
    category: "Web Dev",
    summary:
      "A user-friendly POS and inventory management system built with React, Node.js, and MySQL.",
    image: pos,
    gallery: [pos],
    goals: [
      "Reduce checkout time for staff",
      "Track inventory in real time",
      "Provide simple daily sales reports",
    ],
    deliverables: [
      "POS dashboard with quick actions",
      "Inventory and supplier modules",
      "Sales reporting with export",
    ],
    story: [
      "SweetCrumbs relied on manual tracking and paper receipts. We mapped their flow and designed a POS experience that mirrors how staff already work.",
      "The system integrates inventory updates with every sale, keeping counts accurate without extra steps and producing clear, daily performance reports.",
    ],
    featured: true,
  },
  {
    slug: "smartfit",
    title: "SmartFit",
    type: "Landing Page / WordPress",
    category: "Web Dev",
    summary:
      "A WordPress landing page for a fitness brand, focused on fast content updates and campaign performance.",
    image: smartfit,
    gallery: [smartfit],
    goals: [
      "Launch quickly for marketing campaigns",
      "Enable non-technical content updates",
      "Drive conversions with clear CTAs",
    ],
    deliverables: [
      "WordPress landing page",
      "Reusable section templates",
      "Performance-optimized layout",
    ],
    story: [
      "SmartFit needed a strong campaign page that could be updated in-house. We prioritized speed, clarity, and conversion-focused sections.",
      "The result is a flexible landing page that supports rapid updates without sacrificing design consistency.",
    ],
    featured: true,
  },
  {
    slug: "fixit",
    title: "FixIt",
    type: "Web App / Capstone Project",
    category: "Web Dev",
    summary:
      "A React-based platform connecting blue-collar workers with clients, including job listings, profiles, and messaging.",
    image: fixit,
    gallery: [fixit],
    goals: [
      "Match clients with verified workers",
      "Make job requests simple and fast",
      "Support safe in-app messaging",
    ],
    deliverables: [
      "Client and worker profiles",
      "Job listing and booking flow",
      "Secure messaging module",
    ],
    story: [
      "FixIt was built to reduce friction in finding trusted service providers. We focused on clear listings, simple profiles, and easy communication.",
      "The platform uses familiar patterns so both clients and workers can onboard quickly and start transacting with confidence.",
    ],
    featured: true,
  },
  {
    slug: "paps-barbershop",
    title: "PAPS Barbershop",
    type: "Web App",
    category: "Web Dev",
    summary:
      "A sharp, brand-forward web app that highlights services, pricing, and booking details.",
    image: paps,
    gallery: [paps],
    goals: [
      "Showcase services and pricing clearly",
      "Reinforce the barbershop brand",
      "Encourage repeat bookings",
    ],
    deliverables: [
      "Service catalog",
      "Brand-focused UI",
      "Mobile-first layout",
    ],
    story: [
      "PAPS needed a clean digital presence that reflects their in-shop experience. We used bold typography and focused sections to keep it simple and memorable.",
    ],
  },
  {
    slug: "nueva-insights-marketing",
    title: "Nueva Insights Marketing",
    type: "Website",
    category: "Web Dev",
    website: "https://nuevainsightsmarketing.com/",
    summary:
      "A modern marketing site emphasizing credibility, results, and clear service offerings.",
    image: nueva,
    gallery: [nueva],
    goals: [
      "Communicate services in seconds",
      "Build trust with a clean layout",
      "Support lead generation",
    ],
    deliverables: ["Service overview", "Case-driven storytelling", "Lead CTA"],
    story: [
      "The site presents the agency's value quickly, using a clean grid, bold sectioning, and proof-driven messaging to encourage outreach.",
    ],
  },
  {
    slug: "solar-powered-arduino-irrigation",
    title: "Solar-Powered Arduino-Based Automated Irrigation System",
    type: "Arduino",
    category: "IoT",
    summary:
      "An Arduino system that automates irrigation using solar power and sensor-driven scheduling.",
    image: hydro,
    gallery: [hydro],
    goals: [
      "Automate irrigation using sensor data",
      "Reduce water waste",
      "Enable low-cost deployment",
    ],
    deliverables: [
      "Sensor logic",
      "Solar power integration",
      "Automation control",
    ],
    story: [
      "Built for small farms, this project combines solar energy with soil monitoring to automate watering without constant supervision.",
    ],
  },
  {
    slug: "automated-irrigation-monitoring-app",
    title:
      "Solar Powered Automated Irrigation System for Farmers with Monitoring App",
    type: "IoT",
    category: "IoT",
    summary:
      "A solar-powered irrigation system with a monitoring app to track performance and usage.",
    image: champion,
    gallery: [champion],
    goals: [
      "Provide real-time monitoring",
      "Enable remote oversight",
      "Improve irrigation consistency",
    ],
    deliverables: [
      "Mobile monitoring interface",
      "Telemetry tracking",
      "System status alerts",
    ],
    story: [
      "The monitoring app gives farmers visibility into system performance while the automated controller handles daily irrigation tasks.",
    ],
  },
  {
    slug: "sfads-smart-feeding-system",
    title:
      "SFADS – Smart Feeding and Drinking System with SMS Updates for Poultry Farmers",
    type: "IoT",
    category: "IoT",
    summary:
      "An automated feeding and drinking system that sends SMS status updates.",
    image: sfads,
    gallery: [sfads],
    goals: [
      "Automate feed and water scheduling",
      "Reduce manual labor",
      "Send SMS updates for status",
    ],
    deliverables: [
      "Feeding controller",
      "SMS notifications",
      "Basic monitoring",
    ],
    story: [
      "SFADS focuses on reliability and clarity, automating the daily routine while keeping farmers informed via SMS.",
    ],
  },
  {
    slug: "automatic-feed-dispenser-quails",
    title: "Solar-Powered Automatic Feed Dispenser for Quails",
    type: "Arduino",
    category: "IoT",
    summary:
      "A solar-powered automatic feed dispenser designed for quail farms.",
    image: quail,
    gallery: [quail],
    goals: [
      "Automate feeding schedules",
      "Use solar power for reliability",
      "Minimize maintenance effort",
    ],
    deliverables: [
      "Dispenser hardware",
      "Timed control logic",
      "Power management",
    ],
    story: [
      "This project improves consistency in small poultry farms with an energy-efficient feeding system that runs on solar power.",
    ],
  },
];

export const caseStudies = projects.filter((project) => project.featured);

export const categories = ["All", "Web Dev", "IoT", "Mobile Dev"];
