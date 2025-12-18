import { copyFile } from 'fs/promises';
import { join } from 'path';

const distPath = './dist';
const indexPath = join(distPath, 'index.html');
const notFoundPath = join(distPath, '404.html');

try {
  await copyFile(indexPath, notFoundPath);
  console.log('Copied index.html to 404.html for GitHub Pages routing');
} catch (error) {
  console.error('Error copying index.html to 404.html:', error);
  process.exit(1);
}

