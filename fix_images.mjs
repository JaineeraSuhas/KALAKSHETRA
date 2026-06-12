import fs from 'fs/promises';
import { createWriteStream, unlink } from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specificImages = {
  "p2": ["https://loremflickr.com/900/600/pottery,vase/all", "https://loremflickr.com/900/600/blue,ceramic/all"],
  "p3": ["https://loremflickr.com/900/600/shawl,fabric/all", "https://loremflickr.com/900/600/embroidery,textile/all"],
  "p4": ["https://loremflickr.com/900/600/brass,figurine/all", "https://loremflickr.com/900/600/metal,sculpture/all"],
  "p5": ["https://loremflickr.com/900/600/indigo,fabric/all", "https://loremflickr.com/900/600/bedsheet,pattern/all"],
  "p6": ["https://loremflickr.com/900/600/carved,wood/all", "https://loremflickr.com/900/600/wood,box/all"],
  "p7": ["https://loremflickr.com/900/600/folk,painting/all", "https://loremflickr.com/900/600/art,canvas/all"],
  "p8": ["https://loremflickr.com/900/600/bridal,necklace/all", "https://loremflickr.com/900/600/gold,jewelry/all"],
  "p9": ["https://loremflickr.com/900/600/terracotta,plate/all", "https://loremflickr.com/900/600/clay,art/all"],
  "p10": ["https://loremflickr.com/900/600/wrought,iron/all", "https://loremflickr.com/900/600/metal,art/all"],
  "p11": ["https://loremflickr.com/900/600/cotton,stole/all", "https://loremflickr.com/900/600/block,print/all"],
  "p12": ["https://loremflickr.com/900/600/carved,frame/all", "https://loremflickr.com/900/600/wood,mirror/all"],
  "p13": ["https://loremflickr.com/900/600/silver,earrings/all", "https://loremflickr.com/900/600/filigree,jewelry/all"],
  "p14": ["https://loremflickr.com/900/600/tribal,painting/all", "https://loremflickr.com/900/600/warli,art/all"],
  "p15": ["https://loremflickr.com/900/600/ceramic,tea/all", "https://loremflickr.com/900/600/tea,set/all"],
  "p16": ["https://loremflickr.com/900/600/embroidered,fabric/all", "https://loremflickr.com/900/600/phulkari,textile/all"],
};

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const nextUrl = new URL(response.headers.location, url).href;
        return downloadImage(nextUrl, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const file = createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', (err) => { unlink(destPath, () => {}); reject(err); });
  });
}

async function fixProducts() {
  const productsPath = path.join(__dirname, 'src', 'data', 'products.ts');
  let content = await fs.readFile(productsPath, 'utf-8');
  
  for (const [id, urls] of Object.entries(specificImages)) {
    const downloadedPaths = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const filename = `img_fixed_lorem_${id}_${i}.jpg`;
      const dest = path.join(__dirname, 'public', 'images', filename);
      console.log(`Downloading ${id} image ${i}...`);
      try {
        await downloadImage(url, dest);
        downloadedPaths.push(`"/images/${filename}"`);
      } catch (e) {
        console.error(`Failed ${url}`, e);
      }
    }
    
    if (downloadedPaths.length > 0) {
      const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
      content = content.replace(regex, `$1\n      ${downloadedPaths.join(',\n      ')}\n    $3`);
    }
  }
  
  await fs.writeFile(productsPath, content);
  console.log('Fixed product images with loremflickr!');
}

fixProducts().catch(console.error);
