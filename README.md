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

### テスト

```sh
pnpm run test:ts     # TypeScript の型チェック
pnpm run test:vitest # ユニットテストの実行
pnpm run test        # 両方のテストを実行
```

### ビルド

```sh
pnpm run build
pnpm run dev # Watch モード
```

### ローカル試験実行

```sh
pnpm run bin
```

### クリーンアップ

```sh
pnpm run clean
```

## 仮想環境の起動・停止

```sh
# 環境の起動
pnpm run up

# 環境の停止
pnpm run down
```

## 仮想環境デプロイ後の実行確認

```sh
# サービスの状態確認
multipass exec automata -- systemctl status automata

# ログの確認
multipass exec automata -- journalctl -u automata -f
```

## 貢献

バグレポート、機能リクエスト、プルリクエストなど、貢献は大歓迎です！  
詳しくは[CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](./LICENSE)
