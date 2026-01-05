
export interface Project {
  id: string;
  title: string;
  category: string; // Display category
  filterCategory: 'coding' | 'graphic' | 'motion' | 'photo-video'; // For filtering
  featured?: boolean;
  image: string;
  description: string;
  link?: string;
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

export interface Overview {
  title: string;
  subtitle: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Client {
  id: string;
  name: string;
  role: string;
  year: string;
  description: string;
}

export interface CursorState {
  hidden: boolean;
  variant: 'default' | 'project' | 'text' | 'button';
}
