# ✨ Automata

[![Linting](https://github.com/kurone-kito/automate/actions/workflows/lint.yml/badge.svg)](https://github.com/kurone-kito/automate/actions/workflows/lint.yml)

Terraform 経由で Multipass 仮想環境を使用した Node.js アプリケーションで、
GitHub Copilot CLI や Taskwarrior を使用した自律的エージェントです。

このエージェントでは、自律的に以下のようなタスクを実行します。

- 日本の業種・職種に関する情報収集
- 業種・職種の現実的な組み合わせの抽出
- 今後のアップデートでより様々なタスクを実行できるようになる計画

## システム要件

- 7GB 以上の RAM (macOS・Windowsの場合、さらに +6GB 推奨)
- 10GB 以上のストレージ容量
- Multipass v1.16 以降
- Terraform v1.14 以降
- Node.js v22、または v24 以降

ホスト側で稼働したい場合は、追加で以下の追加インストールも必要です。

- Linux や macOS、WSL などの Unix 系 OS
- GitHub Copilot CLI
- Taskwarrior (これが Unix 系 OS でないと動かない)

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

環境構築後、認証を手動で実行してください。
環境を再構築した場合は **再ログインが必要** です。

```sh
# 認証（対話式・ホスト側ブラウザで URL を開いて認証）
multipass exec automata -- .local/bin/copilot login
```

正しく認証ができているかどうかを確認するために、
以下のようにプロンプトを投げかけてみてください。

```sh
multipass exec automata -- .local/bin/copilot \
  -p "あなたはどのようなことができますか?"
```

## 仮想環境デプロイ後の実行確認

```sh
# サービスの状態確認
multipass exec automata -- systemctl status automata

# ログの確認
multipass exec automata -- journalctl -u automata -f
```

### AI エージェントの活動記録を確認する

```sh
# 直近の全記録を確認する
multipass exec automata -- task project:am

# 調査した業種・職種などを確認する
multipass exec automata -- task project:am:research
```

## 貢献

バグレポート、機能リクエスト、プルリクエストなど、貢献は大歓迎です！  
詳しくは[CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](./LICENSE)
