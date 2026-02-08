# ✨ Automata

[![Linting](https://github.com/kurone-kito/automate/actions/workflows/lint.yml/badge.svg)](https://github.com/kurone-kito/automate/actions/workflows/lint.yml)

Terraform の実験用リポジトリ

## システム要件

- Terraform v1.14 以降

## 環境の起動・停止

```sh
# 依存関係の解決
terraform init -upgrade

# 環境の起動
terraform apply -auto-approve

# 環境の停止
terraform destroy -auto-approve
```

## 貢献

バグレポート、機能リクエスト、プルリクエストなど、貢献は大歓迎です！  
詳しくは[CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](./LICENSE)
