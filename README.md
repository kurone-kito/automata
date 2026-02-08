# ✨ Automata

[![Linting](https://github.com/kurone-kito/automate/actions/workflows/lint.yml/badge.svg)](https://github.com/kurone-kito/automate/actions/workflows/lint.yml)

Terraform を使用した、Multipass 仮想環境の自動構築ツール

## システム要件

- 6GB 以上の RAM (macOS・Windowsの場合、さらに +6GB 推奨)
- 10GB 以上のストレージ容量
- Multipass v1.16 以降
- Terraform v1.14 以降

## 環境の起動・停止

```sh
# 依存関係の解決
terraform init -upgrade

# 環境の起動
terraform apply -auto-approve -compact-warnings

# 環境の停止
terraform destroy -auto-approve -compact-warnings
```

## 貢献

バグレポート、機能リクエスト、プルリクエストなど、貢献は大歓迎です！  
詳しくは[CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](./LICENSE)
