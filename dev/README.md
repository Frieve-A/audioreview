# Frieve - Audio Review

企業と製品の専門レビューを提供するJekyll製静的サイトです。

## 特徴

- **オーソドックスなデザイン**: 黒字・白背景の権威あるデザイン
- **企業・製品連携**: 企業レビューと製品レビューが連携
- **検索機能**: JavaScript製のクライアントサイド検索
- **レスポンシブデザイン**: モバイル対応
- **AdSense対応**: 広告配置の準備済み

## 構成

```
.
├── _companies/           # 企業レビュー
├── _products/            # 製品レビュー
├── _layouts/             # レイアウトテンプレート
├── _includes/            # 共通パーツ
├── assets/               # CSS, JavaScript, 画像
├── _config.yml           # Jekyll設定
└── index.md              # トップページ
```

## セットアップ

### 1. 依存関係のインストール

```bash
bundle install
```

### 2. 開発サーバーの起動

```bash
bundle exec jekyll serve
```

サイトは `http://localhost:4000` で確認できます。

### 3. ビルド（本番用）

```bash
bundle exec jekyll build
```

## コンテンツの追加

### 企業レビューの追加

言語別フォルダ（`_companies/ja/` または `_companies/en/`）に新しいMarkdownファイルを作成：

```markdown
---
layout: company
title: "企業名 企業レビュー"
target_name: "企業名"
company_id: company-id
lang: ja
ref: company-id-review
rating: [4.5, 0.9, 1.0, 0.7, 1.0, 0.9]
summary: "企業の概要説明"
date: 2025-07-04
tags: [タグ1, タグ2]
---

## 概要
企業の概要...

## 科学的有効性
$$ \Large \text{0.9} $$
評価の根拠...

## 技術レベル
$$ \Large \text{1.0} $$
評価の根拠...

## コストパフォーマンス
$$ \Large \text{0.7} $$
評価の根拠...

## 信頼性・サポート
$$ \Large \text{1.0} $$
評価の根拠...

## 設計思想の合理性
$$ \Large \text{0.9} $$
評価の根拠...

## アドバイス
購入アドバイス...

(2025.07.04)
```

### 製品レビューの追加

言語別フォルダ（`_products/ja/` または `_products/en/`）に新しいMarkdownファイルを作成：
**ファイル名**: `企業名-製品名.md`（例：`sennheiser-hd650.md`）

```markdown
---
layout: product
title: "製品名 製品レビュー"
target_name: "製品名"
company_id: company-id
lang: ja
ref: company-id-product-id-review
rating: [4.2, 1.0, 1.0, 0.5, 1.0, 1.0]
summary: "製品の概要説明"
date: 2025-07-04
tags: [タグ1, タグ2]
---

同様の章立てでレビューを記述...
```

### 評価システム

- **rating配列**: [総合評価, 科学的有効性, 技術レベル, コストパフォーマンス, 信頼性・サポート, 設計思想の合理性]
- **スコア範囲**: 0.0〜1.0（各項目とも）
- **表示形式**: 大きな総合評価数字と5項目の詳細評価表

## AdSenseの設定

1. `_includes/adsense.html` のコメントアウトを外す
2. `data-ad-client` と `data-ad-slot` を設定
3. デモ用プレースホルダーを削除

## デプロイ

GitHub Pagesでの公開：

1. GitHubリポジトリにプッシュ
2. リポジトリ設定でPages機能を有効化
3. ソースを `main` ブランチに設定

## ライセンス

MIT License