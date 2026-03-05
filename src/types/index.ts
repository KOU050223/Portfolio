/**
 * ポートフォリオに掲載するプロジェクト情報の型定義
 */

export interface Project {
  id: string;
  title: string;
  authors: string[];
  date: string;
  technologies: string[];
  youtubeUrl: string | null;
  description: string;
  deployLink: string | null;
  githubLink: string | null;
  articleLink: string | null;
  events: string[];
  awards: string[];
  ogpImage: string | null;
}

export interface Career {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  type: string;
  description: string;
  detailedDescription: string;
  skills: string[];
  achievements: string[];
  links: Array<{ label: string; url: string }>;
  imageUrl: string | null;
  location: string | null;
}
