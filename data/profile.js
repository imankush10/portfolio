// Central profile data source for your portfolio.
// Pulled from the resume shared in chat.
const profile = {
  name: "Ankush",
  location: "Chandigarh, India", // optional; set if you'd like it displayed
  age: null, // optional number/string; set to show age
  title: "Full Stack Developer",
  experience: "", // optional; set years as string (e.g., "3")
  summary:
    "A Full-stack developer specializing in AI and real-time web applications. I transform complex challenges into efficient, production-ready solutions. My work is recognized at a national level for technical innovation.",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Java",
    "SQL",
    "Spring Boot",
    "Solidity",
  ],
  services: [
    "Full Stack Development",
    "Cross-Platform Apps",
    "AI Feature Development",
    "Web3 & Smart Contracts",
    "Blockchain Workshops",
  ],
  contact: {
    phone: "+91 8544789286",
    email: "imankush1010@gmail.com",
    githubUrl: "https://github.com/imankush10",
    linkedinUrl: "https://linkedin.com/in/imankush10",
  },
  socials: {
    github: "https://github.com/imankush10",
    linkedin: "https://linkedin.com/in/imankush10",
  },
  projects: [
    {
      name: "OnLevel",
      slug: "onlevel",
      date: "Feb 2025",
      tagline: "AI-Powered Interview Engine",
      tech: ["Next.js", "TypeScript", "Firebase", "Vapi", "Gemini"],
      imageUrl: "/images/onlevel.png",
      // Extra content for detail page UI
      problem:
        "Students struggle to get realistic mock interviews and actionable feedback tailored to their target role.",
      solution:
        "A voice-first interview engine powered by LLMs that generates role- and context-aware questions and delivers structured feedback instantly.",
      metrics: [
        { label: "Users", value: "15+" },
        { label: "Sessions", value: "50+" },
        { label: "Latency", value: "<400ms" },
      ],
      roles: ["Full‑stack", "AI integration", "Infra"],
      gallery: [{ src: "/images/onlevel.png", alt: "OnLevel dashboard" }],
      highlights: [
        "Used by 15+ students for 50+ mock interviews with personalized feedback.",
        "Gemini LLM generates custom, role-based questions with session context.",
        "Voice interface via Vapi for real-time AI conversations (<400ms latency).",
        "Automated feedback pipeline, insights delivered in under 10s.",
        "Scaled Firebase backend with secure auth and 10+ concurrent users.",
      ],
      links: {
        repo: "https://github.com/imankush10/interviewprep",
        live: "https://onlevel.imankush.in",
      },
    },
    {
      name: "Rewire",
      slug: "rewire",
      date: "Dec 2024",
      tagline: "AI Feature Prediction System",
      tech: ["React", "Electron", "JavaScript", "FastAPI", "TensorFlow"],
      imageUrl: "/images/onlevel.png",
      problem:
        "Manufacturing lines depend on delayed lab results to tune process parameters, causing scrap and inefficiency.",
      solution:
        "Edge-friendly ML predicts aluminum targets in real-time from PLC streams, closing the feedback loop on the shop floor.",
      metrics: [
        { label: "Accuracy", value: "98.97%" },
        { label: "Build Size", value: "82MB" },
        { label: "Throughput", value: "+50%" },
      ],
      roles: ["ML", "Desktop app", "Controls"],
      gallery: [{ src: "/images/onlevel.png", alt: "Rewire runtime" }],
      highlights: [
        "Real-time aluminum feature prediction app; +50% production efficiency.",
        "TensorFlow model at 98.97% accuracy; optimized build to 82MB.",
        "Automated PLC sensor data, removed manual checks, saving 40+ hours/week.",
        "Deployed with minimal latency; eliminated process delays.",
        "Smart India Hackathon 2024 winner; implemented at NALCO Ltd.",
      ],
      links: {
        repo: "https://github.com/imankush10/nalco-deliverable",
        live: "",
      },
    },
  ],
  education: [
    {
      school: "Chandigarh University, Punjab",
      program: "B.E. in Computer Science",
      period: "2022",
      description:
        "Pursuing a comprehensive degree with a focus on software engineering, data structures, and algorithms.",
      highlights: [
        "CGPA: 7.64",
        "Core coursework in Data Structures, Algorithms, and System Design.",
        "Actively involved in hackathons and coding competitions.",
      ],
      tags: ["Computer Science", "Software Engineering"],
    },
    {
      school: "New Crescent School, H.P.",
      program: "Senior Secondary (XII)",
      period: "2020",
      description:
        "Completed senior secondary education with a focus on science and mathematics, building a strong analytical foundation.",
      highlights: ["Final Percentage: 88.6%"],
      tags: ["Physics", "Chemistry", "Math"],
    },
    {
      school: "New Crescent School, H.P.",
      program: "Secondary (X)",
      period: "2018",
      description: "Established a strong academic foundation in core subjects.",
      highlights: ["Final Percentage: 93.8%"],
      tags: ["General Science", "Mathematics"],
    },
  ],
  achievements: [
    {
      title: "Winner, SIH 2024",
      subtitle: "Smart India Hackathon – National Winner",
      description:
        "Developed a real-time ML system for industrial manufacturing, leading to its adoption by a national public sector undertaking.",
      year: "2024",
      image: "/images/onlevel.png",
      icon: "/images/awards/trophy.svg",
      tags: [
        "Machine Learning",
        "Real-time Inference",
        "Industrial Automation",
      ],
      highlights: [
        "Predicted UTS, elongation, and conductivity targets from live process data.",
        "Integrated PLC sensor streams for on-line, low-latency inference.",
        "Delivered actionable feedback to operators for process tuning.",
        "Incorporated by NALCO Ltd after SIH 2024.",
      ],
    },
    {
      title: "Silver Medal, CodeHunt",
      subtitle: "Treasure Hunt–Style DSA Puzzle Competition",
      description:
        "Secured the Silver Medal in CodeHunt, a multi-stage competition combining complex data structures and algorithms with treasure-hunt mechanics.",
      year: "2023",
      image: "/images/onlevel.png",
      icon: "/images/awards/medal.svg",
      tags: ["Data Structures", "Algorithms", "Problem Solving"],
      highlights: [
        "Solved chained, clue-driven challenges under strict time limits across checkpoints.",
        "Designed team strategy to parallelize subproblems and prune the search space efficiently.",
        "Ranked 2nd overall; awarded the Silver Medal.",
      ],
    },
    {
      title: "Silver Medal, Ideathon",
      subtitle: "Technical Ideation Summit",
      description:
        "Idea-first presentation challenge (no build required). Proposed a strategy to reduce AI racial bias and hallucinations using micro-segmented models.",
      year: "2023",
      image: "/images/onlevel.png",
      icon: "/images/awards/medal.svg",
      tags: ["Responsible AI", "Bias Mitigation", "Hallucination Reduction"],
      highlights: [
        "Outlined a micro-segmented model architecture: small domain- and cohort-specific experts coordinated by a routing layer.",
        "Context-aware expert selection to limit overgeneralization and reduce hallucinations.",
        "Evaluation plan with fairness metrics (demographic parity, equalized odds) and hallucination rates, plus human-in-the-loop review.",
      ],
    },
    {
      title: "Top 3 — Metacrafters Blockchain Track",
      subtitle:
        "Ethereum & Polygon | Ranked 3rd, $200 Award, Proof‑of‑Work NFT",
      description:
        "Completed end‑to‑end developer tasks across EVM ecosystems with a focus on secure Solidity patterns, then scaled impact via a live workshop for peers.",
      year: "2023",
      image: "/images/onlevel.png",
      icon: "/images/awards/medal.svg",
      tags: ["Blockchain", "Solidity", "Ethereum", "Web3"],
      highlights: [
        "Completed all outlined challenges on schedule across Ethereum and Polygon tracks.",
        "Ranked 3rd overall; received $200 and a Proof‑of‑Work NFT credential.",
        "Delivered a live workshop for 50+ students on blockchain concepts and practical use-cases.",
        "Hands-on demos and Q&A to help attendees apply concepts quickly.",
      ],
    },
    {
      title: "Research Publication: Content-Based Image Retrieval",
      subtitle: "Visual Similarity indexing and retrieval framework",
      description:
        "Authored a research paper on a novel system for classifying and retrieving images based on visual features rather than metadata.",
      year: "2022",
      image: "/images/onlevel.png",
      icon: "/images/awards/laurel.svg",
      tags: ["Research", "Computer Vision", "CBIR", "Image Retrieval"],
      highlights: [
        "Engineered feature extraction using color, texture, and local keypoints.",
        "Compared classical descriptors with CNN embeddings for speed and accuracy.",
        "Implemented similarity search with cosine/Euclidean distance.",
        "Evaluated across diverse categories with reproducible experiments.",
      ],
    },
  ],
  certifications: [
    "Full Stack Web Dev, System Design & DevOps – Harkirat Singh Cohort 2.0",
    "The Ultimate React Course 2025: React, Next.js, Redux & More",
    "Blockchain using Ethereum and Polygon – Metacrafters (Top 3, $200 award, Proof‑of‑Work NFT)",
  ],
};

export default profile;
