<div align="center">
  <img src="https://github.com/renovatebot.png" height="100px" width="100px" style="border-radius: 100%;" />
  <br />
  <h1>Renovate Config</h1>
  <p>Renovate config for <a href="https://github.com/xkrishguptaa">@xkrishguptaa</a> 🍭</p>
</div>

## ❓ Why `config-renovate`?

- Writing a configuration for each repository and syncing it up is tiring
- Renovate will create way too many PRs at once if you don't follow something like this 🙂
- Convention. Consistency.

## 📦 Usage

Make a file in root named `renovate.json`

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "github>xkrishguptaa/config-renovate"
  ]
}
```

## ✨ Features

### Uses `config:best-practices` preset

Implements all [`best-practices`](https://docs.renovatebot.com/presets-config/#configbest-practices) set by Renovate maintainers by using their preset!

### Git Commit Signing

Appends a commit signature at the end of everycommit with [`:gitSignOff`](https://docs.renovatebot.com/presets-default/#gitsignoff) preset

### Automated Labelling Label: `dependencies`

### Automerge PRs

- [x] Autoapprove
- [x] Automerge PRs
- [x] Squash Merge

### Dependency Dashboard

- [x] Automated Labelling Label: `dependencies`
- [x] Autoclose if no current dependency updates

### Single PR for all dependencies

Group all pull requests into a single PR (limit of max 1 PR at a time also set)

### Schedule: `Every Weekend`

### Use Semantic Commits

## 📝 License

This project is licensed under the GNU-GPLv3.0+ license. Read the license file for more details