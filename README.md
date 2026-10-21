# Tes Minat & Potensi Akademik — Universitas Annuqayah

Aplikasi web statis untuk membantu calon mahasiswa mengeksplorasi kecenderungan minat akademik melalui pernyataan singkat dan memperoleh ringkasan skor pada empat kategori: Humaniora, Sains, Keagamaan, dan Teknologi.

> **Catatan penting:** hasil tes merupakan gambaran awal untuk eksplorasi minat, bukan diagnosis psikologis atau kepastian mengenai bakat maupun jurusan yang paling tepat.

## Fitur

- Formulir data peserta.
- Petunjuk dan pertanyaan tes.
- Penghitungan skor untuk empat kategori.
- Halaman hasil dan rekomendasi awal.
- Pembuatan laporan melalui fitur cetak/simpan sebagai PDF.
- Pengiriman data ke Google Sheets melalui Google Apps Script (konfigurasi saat ini berada di `js/main.js`).

## Teknologi

- HTML
- CSS
- JavaScript
- `localStorage` untuk meneruskan hasil tes ke halaman hasil dan laporan.
- Google Apps Script sebagai endpoint pengiriman data (jika diaktifkan dan tersedia).

Aplikasi tidak memerlukan proses build atau instalasi package untuk dijalankan sebagai situs statis.

## Struktur proyek

```text
.
├── assets/
│   ├── logo-head.png
│   └── logo.png
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── questions.js
│   └── scoring.js
├── index.html
├── result.html
├── template-pdf.html
└── README.md
```

## Menjalankan secara lokal

1. Unduh atau salin repositori.
2. Buka `index.html` di browser untuk pemeriksaan awal.
3. Untuk pengujian yang lebih konsisten, jalankan folder ini menggunakan server statis lokal.
4. Uji alur dari halaman awal sampai hasil dan cetak PDF.

Tidak ada perintah `npm install` atau proses build yang diperlukan dalam struktur saat ini.

## Alur aplikasi

1. Peserta membuka `index.html`.
2. Peserta mengisi data diri dan membaca petunjuk.
3. Peserta menjawab pertanyaan tes.
4. JavaScript menghitung skor berdasarkan kategori.
5. Hasil disimpan sementara di `localStorage` dan ditampilkan di `result.html`.
6. Peserta dapat mencetak atau menyimpan laporan sebagai PDF.

## Logika penilaian

Pertanyaan didefinisikan di `js/questions.js`, sedangkan fungsi penghitungan skor dan narasi rekomendasi berada di `js/scoring.js`. Alur interaksi tes berada di `js/main.js`.

Sebelum mengubah pertanyaan, bobot, kategori, atau aturan rekomendasi, lakukan pengujian regresi agar hasil tidak berubah tanpa sengaja. Penanganan skor seri dan pertanyaan yang belum dijawab juga perlu ditetapkan secara eksplisit.

## Privasi dan keamanan data

Versi saat ini memiliki endpoint Google Apps Script yang didefinisikan di `js/main.js`. Sebelum penggunaan publik:

- Pastikan data apa saja yang dikirim dan siapa yang dapat mengakses spreadsheet.
- Tampilkan pemberitahuan privasi dan minta persetujuan yang sesuai sebelum mengirim data.
- Tentukan tujuan penggunaan, masa simpan, dan prosedur penghapusan data.
- Hindari memasukkan data pribadi yang tidak diperlukan.
- Validasi seluruh jawaban sebelum menghitung atau mengirim hasil.
- Tampilkan data pengguna sebagai teks, bukan menyisipkannya ke HTML melalui `innerHTML`.
- Jangan menaruh kata sandi, token rahasia, atau kredensial privat dalam kode sisi klien.

## Deployment ke Netlify

Proyek ini merupakan situs statis. Untuk deployment:

1. Hubungkan repositori GitHub ke Netlify.
2. Atur **Publish directory** ke direktori yang berisi `index.html` (root repositori jika struktur tetap seperti di atas).
3. Kosongkan build command karena tidak ada proses build yang diperlukan.
4. Deploy sebagai preview terlebih dahulu, lalu uji seluruh alur.
5. Publikasikan perubahan ke situs utama setelah pengujian berhasil.

Jika proyek berada di subdirektori dalam repositori, sesuaikan publish directory dengan lokasi `index.html`.

## Checklist pengujian sebelum rilis

- [ ] Formulir menolak data wajib yang kosong dan memberikan pesan yang jelas.
- [ ] Semua pertanyaan wajib dijawab sebelum hasil dihitung.
- [ ] Tombol kembali dan lanjut bekerja dengan benar.
- [ ] Skor empat kategori sesuai dengan jawaban yang dipilih.
- [ ] Skor seri ditangani dengan aturan yang jelas.
- [ ] Data peserta ditampilkan dengan aman.
- [ ] Halaman hasil menangani kondisi ketika data tidak tersedia atau rusak.
- [ ] Tampilan nyaman pada ponsel dan desktop.
- [ ] Navigasi keyboard, label input, fokus, dan kontras dapat digunakan.
- [ ] Cetak/simpan PDF tidak terpotong dan menampilkan data yang sesuai.
- [ ] Pengiriman ke Google Sheets diuji serta sesuai dengan pemberitahuan privasi.
- [ ] Deployment preview Netlify berhasil sebelum rilis.

## Kontribusi dan pengembangan

Lakukan perubahan melalui branch terpisah, uji di deployment preview, lalu gabungkan ke branch utama setelah pemeriksaan selesai. Pertahankan teknologi HTML, CSS, dan JavaScript selama belum ada kebutuhan teknis yang kuat untuk berpindah framework.
"""
out = "/mnt/data/README.md"
pypandoc.convert_text(readme, "md", format="md", outputfile=out, extra_args=["--standalone"])
print(f"README.md berhasil dibuat: {os.path.getsize(out)} bytes")
