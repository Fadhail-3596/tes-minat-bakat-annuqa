# Tes Minat dan Potensi Akademik — Universitas Annuqayah

Aplikasi web statis untuk membantu calon mahasiswa mengeksplorasi kecenderungan minat akademik. Tes ini berisi **24 pernyataan** yang dibagi rata ke dalam enam bidang: Pendidikan, Kajian Keislaman, Bisnis & Ekonomi, Teknologi, Sains & Lingkungan, serta Komunikasi & Kreativitas.

> **Catatan:** hasil bersifat eksploratif, bukan diagnosis psikologis atau keputusan mutlak tentang jurusan. Daftar prodi favorit dan status akreditasi yang ditampilkan berasal dari data masukan penyelenggara dan perlu diperiksa pada sumber resmi sebelum digunakan untuk keputusan penting.

## Fitur

- Formulir peserta dan persetujuan pengiriman data.
- 24 pernyataan dengan skala 1–5, ditampilkan 4 butir per halaman.
- Skor 4–20 untuk masing-masing dari enam bidang minat.
- Penanganan skor seri dan rekomendasi program studi terkait.
- Daftar 10 prodi favorit ditampilkan terpisah dari kecocokan minat.
- Laporan yang dapat dicetak atau disimpan sebagai PDF.
- Pengiriman data ke Google Sheets melalui endpoint Google Apps Script yang dikonfigurasi di `js/main.js`.
- Fallback `window.name` untuk meneruskan hasil saat browser membatasi `localStorage` pada halaman yang dibuka melalui `file://`.

## Teknologi dan struktur

HTML, CSS, dan JavaScript murni; tidak membutuhkan framework, proses build, atau instalasi package.

```text
.
├── assets/
│   ├── logo-head.png   # simbol kampus saja
│   └── logo.png        # logo lengkap dengan tulisan Universitas Annuqayah
├── css/styles.css
├── js/
│   ├── main.js         # alur formulir, tes, penyimpanan, dan pengiriman
│   ├── questions.js    # pernyataan dan pilihan jawaban
│   └── scoring.js      # perhitungan, rekomendasi, dan daftar prodi favorit
├── index.html
├── result.html
└── template-pdf.html
```

## Menjalankan secara lokal

Cara paling konsisten adalah menggunakan server lokal, bukan membuka file HTML satu per satu:

1. Buka terminal di folder proyek.
2. Jalankan `python -m http.server 8000` (atau `python3 -m http.server 8000`).
3. Buka `http://localhost:8000` di browser.
4. Isi formulir, selesaikan semua pernyataan, lihat hasil, lalu uji cetak/simpan PDF.
5. Hentikan server dengan `Ctrl+C` di terminal.

Aplikasi juga memiliki fallback untuk percobaan melalui `file://`, tetapi server lokal lebih dapat diandalkan karena penyimpanan browser untuk file lokal tidak konsisten antar-browser.

## Logika penilaian

Setiap bidang diwakili empat pernyataan. Setiap jawaban bernilai 1 sampai 5, sehingga skor bidang berada pada rentang 4–20. Skor tertinggi menentukan kecenderungan utama; jika ada skor yang sama, seluruh bidang yang seri ditampilkan. Rekomendasi personal mengikuti bidang yang menonjol. Urutan 10 prodi favorit merupakan informasi tambahan yang terpisah agar popularitas tidak mengubah skor minat peserta.

Pertanyaan berada di `js/questions.js`; penilaian dan rekomendasi di `js/scoring.js`; alur antarmuka berada di `js/main.js`.

## Privasi dan keamanan

Sebelum penggunaan publik, pastikan pengelola memahami dan menyetujui penggunaan endpoint Google Apps Script. Periksa akses spreadsheet, tujuan pemrosesan, masa simpan, dan prosedur penghapusan data. Formulir meminta persetujuan sebelum pengiriman, tetapi persetujuan tersebut bukan pengganti pemberitahuan privasi yang lengkap. Jangan menaruh kredensial rahasia di JavaScript sisi klien.

## Deployment Netlify

Hubungkan repositori GitHub ke Netlify, gunakan root repositori sebagai publish directory jika `index.html` berada di root, dan kosongkan build command. Uji deployment preview pada ponsel dan desktop sebelum memublikasikan ke situs utama.

## Checklist sebelum rilis

- [ ] Semua 24 pernyataan dapat dijawab dan jawaban tersimpan saat berpindah halaman.
- [ ] Skor keenam bidang berada pada rentang 4–20 dan skor seri ditampilkan dengan benar.
- [ ] Rekomendasi minat dan daftar prodi favorit tampil terpisah.
- [ ] Hasil dan PDF bekerja di localhost dan deployment preview.
- [ ] Layout diuji pada ponsel kecil, tablet, dan desktop.
- [ ] Pengiriman Google Sheets diuji secara terpisah; mode `no-cors` tidak dapat memastikan keberhasilan penerimaan data dari sisi browser.
- [ ] Status prodi dan akreditasi diverifikasi dengan sumber resmi terbaru sebelum rilis.

## 🔗 Live Demo

Coba aplikasi **Tes Minat dan Potensi Akademik Universitas Annuqayah** melalui tautan berikut:

👉 **[Buka Live Demo](https://tmb-univ-annuqayah.netlify.app/)**
