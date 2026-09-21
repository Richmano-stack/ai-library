import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, unlink } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { TEMPLATE_REPO, TEMPLATE_BRANCH } from './constants.js';

const execAsync = promisify(exec);

const GITHUB_ARCHIVE = `https://github.com/${TEMPLATE_REPO}/archive/refs/heads/${TEMPLATE_BRANCH}.tar.gz`;

export async function fetchTemplate(destPath: string): Promise<void> {
  await mkdir(destPath, { recursive: true });

  const tarballPath = path.join(destPath, '.template.tar.gz');

  try {
    // 1. Download the tarball via fetch (follows redirects automatically)
    const res = await fetch(GITHUB_ARCHIVE);

    if (!res.ok || !res.body) {
      throw new Error(
        `Failed to download template from ${TEMPLATE_REPO}: ${res.status} ${res.statusText}`,
      );
    }

    // 2. Stream the response body to a file
    await pipeline(res.body, createWriteStream(tarballPath));

    // 3. Extract using system tar (available on Windows 10+ and all Unix systems)
    // --strip-components=1 removes the root directory GitHub adds to the archive
    await execAsync(
      `tar -xzf "${tarballPath}" -C "${destPath}" --strip-components=1`,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(
      `Failed to download template from ${TEMPLATE_REPO}: ${message}`,
    );
  } finally {
    await unlink(tarballPath);
  }
}
