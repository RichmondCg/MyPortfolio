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
  },
];

export const homeProjects = projects.filter(
  (p) => p.id !== "irri" && p.id !== "sfads",
);
