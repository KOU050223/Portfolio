# キャリアデータ移行ガイド

## 概要

このガイドでは、既存のCareerシートデータを新しい形式に移行する手順を説明します。

## 移行前の準備

1. **バックアップの作成**
   - スプレッドシート全体のコピーを作成してください
   - シート名: `Career (バックアップ YYYY-MM-DD)`

2. **新しい列構成の確認**
   - `CAREER_SPREADSHEET_SPEC.md` を参照してください

## 移行手順

### ステップ1: 新しいシートの作成（推奨）

既存のCareerシートを保持したまま、新しいシート `Career_New` を作成することをお勧めします。

1. シートをコピーして `Career_New` という名前で作成
2. 1行目（ヘッダー）を以下のように変更:

```
title | date | endDate | type | description | detailedDescription | skills | achievements | links | imageUrl | location
```

### ステップ2: データの移行

既存データを新しい形式に合わせて移行します。

#### 既存の列（変更前）
```
date | title | description | type
```

#### 新しい列（変更後）
```
title | date | endDate | type | description | detailedDescription | skills | achievements | links | imageUrl | location
```

#### 移行マッピング

| 旧列 | 新列 | 変換内容 |
|------|------|----------|
| title | title | そのまま移動 |
| date | date | そのまま移動 |
| - | endDate | 期間がある場合は入力、それ以外は空欄 |
| type | type | そのまま移動 |
| description | description | 簡潔な説明として使用 |
| description | detailedDescription | 詳細ページ用に拡張して記載 |
| - | skills | 関連する技術・スキルを追加 |
| - | achievements | 成果があれば記載 |
| - | links | 関連リンクがあればJSON形式で記載 |
| - | imageUrl | 画像があれば記載 |
| - | location | 場所・組織があれば記載 |

### ステップ3: サンプルデータの作成

以下のサンプルデータを参考に、最低1行のテストデータを作成してください。

```
title: 株式会社テック入社
date: 2023/04/01
endDate: 現在
type: 就業, エンジニア
description: Webエンジニアとしてフルスタック開発に従事
detailedDescription: 業務内容:
- フロントエンド開発（React, Next.js）
- バックエンドAPI開発（Node.js, Express）
- AWSインフラ構築・運用
- チーム開発のリード

主なプロジェクト:
- ECサイトのリニューアル
- 社内管理システムの新規開発
- モバイルアプリのAPI開発
skills: React, Next.js, TypeScript, Node.js, Express, AWS, Docker, Git
achievements: 開発速度30%向上, 新機能5件リリース, バグ削減40%
links: [{"label":"会社サイト","url":"https://example.com"}]
imageUrl: https://example.com/company-logo.png
location: 東京都渋谷区 / 株式会社テック
```

### ステップ4: テスト確認

1. サンプルデータを入力後、開発サーバーで確認:
   ```bash
   npm run dev
   ```

2. 以下のURLにアクセス:
   - キャリア一覧: `http://localhost:3000/career`
   - キャリア詳細: `http://localhost:3000/career/[生成されたID]`

3. 正常に表示されることを確認

### ステップ5: 本番反映

1. テストが成功したら、`Career_New` を `Career` にリネーム
2. 古い `Career` シートは削除または `Career_Old` にリネーム
3. 本番環境で確認（キャッシュは5分で更新されます）

## データ入力のヒント

### description vs detailedDescription

- **description**: 一覧ページで表示される簡単な説明（80-100文字程度）
  - 例: "Webエンジニアとしてフルスタック開発に従事"
  
- **detailedDescription**: 詳細ページで表示される詳しい説明（改行OK）
  - 業務内容、プロジェクト、役割などを箇条書きで記載

### skills（技術・スキル）

カンマ区切りで記載。スペースがあっても自動でトリムされます。

```
React, Next.js, TypeScript, Node.js, Express, AWS, Docker
```

### achievements（成果・実績）

カンマ区切りで記載。具体的な数値があると良いです。

```
開発速度30%向上, 新機能5件リリース, バグ削減40%, 新人育成3名
```

### links（関連リンク）

JSON配列形式で記載。各リンクは `label` と `url` を持ちます。

```json
[
  {"label":"会社サイト","url":"https://example.com"},
  {"label":"プレスリリース","url":"https://example.com/news"},
  {"label":"プロジェクト紹介","url":"https://example.com/project"}
]
```

不要な場合は空欄にします。

### endDate（終了日）

- 継続中の場合: `現在` と記載
- 終了している場合: `2024/03/31` のような日付形式
- 単発のイベント: 空欄

### type（カテゴリ）

カンマ区切りで複数指定可能。フィルター機能で使用されます。

```
就業, エンジニア, リーダーシップ
```

よく使うカテゴリ例:
- 就業
- インターン
- フリーランス
- エンジニア
- デザイナー
- マネジメント
- 教育
- 資格
- 受賞

## トラブルシューティング

### キャリアが表示されない

1. スプレッドシートのシート名が `Career` であることを確認
2. データが2行目以降に入力されていることを確認
3. `title` と `description` が空欄でないことを確認
4. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）

### links のエラー

JSON形式が正しいか確認してください。よくあるミス:

❌ 間違い:
```
[{"label":"サイト","url":"https://example.com",}]  # 末尾のカンマ
[{'label':'サイト','url':'https://example.com'}]   # シングルクォート
[{"label":"サイト""url":"https://example.com"}]     # カンマ抜け
```

✅ 正しい:
```
[{"label":"サイト","url":"https://example.com"}]
```

### 画像が表示されない

1. `imageUrl` が有効なURL（https://で始まる）であることを確認
2. 画像が公開されているか確認（認証が必要な画像は表示されません）
3. 画像のURLに日本語が含まれている場合はエンコードが必要

## 完全な移行例

### 移行前（旧形式）
```
date         | title              | description                  | type
2023/04/01   | ABC株式会社入社    | エンジニアとして従事        | 就業, エンジニア
```

### 移行後（新形式）
```
title: ABC株式会社入社
date: 2023/04/01
endDate: 現在
type: 就業, エンジニア
description: エンジニアとして従事
detailedDescription: 業務内容:
- Web開発全般
- フロントエンド/バックエンド開発
- インフラ構築

成果:
- 新機能を複数リリース
- チーム開発のリード経験
skills: React, Node.js, AWS, Docker
achievements: 新機能5件リリース, 開発速度向上
links: [{"label":"会社サイト","url":"https://abc.example.com"}]
imageUrl: https://abc.example.com/logo.png
location: 東京都 / ABC株式会社
```

## サポート

問題が解決しない場合は、以下を確認してください：

1. コンソールログ（開発者ツール）でエラーメッセージを確認
2. スプレッドシートのアクセス権限を確認（公開設定）
3. API キーの設定を確認（`.env.local`）

## 補足: スプレッドシートの公開設定

スプレッドシートが正しく読み取れるように、以下の設定を確認してください：

1. スプレッドシートを開く
2. 右上の「共有」をクリック
3. 「リンクを知っている全員」に変更
4. 権限を「閲覧者」に設定

これで、Google Sheets API 経由でデータが取得できます。
