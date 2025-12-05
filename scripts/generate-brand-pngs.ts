import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

const BRAND_DIR = path.join(process.cwd(), "public/brand");

const LOGOS = ["logo-gradient", "logo-black", "logo-white", "logo-on-gradient"];
const ICONS = ["icon-gradient", "icon-black", "icon-white", "icon-on-gradient"];
const BANNERS = [
  { name: "banner-wide-logo", width: 1500, height: 500 },
  { name: "banner-wide-plain", width: 1500, height: 500 },
  { name: "banner-wide-mantra", width: 1500, height: 500 },
  { name: "banner-social-logo", width: 1200, height: 630 },
  { name: "banner-social-plain", width: 1200, height: 630 },
  { name: "banner-social-mantra", width: 1200, height: 630 },
  { name: "banner-square-logo", width: 1200, height: 1200 },
  { name: "banner-square-plain", width: 1200, height: 1200 },
  { name: "banner-square-mantra", width: 1200, height: 1200 },
];

const ICON_SIZES = [
  { name: "favicon", size: 16 },
  { name: "small", size: 32 },
  { name: "medium", size: 128 },
  { name: "large", size: 512 },
];

async function generateLogoPngs() {
  for (const logo of LOGOS) {
    const svgPath = path.join(BRAND_DIR, `${logo}.svg`);
    const pngPath = path.join(BRAND_DIR, `${logo}.png`);
    
    if (fs.existsSync(svgPath)) {
      await sharp(svgPath)
        .resize(800, 192) // 4x the original 200x48
        .png()
        .toFile(pngPath);
      console.log(`Generated: ${pngPath}`);
    }
  }
}

async function generateIconPngs() {
  for (const icon of ICONS) {
    const svgPath = path.join(BRAND_DIR, `${icon}.svg`);
    
    if (fs.existsSync(svgPath)) {
      // Generate each size
      for (const { name, size } of ICON_SIZES) {
        const pngPath = path.join(BRAND_DIR, `${icon}-${name}.png`);
        await sharp(svgPath)
          .resize(size, size)
          .png()
          .toFile(pngPath);
        console.log(`Generated: ${pngPath}`);
      }
      
      // Also generate a default PNG at 512px
      const defaultPngPath = path.join(BRAND_DIR, `${icon}.png`);
      await sharp(svgPath)
        .resize(512, 512)
        .png()
        .toFile(defaultPngPath);
      console.log(`Generated: ${defaultPngPath}`);
    }
  }
}

async function generateBannerPngs() {
  for (const banner of BANNERS) {
    const svgPath = path.join(BRAND_DIR, `${banner.name}.svg`);
    const pngPath = path.join(BRAND_DIR, `${banner.name}.png`);
    
    if (fs.existsSync(svgPath)) {
      await sharp(svgPath)
        .resize(banner.width, banner.height)
        .png()
        .toFile(pngPath);
      console.log(`Generated: ${pngPath}`);
    }
  }
}

async function main() {
  console.log("Generating PNG brand assets...\n");
  await generateLogoPngs();
  await generateIconPngs();
  await generateBannerPngs();
  console.log("\nDone!");
}

main().catch(console.error);
