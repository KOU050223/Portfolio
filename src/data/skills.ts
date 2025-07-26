export interface Skill {
  name: string
  level: string
  icons: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

// スキルデータの定義
export const skillCategories: SkillCategory[] = [
  {
    name: "フロントエンド",
    skills: [
      { name: "React", level: "中級", icons: "react" },
      { name: "Tailwind CSS", level: "中級", icons: "tailwind" },
      { name: "TypeScript", level: "中級", icons: "ts" },
      { name: "JavaScript", level: "中級", icons: "js" },
      { name: "Next.js", level: "初級", icons: "nextjs" },
      { name: "Redux", level: "初級", icons: "redux" },
    ]
  },
  {
    name: "バックエンド",
    skills: [
      { name: "Node.js", level: "中級", icons: "nodejs" },
      { name: "Laravel", level: "中級", icons: "laravel" },
      { name: "Express", level: "中級", icons: "express" },
      { name: "Flask", level: "中級", icons: "flask" },
      { name: "FastAPI", level: "初級", icons: "fastapi" },
      { name: "Firebase Functions", level: "初級", icons: "firebase" },
      { name: "lambda", level: "初級", icons: "aws" },
      { name: "PHP", level: "中級", icons: "php" },
      { name: "Java", level: "初級", icons: "java" },
      { name: "Go", level: "初級", icons: "go" },
    ]
  },
  {
    name: "モバイル",
    skills: [
      { name: "Flutter", level: "中級", icons: "flutter" },
      { name: "Unity", level: "中級", icons: "unity" },
    ]
  },
  {
    name: "言語",
    skills: [
      { name: "Swift", level: "初級", icons: "swift" },
      { name: "C", level: "初級", icons: "c" },
      { name: "C#", level: "初級", icons: "cs" },
      { name: "JavaScript", level: "中級", icons: "js" },
      { name: "TypeScript", level: "中級", icons: "ts" },
      { name: "PHP", level: "中級", icons: "php" },
      { name: "Dart", level: "中級", icons: "dart" },
      { name: "Python", level: "中級", icons: "python" },
      { name: "Java", level: "初級", icons: "java" },
      { name: "Go", level: "初級", icons: "go" },
      { name: "Ruby", level: "初級", icons: "ruby" },
    ]
  },
  {
    name: "データベース",
    skills: [
      { name: "MySQL", level: "中級", icons: "mysql" },
      { name: "PostgreSQL", level: "初級", icons: "postgres" },
      { name: "Dynamodb", level: "初級", icons: "dynamodb" },
      { name: "Sqlite", level: "初級", icons: "sqlite" },
      { name: "Firestore", level: "中級", icons: "firebase" },
    ]
  },
  {
    name: "DevOps & クラウド",
    skills: [
      { name: "GitHub", level: "中級", icons: "github" },
      { name: "Git", level: "中級", icons: "git" },
      { name: "Docker", level: "初級", icons: "docker" },
      { name: "AWS", level: "中級", icons: "aws" },
      { name: "Firebase", level: "中級", icons: "firebase" },
      { name: "Vercel", level: "初級", icons: "vercel" },
      { name: "Azure", level: "初級", icons: "azure" },
      { name: "Cloudflare", level: "中級", icons: "cloudflare" },
      { name: "GitHub Actions", level: "初級", icons: "githubactions" },
      { name: "Google Cloud", level: "初級", icons: "gcp" },
    ]
  },
  {
    name: "ツール",
    skills: [
      { name: "Postman", level: "初級", icons: "postman" },
      { name: "Notion", level: "初級", icons: "notion" },
      { name: "VSCode", level: "中級", icons: "vscode" },
      { name: "VisualStudio", level: "初級", icons: "visualstudio" },
      { name: "Discord", level: "中級", icons: "discord" },
      { name: "Figma", level: "中級", icons: "figma" },
    ]
  }
]

// スキルレベルの色分け
export const getLevelColor = (level: string): string => {
  switch(level) {
    case "上級": return "green"
    case "中級": return "blue"
    case "初級": return "orange"
    default: return "gray"
  }
}

// スキルレベルの数値変換
export const getLevelPercentage = (level: string): number => {
  switch(level) {
    case "上級": return 90
    case "中級": return 75
    case "初級": return 60
    default: return 40
  }
}

// 技術名に応じた色を返す関数
export const getSkillColor = (skillName: string): string => {
  const colorMap: Record<string, string> = {
    'React': 'blue',
    'TypeScript': 'blue',
    'JavaScript': 'yellow',
    'Python': 'green',
    'Go': 'cyan',
    'Node.js': 'green',
    'Laravel': 'red',
    'Express': 'gray',
    'Flask': 'blue',
    'MySQL': 'blue',
    'AWS': 'orange',
    'Firebase': 'orange',
    'Docker': 'blue',
    'Flutter': 'blue',
    'Unity': 'purple',
    'Git': 'orange',
    'GitHub': 'gray',
    'PHP': 'purple',
    'Cloudflare': 'orange',
    'VSCode': 'blue',
    'Figma': 'purple'
  }
  return colorMap[skillName] || 'gray'
}