# wearedoronko.org

こちらは[wearedoronko.org](https://wearedoronko.org)（以降当サイト）のリソースを管理しているレポジトリです。

## 設計概要
当サイトは[simple-sitegen](https://github.com/uskay/simple-sitegen)というStatic Site Generatorを利用して生成されています。またホスティング環境はFirebase HostingおよびDynamic Servingを目的としてFirebase Cloud Functionsを利用しています。

![architecture](https://cdn.glitch.com/98449704-33d8-49b2-88f2-aa6d2aeba5d3%2FScreen%20Shot%202021-04-02%20at%2010.40.06.png?v=1617327640616)

### simple-sitegenでできること

- マークダウン形式での新規記事の投稿・編集
- 用意されているコンポーネントを組み合わせて新たなページテンプレートの作成
- 画像の最適化（圧縮、サイズ変更等）
- その他Webリソース（OGP画像やマニフェスト等）の自動生成

など（ただし実験的なツールであるためバグや足りない機能などあります。詳しくは[uskay](https://github.com/uskay)にお問い合わせください）

### Firebaseでやってること

#### Functions
今は主にサイト軽量化・最適化を目的に、UAを判定してPolyfillを入れるか入れないかを判断しています。

#### Hosting
その他Static resourceをすべてホスティングしています。

#### Price
FunctionsのNodeのバージョン制約等から[Blaze](https://firebase.google.com/pricing)を利用していますが、当サイトの現状のトラフィック程度では¥0です。

## 管理の仕方
*現状更新権限を制限しています。コンテンツの追加や修正はページ下部の「運用方法」をご参照の上、その他直接のコントリビューションはPRをお送りください。

### ハンズオン更新手順

1. 最新のリソースを取得
```
git clone https://github.com/wearedoronko/wearedoronko.org.git
```

2. 各種リソースを更新
- 記事の追加
  - `/site/page/md/`配下に新たなマークダウンを追加します。
  - `./settings.json`の`route`を追加します。マークダウンのファイル名と合致したURLが作られます。
- 記事以外のテキストや画像を修正
  - `/site/page/data/`以下のJsonにすべての文言や各設定があります。こちらを変更します。
- 画像の追加
  - `/res/*/raw/`というraw画像を配置するディレクトリがありますので、そちらに画像を配置します。ファイル名の最後に`-${width}w`というサフィックスを追加することで自動的に指定したサイズに変更されます（例：`article_dorofes_1-800w.jpg`であれば800px幅に変更）

3. ビルド
```
npm run build
```
- この状態で`/debug/`ディレクトリにローカルテスト向けリソースが展開されます。
- また、`/prod/`以下は実際にFirebaseにデプロイする本番用リソースが展開されます。

4. デプロイ
```
npm run deploy-prod
```

### 運用方法

実際の更新依頼は以下のフォームを利用ください。１週間以内に返答します。

- [wearedoronko.org更新依頼](https://forms.gle/RAxThh9UW1Shj5AJ7)

TODO: Static Site Generatorという性質から現状[uskay](https://github.com/uskay)にて運用していますが、今後の運用方式は相談可。
