import fs from 'fs/promises';
import { createWriteStream, unlink } from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const ext = response.headers['content-type'].split('/')[1] || 'jpg';
      const finalPath = destPath.endsWith('.jpg') && ext !== 'jpeg' && ext !== 'jpg' ? destPath.replace('.jpg', `.${ext}`) : destPath;
      
      const file = createWriteStream(finalPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(finalPath);
      });
    }).on('error', (err) => {
      unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  
  const urlRegex = /https:\/\/(images\.unsplash\.com|i\.pravatar\.cc)[^"'\s]+/g;
  const urls = [...new Set(content.match(urlRegex) || [])];
  
  if (urls.length === 0) return;
  
  await fs.mkdir(path.join(__dirname, 'public', 'images'), { recursive: true });
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isAvatar = url.includes('pravatar');
    const filename = `img_${isAvatar ? 'avatar' : 'product'}_${Date.now()}_${i}.jpg`;
    const dest = path.join(__dirname, 'public', 'images', filename);
    
    console.log(`Downloading ${url}...`);
    try {
      const finalPath = await downloadImage(url, dest);
      const relativePath = '/images/' + path.basename(finalPath);
      content = content.replaceAll(url, relativePath);
    } catch (e) {
      console.error(`Failed: ${url}`, e.message);
    }
  }
  
  await fs.writeFile(filePath, content);
  console.log(`Updated ${filePath}`);
}

async function main() {
  await processFile(path.join(__dirname, 'src', 'data', 'products.ts'));
  await processFile(path.join(__dirname, 'src', 'data', 'artisans.ts'));
}

main().catch(console.error);
