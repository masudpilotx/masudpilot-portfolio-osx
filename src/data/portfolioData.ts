
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  bio: {
    name: string;
    headline: string;
    description: string;
    avatar: string;
    social: {
      github: string;
      twitter: string;
      linkedin: string;
      email: string;
    };
  };
  projects: Project[];
  experience: Experience[];
  skills: Record<string, string[]>;
}

export const portfolioData: PortfolioData = {
  bio: {
    name: "Masud Pilot",
    headline: "Chief Advisor at Xinva AI & Alpha Sender",
    description: "I'm a passionate web developer and technology advisor with 7+ years of experience. Currently serving as Chief Advisor at Xinva AI and Alpha Sender, I guide the technical direction of cutting-edge AI-driven platforms. My expertise spans full-stack development, from backend architecture to frontend optimization, and I actively contribute to blockchain research in the Web3 space.",
    avatar: "https://masudpilotx.github.io/assets/images/profile.png", 
    social: {
      github: "https://github.com/masudpilotx",
      twitter: "https://twitter.com/masudpilot",
      linkedin: "https://linkedin.com/in/masudpilot",
      email: "mailto:masudpilotpro@gmail.com",
    },
  },
  projects: [
    {
      id: "1",
      title: "Xinva AI",
      description: "Leading the strategic direction for an AI-powered design generation platform that creates professional designs for print-on-demand products.",
      tech: ["Generative AI", "React", "Node.js", "Machine Learning"],
      link: "https://xinva.ai",
      image: "https://xinva.ai/wp-content/uploads/2023/06/xinva-logo-dark.svg",
    },
    {
      id: "2",
      title: "Alpha Sender",
      description: "Strategic guidance for a UK-registered AI technology company processing 1 trillion+ emails at scale.",
      tech: ["AI", "Big Data", "Email Infrastructure"],
      link: "https://alphasender.com",
      image: "https://alphasender.com/wp-content/uploads/2023/06/alpha-sender-logo.svg",
    },
    {
      id: "3",
      title: "Mev & Flashbots",
      description: "Contributing to blockchain research and development in the Web3 space, focusing on MEV (Maximal Extractable Value) and searcher strategies.",
      tech: ["Blockchain", "Solidity", "Go", "Web3"],
      link: "#",
    },
     {
      id: "4",
      title: "WP Themes",
      description: "Custom Genesis child themes with advanced customization options and responsive design patterns.",
      tech: ["WordPress", "PHP", "Genesis Framework", "CSS3"],
      link: "#",
    },
    {
      id: "5",
      title: "Memorial Archive",
      description: "Memorial Archive Of Our Beloved Shaheed Osman Bin Hadi.",
      tech: ["Web Archive", "History"],
      link: "https://www.OsmanHadi.info",
    },
  ],
  experience: [
    {
      id: "1",
      role: "Chief Advisor",
      company: "Xinva AI",
      period: "Present",
      description: "Leading technical strategy and development guidance for an AI-powered design generation platform.",
    },
    {
      id: "2",
      role: "Chief Advisor",
      company: "Alpha Sender",
      period: "Present",
      description: "Advising on technical direction for a UK-registered AI technology company processing 1 trillion+ emails.",
    },
    {
      id: "3",
      role: "Searcher",
      company: "Mev & Flashbots",
      period: "Past",
      description: "Contributing to blockchain research and development in the Web3 space.",
    },
     {
        id: "4",
        role: "Full Stack Developer",
        company: "Freelance / Various",
        period: "7+ Years",
        description: "Building scalable, user-friendly web applications with modern technologies.",
     }
  ],
  skills: {
    "AI & ML": ["Generative AI", "Model Integration", "Prompt Engineering"],
    "Frontend": ["JavaScript", "ES6+", "React", "HTML5", "CSS3", "Responsive Design"],
    "Backend": ["PHP", "MySQL", "Node.js", "REST APIs"],
    "DevOps": ["Cloud Deployment", "Database Optimization", "Security"],
    "WordPress": ["Genesis Framework", "Theme Customization", "Plugin Development"],
  },
};
