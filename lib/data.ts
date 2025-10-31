import type { PerformanceData, SkillData, RecentActivity } from './definitions';

export const performanceData: PerformanceData[] = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 70 },
  { name: 'Apr', score: 78 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 85 },
];

export const skillData: SkillData[] = [
  { skill: 'Algorithms', score: 80 },
  { skill: 'Data Structures', score: 75 },
  { skill: 'Communication', score: 90 },
  { skill: 'Problem Solving', score: 85 },
  { skill: 'System Design', score: 60 },
];

export const recentActivity: RecentActivity[] = [
  { id: '1', type: 'Code Challenge', title: 'Two Sum', date: '2024-06-15', score: 88 },
  { id: '2', type: 'Behavioral', title: 'Tell me about a time...', date: '2024-06-14', score: 92 },
  { id: '3', type: 'Code Challenge', title: 'Merge K Sorted Lists', date: '2024-06-12', score: 76 },
  { id: '4', type: 'Behavioral', title: 'Why do you want to work here?', date: '2024-06-11', score: 85 },
];
