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
    const hasApiKey = !!(this.googleSheets.apiKey && this.googleSheets.apiKey !== '')
    const hasSpreadsheetId = !!(this.googleSheets.spreadsheetId && this.googleSheets.spreadsheetId !== '')
    
    if (this.isDevelopment) {
      console.log('Config validation:', {
        hasApiKey,
        hasSpreadsheetId,
        apiKeyLength: this.googleSheets.apiKey.length,
        apiKey: this.googleSheets.apiKey.substring(0, 10) + '...',
        spreadsheetId: this.googleSheets.spreadsheetId
      })
    }
    
    return hasApiKey && hasSpreadsheetId
  }
}

// デフォルト値での警告とデバッグ情報
console.log('環境変数チェック:', {
  NODE_ENV: process.env.NODE_ENV,
  hasApiKey: !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY,
  hasSpreadsheetId: !!process.env.NEXT_PUBLIC_SPREADSHEET_ID,
  configValid: config.isConfigValid()
})

if (!config.isConfigValid()) {
  console.warn('警告: 環境変数が正しく設定されていません。デモデータを表示します。')
}