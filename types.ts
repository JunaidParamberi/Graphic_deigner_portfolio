export interface Project {
  id: string;
  title: string;
  category: string; // Display category
  filterCategory: 'coding' | 'graphic' | 'motion' | 'photo-video'; // For filtering
  image: string;
  description: string;
  tags: string[];
  specs: {
    typography: string;
    colors: string[];
    grid: string;
  };
  narrative: {
    challenge: string;
    execution: string;
    result: string;
  };
  gallery?: {
    type: 'image' | 'video';
    url: string;
  }[];
  gridArea?: string; // For Bento Layout
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export interface CursorState {
  hidden: boolean;
  variant: 'default' | 'project' | 'text' | 'button';
}
