const { useState } = React;

const EQMasterclassApp = () => {
    const [currentModule, setCurrentModule] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);
    const [expandedSections, setExpandedSections] = useState({});
    const [completedLessons, setCompletedLessons] = useState([]);
    const [showJournal, setShowJournal] = useState(false);
    const [journalEntries, setJournalEntries] = useState({});
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizState, setQuizState] = useState('entry'); // 'entry', 'quiz', 'results', 'review'
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
    const [quizTimeRemaining, setQuizTimeRemaining] = useState(7200); // 120 minutes in seconds
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Quiz timer countdown
    React.useEffect(() => {
        if (quizState === 'quiz' && quizTimeRemaining > 0) {
            const timer = setInterval(() => {
                setQuizTimeRemaining(prev => {
                    if (prev <= 1) {
                        // Time's up - auto submit
                        const score = Object.keys(quizAnswers).filter(questionIndex => 
                            quizAnswers[questionIndex] === quizQuestions[questionIndex].correct
                        ).length;
                        setQuizState('results');
                        setQuizCompleted(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearInterval(timer);
        }
    }, [quizState, quizTimeRemaining, quizAnswers]);

    const modules = [
        {
            id: 0,
            title: "Module 1: Emotional Intelligence Foundations",
            subtitle: "Building the Inner Core of Customer Excellence",
            color: "from-indigo-600 via-purple-600 to-pink-600",
            lessons: [
                {
                    id: 0,
                    title: "Introduction to EQ in CX",
                    icon: "🧠",
                    color: "from-blue-500 to-blue-600",
                    tagline: "Understanding the Foundation",
                    duration: "30 min",
                    keyTakeaway: "EQ is your competitive advantage in customer experience",
                    sections: [
                        {
                            title: "🏛️ The 4 Pillars of EQ",
                            content: {
                                type: "pillars",
                                items: [
                                    { name: "Self-Awareness", desc: "Recognizing your emotions in real time", icon: "🧠" },
                                    { name: "Self-Management", desc: "Controlling impulses & staying composed", icon: "🎯" },
                                    { name: "Social Awareness", desc: "Understanding others' emotions", icon: "👁️" },
                                    { name: "Relationship Management", desc: "Building rapport & managing conflict", icon: "🤝" }
                                ]
                            }
                        },
                        {
                            title: "📊 Why EQ Matters: The Data",
                            content: {
                                type: "stats",
                                items: [
                                    { value: "70%", label: "of buying decisions based on feelings" },
                                    { value: "2x", label: "spending from connected customers" },
                                    { value: "15-25%", label: "higher CSAT with EQ interactions" }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            title: "Module 2: Operational Excellence",
            subtitle: "Systems, Processes, and Performance Optimization",
            color: "from-emerald-600 via-teal-600 to-cyan-600",
            lessons: [
                {
                    id: 1,
                    title: "Support Channel Optimization",
                    icon: "📞",
                    color: "from-blue-500 to-indigo-600",
                    tagline: "Choosing the right channel for the right customer at the right time",
                    duration: "18 min",
                    keyTakeaway: "Channel optimization drives efficiency and satisfaction",
                    sections: [
                        {
                            title: "Channel Comparison Matrix",
                            content: {
                                type: "matrix",
                                quadrants: [
                                    { position: "High Touch, High Cost", title: "Phone Support", description: "Personal, immediate, expensive", color: "from-red-500 to-pink-600" },
                                    { position: "High Touch, Low Cost", title: "Chat Support", description: "Personal, efficient, scalable", color: "from-blue-500 to-cyan-600" },
                                    { position: "Low Touch, High Cost", title: "Email Support", description: "Detailed, slow, resource-intensive", color: "from-yellow-500 to-orange-600" },
                                    { position: "Low Touch, Low Cost", title: "Self-Service", description: "Instant, scalable, cost-effective", color: "from-green-500 to-emerald-600" }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Module 3: Proactive CX & Strategic Retention",
            subtitle: "From Reactive Support to Strategic Customer Success",
            color: "from-emerald-600 via-teal-600 to-cyan-600",
            lessons: [
                {
                    id: 2,
                    title: "Predictive Customer Success",
                    icon: "🔮",
                    color: "from-purple-500 to-indigo-600",
                    tagline: "Anticipating customer needs before they become problems",
                    duration: "16 min",
                    keyTakeaway: "Proactive customer success prevents churn and drives expansion",
                    sections: [
                        {
                            title: "Customer Health Scoring",
                            content: {
                                type: "scorecard",
                                metrics: [
                                    { metric: "Product Usage", weight: 30, current: 85, target: 80 },
                                    { metric: "Support Tickets", weight: 25, current: 2, target: 3 },
                                    { metric: "Payment Status", weight: 20, current: 100, target: 100 },
                                    { metric: "Engagement Score", weight: 25, current: 78, target: 75 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "Module 4: Proactive Customer Experience",
            subtitle: "Anticipating Needs and Preventing Problems Before They Happen",
            color: "from-violet-600 via-purple-600 to-fuchsia-600",
            lessons: [
                {
                    id: 3,
                    title: "Predictive Customer Analytics",
                    icon: "📊",
                    color: "from-blue-500 to-purple-600",
                    tagline: "Using data to anticipate customer needs and behaviors",
                    duration: "18 min",
                    keyTakeaway: "Data-driven insights enable proactive customer success",
                    sections: [
                        {
                            title: "Customer Health Scoring Framework",
                            content: {
                                type: "scorecard",
                                metrics: [
                                    { metric: "Product Usage Frequency", weight: 25, current: 85, target: 80 },
                                    { metric: "Support Ticket Volume", weight: 20, current: 2, target: 3 },
                                    { metric: "Payment History", weight: 15, current: 100, target: 100 },
                                    { metric: "Feature Adoption Rate", weight: 20, current: 78, target: 75 },
                                    { metric: "Engagement Score", weight: 20, current: 92, target: 85 }
                                ]
                            }
                        },
                        {
                            title: "Early Warning Indicators",
                            content: {
                                type: "triggers",
                                items: [
                                    { type: "Behavioral", triggers: ["Decreased login frequency", "Reduced feature usage", "Longer session gaps", "Changed usage patterns"] },
                                    { type: "Transactional", triggers: ["Payment delays", "Support ticket spikes", "Feature requests decline", "Contract renewal concerns"] }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Proactive Outreach Strategies",
                    icon: "📞",
                    color: "from-green-500 to-teal-600",
                    tagline: "Reaching out before customers reach out to you",
                    duration: "16 min",
                    keyTakeaway: "Proactive communication prevents problems and builds loyalty",
                    sections: [
                        {
                            title: "Outreach Timing Matrix",
                            content: {
                                type: "matrix",
                                quadrants: [
                                    { position: "High Risk, High Value", title: "Immediate Intervention", description: "Executive escalation, dedicated support", color: "from-red-500 to-pink-600" },
                                    { position: "High Risk, Low Value", title: "Automated Outreach", description: "Email sequences, in-app messages", color: "from-orange-500 to-yellow-600" },
                                    { position: "Low Risk, High Value", title: "Relationship Building", description: "Regular check-ins, success reviews", color: "from-blue-500 to-cyan-600" },
                                    { position: "Low Risk, Low Value", title: "Self-Service Optimization", description: "Knowledge base, tutorials", color: "from-green-500 to-emerald-600" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Customer Success Automation",
                    icon: "🤖",
                    color: "from-purple-500 to-indigo-600",
                    tagline: "Scaling proactive support through intelligent automation",
                    duration: "20 min",
                    keyTakeaway: "Automation amplifies human capabilities for better customer outcomes",
                    sections: [
                        {
                            title: "Automation Hierarchy",
                            content: {
                                type: "levels",
                                items: [
                                    { level: "Level 1", description: "Basic Triggers - Welcome emails, onboarding sequences" },
                                    { level: "Level 2", description: "Behavioral Triggers - Usage-based recommendations" },
                                    { level: "Level 3", description: "Predictive Triggers - AI-driven intervention timing" },
                                    { level: "Level 4", description: "Human-AI Hybrid - Automated insights for human action" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Journey Mapping & Optimization",
                    icon: "🗺️",
                    color: "from-cyan-500 to-blue-600",
                    tagline: "Understanding and improving the complete customer journey",
                    duration: "22 min",
                    keyTakeaway: "Journey optimization creates seamless customer experiences",
                    sections: [
                        {
                            title: "Journey Touchpoint Analysis",
                            content: {
                                type: "sequence",
                                items: [
                                    { stage: "Awareness", touchpoints: ["Marketing campaigns", "Website visits", "Social media"], emotions: ["Curious", "Interested", "Evaluating"] },
                                    { stage: "Consideration", touchpoints: ["Product demos", "Sales calls", "Free trials"], emotions: ["Comparing", "Analyzing", "Deciding"] },
                                    { stage: "Purchase", touchpoints: ["Checkout process", "Payment", "Confirmation"], emotions: ["Committed", "Excited", "Nervous"] },
                                    { stage: "Onboarding", touchpoints: ["Welcome emails", "Setup guides", "First use"], emotions: ["Hopeful", "Frustrated", "Successful"] },
                                    { stage: "Adoption", touchpoints: ["Feature discovery", "Training", "Support"], emotions: ["Learning", "Confident", "Engaged"] },
                                    { stage: "Retention", touchpoints: ["Renewals", "Upsells", "Advocacy"], emotions: ["Satisfied", "Loyal", "Promoting"] }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 7,
                    title: "Feedback Loop Systems",
                    icon: "🔄",
                    color: "from-orange-500 to-red-600",
                    tagline: "Creating continuous improvement through customer insights",
                    duration: "14 min",
                    keyTakeaway: "Continuous feedback drives continuous improvement",
                    sections: [
                        {
                            title: "Feedback Collection Methods",
                            content: {
                                type: "channels",
                                items: [
                                    { channel: "In-App Surveys", description: "Contextual feedback during product use", response_rate: "45%" },
                                    { channel: "Email Surveys", description: "Comprehensive feedback collection", response_rate: "12%" },
                                    { channel: "Interview Programs", description: "Deep qualitative insights", response_rate: "8%" },
                                    { channel: "Social Listening", description: "Unstructured feedback monitoring", response_rate: "N/A" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 8,
                    title: "Churn Prevention Strategies",
                    icon: "🛡️",
                    color: "from-red-500 to-pink-600",
                    tagline: "Identifying and addressing churn risk before it happens",
                    duration: "19 min",
                    keyTakeaway: "Prevention is more cost-effective than retention",
                    sections: [
                        {
                            title: "Churn Risk Assessment",
                            content: {
                                type: "scorecard",
                                metrics: [
                                    { metric: "Usage Decline Rate", weight: 30, current: 15, target: 20 },
                                    { metric: "Support Ticket Frequency", weight: 25, current: 3, target: 5 },
                                    { metric: "Payment Delays", weight: 20, current: 0, target: 1 },
                                    { metric: "Feature Adoption", weight: 15, current: 60, target: 70 },
                                    { metric: "Engagement Score", weight: 10, current: 45, target: 50 }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 9,
                    title: "Upselling & Cross-selling",
                    icon: "📈",
                    color: "from-emerald-500 to-green-600",
                    tagline: "Growing customer value through strategic recommendations",
                    duration: "17 min",
                    keyTakeaway: "Strategic expansion creates mutual value",
                    sections: [
                        {
                            title: "Upsell Timing Framework",
                            content: {
                                type: "framework-steps",
                                steps: [
                                    { step: "Success Validation", description: "Confirm current value realization", timing: "Month 2-3" },
                                    { step: "Usage Analysis", description: "Identify expansion opportunities", timing: "Month 4-6" },
                                    { step: "Value Demonstration", description: "Show ROI of additional features", timing: "Month 6-9" },
                                    { step: "Strategic Proposal", description: "Present tailored upgrade path", timing: "Month 9-12" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 10,
                    title: "Customer Advocacy Programs",
                    icon: "⭐",
                    color: "from-yellow-500 to-orange-600",
                    tagline: "Turning satisfied customers into brand ambassadors",
                    duration: "15 min",
                    keyTakeaway: "Advocacy programs amplify customer success",
                    sections: [
                        {
                            title: "Advocacy Program Structure",
                            content: {
                                type: "pillars",
                                items: [
                                    { icon: "🎯", title: "Referral Programs", description: "Incentivized customer-to-customer recommendations" },
                                    { icon: "📝", title: "Review Management", description: "Systematic collection and management of testimonials" },
                                    { icon: "🎤", title: "Case Study Development", description: "Detailed success stories for marketing use" },
                                    { icon: "🤝", title: "Community Building", description: "Creating spaces for customer-to-customer interaction" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 11,
                    title: "Technology Stack Integration",
                    icon: "⚙️",
                    color: "from-gray-500 to-slate-600",
                    tagline: "Leveraging tools and platforms for proactive CX",
                    duration: "21 min",
                    keyTakeaway: "Integrated technology enables seamless proactive experiences",
                    sections: [
                        {
                            title: "CX Technology Ecosystem",
                            content: {
                                type: "partnership",
                                items: [
                                    { 
                                        type: "Core Platforms",
                                        tasks: ["CRM systems", "Customer success platforms", "Analytics tools", "Communication channels"],
                                        efficiency: "Centralized data"
                                    },
                                    { 
                                        type: "Integration Layer",
                                        tasks: ["API connections", "Data synchronization", "Workflow automation", "Real-time alerts"],
                                        value: "Seamless operations"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 12,
                    title: "Measuring Proactive Success",
                    icon: "📊",
                    color: "from-indigo-500 to-purple-600",
                    tagline: "KPIs and metrics for proactive customer experience",
                    duration: "13 min",
                    keyTakeaway: "What gets measured gets managed and improved",
                    sections: [
                        {
                            title: "Proactive CX Metrics Dashboard",
                            content: {
                                type: "metrics",
                                items: [
                                    { metric: "Proactive Contact Rate", value: "78%", trend: "+15%", description: "Percentage of interactions we initiate" },
                                    { metric: "Issue Prevention Rate", value: "65%", trend: "+8%", description: "Problems solved before customer reports" },
                                    { metric: "Customer Health Score", value: "8.2/10", trend: "+0.5", description: "Average customer health rating" },
                                    { metric: "Expansion Revenue", value: "$2.3M", trend: "+23%", description: "Revenue from upsells and cross-sells" }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            title: "Module 5: Specialist Skills & Technical Mastery",
            subtitle: "Advanced Technical Expertise and Industry Specialization",
            color: "from-amber-600 via-orange-600 to-red-600",
            lessons: [
                {
                    id: 13,
                    title: "AI & Machine Learning Integration",
                    icon: "🤖",
                    color: "from-blue-500 to-purple-600",
                    tagline: "Leveraging artificial intelligence to enhance customer experience",
                    duration: "24 min",
                    keyTakeaway: "AI amplifies human capabilities for superior customer outcomes",
                    sections: [
                        {
                            title: "AI Implementation Framework",
                            content: {
                                type: "partnership",
                                items: [
                                    { 
                                        type: "AI-Powered Features",
                                        tasks: ["Predictive analytics", "Automated responses", "Sentiment analysis", "Personalization engines"],
                                        efficiency: "85% accuracy"
                                    },
                                    { 
                                        type: "Human Oversight",
                                        tasks: ["Quality assurance", "Complex problem solving", "Relationship management", "Strategic decisions"],
                                        value: "Enhanced trust"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 14,
                    title: "Advanced Analytics & Data Science",
                    icon: "📊",
                    color: "from-green-500 to-teal-600",
                    tagline: "Transforming customer data into actionable insights",
                    duration: "22 min",
                    keyTakeaway: "Data-driven decisions create competitive advantages",
                    sections: [
                        {
                            title: "Customer Data Analytics Stack",
                            content: {
                                type: "levels",
                                items: [
                                    { level: "Level 1", description: "Descriptive Analytics - What happened? Historical data analysis" },
                                    { level: "Level 2", description: "Diagnostic Analytics - Why did it happen? Root cause analysis" },
                                    { level: "Level 3", description: "Predictive Analytics - What will happen? Forecasting and modeling" },
                                    { level: "Level 4", description: "Prescriptive Analytics - What should we do? Actionable recommendations" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 15,
                    title: "Omnichannel Integration",
                    icon: "🔗",
                    color: "from-purple-500 to-indigo-600",
                    tagline: "Seamlessly connecting all customer touchpoints",
                    duration: "20 min",
                    keyTakeaway: "Seamless omnichannel experiences drive customer loyalty",
                    sections: [
                        {
                            title: "Channel Integration Matrix",
                            content: {
                                type: "matrix",
                                quadrants: [
                                    { position: "High Touch, Synchronized", title: "Phone + Chat", description: "Real-time handoff with context", color: "from-blue-500 to-cyan-600" },
                                    { position: "High Touch, Asynchronous", title: "Email + Social", description: "Delayed but contextual responses", color: "from-green-500 to-emerald-600" },
                                    { position: "Low Touch, Synchronized", title: "App + Web", description: "Seamless cross-platform experience", color: "from-purple-500 to-violet-600" },
                                    { position: "Low Touch, Asynchronous", title: "SMS + Email", description: "Automated but personalized messaging", color: "from-orange-500 to-yellow-600" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 16,
                    title: "CRM Mastery & Customization",
                    icon: "📋",
                    color: "from-cyan-500 to-blue-600",
                    tagline: "Maximizing CRM systems for superior customer management",
                    duration: "26 min",
                    keyTakeaway: "Optimized CRM systems drive operational excellence",
                    sections: [
                        {
                            title: "CRM Optimization Framework",
                            content: {
                                type: "framework-steps",
                                steps: [
                                    { step: "Data Quality Audit", description: "Clean and standardize customer data", timing: "Week 1-2" },
                                    { step: "Workflow Design", description: "Create efficient customer interaction processes", timing: "Week 3-4" },
                                    { step: "Automation Setup", description: "Implement automated tasks and triggers", timing: "Week 5-6" },
                                    { step: "Integration Testing", description: "Connect with other business systems", timing: "Week 7-8" },
                                    { step: "Team Training", description: "Educate staff on new processes", timing: "Week 9-10" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 17,
                    title: "Industry-Specific Expertise",
                    icon: "🏭",
                    color: "from-orange-500 to-red-600",
                    tagline: "Deep knowledge for specialized customer service domains",
                    duration: "28 min",
                    keyTakeaway: "Industry expertise creates differentiated value",
                    sections: [
                        {
                            title: "Industry Specialization Areas",
                            content: {
                                type: "pillars",
                                items: [
                                    { icon: "🏥", title: "Healthcare", description: "HIPAA compliance, medical terminology, patient privacy" },
                                    { icon: "🏦", title: "Financial Services", description: "Regulatory compliance, fraud prevention, risk management" },
                                    { icon: "🛒", title: "E-commerce", description: "Order fulfillment, payment processing, return policies" },
                                    { icon: "💻", title: "SaaS Technology", description: "API integrations, subscription management, technical support" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 18,
                    title: "Advanced Communication Tools",
                    icon: "💬",
                    color: "from-emerald-500 to-green-600",
                    tagline: "Mastering modern communication platforms and techniques",
                    duration: "18 min",
                    keyTakeaway: "Modern communication tools enhance customer connections",
                    sections: [
                        {
                            title: "Communication Platform Mastery",
                            content: {
                                type: "channels",
                                items: [
                                    { channel: "Live Chat Systems", description: "Real-time customer support with co-browsing", response_rate: "95%" },
                                    { channel: "Video Support", description: "Face-to-face technical assistance", response_rate: "88%" },
                                    { channel: "Social Media", description: "Public customer service and brand management", response_rate: "72%" },
                                    { channel: "Messaging Apps", description: "WhatsApp, Telegram, and platform-specific messaging", response_rate: "91%" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 19,
                    title: "Quality Assurance & Monitoring",
                    icon: "✅",
                    color: "from-yellow-500 to-orange-600",
                    tagline: "Ensuring consistent excellence across all interactions",
                    duration: "16 min",
                    keyTakeaway: "Quality assurance ensures consistent customer experiences",
                    sections: [
                        {
                            title: "Quality Metrics Framework",
                            content: {
                                type: "scorecard",
                                metrics: [
                                    { metric: "Response Time", weight: 20, current: 2.3, target: 2.0 },
                                    { metric: "Resolution Rate", weight: 25, current: 89, target: 90 },
                                    { metric: "Customer Satisfaction", weight: 30, current: 4.7, target: 4.8 },
                                    { metric: "First Contact Resolution", weight: 25, current: 78, target: 80 }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 20,
                    title: "Security & Compliance",
                    icon: "🔒",
                    color: "from-red-500 to-pink-600",
                    tagline: "Protecting customer data and ensuring regulatory compliance",
                    duration: "20 min",
                    keyTakeaway: "Security and compliance build customer trust",
                    sections: [
                        {
                            title: "Compliance Framework",
                            content: {
                                type: "regulations",
                                items: [
                                    { regulation: "GDPR", requirements: ["Data consent", "Right to deletion", "Data portability", "Breach notification"] },
                                    { regulation: "CCPA", requirements: ["Privacy notices", "Opt-out rights", "Data disclosure", "Non-discrimination"] },
                                    { regulation: "HIPAA", requirements: ["Patient privacy", "Secure communications", "Access controls", "Audit trails"] },
                                    { regulation: "PCI DSS", requirements: ["Secure payment processing", "Data encryption", "Access restrictions", "Regular testing"] }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 21,
                    title: "Process Optimization & Automation",
                    icon: "⚡",
                    color: "from-indigo-500 to-purple-600",
                    tagline: "Streamlining operations for maximum efficiency",
                    duration: "22 min",
                    keyTakeaway: "Optimized processes drive efficiency and customer satisfaction",
                    sections: [
                        {
                            title: "Automation Implementation Roadmap",
                            content: {
                                type: "sequence",
                                items: [
                                    { stage: "Assessment", touchpoints: ["Process mapping", "Bottleneck identification", "ROI analysis"], emotions: ["Analytical", "Strategic", "Focused"] },
                                    { stage: "Design", touchpoints: ["Workflow design", "Tool selection", "Integration planning"], emotions: ["Creative", "Optimistic", "Determined"] },
                                    { stage: "Implementation", touchpoints: ["Pilot testing", "Staff training", "System deployment"], emotions: ["Cautious", "Excited", "Confident"] },
                                    { stage: "Optimization", touchpoints: ["Performance monitoring", "Continuous improvement", "Scale expansion"], emotions: ["Satisfied", "Ambitious", "Successful"] }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 22,
                    title: "Technical Troubleshooting Mastery",
                    icon: "🔧",
                    color: "from-gray-500 to-slate-600",
                    tagline: "Advanced problem-solving for complex technical issues",
                    duration: "24 min",
                    keyTakeaway: "Systematic troubleshooting resolves complex issues efficiently",
                    sections: [
                        {
                            title: "Troubleshooting Methodology",
                            content: {
                                type: "techniques",
                                items: [
                                    { technique: "Systematic Diagnosis", description: "Step-by-step problem identification", example: "Check logs → Test components → Isolate variables" },
                                    { technique: "Root Cause Analysis", description: "Identify underlying issues, not just symptoms", example: "Why did the system fail? What changed?" },
                                    { technique: "Knowledge Base Utilization", description: "Leverage existing solutions and documentation", example: "Search internal KB → Check vendor resources" }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            title: "Module 6: Career Mastery & Leadership Excellence",
            subtitle: "Executive Presence, Strategic Thinking, and Long-Term Career Success",
            color: "from-rose-600 via-pink-600 to-purple-600",
            lessons: [
                {
                    id: 23,
                    title: "Executive Communication & Presence",
                    icon: "🎤",
                    color: "from-indigo-500 to-purple-600",
                    tagline: "Speaking the language of business leaders and building executive presence",
                    duration: "26 min",
                    keyTakeaway: "Executive presence opens doors to leadership opportunities",
                    sections: [
                        {
                            title: "Executive Communication Framework",
                            content: {
                                type: "communication-guide",
                                steps: [
                                    { step: "Hook", description: "Start with impact or insight", example: "We can reduce churn by 15%" },
                                    { step: "Context", description: "Provide relevant background", example: "Current churn rate is 25%" },
                                    { step: "Solution", description: "Present your recommendation", example: "Implement proactive outreach" },
                                    { step: "Action", description: "Define next steps", example: "Pilot with top 100 customers" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 24,
                    title: "Strategic Thinking & Business Acumen",
                    icon: "🧠",
                    color: "from-blue-500 to-cyan-600",
                    tagline: "Developing the mindset of a strategic business leader",
                    duration: "28 min",
                    keyTakeaway: "Strategic thinking drives business value and career advancement",
                    sections: [
                        {
                            title: "Strategic Framework Components",
                            content: {
                                type: "framework-steps",
                                steps: [
                                    { step: "Market Analysis", description: "Understand industry trends and competitive landscape", timing: "Ongoing" },
                                    { step: "Customer Insights", description: "Deep dive into customer needs and behaviors", timing: "Quarterly" },
                                    { step: "Resource Assessment", description: "Evaluate internal capabilities and constraints", timing: "Monthly" },
                                    { step: "Strategic Planning", description: "Develop long-term vision and execution roadmap", timing: "Annually" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 25,
                    title: "Team Leadership & Management",
                    icon: "👥",
                    color: "from-green-500 to-teal-600",
                    tagline: "Leading high-performing customer experience teams",
                    duration: "24 min",
                    keyTakeaway: "Great leaders develop great teams",
                    sections: [
                        {
                            title: "Leadership Styles Matrix",
                            content: {
                                type: "matrix",
                                quadrants: [
                                    { position: "High Support, High Direction", title: "Coaching Leader", description: "Develop skills while providing guidance", color: "from-blue-500 to-cyan-600" },
                                    { position: "High Support, Low Direction", title: "Supporting Leader", description: "Empower team members to take ownership", color: "from-green-500 to-emerald-600" },
                                    { position: "Low Support, High Direction", title: "Directing Leader", description: "Clear instructions for new or struggling team members", color: "from-orange-500 to-yellow-600" },
                                    { position: "Low Support, Low Direction", title: "Delegating Leader", description: "Hand off tasks to capable, motivated team members", color: "from-purple-500 to-violet-600" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 26,
                    title: "Change Management & Transformation",
                    icon: "🔄",
                    color: "from-purple-500 to-indigo-600",
                    tagline: "Leading organizational change and CX transformation initiatives",
                    duration: "22 min",
                    keyTakeaway: "Change leadership drives organizational success",
                    sections: [
                        {
                            title: "Change Management Process",
                            content: {
                                type: "sequence",
                                items: [
                                    { stage: "Assessment", touchpoints: ["Current state analysis", "Stakeholder mapping", "Impact assessment"], emotions: ["Analytical", "Curious", "Concerned"] },
                                    { stage: "Planning", touchpoints: ["Change strategy", "Communication plan", "Training design"], emotions: ["Strategic", "Optimistic", "Focused"] },
                                    { stage: "Implementation", touchpoints: ["Pilot programs", "Rollout execution", "Support systems"], emotions: ["Cautious", "Excited", "Determined"] },
                                    { stage: "Sustainment", touchpoints: ["Performance monitoring", "Continuous improvement", "Culture reinforcement"], emotions: ["Satisfied", "Proud", "Committed"] }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 27,
                    title: "Financial Acumen & ROI Measurement",
                    icon: "💰",
                    color: "from-emerald-500 to-green-600",
                    tagline: "Understanding business metrics and demonstrating CX value",
                    duration: "20 min",
                    keyTakeaway: "Financial acumen demonstrates business value",
                    sections: [
                        {
                            title: "CX Financial Metrics Dashboard",
                            content: {
                                type: "metrics",
                                items: [
                                    { metric: "Customer Lifetime Value", value: "$12,450", trend: "+18%", description: "Average revenue per customer over their lifetime" },
                                    { metric: "Cost Per Acquisition", value: "$185", trend: "-12%", description: "Marketing cost to acquire new customers" },
                                    { metric: "Customer Retention Rate", value: "87%", trend: "+5%", description: "Percentage of customers retained annually" },
                                    { metric: "CX ROI", value: "340%", trend: "+45%", description: "Return on investment for CX initiatives" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 28,
                    title: "Innovation & Future-Proofing",
                    icon: "🚀",
                    color: "from-cyan-500 to-blue-600",
                    tagline: "Staying ahead of trends and driving innovation in CX",
                    duration: "18 min",
                    keyTakeaway: "Innovation leadership creates competitive advantages",
                    sections: [
                        {
                            title: "Emerging CX Technologies",
                            content: {
                                type: "list",
                                items: [
                                    "AI-powered personalization engines",
                                    "Voice commerce integration",
                                    "Augmented reality support experiences",
                                    "Predictive customer analytics",
                                    "Blockchain verification systems",
                                    "IoT device integration",
                                    "Emotional AI and sentiment analysis",
                                    "Virtual reality customer training"
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 29,
                    title: "Personal Brand & Thought Leadership",
                    icon: "⭐",
                    color: "from-yellow-500 to-orange-600",
                    tagline: "Building your reputation as a CX expert and industry leader",
                    duration: "16 min",
                    keyTakeaway: "Personal brand amplifies career opportunities",
                    sections: [
                        {
                            title: "Personal Brand Building Strategy",
                            content: {
                                type: "framework-steps",
                                steps: [
                                    { step: "Define Your Niche", description: "Identify your unique expertise and value proposition", timing: "Month 1" },
                                    { step: "Content Creation", description: "Develop thought leadership content and insights", timing: "Month 2-3" },
                                    { step: "Network Building", description: "Connect with industry peers and influencers", timing: "Month 4-6" },
                                    { step: "Speaking & Writing", description: "Share expertise through conferences and publications", timing: "Month 6-12" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 30,
                    title: "Career Development & Advancement",
                    icon: "📈",
                    color: "from-red-500 to-pink-600",
                    tagline: "Strategic career planning and advancement strategies",
                    duration: "24 min",
                    keyTakeaway: "Strategic career planning accelerates advancement",
                    sections: [
                        {
                            title: "Career Advancement Framework",
                            content: {
                                type: "levels",
                                items: [
                                    { level: "Level 1", description: "Individual Contributor - Master your craft and deliver excellence" },
                                    { level: "Level 2", description: "Team Lead - Guide others and manage small teams" },
                                    { level: "Level 3", description: "Manager - Lead departments and drive operational excellence" },
                                    { level: "Level 4", description: "Director/VP - Shape strategy and lead organizational change" },
                                    { level: "Level 5", description: "C-Level - Set vision and drive company-wide transformation" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 31,
                    title: "Mentoring & Knowledge Transfer",
                    icon: "🎓",
                    color: "from-indigo-500 to-purple-600",
                    tagline: "Developing others and building organizational capability",
                    duration: "14 min",
                    keyTakeaway: "Mentoring creates lasting impact and legacy",
                    sections: [
                        {
                            title: "Mentoring Excellence Framework",
                            content: {
                                type: "pillars",
                                items: [
                                    { icon: "🎯", title: "Goal Setting", description: "Help mentees define and achieve career objectives" },
                                    { icon: "💡", title: "Knowledge Sharing", description: "Transfer expertise and industry insights" },
                                    { icon: "🤝", title: "Relationship Building", description: "Create trust and open communication channels" },
                                    { icon: "📊", title: "Progress Tracking", description: "Monitor development and celebrate achievements" }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: 32,
                    title: "Global CX Leadership",
                    icon: "🌍",
                    color: "from-teal-500 to-green-600",
                    tagline: "Leading customer experience across cultures and markets",
                    duration: "20 min",
                    keyTakeaway: "Global leadership requires cultural intelligence",
                    sections: [
                        {
                            title: "Global CX Considerations",
                            content: {
                                type: "techniques",
                                items: [
                                    { technique: "Cultural Adaptation", description: "Tailor CX strategies to local cultural norms", example: "High-context vs low-context communication styles" },
                                    { technique: "Regulatory Compliance", description: "Navigate different legal and regulatory environments", example: "GDPR in EU vs CCPA in California" },
                                    { technique: "Technology Infrastructure", description: "Account for varying technological capabilities", example: "Mobile-first strategies in emerging markets" }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ];

    const quizQuestions = [
        // Module 1 questions
        {
            id: 1,
            module: 1,
            question: "What is the primary difference between customer service and customer experience?",
            options: [
                "Customer service is reactive; customer experience is proactive",
                "Customer service is free; customer experience costs money", 
                "Customer service is one touchpoint; customer experience is the entire journey",
                "Customer service is operational; customer experience is strategic"
            ],
            correct: "C",
            explanation: "Customer service is a single touchpoint (like support), while customer experience encompasses every interaction a customer has with your company across the entire journey.",
            difficulty: "Foundational"
        },
        {
            id: 2,
            module: 1,
            question: "According to the training, what percentage of buying decisions are based on emotion rather than logic?",
            options: ["50%", "65%", "75%", "95%"],
            correct: "D",
            explanation: "Research shows 95% of buying decisions are emotional, not logical, highlighting the critical importance of emotional connection in CX.",
            difficulty: "Foundational"
        }
    ];

    const currentModuleData = modules[currentModule];
    const currentLessonData = currentModuleData.lessons[currentLesson];
    const globalLessonId = modules.slice(0, currentModule).reduce((sum, m) => sum + m.lessons.length, 0) + currentLesson;
    
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const progress = Math.round((completedLessons.length / totalLessons) * 100);

    // Rest of the component logic would go here...
    // This is a simplified version focusing on the module structure

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Customer Experience Masterclass
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <div key={module.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-bold text-white mb-2">{module.title}</h2>
                            <p className="text-white/80 text-sm mb-4">{module.subtitle}</p>
                            <div className="text-white/60 text-xs">
                                {module.lessons.length} lessons
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<EQMasterclassApp />, document.getElementById('root'));
