# ✨ Automata

[![Linting](https://github.com/kurone-kito/automate/actions/workflows/lint.yml/badge.svg)](https://github.com/kurone-kito/automate/actions/workflows/lint.yml)

Terraform 経由で Multipass 仮想環境を使用した Node.js アプリケーションの、
プレイグラウンド環境を簡単にセットアップ・管理するためのプロジェクトです。

## システム要件

- 6GB 以上の RAM (macOS・Windowsの場合、さらに +6GB 推奨)
- 10GB 以上のストレージ容量
- Multipass v1.16 以降
- Terraform v1.14 以降
- Node.js v22、または v24 以降

## 環境構築

### 依存関係の解決

```sh
corepack enable
pnpm install
```

### 構文チェック

```sh
pnpm run lint
pnpm run lint:fix # Lint and auto-fix
```

### クリーンアップ

```sh
pnpm run clean
```

## 仮想環境の起動・停止

```sh
# 環境の起動
pnpm run up

# 環境の停止 (注意！仮想環境内の全データが消えます！)
pnpm run down

# 再構築を伴わない設定配置
pnpm run deploy
```

## 貢献

バグレポート、機能リクエスト、プルリクエストなど、貢献は大歓迎です！  
詳しくは[CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](./LICENSE)
