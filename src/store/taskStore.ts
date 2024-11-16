import { create } from 'zustand';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  generateContent: (task: Task) => Promise<string>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: '1',
      platform: 'linkedin',
      type: 'cold-emails',
      description: 'Generate outreach emails for software development leads',
      status: 'completed',
      createdAt: new Date('2024-03-10')
    },
    {
      id: '2',
      platform: 'instagram',
      type: 'branding',
      description: 'Create engaging social media content strategy',
      status: 'processing',
      createdAt: new Date('2024-03-11')
    }
  ],
  isLoading: false,

  addTask: (taskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      status: 'pending',
      createdAt: new Date()
    };

    set(state => ({
      tasks: [...state.tasks, newTask]
    }));
  },

  generateContent: async (task: Task) => {
    set({ isLoading: true });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const content = generateDummyContent(task);
    set({ isLoading: false });
    
    return content;
  }
}));

function generateDummyContent(task: Task): string {
  const platformContent = {
    linkedin: `# Professional LinkedIn Content\n\n## Strategy Overview\nTargeting B2B professionals with industry-specific content.\n\n## Key Points\n- Professional networking approach\n- Industry insights and trends\n- Thought leadership content`,
    instagram: `# Instagram Content Strategy\n\n## Visual Elements\n- High-quality imagery\n- Brand color scheme\n- Story highlights\n\n## Hashtag Strategy\n#BrandAwareness #SocialMedia #DigitalMarketing`,
    facebook: `# Facebook Engagement Plan\n\n## Content Mix\n- 40% Educational\n- 30% Entertaining\n- 30% Promotional\n\n## Community Building\n- Daily engagement\n- Weekly live sessions\n- Monthly contests`,
    web: `# Web Content Strategy\n\n## SEO Optimization\n- Keyword research\n- Meta descriptions\n- Content structure\n\n## Content Calendar\n- Blog posts\n- Case studies\n- Whitepapers`
  };

  const taskContent = {
    research: `## Market Research\n- Competitor analysis\n- Target audience demographics\n- Industry trends\n- Growth opportunities`,
    branding: `## Brand Strategy\n- Brand voice and tone\n- Visual identity\n- Content themes\n- Brand messaging`,
    'cold-emails': `## Email Campaign\n- Personalized templates\n- Follow-up sequences\n- A/B testing strategy\n- Success metrics`
  };

  return `${platformContent[task.platform]}\n\n${taskContent[task.type]}`;
}