import { readdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function removeLargeFiles(dir) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stats = statSync(filePath);
    
    if (stats.isDirectory()) {
      removeLargeFiles(filePath);
    } else if (stats.isFile() && file.endsWith('.mp4') && stats.size > MAX_FILE_SIZE) {
      console.log(`Removing large file: ${filePath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
      unlinkSync(filePath);
    }
  });
}

removeLargeFiles(DIST_DIR);
console.log('Large video files removed from dist folder');

