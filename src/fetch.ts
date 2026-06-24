import degit from 'degit';
import { TEMPLATE_REPO } from './constants.js';

export async function fetchTemplate(destPath: string): Promise<void> {
  const emitter = degit(TEMPLATE_REPO, { cache: false, force: true });

  try {
    await emitter.clone(destPath);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(
      `Failed to download template from ${TEMPLATE_REPO}: ${message}`,
    );
  }
}
