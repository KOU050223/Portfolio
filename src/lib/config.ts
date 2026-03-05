// 環境変数の設定と管理
export const config = {
  notion: {
    apiKey: process.env.NOTION_API_KEY || "",
    projectsDbId: process.env.NOTION_PROJECTS_DB_ID || "",
    careerDbId: process.env.NOTION_CAREER_DB_ID || "",
  },

  // 開発環境での設定
  isDevelopment: process.env.NODE_ENV === "development",

  // 環境変数の検証
  isConfigValid() {
    return !!(this.notion.apiKey && this.notion.projectsDbId && this.notion.careerDbId);
  },
};

if (!config.isConfigValid()) {
  console.warn("警告: Notion環境変数が正しく設定されていません。データが取得できません。");
}
