// 環境変数の設定と管理
export const config = {
  notion: {
    apiKey: process.env.NOTION_API_KEY || "",
    projectsDataSourceId: process.env.NOTION_PROJECTS_DATA_SOURCE_ID || "",
    careerDataSourceId: process.env.NOTION_CAREER_DATA_SOURCE_ID || "",
  },

  // 開発環境での設定
  isDevelopment: process.env.NODE_ENV === "development",

  isProjectsConfigValid() {
    return !!(this.notion.apiKey && this.notion.projectsDataSourceId);
  },
  isCareerConfigValid() {
    return !!(this.notion.apiKey && this.notion.careerDataSourceId);
  },
};

if (!config.notion.apiKey) {
  console.warn("警告: NOTION_API_KEY が設定されていません。");
}
