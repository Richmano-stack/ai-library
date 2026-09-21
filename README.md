# create-ai-ops

A CLI tool that installs [AI Dev OS](https://github.com/Richmano-stack/ai-dev-os) workspace templates into your project.

It downloads the latest template from GitHub and copies the files into your current working directory. No prompts, no configuration — just run it and you're done.

## Usage

```bash
npx create-ai-ops
```

Run this from your project root (e.g. a fresh Next.js app). The tool will fetch the template from [`Richmano-stack/ai-dev-os`](https://github.com/Richmano-stack/ai-dev-os) and copy files such as `.cursor/` and `ai/` into the current directory.

### What it does

1. Downloads the latest template tarball from the [`ai-dev-os`](https://github.com/Richmano-stack/ai-dev-os) repository using Node's built-in `fetch`
2. Extracts it using the system `tar` command (no npm dependencies required)
3. Recursively copies all template files into the current working directory
4. Skips `node_modules` and `.git` directories
5. Cleans up temporary files

> **Note:** Existing files with the same name will be overwritten.

## Requirements

- Node.js 18+

## Local development

```bash
npm install
npm run build
```

To test locally from another directory:

```bash
npx /path/to/ai-library
```

## How it works

```
src/
├── index.ts        # Entry point — calls the installer
├── installer.ts    # Orchestrates fetch → copy → cleanup
├── fetch.ts        # Downloads the template tarball via fetch and extracts with tar
├── copy.ts         # Recursively copies files (skips node_modules/.git)
├── constants.ts    # Template repo, branch, and temp dir config
```

## License

MIT
