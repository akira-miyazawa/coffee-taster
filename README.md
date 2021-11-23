# COFFEE TASTER

## 概要

コーヒーの味を記録できるアプリケーションです。
苦手な傾向がわかり、あなたの好みがわかるようになります。
コーヒー好きなあなたにぜひ
<img src="https://github.com/akira-miyazawa/coffee-taster/blob/main/static/icon.png" width="300px" height="300px">

## 機能

コーヒー好き目線でこれからも機能を充実させていきます

### `現在地周辺のカフェを表示する機能`

あなたのいるカフェを検索してスムーズに記録することができます。

### `コーヒーの味の記録機能`

`苦味`・`酸味`・`甘み`・`コク`・`香り`を 5 段階評価でつけます。
さらにあなたの評価を記載することで、お気に入りのコーヒーを記録しておくことができます。

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

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
