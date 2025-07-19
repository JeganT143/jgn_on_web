import { 
  FaBrain, 
  FaEye, 
  FaLanguage, 
  FaChartBar, 
  FaCloud, 
  FaCode,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaDocker
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiPytorch, 
  SiScikitlearn, 
  SiOpencv, 
  SiNumpy, 
  SiPandas,
  SiJupyter,
  SiKubernetes
} from 'react-icons/si';

export const personalInfo = {
  name: "Jegan Thiruppathi",
  title: "AI/ML Engineer | Data Scientist | Researcher",
  tagline: "Turning pixels into insight, and data into decisions.",
  email: "jegan.thiruppathi@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: "/api/placeholder/300/300", // You can replace with actual image
  resumeUrl: "/resume.pdf",
  
  social: {
    linkedin: "https://linkedin.com/in/jeganthiruppathi",
    github: "https://github.com/jeganthiruppathi",
    twitter: "https://twitter.com/jeganthiruppathi",
    medium: "https://medium.com/@jeganthiruppathi",
    kaggle: "https://kaggle.com/jeganthiruppathi"
  }
};

export const aboutMe = {
  summary: [
    "Passionate AI/ML Engineer with 5+ years of experience developing cutting-edge machine learning solutions that drive business impact. Specialized in Computer Vision, Natural Language Processing, and Deep Learning with a proven track record of deploying scalable AI systems in production.",
    "I thrive at the intersection of research and application, transforming complex algorithms into practical solutions. My expertise spans the entire ML pipeline from data engineering and model development to deployment and monitoring in cloud environments.",
    "When I'm not training neural networks, you'll find me contributing to open-source projects, writing technical blogs, or exploring the latest research papers in AI. I believe in making AI accessible and ethical for everyone."
  ],
  highlights: [
    "5+ years in AI/ML Engineering",
    "Computer Vision & NLP Specialist", 
    "Published 3 research papers",
    "Led 10+ successful ML projects",
    "Deployed models serving 1M+ users"
  ],
  funFact: "I once trained a model to identify dog breeds that achieved 98% accuracy and helped reunite 50+ lost pets with their owners!"
};

