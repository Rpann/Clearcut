# ClearCut

A client-side background removal app built with React and WebAssembly. Upload an image, remove its background, and download a high-resolution transparent PNG — all inside the browser, with zero server uploads.

https://github.com/user-attachments/assets/036b34ef-f29a-4071-9bb0-d70f21c4fc89

## Features

- **Browser-Based Processing:** Backgrounds are removed using a WASM neural network that runs entirely on your device.
- **Complete Privacy:** Your images never leave your computer — no server uploads, no tracking.
- **Custom Backgrounds:** Replace removed backgrounds with solid colors or gradient presets.
- **Interactive Comparison:** Drag a slider to compare the original and processed result side by side.
- **Full Resolution Downloads:** Export high-res PNGs with no watermarks or file size limits.
- **Drag & Drop Upload:** Upload images by dragging them onto the page or browsing files.
- **Offline Support:** Works without internet after the first load (models are cached in the browser).
- **Sample Images:** Try the tool instantly with built-in sample images.

**Background Removal**
- @imgly/background-removal

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Rpann/Clearcut.git
cd Clearcut
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```

## Project Structure

```
Clearcut/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── App.tsx
│   ├── constants.ts
│   ├── utils.ts
│   └── index.css
├── generate-showcase.mjs
├── index.html
├── vercel.json
└── vite.config.ts
```
