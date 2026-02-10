# AIエージェント向けガイドライン

AIエージェントを用いて本リポジトリに貢献する際は、
プロジェクトの基準と慣行に沿った高品質な貢献を確保するため、
以下のガイドラインを遵守してください：

- 追加の考慮事項、不確実性、またはより良い提案がある場合は、
  些細に思える場合でも指摘してください。その際少なくとも 1 つ、
  またはそれ以上の選択肢を提示してください。
  Plan モードの場合は、実装を開始する前にこれらの点をすべて解決してください。

## Development

### Install the dependencies

```sh
corepack enable
pnpm install
```

### Linting

```sh
pnpm run lint
pnpm run lint:fix # Lint and auto-fix
```

### Testing

```sh
pnpm run test
```

Currently, the command works as an alias for the `pnpm run lint` command.
Set up your own testing framework and replace this script as needed.

### Cleaning

```sh
pnpm run clean
```

[README.md](../README.md) に仮想環境の起動方法と停止方法が記載されています。
