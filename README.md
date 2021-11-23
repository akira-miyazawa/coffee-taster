# COFFEE TASTER

## 概要

コーヒーの味を記録できるアプリケーションです。

- テストアカウント
  - mail: test@test.com
  - password: test0000

<img src="https://github.com/akira-miyazawa/coffee-taster/blob/main/static/icon.png" width="300px" height="300px">

## 機能

コーヒー好き目線でこれからも機能を充実させていきます

### `現在地周辺のカフェを表示する機能`

あなたのいるカフェを検索してスムーズに記録することができます。

### `コーヒーの味の記録機能`

`苦味`・`酸味`・`甘み`・`コク`・`香り`を 5 段階評価でつけます。

### `苦手な傾向を表示する機能`

評価が 2 以下のコーヒーのテイストから`苦味`・`酸味`・`甘み`・`コク`・`香り`のチャートを表示します。

## 使用技術

- Nuxt.js × TypeScript
  - Compositon API
  - PWA
- Firebase
  - FireStore
  - Authentication
  - Hosting

## 設計

設計思想を取り入れながら開発を進めています。
取り組んでいる内容を記載しておきます。

### `DDD`

| ユビキタス言語     | 概要                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| ショップ名         | 対象の店舗名                                                                                                       |
| ドリンク名         | 注文したドリンク名                                                                                                 |
| ドリンクタイプ     | HOT か ICE                                                                                                         |
| テイストスコア     | 1~5 段階で設定 <br> sourness(酸味) <br> bitterness(苦味) <br> sweetness(甘み) <br> scent(香り) <br> richness(コク) |
| コメント           | 自由記入欄(1000 文字以下)                                                                                          |
| 焙煎               | <br> LIGHT(浅煎り) <br> MEDIUM(中煎り) <br> DEEP(深煎り) <br> NONE(不明)                                           |
| 産地               | コーヒー豆の産地                                                                                                   |
| 評価               | コーヒーのお気に入り度 <br> 1~5 段階で設定                                                                         |
| アンマッチテイスト | 評価が 2 以下のコーヒーのテイストスコアを平均して、ユーザーの苦手な傾向を示したもの                                |

### `Atomic Design`

下記の表のルールを参考にコンポーネント設計をしています。
| ディレクトリ | 責務 |
| ---- | ---- |
| ~components/atoms | UI パーツ |
| ~components/molecules | atoms を組合せた UI パーツ |
| ~components/organisms | Store・ビジネスロジック　|
| ~layouts | ページレイアウト |
| ~pages | 表示するページ |

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```
