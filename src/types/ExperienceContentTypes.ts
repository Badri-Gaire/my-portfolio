interface Role {
  title: string;
  type: string;
  start: string;
  end: string;
  duration: string;
  locationType: string;
  skills: string[];
  achievements?: string[];
}

interface Experience {
  company: string;
  location: string;
  totalDuration: string;
  logo: string;
  roles: Role[];
}

export interface ExperienceContentProps {
  experiences: Experience[];
}