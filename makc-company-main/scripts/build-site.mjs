import { execFile as execFileCallback } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const execFile = promisify(execFileCallback);

const imageAssets = [
    { name: "hero.jpg", width: 1400, quality: 74 },
    { name: "about.jpg", width: 1200, quality: 72 },
    { name: "ppr.jpg", width: 1100, quality: 72 },
    { name: "pvc.jpg", width: 1100, quality: 72 },
    { name: "value.jpg", width: 1100, quality: 72 }
];

const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp"
};

await rm(dist, { force: true, recursive: true });
await mkdir(join(dist, "server"), { recursive: true });
await mkdir(join(dist, "images"), { recursive: true });

const optimizeImage = async ({ name, width, quality }) => {
    const source = join(root, "images", name);
    const target = join(dist, "images", name);

    try {
        await execFile("sips", [
            "--resampleWidth",
            String(width),
            "--setProperty",
            "format",
            "jpeg",
            "--setProperty",
            "formatOptions",
            String(quality),
            source,
            "--out",
            target
        ]);
    } catch {
        await cp(source, target);
    }
};

await Promise.all([
    cp(join(root, "index.html"), join(dist, "index.html")),
    cp(join(root, "products.html"), join(dist, "products.html")),
    cp(join(root, "product.html"), join(dist, "product.html")),
    cp(join(root, "style.css"), join(dist, "style.css")),
    cp(join(root, "script.js"), join(dist, "script.js")),
    ...imageAssets.map(optimizeImage)
]);

const assetFiles = [
    "index.html",
    "products.html",
    "product.html",
    "style.css",
    "script.js",
    ...imageAssets.map(({ name }) => `images/${name}`)
];

const assets = Object.fromEntries(await Promise.all(assetFiles.map(async (filePath) => {
    const content = await readFile(join(dist, filePath));
    const extension = extname(filePath).toLowerCase();

    return [`/${filePath}`, {
        body: content.toString("base64"),
        contentType: contentTypes[extension] || "application/octet-stream"
    }];
})));

const worker = `const assets = ${JSON.stringify(assets)};
const decodedAssets = new Map();

const readAsset = (pathname) => {
    const cached = decodedAssets.get(pathname);
    if (cached) {
        return cached;
    }

    const asset = assets[pathname];
    if (!asset) {
        return null;
    }

    const binary = atob(asset.body);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }

    const decoded = { bytes, contentType: asset.contentType };
    decodedAssets.set(pathname, decoded);
    return decoded;
};

export default {
    async fetch(request) {
        const url = new URL(request.url);
        const pathname = url.pathname === "/"
            ? "/index.html"
            : url.pathname === "/products" || url.pathname === "/products/"
                ? "/products.html"
            : url.pathname.startsWith("/product/")
                ? "/product.html"
                : url.pathname;
        const asset = readAsset(pathname) || (!pathname.includes(".") ? readAsset("/index.html") : null);

        if (!asset) {
            return new Response("", { status: 404 });
        }

        const headers = new Headers({
            "Content-Type": asset.contentType
        });

        if (pathname.endsWith(".css") || pathname.endsWith(".js") || pathname.endsWith(".html")) {
            headers.set("Cache-Control", "no-cache, max-age=0, must-revalidate");
        } else if (!pathname.endsWith(".html")) {
            headers.set("Cache-Control", "public, max-age=31536000, immutable");
        }

        return new Response(asset.bytes, { headers });
    }
};
`;

await writeFile(join(dist, "server", "index.js"), worker);

const html = await readFile(join(dist, "index.html"), "utf8");
if (!html.includes("MAK Plumbing Solutions")) {
    throw new Error("Build verification failed: index.html is missing the site title.");
}
