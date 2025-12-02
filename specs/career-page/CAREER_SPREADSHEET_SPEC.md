# キャリアスプレッドシート列構成

## 新しい列構成（Career シート）

プロダクトページと同様の詳細ページを作成するため、以下の列構成に変更します。

| 列 | 列名 | 説明 | 例 |
|----|------|------|-----|
| A | title | タイトル | "株式会社ABC入社" |
| B | date | 日付 | "2023/04/01" |
| C | endDate | 終了日（期間がある場合） | "2024/03/31" または空 |
| D | type | カテゴリ（カンマ区切り） | "就業, エンジニア" |
| E | description | 簡単な説明（一覧用） | "フルスタックエンジニアとして従事" |
| F | detailedDescription | 詳細説明（詳細ページ用、改行可） | "業務内容:\n- バックエンド開発..." |
| G | skills | 使用技術・スキル（カンマ区切り） | "React, Node.js, AWS" |
| H | achievements | 成果・実績（カンマ区切り） | "新機能リリース, パフォーマンス改善50%" |
| I | links | 関連リンク（JSON形式） | '[{"label":"会社サイト","url":"https://..."}]' |
| J | imageUrl | 画像URL（オプション） | "https://..." |
| K | location | 場所・組織 | "東京都 / 株式会社ABC" |

## 変更点

### 既存の列との対応
- `date` (A列) → そのまま使用
- `title` (B列) → そのまま使用
- `description` (C列) → `description` (E列) と `detailedDescription` (F列) に分割
- `type` (D列) → そのまま使用

### 追加する列
- `endDate` (C列): 期間を持つキャリア（就業期間など）に対応
- `detailedDescription` (F列): 詳細ページで表示する長文の説明
- `skills` (G列): 使用した技術やスキル
- `achievements` (H列): 成果や実績
- `links` (I列): 関連リンクを柔軟に追加
- `imageUrl` (J列): キャリアに関連する画像
- `location` (K列): 場所や組織名

## スプレッドシートでの設定手順

1. Career シートを開く
2. 既存のデータをバックアップ
3. 1行目（ヘッダー行）を以下のように設定:
   ```
   title | date | endDate | type | description | detailedDescription | skills | achievements | links | imageUrl | location
   ```
4. 既存データを新しい列構成に合わせて移行
5. 2行目以降にデータを入力

## データ入力例

```
title: "株式会社XYZ テックリード"
date: "2023/04/01"
endDate: "現在"
type: "就業, エンジニア, リーダーシップ"
description: "テックリードとして開発チームを牽引"
detailedDescription: "業務内容:
- チーム5名のマネジメント
- アーキテクチャ設計
- コードレビュー
- 技術選定"
skills: "React, TypeScript, Next.js, AWS, Docker"
achievements: "開発速度30%向上, 新人育成3名, CI/CD導入"
links: '[{"label":"会社サイト","url":"https://example.com"},{"label":"プレスリリース","url":"https://..."}]'
imageUrl: "https://example.com/logo.png"
location: "東京都渋谷区 / 株式会社XYZ"
```

## 移行時の注意事項

1. 既存のデータは必ずバックアップを取る
2. `description` は簡潔に（80文字程度）、`detailedDescription` は詳細に記載
3. `links` は有効なJSON形式で記載（不要な場合は空欄）
4. `endDate` は継続中の場合「現在」と記載
5. カンマ区切りの項目（type, skills, achievements）はスペースを含めてもOK
