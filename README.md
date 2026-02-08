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

## ライセンス

[MIT](./LICENSE)
