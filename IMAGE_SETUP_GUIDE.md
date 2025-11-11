# Image Setup Guide untuk Portfolio

## Struktur Image yang Diperlukan

Anda sudah memiliki struktur folder yang benar di `src/assets/image/`. Setiap project folder membutuhkan:

### 1. **Icon Image** (icon.png)
- **Ukuran ideal**: 256x256 px atau 512x512 px
- **Format**: PNG dengan transparent background
- **Penggunaan**: Ditampilkan di samping judul project di "My Work" section
- **Desktop**: 60x60 px
- **Mobile**: 40x40 px

### 2. **Preview Image** (Screenshot utama)
- **Ukuran ideal**: Minimal 800x600 px (aspect ratio 4:3 atau 16:9)
- **Format**: PNG atau JPG
- **Penggunaan**: Gambar bulat di sebelah kiri deskripsi project
- **Scaling**: Akan di-scale dengan `object-fit: cover` untuk maintain aspect ratio

### 3. **Slideshow Images** (Screenshots tambahan)
- **Ukuran ideal**: Minimal 1200x675 px (16:9 aspect ratio)
- **Format**: PNG atau JPG
- **Penggunaan**: Carousel di bawah setiap project
- **Scaling**: Akan di-display dengan `object-fit: contain` dengan padding

## Folder Structure

```
src/assets/image/
├── capstone/
│   ├── icon.png (256x256)
│   ├── Screenshot 2025-07-30 115909.png (preview image)
│   └── Screenshot_20231222_105511.png (slideshow)
├── chatWaifu/
│   ├── icon.png (256x256)
│   ├── image.png (preview image)
│   └── Screenshot images
├── parkingSpace/
│   ├── icon.png (256x256)
│   ├── Screenshot 2024-12-02 142249.png (preview image)
│   ├── Screenshot 2024-12-02 142405.png
│   └── Screenshot 2024-12-02 142930.png
└── rusunawa/
    ├── icon.png (256x256)
    ├── image.png (preview image)
    └── Multiple Screenshot images
```

## Perubahan yang Sudah Dibuat

### 1. **App.tsx Updates**
- ✅ Ditambahkan icon imports untuk setiap project
- ✅ Updated Project component dengan parameter `icon` 
- ✅ Project tile sekarang menampilkan icon di samping judul
- ✅ Struktur icon + title dengan flex layout yang proper

### 2. **App.css Updates**
- ✅ Updated `.project-image` dengan `object-fit: cover` (konsisten scaling)
- ✅ Menghapus `transform: scale(1.2)` yang menyebabkan distorsi
- ✅ Added `.project-link` dengan `aspect-ratio: 1` untuk circular container yang konsisten
- ✅ Updated `.project-tile` dengan flex layout untuk icon + title
- ✅ Added `project-icon` styling dengan fixed 60x60 px (desktop) dan 40x40 px (mobile)
- ✅ Updated slideshow styling dengan `object-fit: contain` dan `aspect-ratio: 16/9`
- ✅ Added responsive breakpoints untuk mobile dan tablet

## Image Scaling Notes

**Project Preview Image (Bulat)**
- Container: `aspect-ratio: 1` (always square/circular)
- Image: `object-fit: cover` (fills the circle without distortion)
- Desktop: Menyesuaikan dengan grid layout
- Mobile: Full width dengan aspect ratio 1:1

**Slideshow Images**
- Container: `aspect-ratio: 16/9` (widescreen format)
- Image: `object-fit: contain` (shows entire image dengan padding)
- Desktop: 70% width
- Tablet: 90% width
- Mobile: 95% width

**Icon Images**
- Desktop: 60x60 px
- Mobile: 40x40 px
- Styling: `object-fit: contain` dengan background color

## Tips Optimasi

1. **Kompresi Image**: Gunakan tools seperti TinyPNG atau ImageOptim untuk mengurangi file size
2. **Format Konsisten**: Gunakan PNG untuk icon (transparent), JPG untuk screenshots
3. **Aspect Ratio**: Pastikan preview images memiliki aspect ratio 4:3 atau 16:9
4. **Icon Design**: Gunakan solid colors atau desain yang jelas agar visible di 60x60 px

## Testing Responsive Design

```bash
# Run development server
npm run dev

# Buka browser dan test di:
# - Desktop (1920px, 1400px, 1200px)
# - Tablet (949px)
# - Mobile (649px, 375px)
```

## Troubleshooting

**Image terlihat terlalu besar atau kecil?**
- Check `object-fit` property dan `aspect-ratio`
- Verify image dimensions di browser devtools

**Icon tidak terlihat?**
- Verify path import di App.tsx
- Check file exists di folder
- Verify PNG file valid (bukan corrupt)

**Slideshow images tidak proper ratio?**
- Update image dengan 16:9 aspect ratio
- Atau adjust CSS `aspect-ratio` sesuai needs

