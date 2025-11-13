// Icon Image
import Ui from "Assets/about/ui.png";
import Web from "Assets/about/web.png";
import App from "Assets/about/app.png";
import Graphic from "Assets/about/graphic.png";

export default [
  {
    title: "UI/UX & Graphic Designing",
    description:
      "Function meets flair—our design approach merges seamless user journeys with stunning visual impact.",
    popupDescription:
      "We create visually engaging and user-focused designs that make every interaction feel smooth and purposeful.",
    popupaboutservices: "Here are the design services we offer:",
    icon: Ui,
    subServices: [
      "Wireframing & Prototyping",
      "UX Research & Flow Mapping",
      "Logo & Brand Identity Design",
      "Social Media Creative Design",
      "Print & Brochure Design",
      "Responsive UI Design",
    ],
  },

  // Merged: Web & App Development - contains two sub-categories inside modal
  {
    title: "Web & App Development",
    description:
      "Full-stack websites and cross-platform apps — built for performance, scale and delightful UX.",
    popupDescription:
      "Choose whether you want a Web/Website solution or a Mobile App solution — we handle both, end-to-end.",
    popupaboutservices: "Select one to view specific services:",
    icon: Web,
    // new: subCategories (two cards inside modal)
    subCategories: [
      {
        key: "web",
        title: "Web Development",
        popupDescription:
          "We develop responsive, high-performing websites and web apps that scale with your business.",
        popupaboutservices: "Below are the web development services we provide:",
       subServices: [
        "Website Development & Optimization",
        "E-Commerce Websites & Custom Portals",
        "Full-stack Web Applications",
        "Backend Development & APIs ",
        "CMS & Headless CMS Integration",
        "Domain, Hosting & Deployment (AWS, Vercel, Netlify & more)"
        ]
      },
      {
        key: "app",
        title: "App Development",
        popupDescription:
          "We build intuitive, cross-platform mobile apps that are fast, reliable, and user-friendly.",
        popupaboutservices: "Here’s what we offer in mobile app development:",
        subServices: [
          "Android & iOS App Development",
          "Cross-platform Apps (Flutter, React Native)",
          "Mobile UI/UX Design",
          "Firebase Integration",
          "App Store / Play Store Publishing",
          "Maintenance & Updates",
        ],
      },
    ],
  },

  // Replaced old App card with SaaS & MVPs Development
  {
    title: "SaaS & MVPs Development",
    description:
      "Validate, iterate and scale — we build lean MVPs and robust SaaS platforms tailored to product-market fit.",
    popupDescription:
      "From rapid MVPs to production-grade SaaS platforms — we help you go from idea to paying customers.",
    popupaboutservices: "SaaS & MVP services we offer:",
    icon: App,
    subServices: [
      "MVP Development & Rapid Prototyping",
      "SaaS Architecture & Multi-tenant Design",
      "API-first Backend & Integrations",
      "Onboarding Flows & Analytics",
      "Payment & Subscription Integration",
      "Scaling & DevOps (CI/CD, monitoring)",
    ],
  },

  {
    title: "Animation & VFX",
    description:
      "Seamless meets stylish—UI/UX and graphics come together to make every user journey visually unforgettable.",
    popupDescription: "We bring ideas to life through captivating animations and cinematic VFX.",
    popupaboutservices: "These are the animation and VFX services we offer:",
    icon: Graphic,
    subServices: [
      "2D/3D Animation",
      "Motion Graphics",
      "Explainer Videos",
      "Rotoscoping & Compositing",
      "Product Animations",
      "Video Editing & Post-production",
    ],
  },
];
