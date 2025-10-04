# キャリア詳細ページ - クイックスタートガイド

## 🚀 すぐに始める

### 1. スプレッドシートのヘッダー行を変更

Careerシートの1行目を以下のように変更してください：

```
title | date | endDate | type | description | detailedDescription | skills | achievements | links | imageUrl | location
```

### 2. サンプルデータを入力（2行目）

以下のデータをコピーして、各セルに貼り付けてください：

| 列 | 値 |
|----|-----|
| A (title) | `株式会社ABC入社` |
| B (date) | `2023/04/01` |
| C (endDate) | `現在` |
| D (type) | `就業, エンジニア` |
| E (description) | `Webエンジニアとしてフルスタック開発に従事` |
| F (detailedDescription) | `業務内容:\n- フロントエンド開発\n- バックエンド開発\n- インフラ構築` |
| G (skills) | `React, Node.js, AWS` |
| H (achievements) | `新機能5件リリース, 開発速度30%向上` |
| I (links) | `[{"label":"会社サイト","url":"https://example.com"}]` |
| J (imageUrl) | （空欄でOK） |
| K (location) | `東京都 / 株式会社ABC` |

### 3. 動作確認

```bash
npm run dev
```

以下のURLにアクセス：
- 一覧: http://localhost:3000/career
- 詳細: http://localhost:3000/career/2023-04-01-abc

### 4. デプロイ

```bash
git add .
git commit -m "feat: キャリア詳細ページの実装"
git push
```

## 📋 必須項目チェックリスト

各キャリアデータで必ず入力が必要な項目：

- [ ] **title** - タイトル
- [ ] **date** - 日付
- [ ] **type** - カテゴリ
- [ ] **description** - 簡単な説明

その他はオプション（空欄でもOK）

## 🎨 よく使うパターン

### パターン1: 就業経験
```
title: 株式会社XYZ入社
date: 2023/04/01
endDate: 現在
type: 就業, エンジニア
description: フルスタックエンジニアとして従事
detailedDescription: 業務内容:
- フロントエンド開発
- バックエンド開発
skills: React, Node.js, AWS
achievements: 新機能5件リリース
links: [{"label":"会社サイト","url":"https://example.com"}]
location: 東京都 / 株式会社XYZ
```

### パターン2: インターン
```
title: 株式会社ABC サマーインターン
date: 2022/08/01
endDate: 2022/08/31
type: インターン, エンジニア
description: 2週間のエンジニアインターンに参加
detailedDescription: 期間: 2週間
内容:
- Webアプリケーション開発
- チーム開発の経験
skills: React, TypeScript
achievements: 最優秀賞受賞
links: [{"label":"レポート","url":"https://..."}]
location: 東京都 / 株式会社ABC
```

### パターン3: 資格取得
```
title: AWS認定ソリューションアーキテクト取得
date: 2023/06/15
endDate: 
type: 資格
description: AWS認定ソリューションアーキテクト - アソシエイトを取得
detailedDescription: 取得資格:
AWS認定ソリューションアーキテクト - アソシエイト

学習期間: 3ヶ月
学習内容:
- AWSサービスの理解
- アーキテクチャ設計
skills: AWS, クラウド
achievements: 一発合格
links: [{"label":"認定証","url":"https://..."}]
location: オンライン
```

### パターン4: 受賞歴
```
title: ハッカソン最優秀賞受賞
date: 2023/09/10
endDate: 
type: 受賞, イベント
description: 技育CAMPハッカソンにて最優秀賞を受賞
detailedDescription: イベント名: 技育CAMP 2023 vol.8

チーム: 3名
開発期間: 3日間
開発物: AIを活用したレビュー支援ツール
skills: Laravel, OpenAI API
achievements: 最優秀賞, チーム賞
links: [{"label":"発表資料","url":"https://..."}]
location: オンライン
```

## 🔧 トラブルシューティング

### Q1: キャリアが表示されない
**確認項目:**
1. スプレッドシート名が `Career` か
2. 列の順序が正しいか（A列から title, date, ...）
3. title と description が入力されているか
4. スプレッドシートが公開設定か

### Q2: リンクがエラーになる
**正しいJSON形式:**
```json
[{"label":"サイト","url":"https://example.com"}]
```

**よくある間違い:**
- ❌ `[{'label':'サイト','url':'...'}]` （シングルクォート）
- ❌ `[{"label":"サイト","url":"..."},]` （末尾カンマ）
- ❌ `{"label":"サイト","url":"..."}` （配列でない）

複数リンクの場合:
```json
[
  {"label":"サイト1","url":"https://example1.com"},
  {"label":"サイト2","url":"https://example2.com"}
]
```

### Q3: 改行が反映されない
`detailedDescription` では改行が使えます：

```
業務内容:
- 項目1
- 項目2
- 項目3
```

スプレッドシートのセル内で改行するには:
- Mac: `Option + Enter`
- Windows: `Alt + Enter`

### Q4: 日付の形式は？
`YYYY/MM/DD` 形式で入力してください：
- ✅ `2023/04/01`
- ✅ `2023/4/1`
- ❌ `2023-04-01`
- ❌ `April 1, 2023`

## 📚 詳細ドキュメント

より詳しい情報は以下のドキュメントを参照してください：

1. **IMPLEMENTATION_OVERVIEW.md** - 実装の全体像
2. **CAREER_SPREADSHEET_SPEC.md** - 列構成の仕様
3. **CAREER_MIGRATION_GUIDE.md** - 移行の詳細手順
4. **CAREER_IMPLEMENTATION_SUMMARY.md** - 機能一覧

## 💡 ヒント

### カテゴリ（type）の例
```
就業, インターン, フリーランス, エンジニア, デザイナー, 
マネジメント, 教育, 資格, 受賞, イベント, 学習
```

複数指定することで、フィルター機能で絞り込みやすくなります。

### スキル（skills）の例
```
React, Next.js, TypeScript, Node.js, Express, 
AWS, Docker, Git, Python, Django, FastAPI
```

プロダクトページの technologies と合わせると統一感が出ます。

### 成果（achievements）の書き方
**具体的な数値を入れる:**
- ✅ `開発速度30%向上`
- ✅ `新機能5件リリース`
- ✅ `バグ削減40%`

**定性的な成果も OK:**
- ✅ `チームリーダーとして牽引`
- ✅ `新人育成に貢献`
- ✅ `技術選定をリード`

## 🎯 次のステップ

1. ✅ サンプルデータで動作確認
2. ✅ 自分のキャリアデータを1件入力
3. ✅ 一覧と詳細ページで確認
4. ✅ すべてのキャリアデータを移行
5. ✅ デプロイして本番確認

---

**実装完了！お疲れさまでした！** 🎉

何か問題があれば、トラブルシューティングを確認するか、
詳細ドキュメントを参照してください。
