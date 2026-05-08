const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'src', 'assets', 'gallery');
const webpDir = path.join(galleryDir, 'webp');

const categories = ['Fridge Magnets', 'Kids Activity'];

if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir);
}

categories.forEach(category => {
  const sourcePath = path.join(galleryDir, category);
  const targetPath = path.join(webpDir, category);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(sourcePath, file);
      const outputName = path.parse(file).name + '.webp';
      const outputPath = path.join(targetPath, outputName);

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`Converted: ${file} -> ${outputName}`))
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
  });
});
