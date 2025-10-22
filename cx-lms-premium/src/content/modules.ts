import type { Module } from './types';

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Emotional Intelligence Foundations',
    subtitle: 'Building the Inner Core of Customer Excellence',
    color: 'from-indigo-600 via-purple-600 to-pink-600',
    videoUrl: '/videos/module-1-overview.mp4',
    audioUrl: '/audio/module-1-podcast.mp3',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'The Psychology of Customer Experience',
        tagline: 'Understanding the emotional drivers behind every customer interaction',
        icon: '🧠',
        color: 'from-blue-500 to-purple-600',
        durationMin: 15,
        videoUrl: '/videos/lesson-1-1.mp4',
        audioUrl: '/audio/lesson-1-1-podcast.mp3',
        sections: [
          {
            id: 'section-1-1-1',
            title: 'The Emotional Brain',
            kind: 'text',
            body: 'Customer experience is fundamentally emotional. Research shows that 95% of buying decisions are made emotionally, not logically. Understanding this psychological foundation is crucial for creating meaningful connections.',
            videoUrl: '/videos/section-1-1-1.mp4'
          },
          {
            id: 'section-1-1-2',
            title: 'The Four Pillars of Emotional Intelligence',
            kind: 'pillars',
            items: [
              { icon: '🎯', title: 'Self-Awareness', description: 'Recognizing your own emotions and their impact on customer interactions' },
              { icon: '🎭', title: 'Self-Regulation', description: 'Managing your emotional responses in challenging situations' },
              { icon: '👥', title: 'Social Awareness', description: 'Understanding customer emotions and reading social cues' },
              { icon: '🤝', title: 'Relationship Management', description: 'Building and maintaining positive customer relationships' }
            ]
          },
          {
            id: 'section-1-1-3',
            title: 'Customer Experience Statistics',
            kind: 'stats',
            items: [
              { value: '95%', label: 'Emotional Decision Making', description: 'Percentage of buying decisions made emotionally' },
              { value: '73%', label: 'Customer Loyalty', description: 'Customers stay loyal due to emotional connection' },
              { value: '5x', label: 'Revenue Impact', description: 'Emotionally connected customers spend 5x more' },
              { value: '86%', label: 'Willingness to Pay', description: 'Customers pay more for better experiences' }
            ]
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title: 'The Empathy Formula',
        tagline: 'A systematic approach to understanding and responding to customer emotions',
        icon: '💝',
        color: 'from-pink-500 to-rose-600',
        durationMin: 12,
        videoUrl: '/videos/lesson-1-2.mp4',
        audioUrl: '/audio/lesson-1-2-podcast.mp3',
        sections: [
          {
            id: 'section-1-2-1',
            title: 'Acknowledge + Validate + Action',
            kind: 'formula',
            body: 'The three-step empathy formula that transforms customer interactions: Acknowledge their situation, Validate their emotions, and take Action to resolve their needs.',
            videoUrl: '/videos/section-1-2-1.mp4'
          },
          {
            id: 'section-1-2-2',
            title: 'Emotional Triggers',
            kind: 'triggers',
            items: [
              { type: 'External', triggers: ['Long wait times', 'Poor product quality', 'Unclear communication', 'Unexpected charges'] },
              { type: 'Internal', triggers: ['Past negative experiences', 'High expectations', 'Time pressure', 'Personal stress'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title: 'Active Listening Mastery',
        tagline: 'The art of truly hearing what customers are saying',
        icon: '👂',
        color: 'from-green-500 to-teal-600',
        durationMin: 10,
        videoUrl: '/videos/lesson-1-3.mp4',
        audioUrl: '/audio/lesson-1-3-podcast.mp3',
        sections: [
          {
            id: 'section-1-3-1',
            title: 'The Listening Hierarchy',
            kind: 'levels',
            items: [
              { level: 'Level 1', description: 'Hearing - Physical act of receiving sound' },
              { level: 'Level 2', description: 'Understanding - Comprehending the words' },
              { level: 'Level 3', description: 'Empathizing - Feeling what they feel' },
              { level: 'Level 4', description: 'Responding - Taking appropriate action' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Operational Excellence',
    subtitle: 'Systems, Processes, and Performance Optimization',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    videoUrl: '/videos/module-2-overview.mp4',
    audioUrl: '/audio/module-2-podcast.mp3',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Support Channel Optimization',
        tagline: 'Choosing the right channel for the right customer at the right time',
        icon: '📞',
        color: 'from-blue-500 to-indigo-600',
        durationMin: 18,
        videoUrl: '/videos/lesson-2-1.mp4',
        audioUrl: '/audio/lesson-2-1-podcast.mp3',
        sections: [
          {
            id: 'section-2-1-1',
            title: 'Channel Comparison Matrix',
            kind: 'matrix',
            quadrants: [
              { position: 'High Touch, High Cost', title: 'Phone Support', description: 'Personal, immediate, expensive', color: 'from-red-500 to-pink-600' },
              { position: 'High Touch, Low Cost', title: 'Chat Support', description: 'Personal, efficient, scalable', color: 'from-blue-500 to-cyan-600' },
              { position: 'Low Touch, High Cost', title: 'Email Support', description: 'Detailed, slow, resource-intensive', color: 'from-yellow-500 to-orange-600' },
              { position: 'Low Touch, Low Cost', title: 'Self-Service', description: 'Instant, scalable, cost-effective', color: 'from-green-500 to-emerald-600' }
            ]
          }
        ]
      },
      {
        id: 'lesson-2-2',
        title: 'Knowledge Management',
        tagline: 'Building and maintaining a world-class knowledge base',
        icon: '📚',
        color: 'from-purple-500 to-violet-600',
        durationMin: 14,
        videoUrl: '/videos/lesson-2-2.mp4',
        audioUrl: '/audio/lesson-2-2-podcast.mp3',
        sections: [
          {
            id: 'section-2-2-1',
            title: 'Search Optimization Tips',
            kind: 'search-tips',
            items: [
              { tip: 'Use quotes', what: '"exact phrase" for precise matches', example: '"reset password" instead of reset password' },
              { tip: 'Use operators', what: 'AND, OR, NOT to refine', example: 'billing AND invoice NOT pdf' },
              { tip: 'Search by category', what: 'Filter by topic/product', example: 'Category: Billing > Keyword: dispute' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Proactive CX & Strategic Retention',
    subtitle: 'From Reactive Support to Strategic Customer Success',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    videoUrl: '/videos/module-3-overview.mp4',
    audioUrl: '/audio/module-3-podcast.mp3',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Predictive Customer Success',
        tagline: 'Anticipating customer needs before they become problems',
        icon: '🔮',
        color: 'from-purple-500 to-indigo-600',
        durationMin: 16,
        videoUrl: '/videos/lesson-3-1.mp4',
        audioUrl: '/audio/lesson-3-1-podcast.mp3',
        sections: [
          {
            id: 'section-3-1-1',
            title: 'Customer Health Scoring',
            kind: 'scorecard',
            metrics: [
              { metric: 'Product Usage', weight: 30, current: 85, target: 80 },
              { metric: 'Support Tickets', weight: 25, current: 2, target: 3 },
              { metric: 'Payment Status', weight: 20, current: 100, target: 100 },
              { metric: 'Engagement Score', weight: 25, current: 78, target: 75 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: Proactive Customer Experience',
    subtitle: 'Anticipating Needs and Preventing Problems Before They Happen',
    color: 'from-violet-600 via-purple-600 to-fuchsia-600',
    videoUrl: '/videos/module-4-overview.mp4',
    audioUrl: '/audio/module-4-podcast.mp3',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Predictive Customer Analytics',
        tagline: 'Using data to anticipate customer needs and behaviors',
        icon: '📊',
        color: 'from-blue-500 to-purple-600',
        durationMin: 18,
        videoUrl: '/videos/lesson-4-1.mp4',
        audioUrl: '/audio/lesson-4-1-podcast.mp3',
        sections: [
          {
            id: 'section-4-1-1',
            title: 'Customer Health Scoring Framework',
            kind: 'scorecard',
            metrics: [
              { metric: 'Product Usage Frequency', weight: 25, current: 85, target: 80 },
              { metric: 'Support Ticket Volume', weight: 20, current: 2, target: 3 },
              { metric: 'Payment History', weight: 15, current: 100, target: 100 },
              { metric: 'Feature Adoption Rate', weight: 20, current: 78, target: 75 },
              { metric: 'Engagement Score', weight: 20, current: 92, target: 85 }
            ]
          },
          {
            id: 'section-4-1-2',
            title: 'Early Warning Indicators',
            kind: 'triggers',
            items: [
              { type: 'Behavioral', triggers: ['Decreased login frequency', 'Reduced feature usage', 'Longer session gaps', 'Changed usage patterns'] },
              { type: 'Transactional', triggers: ['Payment delays', 'Support ticket spikes', 'Feature requests decline', 'Contract renewal concerns'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-2',
        title: 'Proactive Outreach Strategies',
        tagline: 'Reaching out before customers reach out to you',
        icon: '📞',
        color: 'from-green-500 to-teal-600',
        durationMin: 16,
        videoUrl: '/videos/lesson-4-2.mp4',
        audioUrl: '/audio/lesson-4-2-podcast.mp3',
        sections: [
          {
            id: 'section-4-2-1',
            title: 'Outreach Timing Matrix',
            kind: 'matrix',
            quadrants: [
              { position: 'High Risk, High Value', title: 'Immediate Intervention', description: 'Executive escalation, dedicated support', color: 'from-red-500 to-pink-600' },
              { position: 'High Risk, Low Value', title: 'Automated Outreach', description: 'Email sequences, in-app messages', color: 'from-orange-500 to-yellow-600' },
              { position: 'Low Risk, High Value', title: 'Relationship Building', description: 'Regular check-ins, success reviews', color: 'from-blue-500 to-cyan-600' },
              { position: 'Low Risk, Low Value', title: 'Self-Service Optimization', description: 'Knowledge base, tutorials', color: 'from-green-500 to-emerald-600' }
            ]
          },
          {
            id: 'section-4-2-2',
            title: 'Personalization Techniques',
            kind: 'techniques',
            items: [
              { technique: 'Contextual Messaging', description: 'Reference specific usage patterns and behaviors', example: 'We noticed you haven\'t used Feature X recently...' },
              { technique: 'Value-Based Outreach', description: 'Connect outreach to business outcomes', example: 'This could save you 5 hours per week...' },
              { technique: 'Peer Insights', description: 'Share relevant success stories', example: 'Companies like yours typically see...' }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-3',
        title: 'Customer Success Automation',
        tagline: 'Scaling proactive support through intelligent automation',
        icon: '🤖',
        color: 'from-purple-500 to-indigo-600',
        durationMin: 20,
        videoUrl: '/videos/lesson-4-3.mp4',
        audioUrl: '/audio/lesson-4-3-podcast.mp3',
        sections: [
          {
            id: 'section-4-3-1',
            title: 'Automation Hierarchy',
            kind: 'levels',
            items: [
              { level: 'Level 1', description: 'Basic Triggers - Welcome emails, onboarding sequences' },
              { level: 'Level 2', description: 'Behavioral Triggers - Usage-based recommendations' },
              { level: 'Level 3', description: 'Predictive Triggers - AI-driven intervention timing' },
              { level: 'Level 4', description: 'Human-AI Hybrid - Automated insights for human action' }
            ]
          },
          {
            id: 'section-4-3-2',
            title: 'Success Metrics Dashboard',
            kind: 'metrics',
            items: [
              { metric: 'Proactive Touchpoints', value: '85%', trend: '+12%', description: 'Percentage of customer interactions initiated by us' },
              { metric: 'Issue Prevention Rate', value: '73%', trend: '+8%', description: 'Problems resolved before customer reports them' },
              { metric: 'Customer Satisfaction', value: '4.8/5', trend: '+0.3', description: 'Average rating for proactive interactions' },
              { metric: 'Retention Impact', value: '23%', trend: '+5%', description: 'Improvement in customer retention rates' }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-4',
        title: 'Journey Mapping & Optimization',
        tagline: 'Understanding and improving the complete customer journey',
        icon: '🗺️',
        color: 'from-cyan-500 to-blue-600',
        durationMin: 22,
        videoUrl: '/videos/lesson-4-4.mp4',
        audioUrl: '/audio/lesson-4-4-podcast.mp3',
        sections: [
          {
            id: 'section-4-4-1',
            title: 'Journey Touchpoint Analysis',
            kind: 'sequence',
            items: [
              { stage: 'Awareness', touchpoints: ['Marketing campaigns', 'Website visits', 'Social media'], emotions: ['Curious', 'Interested', 'Evaluating'] },
              { stage: 'Consideration', touchpoints: ['Product demos', 'Sales calls', 'Free trials'], emotions: ['Comparing', 'Analyzing', 'Deciding'] },
              { stage: 'Purchase', touchpoints: ['Checkout process', 'Payment', 'Confirmation'], emotions: ['Committed', 'Excited', 'Nervous'] },
              { stage: 'Onboarding', touchpoints: ['Welcome emails', 'Setup guides', 'First use'], emotions: ['Hopeful', 'Frustrated', 'Successful'] },
              { stage: 'Adoption', touchpoints: ['Feature discovery', 'Training', 'Support'], emotions: ['Learning', 'Confident', 'Engaged'] },
              { stage: 'Retention', touchpoints: ['Renewals', 'Upsells', 'Advocacy'], emotions: ['Satisfied', 'Loyal', 'Promoting'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-5',
        title: 'Feedback Loop Systems',
        tagline: 'Creating continuous improvement through customer insights',
        icon: '🔄',
        color: 'from-orange-500 to-red-600',
        durationMin: 14,
        videoUrl: '/videos/lesson-4-5.mp4',
        audioUrl: '/audio/lesson-4-5-podcast.mp3',
        sections: [
          {
            id: 'section-4-5-1',
            title: 'Feedback Collection Methods',
            kind: 'channels',
            items: [
              { channel: 'In-App Surveys', description: 'Contextual feedback during product use', response_rate: '45%' },
              { channel: 'Email Surveys', description: 'Comprehensive feedback collection', response_rate: '12%' },
              { channel: 'Interview Programs', description: 'Deep qualitative insights', response_rate: '8%' },
              { channel: 'Social Listening', description: 'Unstructured feedback monitoring', response_rate: 'N/A' }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-6',
        title: 'Churn Prevention Strategies',
        tagline: 'Identifying and addressing churn risk before it happens',
        icon: '🛡️',
        color: 'from-red-500 to-pink-600',
        durationMin: 19,
        videoUrl: '/videos/lesson-4-6.mp4',
        audioUrl: '/audio/lesson-4-6-podcast.mp3',
        sections: [
          {
            id: 'section-4-6-1',
            title: 'Churn Risk Assessment',
            kind: 'scorecard',
            metrics: [
              { metric: 'Usage Decline Rate', weight: 30, current: 15, target: 20 },
              { metric: 'Support Ticket Frequency', weight: 25, current: 3, target: 5 },
              { metric: 'Payment Delays', weight: 20, current: 0, target: 1 },
              { metric: 'Feature Adoption', weight: 15, current: 60, target: 70 },
              { metric: 'Engagement Score', weight: 10, current: 45, target: 50 }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-7',
        title: 'Upselling & Cross-selling',
        tagline: 'Growing customer value through strategic recommendations',
        icon: '📈',
        color: 'from-emerald-500 to-green-600',
        durationMin: 17,
        videoUrl: '/videos/lesson-4-7.mp4',
        audioUrl: '/audio/lesson-4-7-podcast.mp3',
        sections: [
          {
            id: 'section-4-7-1',
            title: 'Upsell Timing Framework',
            kind: 'framework-steps',
            steps: [
              { step: 'Success Validation', description: 'Confirm current value realization', timing: 'Month 2-3' },
              { step: 'Usage Analysis', description: 'Identify expansion opportunities', timing: 'Month 4-6' },
              { step: 'Value Demonstration', description: 'Show ROI of additional features', timing: 'Month 6-9' },
              { step: 'Strategic Proposal', description: 'Present tailored upgrade path', timing: 'Month 9-12' }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-8',
        title: 'Customer Advocacy Programs',
        tagline: 'Turning satisfied customers into brand ambassadors',
        icon: '⭐',
        color: 'from-yellow-500 to-orange-600',
        durationMin: 15,
        videoUrl: '/videos/lesson-4-8.mp4',
        audioUrl: '/audio/lesson-4-8-podcast.mp3',
        sections: [
          {
            id: 'section-4-8-1',
            title: 'Advocacy Program Structure',
            kind: 'pillars',
            items: [
              { icon: '🎯', title: 'Referral Programs', description: 'Incentivized customer-to-customer recommendations' },
              { icon: '📝', title: 'Review Management', description: 'Systematic collection and management of testimonials' },
              { icon: '🎤', title: 'Case Study Development', description: 'Detailed success stories for marketing use' },
              { icon: '🤝', title: 'Community Building', description: 'Creating spaces for customer-to-customer interaction' }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-9',
        title: 'Technology Stack Integration',
        tagline: 'Leveraging tools and platforms for proactive CX',
        icon: '⚙️',
        color: 'from-gray-500 to-slate-600',
        durationMin: 21,
        videoUrl: '/videos/lesson-4-9.mp4',
        audioUrl: '/audio/lesson-4-9-podcast.mp3',
        sections: [
          {
            id: 'section-4-9-1',
            title: 'CX Technology Ecosystem',
            kind: 'partnership',
            items: [
              { 
                type: 'Core Platforms',
                tasks: ['CRM systems', 'Customer success platforms', 'Analytics tools', 'Communication channels'],
                efficiency: 'Centralized data'
              },
              { 
                type: 'Integration Layer',
                tasks: ['API connections', 'Data synchronization', 'Workflow automation', 'Real-time alerts'],
                value: 'Seamless operations'
              }
            ]
          }
        ]
      },
      {
        id: 'lesson-4-10',
        title: 'Measuring Proactive Success',
        tagline: 'KPIs and metrics for proactive customer experience',
        icon: '📊',
        color: 'from-indigo-500 to-purple-600',
        durationMin: 13,
        videoUrl: '/videos/lesson-4-10.mp4',
        audioUrl: '/audio/lesson-4-10-podcast.mp3',
        sections: [
          {
            id: 'section-4-10-1',
            title: 'Proactive CX Metrics Dashboard',
            kind: 'metrics',
            items: [
              { metric: 'Proactive Contact Rate', value: '78%', trend: '+15%', description: 'Percentage of interactions we initiate' },
              { metric: 'Issue Prevention Rate', value: '65%', trend: '+8%', description: 'Problems solved before customer reports' },
              { metric: 'Customer Health Score', value: '8.2/10', trend: '+0.5', description: 'Average customer health rating' },
              { metric: 'Expansion Revenue', value: '$2.3M', trend: '+23%', description: 'Revenue from upsells and cross-sells' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Specialist Skills & Technical Mastery',
    subtitle: 'Advanced Technical Expertise and Industry Specialization',
    color: 'from-amber-600 via-orange-600 to-red-600',
    videoUrl: '/videos/module-5-overview.mp4',
    audioUrl: '/audio/module-5-podcast.mp3',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'AI & Machine Learning Integration',
        tagline: 'Leveraging artificial intelligence to enhance customer experience',
        icon: '🤖',
        color: 'from-blue-500 to-purple-600',
        durationMin: 24,
        videoUrl: '/videos/lesson-5-1.mp4',
        audioUrl: '/audio/lesson-5-1-podcast.mp3',
        sections: [
          {
            id: 'section-5-1-1',
            title: 'AI Implementation Framework',
            kind: 'partnership',
            items: [
              { 
                type: 'AI-Powered Features',
                tasks: ['Predictive analytics', 'Automated responses', 'Sentiment analysis', 'Personalization engines'],
                efficiency: '85% accuracy'
              },
              { 
                type: 'Human Oversight',
                tasks: ['Quality assurance', 'Complex problem solving', 'Relationship management', 'Strategic decisions'],
                value: 'Enhanced trust'
              }
            ]
          },
          {
            id: 'section-5-1-2',
            title: 'Machine Learning Applications',
            kind: 'techniques',
            items: [
              { technique: 'Predictive Modeling', description: 'Forecast customer behavior and needs', example: 'Churn prediction with 92% accuracy' },
              { technique: 'Natural Language Processing', description: 'Understand and respond to customer sentiment', example: 'Real-time emotion detection in support tickets' },
              { technique: 'Recommendation Engines', description: 'Personalize product and service suggestions', example: 'Dynamic content based on usage patterns' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-2',
        title: 'Advanced Analytics & Data Science',
        tagline: 'Transforming customer data into actionable insights',
        icon: '📊',
        color: 'from-green-500 to-teal-600',
        durationMin: 22,
        videoUrl: '/videos/lesson-5-2.mp4',
        audioUrl: '/audio/lesson-5-2-podcast.mp3',
        sections: [
          {
            id: 'section-5-2-1',
            title: 'Customer Data Analytics Stack',
            kind: 'levels',
            items: [
              { level: 'Level 1', description: 'Descriptive Analytics - What happened? Historical data analysis' },
              { level: 'Level 2', description: 'Diagnostic Analytics - Why did it happen? Root cause analysis' },
              { level: 'Level 3', description: 'Predictive Analytics - What will happen? Forecasting and modeling' },
              { level: 'Level 4', description: 'Prescriptive Analytics - What should we do? Actionable recommendations' }
            ]
          },
          {
            id: 'section-5-2-2',
            title: 'Key Performance Indicators',
            kind: 'metrics',
            items: [
              { metric: 'Customer Lifetime Value', value: '$12,450', trend: '+18%', description: 'Average revenue per customer over their lifetime' },
              { metric: 'Net Promoter Score', value: '67', trend: '+12', description: 'Customer loyalty and advocacy measurement' },
              { metric: 'Customer Effort Score', value: '2.1/5', trend: '-0.4', description: 'Ease of customer interactions' },
              { metric: 'First Contact Resolution', value: '78%', trend: '+5%', description: 'Issues resolved in single interaction' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-3',
        title: 'Omnichannel Integration',
        tagline: 'Seamlessly connecting all customer touchpoints',
        icon: '🔗',
        color: 'from-purple-500 to-indigo-600',
        durationMin: 20,
        videoUrl: '/videos/lesson-5-3.mp4',
        audioUrl: '/audio/lesson-5-3-podcast.mp3',
        sections: [
          {
            id: 'section-5-3-1',
            title: 'Channel Integration Matrix',
            kind: 'matrix',
            quadrants: [
              { position: 'High Touch, Synchronized', title: 'Phone + Chat', description: 'Real-time handoff with context', color: 'from-blue-500 to-cyan-600' },
              { position: 'High Touch, Asynchronous', title: 'Email + Social', description: 'Delayed but contextual responses', color: 'from-green-500 to-emerald-600' },
              { position: 'Low Touch, Synchronized', title: 'App + Web', description: 'Seamless cross-platform experience', color: 'from-purple-500 to-violet-600' },
              { position: 'Low Touch, Asynchronous', title: 'SMS + Email', description: 'Automated but personalized messaging', color: 'from-orange-500 to-yellow-600' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-4',
        title: 'CRM Mastery & Customization',
        tagline: 'Maximizing CRM systems for superior customer management',
        icon: '📋',
        color: 'from-cyan-500 to-blue-600',
        durationMin: 26,
        videoUrl: '/videos/lesson-5-4.mp4',
        audioUrl: '/audio/lesson-5-4-podcast.mp3',
        sections: [
          {
            id: 'section-5-4-1',
            title: 'CRM Optimization Framework',
            kind: 'framework-steps',
            steps: [
              { step: 'Data Quality Audit', description: 'Clean and standardize customer data', timing: 'Week 1-2' },
              { step: 'Workflow Design', description: 'Create efficient customer interaction processes', timing: 'Week 3-4' },
              { step: 'Automation Setup', description: 'Implement automated tasks and triggers', timing: 'Week 5-6' },
              { step: 'Integration Testing', description: 'Connect with other business systems', timing: 'Week 7-8' },
              { step: 'Team Training', description: 'Educate staff on new processes', timing: 'Week 9-10' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-5',
        title: 'Industry-Specific Expertise',
        tagline: 'Deep knowledge for specialized customer service domains',
        icon: '🏭',
        color: 'from-orange-500 to-red-600',
        durationMin: 28,
        videoUrl: '/videos/lesson-5-5.mp4',
        audioUrl: '/audio/lesson-5-5-podcast.mp3',
        sections: [
          {
            id: 'section-5-5-1',
            title: 'Industry Specialization Areas',
            kind: 'pillars',
            items: [
              { icon: '🏥', title: 'Healthcare', description: 'HIPAA compliance, medical terminology, patient privacy' },
              { icon: '🏦', title: 'Financial Services', description: 'Regulatory compliance, fraud prevention, risk management' },
              { icon: '🛒', title: 'E-commerce', description: 'Order fulfillment, payment processing, return policies' },
              { icon: '💻', title: 'SaaS Technology', description: 'API integrations, subscription management, technical support' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-6',
        title: 'Advanced Communication Tools',
        tagline: 'Mastering modern communication platforms and techniques',
        icon: '💬',
        color: 'from-emerald-500 to-green-600',
        durationMin: 18,
        videoUrl: '/videos/lesson-5-6.mp4',
        audioUrl: '/audio/lesson-5-6-podcast.mp3',
        sections: [
          {
            id: 'section-5-6-1',
            title: 'Communication Platform Mastery',
            kind: 'channels',
            items: [
              { channel: 'Live Chat Systems', description: 'Real-time customer support with co-browsing', response_rate: '95%' },
              { channel: 'Video Support', description: 'Face-to-face technical assistance', response_rate: '88%' },
              { channel: 'Social Media', description: 'Public customer service and brand management', response_rate: '72%' },
              { channel: 'Messaging Apps', description: 'WhatsApp, Telegram, and platform-specific messaging', response_rate: '91%' }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-7',
        title: 'Quality Assurance & Monitoring',
        tagline: 'Ensuring consistent excellence across all interactions',
        icon: '✅',
        color: 'from-yellow-500 to-orange-600',
        durationMin: 16,
        videoUrl: '/videos/lesson-5-7.mp4',
        audioUrl: '/audio/lesson-5-7-podcast.mp3',
        sections: [
          {
            id: 'section-5-7-1',
            title: 'Quality Metrics Framework',
            kind: 'scorecard',
            metrics: [
              { metric: 'Response Time', weight: 20, current: 2.3, target: 2.0 },
              { metric: 'Resolution Rate', weight: 25, current: 89, target: 90 },
              { metric: 'Customer Satisfaction', weight: 30, current: 4.7, target: 4.8 },
              { metric: 'First Contact Resolution', weight: 25, current: 78, target: 80 }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-8',
        title: 'Security & Compliance',
        tagline: 'Protecting customer data and ensuring regulatory compliance',
        icon: '🔒',
        color: 'from-red-500 to-pink-600',
        durationMin: 20,
        videoUrl: '/videos/lesson-5-8.mp4',
        audioUrl: '/audio/lesson-5-8-podcast.mp3',
        sections: [
          {
            id: 'section-5-8-1',
            title: 'Compliance Framework',
            kind: 'regulations',
            items: [
              { regulation: 'GDPR', requirements: ['Data consent', 'Right to deletion', 'Data portability', 'Breach notification'] },
              { regulation: 'CCPA', requirements: ['Privacy notices', 'Opt-out rights', 'Data disclosure', 'Non-discrimination'] },
              { regulation: 'HIPAA', requirements: ['Patient privacy', 'Secure communications', 'Access controls', 'Audit trails'] },
              { regulation: 'PCI DSS', requirements: ['Secure payment processing', 'Data encryption', 'Access restrictions', 'Regular testing'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-9',
        title: 'Process Optimization & Automation',
        tagline: 'Streamlining operations for maximum efficiency',
        icon: '⚡',
        color: 'from-indigo-500 to-purple-600',
        durationMin: 22,
        videoUrl: '/videos/lesson-5-9.mp4',
        audioUrl: '/audio/lesson-5-9-podcast.mp3',
        sections: [
          {
            id: 'section-5-9-1',
            title: 'Automation Implementation Roadmap',
            kind: 'sequence',
            items: [
              { stage: 'Assessment', touchpoints: ['Process mapping', 'Bottleneck identification', 'ROI analysis'], emotions: ['Analytical', 'Strategic', 'Focused'] },
              { stage: 'Design', touchpoints: ['Workflow design', 'Tool selection', 'Integration planning'], emotions: ['Creative', 'Optimistic', 'Determined'] },
              { stage: 'Implementation', touchpoints: ['Pilot testing', 'Staff training', 'System deployment'], emotions: ['Cautious', 'Excited', 'Confident'] },
              { stage: 'Optimization', touchpoints: ['Performance monitoring', 'Continuous improvement', 'Scale expansion'], emotions: ['Satisfied', 'Ambitious', 'Successful'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-5-10',
        title: 'Technical Troubleshooting Mastery',
        tagline: 'Advanced problem-solving for complex technical issues',
        icon: '🔧',
        color: 'from-gray-500 to-slate-600',
        durationMin: 24,
        videoUrl: '/videos/lesson-5-10.mp4',
        audioUrl: '/audio/lesson-5-10-podcast.mp3',
        sections: [
          {
            id: 'section-5-10-1',
            title: 'Troubleshooting Methodology',
            kind: 'techniques',
            items: [
              { technique: 'Systematic Diagnosis', description: 'Step-by-step problem identification', example: 'Check logs → Test components → Isolate variables' },
              { technique: 'Root Cause Analysis', description: 'Identify underlying issues, not just symptoms', example: 'Why did the system fail? What changed?' },
              { technique: 'Knowledge Base Utilization', description: 'Leverage existing solutions and documentation', example: 'Search internal KB → Check vendor resources' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: Career Mastery & Leadership Excellence',
    subtitle: 'Executive Presence, Strategic Thinking, and Long-Term Career Success',
    color: 'from-rose-600 via-pink-600 to-purple-600',
    videoUrl: '/videos/module-6-overview.mp4',
    audioUrl: '/audio/module-6-podcast.mp3',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Executive Communication & Presence',
        tagline: 'Speaking the language of business leaders and building executive presence',
        icon: '🎤',
        color: 'from-indigo-500 to-purple-600',
        durationMin: 26,
        videoUrl: '/videos/lesson-6-1.mp4',
        audioUrl: '/audio/lesson-6-1-podcast.mp3',
        sections: [
          {
            id: 'section-6-1-1',
            title: 'Executive Communication Framework',
            kind: 'communication-guide',
            steps: [
              { step: 'Hook', description: 'Start with impact or insight', example: 'We can reduce churn by 15%' },
              { step: 'Context', description: 'Provide relevant background', example: 'Current churn rate is 25%' },
              { step: 'Solution', description: 'Present your recommendation', example: 'Implement proactive outreach' },
              { step: 'Action', description: 'Define next steps', example: 'Pilot with top 100 customers' }
            ]
          },
          {
            id: 'section-6-1-2',
            title: 'Executive Presence Elements',
            kind: 'pillars',
            items: [
              { icon: '🎯', title: 'Gravitas', description: 'Confidence, decisiveness, and emotional intelligence' },
              { icon: '💬', title: 'Communication', description: 'Clear, concise, and compelling messaging' },
              { icon: '👔', title: 'Appearance', description: 'Professional image and body language' },
              { icon: '🧠', title: 'Substance', description: 'Deep knowledge and strategic thinking' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-2',
        title: 'Strategic Thinking & Business Acumen',
        tagline: 'Developing the mindset of a strategic business leader',
        icon: '🧠',
        color: 'from-blue-500 to-cyan-600',
        durationMin: 28,
        videoUrl: '/videos/lesson-6-2.mp4',
        audioUrl: '/audio/lesson-6-2-podcast.mp3',
        sections: [
          {
            id: 'section-6-2-1',
            title: 'Strategic Framework Components',
            kind: 'framework-steps',
            steps: [
              { step: 'Market Analysis', description: 'Understand industry trends and competitive landscape', timing: 'Ongoing' },
              { step: 'Customer Insights', description: 'Deep dive into customer needs and behaviors', timing: 'Quarterly' },
              { step: 'Resource Assessment', description: 'Evaluate internal capabilities and constraints', timing: 'Monthly' },
              { step: 'Strategic Planning', description: 'Develop long-term vision and execution roadmap', timing: 'Annually' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-3',
        title: 'Team Leadership & Management',
        tagline: 'Leading high-performing customer experience teams',
        icon: '👥',
        color: 'from-green-500 to-teal-600',
        durationMin: 24,
        videoUrl: '/videos/lesson-6-3.mp4',
        audioUrl: '/audio/lesson-6-3-podcast.mp3',
        sections: [
          {
            id: 'section-6-3-1',
            title: 'Leadership Styles Matrix',
            kind: 'matrix',
            quadrants: [
              { position: 'High Support, High Direction', title: 'Coaching Leader', description: 'Develop skills while providing guidance', color: 'from-blue-500 to-cyan-600' },
              { position: 'High Support, Low Direction', title: 'Supporting Leader', description: 'Empower team members to take ownership', color: 'from-green-500 to-emerald-600' },
              { position: 'Low Support, High Direction', title: 'Directing Leader', description: 'Clear instructions for new or struggling team members', color: 'from-orange-500 to-yellow-600' },
              { position: 'Low Support, Low Direction', title: 'Delegating Leader', description: 'Hand off tasks to capable, motivated team members', color: 'from-purple-500 to-violet-600' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-4',
        title: 'Change Management & Transformation',
        tagline: 'Leading organizational change and CX transformation initiatives',
        icon: '🔄',
        color: 'from-purple-500 to-indigo-600',
        durationMin: 22,
        videoUrl: '/videos/lesson-6-4.mp4',
        audioUrl: '/audio/lesson-6-4-podcast.mp3',
        sections: [
          {
            id: 'section-6-4-1',
            title: 'Change Management Process',
            kind: 'sequence',
            items: [
              { stage: 'Assessment', touchpoints: ['Current state analysis', 'Stakeholder mapping', 'Impact assessment'], emotions: ['Analytical', 'Curious', 'Concerned'] },
              { stage: 'Planning', touchpoints: ['Change strategy', 'Communication plan', 'Training design'], emotions: ['Strategic', 'Optimistic', 'Focused'] },
              { stage: 'Implementation', touchpoints: ['Pilot programs', 'Rollout execution', 'Support systems'], emotions: ['Cautious', 'Excited', 'Determined'] },
              { stage: 'Sustainment', touchpoints: ['Performance monitoring', 'Continuous improvement', 'Culture reinforcement'], emotions: ['Satisfied', 'Proud', 'Committed'] }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-5',
        title: 'Financial Acumen & ROI Measurement',
        tagline: 'Understanding business metrics and demonstrating CX value',
        icon: '💰',
        color: 'from-emerald-500 to-green-600',
        durationMin: 20,
        videoUrl: '/videos/lesson-6-5.mp4',
        audioUrl: '/audio/lesson-6-5-podcast.mp3',
        sections: [
          {
            id: 'section-6-5-1',
            title: 'CX Financial Metrics Dashboard',
            kind: 'metrics',
            items: [
              { metric: 'Customer Lifetime Value', value: '$12,450', trend: '+18%', description: 'Average revenue per customer over their lifetime' },
              { metric: 'Cost Per Acquisition', value: '$185', trend: '-12%', description: 'Marketing cost to acquire new customers' },
              { metric: 'Customer Retention Rate', value: '87%', trend: '+5%', description: 'Percentage of customers retained annually' },
              { metric: 'CX ROI', value: '340%', trend: '+45%', description: 'Return on investment for CX initiatives' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-6',
        title: 'Innovation & Future-Proofing',
        tagline: 'Staying ahead of trends and driving innovation in CX',
        icon: '🚀',
        color: 'from-cyan-500 to-blue-600',
        durationMin: 18,
        videoUrl: '/videos/lesson-6-6.mp4',
        audioUrl: '/audio/lesson-6-6-podcast.mp3',
        sections: [
          {
            id: 'section-6-6-1',
            title: 'Emerging CX Technologies',
            kind: 'list',
            items: [
              'AI-powered personalization engines',
              'Voice commerce integration',
              'Augmented reality support experiences',
              'Predictive customer analytics',
              'Blockchain verification systems',
              'IoT device integration',
              'Emotional AI and sentiment analysis',
              'Virtual reality customer training'
            ]
          }
        ]
      },
      {
        id: 'lesson-6-7',
        title: 'Personal Brand & Thought Leadership',
        tagline: 'Building your reputation as a CX expert and industry leader',
        icon: '⭐',
        color: 'from-yellow-500 to-orange-600',
        durationMin: 16,
        videoUrl: '/videos/lesson-6-7.mp4',
        audioUrl: '/audio/lesson-6-7-podcast.mp3',
        sections: [
          {
            id: 'section-6-7-1',
            title: 'Personal Brand Building Strategy',
            kind: 'framework-steps',
            steps: [
              { step: 'Define Your Niche', description: 'Identify your unique expertise and value proposition', timing: 'Month 1' },
              { step: 'Content Creation', description: 'Develop thought leadership content and insights', timing: 'Month 2-3' },
              { step: 'Network Building', description: 'Connect with industry peers and influencers', timing: 'Month 4-6' },
              { step: 'Speaking & Writing', description: 'Share expertise through conferences and publications', timing: 'Month 6-12' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-8',
        title: 'Career Development & Advancement',
        tagline: 'Strategic career planning and advancement strategies',
        icon: '📈',
        color: 'from-red-500 to-pink-600',
        durationMin: 24,
        videoUrl: '/videos/lesson-6-8.mp4',
        audioUrl: '/audio/lesson-6-8-podcast.mp3',
        sections: [
          {
            id: 'section-6-8-1',
            title: 'Career Advancement Framework',
            kind: 'levels',
            items: [
              { level: 'Level 1', description: 'Individual Contributor - Master your craft and deliver excellence' },
              { level: 'Level 2', description: 'Team Lead - Guide others and manage small teams' },
              { level: 'Level 3', description: 'Manager - Lead departments and drive operational excellence' },
              { level: 'Level 4', description: 'Director/VP - Shape strategy and lead organizational change' },
              { level: 'Level 5', description: 'C-Level - Set vision and drive company-wide transformation' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-9',
        title: 'Mentoring & Knowledge Transfer',
        tagline: 'Developing others and building organizational capability',
        icon: '🎓',
        color: 'from-indigo-500 to-purple-600',
        durationMin: 14,
        videoUrl: '/videos/lesson-6-9.mp4',
        audioUrl: '/audio/lesson-6-9-podcast.mp3',
        sections: [
          {
            id: 'section-6-9-1',
            title: 'Mentoring Excellence Framework',
            kind: 'pillars',
            items: [
              { icon: '🎯', title: 'Goal Setting', description: 'Help mentees define and achieve career objectives' },
              { icon: '💡', title: 'Knowledge Sharing', description: 'Transfer expertise and industry insights' },
              { icon: '🤝', title: 'Relationship Building', description: 'Create trust and open communication channels' },
              { icon: '📊', title: 'Progress Tracking', description: 'Monitor development and celebrate achievements' }
            ]
          }
        ]
      },
      {
        id: 'lesson-6-10',
        title: 'Global CX Leadership',
        tagline: 'Leading customer experience across cultures and markets',
        icon: '🌍',
        color: 'from-teal-500 to-green-600',
        durationMin: 20,
        videoUrl: '/videos/lesson-6-10.mp4',
        audioUrl: '/audio/lesson-6-10-podcast.mp3',
        sections: [
          {
            id: 'section-6-10-1',
            title: 'Global CX Considerations',
            kind: 'techniques',
            items: [
              { technique: 'Cultural Adaptation', description: 'Tailor CX strategies to local cultural norms', example: 'High-context vs low-context communication styles' },
              { technique: 'Regulatory Compliance', description: 'Navigate different legal and regulatory environments', example: 'GDPR in EU vs CCPA in California' },
              { technique: 'Technology Infrastructure', description: 'Account for varying technological capabilities', example: 'Mobile-first strategies in emerging markets' }
            ]
          }
        ]
      }
    ]
  }
];

// Quiz questions for each module
export const quizQuestions = [
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
    difficulty: "Foundational" as const
  },
  {
    id: 2,
    module: 1,
    question: "According to the training, what percentage of buying decisions are based on emotion rather than logic?",
    options: ["50%", "65%", "75%", "95%"],
    correct: "D",
    explanation: "Research shows 95% of buying decisions are emotional, not logical, highlighting the critical importance of emotional connection in CX.",
    difficulty: "Foundational" as const
  },
  // Add more questions as needed...
];

export default modules;
