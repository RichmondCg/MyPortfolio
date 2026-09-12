import nuevaImg from "../assets/projects/nueva.webp";
import papsImg from "../assets/projects/paps.webp";
import prepImg from "../assets/projects/prep.webp";
import clinicImg from "../assets/projects/clinic.webp";
import fitImg from "../assets/projects/fit.webp";
import irriImg from "../assets/projects/irri.webp";
import sfadsImg from "../assets/projects/sfads-v2.webp";

export const projects = [
  {
    id: "nueva",
    title: "Nueva Insights Website",
    tagline: "An SEO and SMM service provider website.",
    image: nuevaImg,
    link: "/works/nueva",
    area: "nueva",
    aspect: "4 / 3",
    parallax: 80,
    bottomToMiddle: true,
    caseStudy: {
      category: "Digital strategy",
      year: "2026",
      role: "Design, development",
      duration: "6 weeks",
      goal: "Turn a service business into a clear, credible first conversation.",
      story:
        "Nueva Insights needed a website that could explain a broad set of SEO and social media services without making visitors work for the answer. The experience moves from signal to proof to a simple next step.",
      approach: [
        "A sharp editorial hierarchy makes the offer legible in seconds.",
        "Case-study moments bring evidence closer to the decision point.",
        "Small motion cues create confidence without competing with the message.",
      ],
      outcome:
        "A focused digital front door for turning curiosity into qualified conversations.",
    },
  },

  {
    id: "paps",
    title: "Paps Barbershop Appointment System",
    tagline:
      "A barbershop landing page, appointment booking, and information system.",
    image: papsImg,
    link: "/works/paps",
    area: "paps",
    aspect: "3 / 4",
    parallax: 160,
    bottomToMiddle: false,
    caseStudy: {
      category: "Service experience",
      year: "2026",
      role: "UX, UI, development",
      duration: "12 weeks",
      goal: "Make booking a haircut feel as personal as the chair itself.",
      story:
        "Paps Barbershop had the personality, but its appointment flow was disconnected from the brand. This project brings discovery, barber information, services, and booking into one relaxed path.",
      approach: [
        "A warm, image-led landing experience introduces the shop before the form.",
        "Service details are organized around the questions clients actually ask.",
        "The booking flow keeps context visible so choosing a slot feels effortless.",
      ],
      outcome:
        "A more confident path from finding a barber to reserving a chair.",
    },
  },

  {
    id: "preparado",
    title: "Preparado AI - Job Tracking Platform",
    tagline:
      "A job tracking platform that uses AI to analyze job descriptions. Just paste the job link and let the AI analyze it for you.",
    image: prepImg,
    link: "/works/preparado",
    area: "preparado",
    aspect: "16 / 8",
    parallax: 60,
    bottomToMiddle: false,
    caseStudy: {
      category: "AI product",
      year: "2026",
      role: "Product design, development",
      duration: "2 weeks",
      goal: "Replace the scattered job hunt with one calm, useful workspace.",
      story:
        "Job seekers were saving links, rewriting notes, and losing the thread between applications. Preparado turns a job link into an actionable starting point, then keeps the story of each application together.",
      approach: [
        "AI analysis is presented as a conversation starter, not a black box.",
        "The dashboard prioritizes momentum: what needs attention now is obvious.",
        "Progress states and lightweight feedback make the process feel finite.",
      ],
      outcome:
        "A practical job-tracking platform that gives candidates their focus back.",
    },
  },

  {
    id: "clinic",
    title: "NuevaCare Clinic",
    tagline:
      "An AI-driven appointment system with a chatbot that feels more like talking to someone than filling out a traditional form.",
    image: clinicImg,
    link: "/works/clinic",
    area: "clinic",
    aspect: "4 / 5",
    parallax: 180,
    bottomToMiddle: false,
    caseStudy: {
      category: "Healthcare experience",
      year: "2026",
      role: "UX, conversational UI",
      duration: "3 weeks",
      goal: "Make an appointment start with a human answer, not a cold form.",
      story:
        "NuevaCare needed to help patients find the right care while reducing the friction around scheduling. The chatbot guides the first conversation, then hands off to a booking flow with the right context intact.",
      approach: [
        "Plain language replaces clinical interface patterns wherever possible.",
        "The conversation narrows intent gradually instead of asking everything upfront.",
        "Clear confirmation moments reduce uncertainty at the most important step.",
      ],
      outcome:
        "A gentler intake experience that helps patients move forward with confidence.",
    },
  },

  {
    id: "smartfit",
    title: "SmartFit",
    tagline:
      "Website promoting a healthier lifestyle through fitness and better habits.”",
    image: fitImg,
    link: "/works/smartfit",
    area: "smartfit",
    aspect: "4 / 3",
    parallax: 75,
    bottomToMiddle: true,
    caseStudy: {
      category: "Lifestyle platform",
      year: "2026",
      role: "Brand, UI, development",
      duration: "1 day",
      goal: "Make healthier routines feel approachable enough to begin today.",
      story:
        "SmartFit is built around the small decisions that compound. The site uses energy, clarity, and a low-friction content structure to turn a broad wellness promise into a personal invitation.",
      approach: [
        "Bright visual rhythm gives each habit its own moment.",
        "Content is grouped by intention so visitors can enter at their pace.",
        "Micro-interactions keep the journey active without adding noise.",
      ],
      outcome:
        "A motivating digital space for building better habits one choice at a time.",
    },
  },

  {
    id: "irri",
    title:
      "Solar-Powered Automated Irrigation System for Farmers with Monitoring App",
    tagline:
      "A farm monitoring system using an ESP8266 board, integrated with the Blynk app to monitor farm conditions and automatically irrigate plants when they need water.",
    image: irriImg,
    link: "/works/irri",
    area: "irri",
    aspect: "4 / 3",
    parallax: 150,
    bottomToMiddle: false,
    caseStudy: {
      category: "IoT system",
      year: "2024",
      role: "Hardware, app, UX",
      duration: "18 weeks",
      goal: "Give farmers a clearer view of the water their crops need.",
      story:
        "This solar-powered irrigation system connects field conditions to a monitoring app, turning invisible changes in soil and weather into decisions farmers can act on.",
      approach: [
        "Sensor data is translated into simple, meaningful states.",
        "Automation handles repetitive watering while keeping the farmer informed.",
        "The interface is designed for quick checks in real working conditions.",
      ],
      outcome:
        "A connected irrigation loop that saves attention as well as water.",
    },
  },

  {
    id: "sfads",
    title:
      "SFADS - Smart Feeding and Drinking System with SMS Updates for Poultry Farmers",
    tagline:
      "An automated poultry feeding system that dispenses feeds and distributes them through a conveyor belt. It also sends SMS updates to notify farmers when the chickens have been fed or when the hopper and water tank are critically low.",
    image: sfadsImg,
    link: "/works/sfads",
    area: "sfads",
    aspect: "4 / 3",
    parallax: 140,
    bottomToMiddle: false,
    caseStudy: {
      category: "Connected hardware",
      year: "2025",
      role: "System design, development",
      duration: "16 weeks",
      goal: "Make poultry care more predictable when no one can watch every minute.",
      story:
        "SFADS combines automated feeding, water monitoring, and SMS updates into one practical system. The work is about making a physical routine visible without making it complicated.",
      approach: [
        "The machine handles repeatable actions consistently.",
        "Alerts are reserved for moments that require a decision.",
        "Status information is delivered through a channel farmers already use.",
      ],
      outcome:
        "A dependable care system that lets farmers respond early instead of react late.",
    },
  },
];

export const homeProjects = projects.filter(
  (p) => p.id !== "irri" && p.id !== "sfads",
);