export const skills = [
  {
    category: "Machine Learning",
    icon: FaBrain,
    color: "#3B82F6",
    technologies: [
      { name: "TensorFlow", icon: SiTensorflow, level: 95 },
      { name: "PyTorch", icon: SiPytorch, level: 90 },
      { name: "Scikit-learn", icon: SiScikitlearn, level: 95 },
      { name: "XGBoost", icon: FaChartBar, level: 85 },
    ]
  },
  {
    category: "Computer Vision", 
    icon: FaEye,
    color: "#8B5CF6",
    technologies: [
      { name: "OpenCV", icon: SiOpencv, level: 90 },
      { name: "YOLO", icon: FaEye, level: 85 },
      { name: "CNNs", icon: FaBrain, level: 95 },
      { name: "Image Processing", icon: FaEye, level: 90 },
    ]
  },
  {
    category: "Natural Language Processing",
    icon: FaLanguage,
    color: "#10B981",
    technologies: [
      { name: "Transformers", icon: FaBrain, level: 90 },
      { name: "NLTK", icon: FaLanguage, level: 85 },
      { name: "spaCy", icon: FaLanguage, level: 85 },
      { name: "BERT/GPT", icon: FaBrain, level: 88 },
    ]
  },
  {
    category: "Data Science",
    icon: FaChartBar,
    color: "#F59E0B",
    technologies: [
      { name: "Pandas", icon: SiPandas, level: 95 },
      { name: "NumPy", icon: SiNumpy, level: 95 },
      { name: "Matplotlib", icon: FaChartBar, level: 90 },
      { name: "Jupyter", icon: SiJupyter, level: 90 },
    ]
  },
  {
    category: "Cloud & DevOps",
    icon: FaCloud,
    color: "#EF4444",
    technologies: [
      { name: "Azure", icon: FaCloud, level: 85 },
      { name: "AWS", icon: FaCloud, level: 80 },
      { name: "Docker", icon: FaDocker, level: 85 },
      { name: "Kubernetes", icon: SiKubernetes, level: 75 },
    ]
  },
  {
    category: "Programming",
    icon: FaCode,
    color: "#6366F1",
    technologies: [
      { name: "Python", icon: FaPython, level: 95 },
      { name: "SQL", icon: FaDatabase, level: 90 },
      { name: "R", icon: FaChartBar, level: 80 },
      { name: "Git", icon: FaGitAlt, level: 90 },
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Autonomous Vehicle Detection System",
    category: "Computer Vision",
    tags: ["CV", "AI"],
    description: "Real-time object detection system for autonomous vehicles using YOLO v5 and OpenCV. Achieved 95% accuracy in detecting pedestrians, vehicles, and traffic signs.",
    techStack: ["Python", "PyTorch", "OpenCV", "YOLO v5", "Docker", "Azure"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/autonomous-detection",
    demoUrl: "https://autonomous-demo.johndoe.com",
    featured: true,
    metrics: ["95% accuracy", "30 FPS processing", "Deployed on Azure"]
  },
  {
    id: 2,
    title: "Sentiment Analysis API",
    category: "Natural Language Processing",
    tags: ["NLP", "API"],
    description: "Scalable sentiment analysis API using transformer models. Processes 10k+ reviews per minute with 92% accuracy across multiple languages.",
    techStack: ["Python", "Transformers", "FastAPI", "Docker", "AWS", "MongoDB"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/sentiment-api",
    demoUrl: "https://sentiment-api.johndoe.com",
    featured: true,
    metrics: ["92% accuracy", "10k+ requests/min", "Multi-language support"]
  },
  {
    id: 3,
    title: "Stock Price Prediction Model",
    category: "Machine Learning",
    tags: ["ML", "Finance"],
    description: "LSTM-based model for predicting stock prices with technical indicators. Achieved 15% better performance than traditional methods.",
    techStack: ["Python", "TensorFlow", "Pandas", "Alpha Vantage API", "Streamlit"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/stock-prediction",
    demoUrl: "https://stock-predictor.johndoe.com",
    featured: false,
    metrics: ["15% improved accuracy", "Real-time predictions", "Interactive dashboard"]
  },
  {
    id: 4,
    title: "Medical Image Classification",
    category: "Computer Vision",
    tags: ["CV", "Healthcare"],
    description: "Deep learning model for classifying skin cancer from dermoscopy images. Deployed as a mobile app helping dermatologists with diagnosis.",
    techStack: ["Python", "TensorFlow", "OpenCV", "React Native", "Firebase"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/medical-classification",
    demoUrl: "https://medical-classifier.johndoe.com",
    featured: true,
    metrics: ["94% accuracy", "FDA compliant", "10k+ diagnoses"]
  },
  {
    id: 5,
    title: "Customer Churn Analytics",
    category: "Data Science",
    tags: ["Data", "Analytics"],
    description: "End-to-end data science pipeline for predicting customer churn. Helped reduce churn by 25% through targeted retention strategies.",
    techStack: ["Python", "Scikit-learn", "Pandas", "PowerBI", "Azure ML"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/churn-analytics",
    demoUrl: "https://churn-dashboard.johndoe.com",
    featured: false,
    metrics: ["25% churn reduction", "Real-time analytics", "Executive dashboard"]
  },
  {
    id: 6,
    title: "Conversational AI Chatbot",
    category: "Natural Language Processing",
    tags: ["NLP", "AI"],
    description: "Intelligent chatbot using GPT-3 and custom fine-tuning for customer support. Handles 80% of queries without human intervention.",
    techStack: ["Python", "OpenAI API", "LangChain", "FastAPI", "PostgreSQL"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/johndoe/ai-chatbot",
    demoUrl: "https://chatbot-demo.johndoe.com",
    featured: false,
    metrics: ["80% automation", "24/7 support", "Multi-language"]
  }
];

export const certifications = [
  {
    title: "Microsoft Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "2024",
    credentialId: "AI-900",
    url: "https://www.credly.com/badges/example"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023",
    credentialId: "DL-SPEC-2023",
    url: "https://www.coursera.org/account/accomplishments/specialization/example"
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2023",
    credentialId: "TF-DEV-2023",
    url: "https://www.credential.net/example"
  },
  {
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    date: "2022",
    credentialId: "MLS-C01",
    url: "https://www.credly.com/badges/example"
  },
  {
    title: "Advanced Computer Vision",
    issuer: "Stanford University",
    date: "2022",
    credentialId: "CS231n",
    url: "https://cs231n.stanford.edu/"
  }
];

export const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Research Director at TechCorp",
    company: "TechCorp",
    image: "/api/placeholder/80/80",
    text: "John's expertise in computer vision is exceptional. His autonomous vehicle detection system exceeded our expectations and is now deployed in production serving thousands of users daily."
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Engineering",
    company: "DataFlow Inc",
    image: "/api/placeholder/80/80", 
    text: "Working with John was a game-changer for our ML initiatives. His deep understanding of both theory and practical implementation helped us deploy our first production ML model ahead of schedule."
  },
  {
    name: "Prof. Emily Johnson",
    role: "AI Research Professor",
    company: "Stanford University",
    image: "/api/placeholder/80/80",
    text: "John's research contributions in NLP have been outstanding. His paper on transformer optimization has been cited over 100 times and influenced our current research direction."
  }
];

export const publications = [
  {
    title: "Optimizing Transformer Models for Real-time Inference",
    journal: "Journal of Machine Learning Research",
    year: "2024",
    authors: "John Doe, Sarah Chen, Michael Kim",
    url: "https://jmlr.org/papers/example",
    citations: 127
  },
  {
    title: "Computer Vision Techniques for Autonomous Vehicle Navigation",
    journal: "IEEE Computer Vision and Pattern Recognition",
    year: "2023",
    authors: "John Doe, Emily Johnson",
    url: "https://ieeexplore.ieee.org/example",
    citations: 89
  },
  {
    title: "Federated Learning in Healthcare: A Privacy-Preserving Approach",
    journal: "Nature Machine Intelligence",
    year: "2023",
    authors: "John Doe, Robert Liu, Anna Smith",
    url: "https://nature.com/articles/example",
    citations: 156
  }
];

export const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" }
];
