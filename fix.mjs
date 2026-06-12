import fs from 'fs/promises';

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  content = content.replace(/https:\/\/(images\.unsplash\.com|i\.pravatar\.cc)[^"'\s]+/g, '/images/img_product_1781291560561_0.jpg');
  await fs.writeFile(filePath, content);
}

async function main() {
  await fixFile('src/data/products.ts');
  await fixFile('src/data/artisans.ts');
  console.log("Fixed remaining URLs");
}

main().catch(console.error);
