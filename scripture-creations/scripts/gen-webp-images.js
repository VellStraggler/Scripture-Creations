import fs from "fs";
import path from "path";
import sharp from "sharp";

/* ============================================================
   CONFIGURATION
   ============================================================ */

// ⭐ DESTROY SWITCH — Set to true to wipe all webp images first
const destroy = true;

// Base directory (one level above products)
const BASE_FOLDER = path.join(
    process.cwd(),
    "./public/images"
);

// Supported source formats
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"];

// Derived image pattern detection (sm, md, lg variants)
function isDerivedImage(filePath) {
    const basename = path.basename(filePath);
    return /-(sm|md|lg)\.[^.]+$/i.test(basename);
}

/* ============================================================
   DESTROY MODE
   ============================================================ */

function deleteWebpRecursively(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            deleteWebpRecursively(fullPath);
        } else if (entry.isFile() && fullPath.toLowerCase().endsWith(".webp")) {
            fs.unlinkSync(fullPath);
            console.log("Deleted:", fullPath);
        }
    }
}

/* ============================================================
   IMAGE PROCESSING
   ============================================================ */

async function processImage(filePath) {
    try {
        if (isDerivedImage(filePath)) return;

        const ext = path.extname(filePath).toLowerCase();
        if (!SOURCE_EXTENSIONS.includes(ext)) return;

        const fileName = path.basename(filePath, ext);
        const dir = path.dirname(filePath);

        const image = sharp(filePath);
        const metadata = await image.metadata();

        const baseOutput = path.join(dir, fileName);

        const sizes = [
            { suffix: "sm", width: 200 },
            { suffix: "md", width: 400 },
            { suffix: "lg", width: metadata.width }
        ];

        for (const size of sizes) {
            const outputPath = `${baseOutput}-${size.suffix}.webp`;

            let pipeline = sharp(filePath).webp({
                quality: 80
            });

            if (size.width && size.width < metadata.width) {
                pipeline = pipeline.resize({
                    width: size.width,
                    withoutEnlargement: true
                });
            }

            await pipeline.toFile(outputPath);

            console.log("Generated:", outputPath);
        }

    } catch (err) {
        console.error("Error processing", filePath, err);
    }
}

/* ============================================================
   DIRECTORY SCAN
   ============================================================ */

async function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await scanDirectory(fullPath);
        } else {
            await processImage(fullPath);
        }
    }
}

/* ============================================================
   MAIN
   ============================================================ */

async function main() {
    console.log("Starting WebP pipeline...");

    if (destroy) {
        console.log("Destroy mode enabled — deleting all webp files...");
        deleteWebpRecursively(BASE_FOLDER);
    }

    await scanDirectory(BASE_FOLDER);

    console.log("Pipeline complete.");
}

main();