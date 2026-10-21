# Tes Minat dan Potensi Akademik — Universitas Annuqayah

Aplikasi web untuk membantu calon mahasiswa mengenali kecenderungan minat akademik dan mengeksplorasi pilihan program studi di Universitas Annuqayah.

## 🔗 Live Demo

**[Buka Tes Minat dan Potensi Akademik](https://tmb-univ-annuqayah.netlify.app/)**

## 📌 Tentang Aplikasi

Tes Minat dan Potensi Akademik merupakan alat eksplorasi awal untuk membantu peserta memahami bidang akademik yang sesuai dengan ketertarikan mereka.

Peserta mengisi biodata, membaca petunjuk, kemudian menjawab pernyataan berdasarkan minat dan kecenderungan pribadi. Sistem mengolah jawaban menjadi ringkasan skor dan rekomendasi program studi.

**Penting:** hasil tes bukan diagnosis psikologis, bukan tes kecerdasan, dan bukan keputusan mutlak dalam menentukan jurusan. Hasil sebaiknya digunakan sebagai bahan pertimbangan bersama kemampuan akademik, pengalaman, tujuan karier, dan informasi resmi program studi.

## ✨ Fitur Utama

- Formulir biodata peserta dan persetujuan pengiriman data.
- 24 pernyataan dengan skala penilaian 1–5.
- Ringkasan skor pada enam bidang minat.
- Identifikasi kecenderungan minat tertinggi, termasuk ketika skor seri.
- Rekomendasi satu program studi utama dan dua alternatif berdasarkan hasil penilaian.
- Informasi empat klaster program studi.
- Laporan hasil yang dapat dicetak atau disimpan sebagai PDF.
- Pengiriman data ke Google Sheets melalui Google Apps Script apabila telah dikonfigurasi.
- Antarmuka responsif untuk ponsel, tablet, dan desktop.

## 🎓 Empat Klaster Program Studi

Program studi dikelompokkan menjadi empat klaster untuk membantu peserta mengeksplorasi bidang yang diminati.

| Klaster | Contoh program studi |
|---|---|
| **Keagamaan & Sosial Spiritual** | Pendidikan Agama Islam (PAI), Pendidikan Bahasa Arab (PBA), Ilmu al-Quran dan Tafsir (IQT), Tasawuf dan Psikoterapi |
| **Teknik & Teknologi Digital** | Teknologi Informasi, Kecerdasan Buatan (AI), Teknik Sipil |
| **Bisnis, Hukum & Manajemen** | Ekonomi Syariah, Perbankan Syariah, Bisnis Digital, Hukum Ekonomi Syariah, Hukum Keluarga Islam, Hukum Bisnis |
| **Sains, Pendidikan & Humaniora** | Biologi, Matematika, Kimia, Teknologi Hasil Pertanian, Sains Lingkungan, PIAUD, Ilmu Komunikasi, Sastra Indonesia |

Daftar tersebut merupakan pengelompokan untuk eksplorasi awal. Ketersediaan program studi, persyaratan penerimaan, dan status akreditasi dapat berubah. Periksa informasi terkini melalui [situs resmi Universitas Annuqayah](https://ua.ac.id/) dan [portal PMB Universitas Annuqayah](https://pmb.ua.ac.id/).

## 📝 Skala dan Sistem Penilaian

Setiap pernyataan menggunakan skala Likert lima tingkat.

| Skor | Pilihan jawaban |
|---:|---|
| 1 | Sangat Tidak Setuju |
| 2 | Tidak Setuju |
| 3 | Netral |
| 4 | Setuju |
| 5 | Sangat Setuju |

Setiap bidang penilaian diwakili oleh empat pernyataan. Dengan demikian, skor masing-masing bidang berada pada rentang **4–20**.

Secara umum, proses penilaian meliputi:

1. Sistem mengumpulkan jawaban peserta.
2. Jawaban diakumulasikan sesuai bidang atau klaster yang diwakili.
3. Sistem membandingkan skor untuk mengidentifikasi kecenderungan tertinggi.
4. Program studi direkomendasikan berdasarkan aturan pemetaan pada aplikasi.
5. Jika skor tertinggi sama, bidang yang seri perlu dipertimbangkan bersama, bukan dipaksakan menjadi satu kecenderungan tunggal.

Popularitas program studi tidak seharusnya menggantikan hasil penilaian minat pribadi. Rekomendasi merupakan titik awal eksplorasi, bukan jaminan kecocokan akademik.

## 🚀 Cara Menggunakan Aplikasi

1. Buka [Live Demo](https://tmb-univ-annuqayah.netlify.app/).
2. Isi biodata sesuai informasi yang diminta.
3. Baca petunjuk dan persetujuan pengolahan data.
4. Jawab seluruh pernyataan sesuai minat diri sendiri, bukan berdasarkan jawaban yang dianggap paling baik.
5. Periksa hasil kecenderungan minat dan rekomendasi program studi.
6. Jika diperlukan, cetak atau simpan laporan hasil sebagai PDF.

Jawablah secara jujur agar hasil lebih mencerminkan ketertarikan pribadi.

## 🛠️ Teknologi yang Digunakan

Aplikasi dibangun menggunakan teknologi web dasar:

- **HTML5** — struktur halaman dan formulir.
- **CSS3** — desain antarmuka, tata letak, dan responsivitas.
- **JavaScript** — pengelolaan alur tes, perhitungan skor, rekomendasi, dan penyajian hasil.
- **Google Apps Script dan Google Sheets** — penyimpanan data peserta apabila integrasi diaktifkan.
- **Netlify** — hosting aplikasi web.

Proyek tidak memerlukan framework JavaScript atau proses build khusus.

## 📂 Struktur Proyek

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

**Fungsi file utama:**

| File | Kegunaan |
|---|---|
| `index.html` | Halaman awal, biodata, petunjuk, dan proses pengerjaan tes |
| `result.html` | Menampilkan ringkasan hasil dan rekomendasi |
| `template-pdf.html` | Tata letak laporan untuk dicetak atau disimpan sebagai PDF |
| `css/styles.css` | Gaya visual dan penyesuaian tampilan berbagai ukuran layar |
| `js/main.js` | Validasi formulir, navigasi tes, penyimpanan jawaban, dan integrasi pengiriman data |
| `js/questions.js` | Daftar pernyataan tes dan pilihan jawaban |
| `js/scoring.js` | Perhitungan skor dan pemetaan rekomendasi |
| `assets/logo-head.png` | Logo simbol kampus |
| `assets/logo.png` | Logo lengkap dengan tulisan Universitas Annuqayah |

## 💻 Menjalankan Secara Lokal

Untuk mencoba aplikasi di komputer, gunakan server lokal agar perilaku navigasi dan penyimpanan lebih konsisten.

**Persyaratan:** Python 3 atau server HTTP lokal yang setara.

1. Unduh atau salin repository ke komputer.
2. Buka terminal di direktori proyek.
3. Jalankan perintah berikut:

   ```bash
   python -m http.server 8000
   ```

   Pada sebagian sistem, gunakan `python3 -m http.server 8000`.

4. Buka alamat berikut di browser:

   `http://localhost:8000`

5. Coba alur lengkap dari pengisian biodata sampai hasil dan laporan PDF.

Hentikan server dengan `Ctrl+C` pada terminal.

Membuka HTML secara langsung menggunakan alamat `file://` dapat menimbulkan perbedaan perilaku penyimpanan antar-browser. Karena itu, server lokal lebih disarankan.

## 🔐 Privasi dan Pengelolaan Data

Aplikasi dapat mengirimkan data peserta ke Google Sheets melalui Google Apps Script apabila endpoint telah dikonfigurasi.

Sebelum menggunakan fitur tersebut untuk peserta sungguhan, pengelola perlu memastikan:

- Tujuan pengumpulan data dijelaskan kepada peserta.
- Persetujuan diberikan sebelum data dikirim.
- Spreadsheet hanya dapat diakses oleh pihak berwenang.
- Data disimpan sesuai kebutuhan dan memiliki kebijakan penghapusan.
- Informasi pribadi tidak disebarkan tanpa dasar dan kewenangan yang sesuai.
- Tidak ada kata sandi, token rahasia, atau kredensial sensitif di dalam kode JavaScript sisi klien.

**Catatan teknis:** apabila pengiriman menggunakan mode `no-cors`, browser tidak dapat membaca respons server untuk memastikan bahwa data benar-benar diterima atau tersimpan. Keberhasilan integrasi perlu diperiksa melalui Google Apps Script dan spreadsheet tujuan.

## 📄 Lisensi dan Penggunaan

README ini tidak menetapkan lisensi penggunaan kode. Jika proyek akan digunakan, dimodifikasi, atau didistribusikan oleh pihak lain, tambahkan berkas `LICENSE` yang sesuai dengan ketentuan pemilik proyek.

---

Dikembangkan untuk mendukung eksplorasi minat akademik calon mahasiswa **Universitas Annuqayah**.
