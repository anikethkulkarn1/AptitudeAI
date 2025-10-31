export type PerformanceData = {
  name: string;
  score: number;
};

export type SkillData = {
  skill: string;
  score: number;
};

export type RecentActivity = {
  id: string;
  type: 'Code Challenge' | 'Behavioral';
  title: string;
  date: string;
  score: number;
};
