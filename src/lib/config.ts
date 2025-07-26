// 環境変数の設定と管理
export const config = {
  // Google Sheets API設定
  googleSheets: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '',
    spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID || '1Ly-ss8euUmEDd3IUXSBqoValHX_m1AKVWjtlxbvp73w',
  },
  
  // 開発環境での設定
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // 環境変数の検証
  isConfigValid() {
    return !!(this.googleSheets.apiKey && this.googleSheets.spreadsheetId)
  }
}

// デフォルト値での警告
if (!config.isConfigValid() && config.isDevelopment) {
  console.warn('警告: 環境変数が正しく設定されていません。Google Sheetsからデータを取得できません。')
}