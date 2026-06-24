import { rm } from 'node:fs/promises';
import path from 'node:path';
import { TEMP_DIR_NAME, TEMPLATE_REPO } from './constants.js';
import { copyTemplate } from './copy.js';
import { fetchTemplate } from './fetch.js';

export async function runInstaller(): Promise<void> {
  const cwd = process.cwd();
  const tempDir = path.join(cwd, TEMP_DIR_NAME);

  try {
    await fetchTemplate(tempDir);
    await copyTemplate(tempDir, cwd);

    console.log('AI Dev OS installed successfully.');
    console.log(`Source: ${TEMPLATE_REPO}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
