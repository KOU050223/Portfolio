# CLAUDE.md

このファイルは、このリポジトリでClaude Code (claude.ai/code) が作業する際のガイダンスを提供します。

## プロジェクト概要

Vite、Chakra UI、TailwindCSSで構築されたReact SPAのポートフォリオサイトです。静的JSONファイルとGoogle Sheets APIの両方からデータを取得し、プロジェクト、キャリア情報、スキル、趣味を紹介します。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

```

## アーキテクチャ

**コンポーネント構成:**
- `src/components/` - Header、Footer、Seoを含む再利用可能なUIコンポーネント
- `src/pages/` - ルートコンポーネント（Home、Production、Career、Skill、Hobby）
- `src/hooks/` - データ取得用カスタムフック（useProjects、useCareer、useProjectKV）

**データ管理:**
- カスタムフック経由でのGoogle Sheets APIからの動的データ
- API設定用の環境変数

**スタイリング手法:**
- レイアウトとコンポーネントライブラリにChakra UI
- ユーティリティクラスにTailwindCSS
- アニメーションにFramer Motion
- next-themesによるテーマ切り替えサポート

## 主要な技術詳細

**ルーティング:** React Router DOMを使用したSPAのクライアントサイドルーティング

**SEO:** Seoコンポーネントでreact-helmet-asyncを使用したメタタグ管理

**デプロイ:** 
- CloudFlareにデプロイするので特に設定はいらない
- Vite設定で環境に応じた条件付きベースパス

**データソース:**
- Google Sheets: https://docs.google.com/spreadsheets/d/1Ly-ss8euUmEDd3IUXSBqoValHX_m1AKVWjtlxbvp73w/edit?gid=0#gid=0
- プロジェクトカードの画像はYoutubeのサムネイルから取得

**データ構造:**
- Projects: title, author, date, technologies, youtubeUrl, description, deployLink, githubLink, articleLink
  - authorとtechnologiesはカンマ区切りで複数の値を格納
- Career: date, title, description, type
  - typeはカンマ区切りで複数のタグを格納（例：開発, イベント, 受賞）

## 開発メモ

- React固有のルールでESLintを設定
- サイト全体で日本語コンテンツ