# ✨ Automata

[![Linting](https://github.com/kurone-kito/automate/actions/workflows/lint.yml/badge.svg)](https://github.com/kurone-kito/automate/actions/workflows/lint.yml)

LLM による Computer use のためのオンプレミス仮想環境を自動構築、
運用するためのプレイグラウンド

## 環境の起動・停止

```sh
# 依存関係の解決
terraform init -upgrade

# 環境の起動
terraform apply -auto-approve -compact-warnings

# 環境の停止
terraform destroy -auto-approve -compact-warnings
```

## 初回セットアップ

GitHub Copilot の認証は、環境構築が終わったあとにまとめて行います。
Terraform で再構築した場合は **再ログインが必要** です。

この操作は若干のインタラクションがあります。
指示に従いホスト側ブラウザで URL を開き、認証を完了してください。

```sh
multipass exec automata -- .local/bin/copilot login
```

ログイン後、プロンプトが実行可能になります。

```sh
multipass exec automata -- .local/bin/copilot --model gpt-5-mini \
  -p "あなたはどのようなことができますか?"
```

## ライセンス

[MIT](./LICENSE)
