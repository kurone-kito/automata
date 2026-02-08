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

## 初回セットアップ（最後にまとめて実行）

Cloud-init で Copilot CLI のインストールとエージェント環境のセットアップは
自動で完了します。認証だけを最後にまとめて実行してください。

Terraform で再構築した場合は **再ログインが必要** です。

```sh
# 認証（対話式・ホスト側ブラウザで URL を開いて認証）
multipass exec automata -- .local/bin/copilot login
```

正しく認証ができているかどうかを確認するために、
以下のようにプロンプトを投げかけてみてください。

```sh
multipass exec automata -- .local/bin/copilot --model gpt-5-mini \
  -p "あなたはどのようなことができますか?"
```

認証が完了すると、数分以内にエージェントサービスが自動的に稼働を開始します。
(より正確には、認証できるまで定期的に起動を試みます)

```sh
# サービスの状態確認
multipass exec automata -- systemctl status copilot-agent

# ログの確認
multipass exec automata -- journalctl -u copilot-agent -f
```

## VM 内のディレクトリ構成

| パス                            | 役割                                             |
| ------------------------------- | ------------------------------------------------ |
| `~/blog/`                       | 日別 Markdown エントリ（対人ログ・ダイジェスト） |
| `~/kanban/`                     | テキストベースのプロジェクト管理                 |
| `~/audit-log/`                  | エージェントの操作を詳細に記録する監査ログ       |
| `~/requests/`                   | ユーザーからの要求を Markdown で投入             |
| `~/.config/automata/config.yml` | エージェント設定                                 |

### モデル設定

`config.yml` の `agent.model` でモデルを指定します。
`model_groups` のグループ名（`high`/`medium`/`low`）を指定すると、
グループ内からランダムに 1 つ選択されます（エージェント起動時に 1 回のみ）。
なお `config.yml` は cloud-init で VM 内に埋め込まれて生成されるため、
リポジトリ直下には実ファイルが存在しません。

```sh
# より高性能なモデルを使用したい場合（例: medium グループ）
multipass exec automata -- bash -c \
  "sed -i 's/model: .*/model: medium/' .config/automata/config.yml"

# 設定変更後はサービスを再起動
multipass exec automata -- sudo systemctl restart copilot-agent
```

デフォルトのグループ定義:

| グループ | 含まれるモデル                                               | 用途                 |
| -------- | ------------------------------------------------------------ | -------------------- |
| `high`   | `claude-opus-4.6`                                            | 複雑なタスク向け     |
| `medium` | `claude-sonnet-4.5`, `gemini-3-pro-preview`, `gpt-5.2-codex` | 日常タスク向け       |
| `low`    | `claude-haiku-4.5`, `gpt-5.1-codex-mini`                     | シンプルなタスク向け |

`model_groups` はユーザー自身が `config.yml` を編集してカスタマイズ可能です。

### カンバンの状態

| フォルダ         | 説明                                    |
| ---------------- | --------------------------------------- |
| `0-icebox/`      | 長期的な目標・ビジョン                  |
| `1-backlog/`     | 近い将来に着手予定                      |
| `2-in-progress/` | 現在着手中                              |
| `3-done/`        | 完了                                    |
| `4-archive/`     | 完了から一定期間経過（100件で 7z 圧縮） |
| `5-trash/`       | 廃棄（100件で 7z 圧縮）                 |

### ユーザー要求の投入方法

`~/requests/` フォルダに Markdown ファイルを配置してください。
エージェントが次回ループ時に検知し、対応を開始します。

```sh
multipass exec automata -- bash -c \
  'cat > ~/requests/my-request.md << "EOF"
# やってほしいこと
ここに要望を書いてください
EOF'
```

もしあなたが vim 使いなら、直接編集することもできます:

```sh
multipass exec automata -- vim ~/requests/my-request.md
```

## ライセンス

[MIT](./LICENSE)
