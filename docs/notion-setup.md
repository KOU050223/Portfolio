# Notion データベース セットアップガイド

## APIキーのフォーマットについて

Notion APIキーにはインテグレーションの種類によって2つのフォーマットがある。

| フォーマット   | インテグレーション種別                           |
| -------------- | ------------------------------------------------ |
| `secret_xxxxx` | 一般的なインテグレーション（Public integration） |
| `ntn_xxxxx`    | 内部インテグレーション（Internal integration）   |

このプロジェクトでは**内部インテグレーション**を使用するため、`ntn_` プレフィックスのキーを使う。
どちらも `Authorization: Bearer <token>` で同じように動作する。

---

## セットアップ手順

### 1. Integration を作成

1. [https://www.notion.so/profile/integrations/internal](https://www.notion.so/profile/integrations/internal) を開く
2. **「+ 新しいインテグレーションを作成」** をクリック
3. 名前（例: `portfolio-site`）とワークスペースを選択して Submit
4. 表示された **内部インテグレーションシークレット** をコピー

これが `NOTION_API_KEY` になる（`ntn_`から始まる文字列）。

### 2. データベースを作成

Projects DB と Career DB をそれぞれ作成する。プロパティは以下の通り。

#### Projects DB

| プロパティ名 | Notion型     |
| ------------ | ------------ |
| title        | Title        |
| authors      | Multi-select |
| date         | Date         |
| technologies | Multi-select |
| youtubeUrl   | URL          |
| description  | Rich Text    |
| deployLink   | URL          |
| githubLink   | URL          |
| articleLink  | URL          |
| events       | Multi-select |
| awards       | Multi-select |
| isPublished  | Checkbox     |

#### Career DB

| プロパティ名        | Notion型                |
| ------------------- | ----------------------- |
| title               | Title                   |
| date                | Date                    |
| endDate             | Date                    |
| type                | Multi-select            |
| description         | Rich Text               |
| detailedDescription | Rich Text               |
| skills              | Multi-select            |
| achievements        | Multi-select            |
| links               | Rich Text（JSON文字列） |
| imageUrl            | URL                     |
| location            | Rich Text               |
| isPublished         | Checkbox                |

`links` フィールドのJSON形式:

```json
[{"label": "GitHub", "url": "https://github.com/..."}, ...]
```

### 3. Integration をDBに接続

各データベースページで:

1. 右上の **「...」** メニューを開く
2. **「Connect to」** → 作成したIntegrationを選択

Projects DB・Career DB **両方**に接続すること。

### 4. data_source_id を取得

環境変数に設定するのは **DB ID ではなく `data_source_id`** である点に注意。

以下のスクリプトで取得できる:

```bash
node -e "
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'ここにNOTION_API_KEYを貼る' });
const DB_ID = 'ここにDBのURLから取得した32文字のIDを貼る';
notion.databases.retrieve({ database_id: DB_ID }).then(db => {
  console.log('data_source_id:', db.data_sources?.[0]?.id);
});
"
```

DB URL からの DB ID 取得方法:

```
https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...
                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                       この32文字が DB ID（スクリプト実行用）
```

### 5. 環境変数を設定

`.env.local` に記述:

```bash
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PROJECTS_DATA_SOURCE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_CAREER_DATA_SOURCE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

注意:

- クォートで囲まない
- ファイル作成後は開発サーバーを再起動する（`Ctrl+C` → `npm run dev`）

### 6. GitHub Secrets に登録（CI用）

Repository Settings → Secrets and variables → Actions で以下を登録:

- `NOTION_API_KEY`
- `NOTION_PROJECTS_DATA_SOURCE_ID`
- `NOTION_CAREER_DATA_SOURCE_ID`

---

## トラブルシューティング

### `API token is invalid.`

- `NOTION_API_KEY` の値が正しいか確認（`ntn_` または `secret_` から始まる）
- クォートで囲んでいないか確認
- 開発サーバーを再起動したか確認

### データが表示されない

- IntegrationをDBに接続したか確認（手順3）
- `isPublished` チェックボックスが ON になっているか確認
- `NOTION_PROJECTS_DATA_SOURCE_ID` / `NOTION_CAREER_DATA_SOURCE_ID` が DB ID ではなく `data_source_id` になっているか確認
