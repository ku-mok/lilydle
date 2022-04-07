# Lilydle: A variant of worlde of Assaultlily Project

アサルトリリィ版の Wordle です。https://lilydle-f1607.web.app/ にて公開しています。
遊び方などはリンク先を参照ください。

## アーキテクチャ

![arch](./architecture.svg)

## 技術スタック

### フロントエンド

- React / Typescript
  - ビルドツールは vite
  - スタイリングは TailwindCSS
  - テストは Jest+React Testing Library によるコンポーネント・hooks のテストと Storyshots によるスナップショットテスト

### バックエンド

- Firebase
- ホスティングは Firebase Hosting
- 永続化層は Firebase Storage のみ
  - 出題候補となるリリィのデータを LuciaDB(旧アサルトリリィ RDF)を Fibase functions で定時取得(updatelilydle())したものを保存

### CI/CD

- github actions で Firebase Hosting への静的ファイルホスティングを実施
- funtions はほとんど更新がない想定のため、手動デプロイ

## フォルダ構成

```
- functions: Firebase functions で実行する関数
- src: フロントエンドのコード
  |-hooks: custom hooks
	|-UiParts: UI部品(atomic designにおけるatoms, molecules)
	|-orgnsim: UiPartsを組みあせたコンポーネント
	|-modal: modalウィンドウンポーネント
```

- src/は本当は frontend で切ってその中に入れた方がよかったか…
