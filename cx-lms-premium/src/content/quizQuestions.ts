import type { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  // Module 1: Emotional Intelligence Foundations
  {
    id: 1,
    module: 1,
    question: "What is the primary difference between customer service and customer experience?",
    options: [
      "Customer service is reactive, while customer experience is proactive",
      "Customer service focuses on transactions, while customer experience focuses on emotions",
      "Customer service is about fixing problems, while customer experience is about preventing them",
      "All of the above"
    ],
    correct: "All of the above",
    explanation: "Customer experience encompasses the entire customer journey, including proactive emotional engagement, while customer service typically reacts to specific issues.",
    difficulty: "Foundational"
  },
  {
    id: 2,
    module: 1,
    question: "Which of the following is NOT one of the four pillars of emotional intelligence?",
    options: [
      "Self-Awareness",
      "Self-Regulation", 
      "Social Awareness",
      "Emotional Manipulation"
    ],
    correct: "Emotional Manipulation",
    explanation: "The four pillars are Self-Awareness, Self-Regulation, Social Awareness, and Relationship Management. Emotional manipulation is unethical and counterproductive.",
    difficulty: "Foundational"
  },
  {
    id: 3,
    module: 1,
    question: "What percentage of buying decisions are made emotionally?",
    options: [
      "65%",
      "75%",
      "85%",
      "95%"
    ],
    correct: "95%",
    explanation: "Research shows that 95% of buying decisions are made emotionally, with logic used primarily to justify the emotional decision.",
    difficulty: "Applied"
  },
  {
    id: 4,
    module: 1,
    question: "Which emotional state is most likely to lead to customer loyalty?",
    options: [
      "Satisfaction",
      "Delight",
      "Trust",
      "All emotions equally"
    ],
    correct: "Delight",
    explanation: "While satisfaction prevents churn, delight creates emotional connection and advocacy. Delighted customers are 5x more likely to become loyal advocates.",
    difficulty: "Strategic"
  },
  {
    id: 5,
    module: 1,
    question: "What is the 'emotional bank account' concept?",
    options: [
      "A financial model for customer lifetime value",
      "The accumulation of positive emotional interactions over time",
      "A budgeting system for customer experience investments",
      "A psychological assessment tool for customers"
    ],
    correct: "The accumulation of positive emotional interactions over time",
    explanation: "The emotional bank account represents the trust and goodwill built through consistent positive interactions, which can be drawn upon during difficult situations.",
    difficulty: "Applied"
  },

  // Module 2: Customer Journey Mapping
  {
    id: 6,
    module: 2,
    question: "What is the primary purpose of customer journey mapping?",
    options: [
      "To track customer spending patterns",
      "To identify emotional touchpoints and pain points",
      "To measure customer satisfaction scores",
      "To predict customer behavior"
    ],
    correct: "To identify emotional touchpoints and pain points",
    explanation: "Customer journey mapping helps visualize the customer's experience across all touchpoints to identify opportunities for improvement and emotional connection.",
    difficulty: "Foundational"
  },
  {
    id: 7,
    module: 2,
    question: "Which phase of the customer journey typically has the highest emotional intensity?",
    options: [
      "Awareness",
      "Consideration",
      "Purchase",
      "Post-purchase"
    ],
    correct: "Post-purchase",
    explanation: "Post-purchase emotions are often the strongest, including relief, excitement, or anxiety about the decision. This phase significantly impacts future loyalty.",
    difficulty: "Applied"
  },
  {
    id: 8,
    module: 2,
    question: "What is a 'moment of truth' in customer experience?",
    options: [
      "When a customer makes a purchase decision",
      "A critical interaction that shapes customer perception",
      "The moment a customer complaint is resolved",
      "When customer satisfaction is measured"
    ],
    correct: "A critical interaction that shapes customer perception",
    explanation: "Moments of truth are pivotal interactions that significantly influence how customers perceive and remember their experience with a brand.",
    difficulty: "Strategic"
  },
  {
    id: 9,
    module: 2,
    question: "Which tool is most effective for identifying customer journey gaps?",
    options: [
      "Customer surveys",
      "Analytics dashboards",
      "Service blueprinting",
      "Focus groups"
    ],
    correct: "Service blueprinting",
    explanation: "Service blueprinting maps both customer actions and internal processes, revealing gaps between customer expectations and actual service delivery.",
    difficulty: "Applied"
  },
  {
    id: 10,
    module: 2,
    question: "What is the 'peak-end rule' in customer experience?",
    options: [
      "Customers remember the peak and end of their experience most",
      "Peak experiences should always end positively",
      "The end of the journey is more important than the beginning",
      "Peak moments determine customer satisfaction"
    ],
    correct: "Customers remember the peak and end of their experience most",
    explanation: "The peak-end rule states that customers' overall evaluation of an experience is based on the most intense moment (peak) and how it ends, not the average experience.",
    difficulty: "Strategic"
  },

  // Module 3: Communication Excellence
  {
    id: 11,
    module: 3,
    question: "What is the 7-38-55 rule in communication?",
    options: [
      "7% words, 38% tone, 55% body language",
      "7% content, 38% delivery, 55% context",
      "7% verbal, 38% vocal, 55% visual",
      "All of the above"
    ],
    correct: "All of the above",
    explanation: "The 7-38-55 rule indicates that communication effectiveness is determined by 7% words, 38% tone of voice, and 55% body language/facial expressions.",
    difficulty: "Foundational"
  },
  {
    id: 12,
    module: 3,
    question: "Which communication style is most effective for handling angry customers?",
    options: [
      "Assertive",
      "Passive",
      "Aggressive",
      "Empathetic"
    ],
    correct: "Empathetic",
    explanation: "Empathetic communication acknowledges the customer's emotions first, validates their feelings, and then addresses the issue, which is most effective for de-escalation.",
    difficulty: "Applied"
  },
  {
    id: 13,
    module: 3,
    question: "What is 'active listening' in customer service?",
    options: [
      "Listening while multitasking",
      "Fully concentrating on and understanding the customer",
      "Responding quickly to customer inquiries",
      "Taking detailed notes during conversations"
    ],
    correct: "Fully concentrating on and understanding the customer",
    explanation: "Active listening involves giving full attention, understanding both content and emotion, and providing appropriate feedback to ensure comprehension.",
    difficulty: "Foundational"
  },
  {
    id: 14,
    module: 3,
    question: "Which communication technique helps prevent misunderstandings?",
    options: [
      "Speaking quickly",
      "Using technical jargon",
      "Paraphrasing and confirming understanding",
      "Avoiding questions"
    ],
    correct: "Paraphrasing and confirming understanding",
    explanation: "Paraphrasing what the customer said and confirming understanding ensures both parties are on the same page and prevents miscommunication.",
    difficulty: "Applied"
  },
  {
    id: 15,
    module: 3,
    question: "What is the primary goal of 'mirroring' in communication?",
    options: [
      "To copy the customer's exact words",
      "To build rapport and connection",
      "To confuse the customer",
      "To show agreement with everything"
    ],
    correct: "To build rapport and connection",
    explanation: "Mirroring involves subtly matching the customer's communication style, pace, and energy to create a sense of connection and understanding.",
    difficulty: "Strategic"
  },

  // Module 4: Proactive Customer Experience
  {
    id: 16,
    module: 4,
    question: "What is proactive customer experience?",
    options: [
      "Reacting quickly to customer complaints",
      "Anticipating and addressing customer needs before they arise",
      "Providing excellent customer service",
      "Following up with customers regularly"
    ],
    correct: "Anticipating and addressing customer needs before they arise",
    explanation: "Proactive CX involves using data, insights, and empathy to anticipate customer needs and address them before customers even realize they have a need.",
    difficulty: "Foundational"
  },
  {
    id: 17,
    module: 4,
    question: "Which data source is most valuable for proactive customer experience?",
    options: [
      "Customer surveys",
      "Behavioral analytics",
      "Social media mentions",
      "All of the above"
    ],
    correct: "All of the above",
    explanation: "Proactive CX requires multiple data sources: behavioral analytics for patterns, surveys for explicit feedback, and social media for sentiment and trends.",
    difficulty: "Applied"
  },
  {
    id: 18,
    module: 4,
    question: "What is the 'predictive service' approach?",
    options: [
      "Using AI to predict customer satisfaction",
      "Anticipating customer needs based on behavior patterns",
      "Forecasting customer lifetime value",
      "Predicting when customers will churn"
    ],
    correct: "Anticipating customer needs based on behavior patterns",
    explanation: "Predictive service uses data analysis to identify patterns and anticipate what customers might need next, enabling proactive support.",
    difficulty: "Strategic"
  },
  {
    id: 19,
    module: 4,
    question: "Which proactive strategy has the highest ROI for customer experience?",
    options: [
      "Personalized recommendations",
      "Proactive issue resolution",
      "Anticipatory customer service",
      "All strategies are equally valuable"
    ],
    correct: "Proactive issue resolution",
    explanation: "Proactively resolving issues before customers experience them has the highest ROI, as it prevents negative experiences and builds trust.",
    difficulty: "Applied"
  },
  {
    id: 20,
    module: 4,
    question: "What is the key to successful proactive customer experience?",
    options: [
      "Having the latest technology",
      "Understanding customer context and intent",
      "Having a large customer service team",
      "Offering the lowest prices"
    ],
    correct: "Understanding customer context and intent",
    explanation: "Successful proactive CX requires deep understanding of customer context, intent, and journey to provide relevant, timely, and valuable interactions.",
    difficulty: "Strategic"
  },

  // Module 5: Specialist Skills
  {
    id: 21,
    module: 5,
    question: "What is the primary focus of specialist customer experience skills?",
    options: [
      "Handling complex technical issues",
      "Managing VIP customers",
      "Developing deep expertise in specific customer scenarios",
      "Training other customer service representatives"
    ],
    correct: "Developing deep expertise in specific customer scenarios",
    explanation: "Specialist skills involve developing deep, nuanced expertise in handling specific types of customer situations with advanced techniques and knowledge.",
    difficulty: "Foundational"
  },
  {
    id: 22,
    module: 5,
    question: "Which skill is most important for handling enterprise customers?",
    options: [
      "Technical knowledge",
      "Relationship management",
      "Problem-solving ability",
      "All of the above"
    ],
    correct: "All of the above",
    explanation: "Enterprise customers require comprehensive skills including technical expertise, relationship management, and advanced problem-solving capabilities.",
    difficulty: "Applied"
  },
  {
    id: 23,
    module: 5,
    question: "What is 'emotional labor' in customer experience?",
    options: [
      "The effort required to manage one's own emotions",
      "The emotional impact on customers",
      "The stress of dealing with difficult customers",
      "The energy expended in emotional interactions"
    ],
    correct: "The effort required to manage one's own emotions",
    explanation: "Emotional labor refers to the effort required to manage and regulate one's own emotions while providing service, which can be mentally taxing.",
    difficulty: "Strategic"
  },
  {
    id: 24,
    module: 5,
    question: "Which technique is most effective for managing emotional labor?",
    options: [
      "Suppressing emotions",
      "Emotional detachment",
      "Emotional regulation and self-care",
      "Avoiding emotional situations"
    ],
    correct: "Emotional regulation and self-care",
    explanation: "Healthy emotional regulation, self-awareness, and self-care practices help manage emotional labor sustainably without burnout.",
    difficulty: "Applied"
  },
  {
    id: 25,
    module: 5,
    question: "What is the 'expertise paradox' in customer service?",
    options: [
      "Experts make more mistakes than beginners",
      "Expert knowledge can sometimes hinder communication",
      "Customers prefer less experienced representatives",
      "Expertise leads to overconfidence"
    ],
    correct: "Expert knowledge can sometimes hinder communication",
    explanation: "The expertise paradox occurs when deep technical knowledge makes it difficult to communicate effectively with customers who lack that expertise.",
    difficulty: "Strategic"
  },

  // Module 6: Career Mastery
  {
    id: 26,
    module: 6,
    question: "What is the primary goal of career mastery in customer experience?",
    options: [
      "Becoming a customer service manager",
      "Developing leadership and strategic thinking skills",
      "Earning the highest salary possible",
      "Working with the most prestigious companies"
    ],
    correct: "Developing leadership and strategic thinking skills",
    explanation: "Career mastery focuses on developing advanced leadership capabilities, strategic thinking, and the ability to drive organizational change in customer experience.",
    difficulty: "Foundational"
  },
  {
    id: 27,
    module: 6,
    question: "Which skill is most critical for CX leadership?",
    options: [
      "Technical expertise",
      "Emotional intelligence",
      "Financial acumen",
      "Marketing knowledge"
    ],
    correct: "Emotional intelligence",
    explanation: "CX leadership requires high emotional intelligence to understand customers, motivate teams, and navigate complex organizational dynamics.",
    difficulty: "Applied"
  },
  {
    id: 28,
    module: 6,
    question: "What is 'customer-centric leadership'?",
    options: [
      "Leading customer service teams",
      "Making decisions based on customer impact",
      "Managing customer relationships",
      "Leading customer-facing departments"
    ],
    correct: "Making decisions based on customer impact",
    explanation: "Customer-centric leadership involves making all business decisions with customer impact as a primary consideration, not just customer-facing decisions.",
    difficulty: "Strategic"
  },
  {
    id: 29,
    module: 6,
    question: "Which metric is most important for measuring CX leadership success?",
    options: [
      "Customer satisfaction scores",
      "Net Promoter Score (NPS)",
      "Customer lifetime value improvement",
      "All metrics are equally important"
    ],
    correct: "All metrics are equally important",
    explanation: "Effective CX leadership requires balancing multiple metrics including satisfaction, loyalty, value, and operational efficiency to drive comprehensive improvement.",
    difficulty: "Applied"
  },
  {
    id: 30,
    module: 6,
    question: "What is the key to building a customer-centric culture?",
    options: [
      "Training programs",
      "Customer feedback systems",
      "Leadership commitment and modeling",
      "Performance incentives"
    ],
    correct: "Leadership commitment and modeling",
    explanation: "Building a customer-centric culture starts with leadership demonstrating customer-centric behaviors and making it clear that customer focus is a core organizational value.",
    difficulty: "Strategic"
  }
];

export const getQuestionsByModule = (moduleId: number): QuizQuestion[] => {
  return quizQuestions.filter(q => q.module === moduleId);
};

export const getRandomQuestions = (moduleId: number, count: number = 10): QuizQuestion[] => {
  const moduleQuestions = getQuestionsByModule(moduleId);
  const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, moduleQuestions.length));
};
