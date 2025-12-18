import { copyFile, access } from 'fs/promises';
import { join } from 'path';

const distPath = './dist';
const indexPath = join(distPath, 'index.html');
const notFoundPath = join(distPath, '404.html');
const nojekyllPath = join(distPath, '.nojekyll');
const publicNojekyllPath = './public/.nojekyll';

try {
  // Copy index.html to 404.html for client-side routing
  await copyFile(indexPath, notFoundPath);
  console.log('Copied index.html to 404.html for GitHub Pages routing');
  
  // Copy .nojekyll file to dist if it exists in public
  try {
    await access(publicNojekyllPath);
    await copyFile(publicNojekyllPath, nojekyllPath);
    console.log('Copied .nojekyll to dist folder');
  } catch {
    // Create .nojekyll file if it doesn't exist
    const { writeFile } = await import('fs/promises');
    await writeFile(nojekyllPath, '');
    console.log('Created .nojekyll file in dist folder');
  }
} catch (error) {
  console.error('Error setting up GitHub Pages files:', error);
  process.exit(1);
}

