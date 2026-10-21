/* Tes minat eksploratif: 24 pernyataan, 6 bidang, 4 butir per bidang. */
const questions = [
  { text: "Saya senang menjelaskan sesuatu agar orang lain mudah memahaminya.", category: "pendidikan" },
  { text: "Saya tertarik merancang kegiatan belajar atau membantu teman memahami pelajaran.", category: "pendidikan" },
  { text: "Saya ingin berkontribusi pada pendidikan dan pengembangan masyarakat.", category: "pendidikan" },
  { text: "Saya menikmati mencari cara yang berbeda agar orang dapat belajar lebih baik.", category: "pendidikan" },
  { text: "Saya tertarik mempelajari Al-Qur’an, tafsir, hadis, atau ilmu keislaman secara mendalam.", category: "keagamaan" },
  { text: "Saya senang mempelajari bahasa Arab dan teks-teks keislaman.", category: "keagamaan" },
  { text: "Saya ingin memahami bagaimana nilai-nilai agama diterapkan dalam kehidupan modern.", category: "keagamaan" },
  { text: "Saya tertarik pada kajian hukum, etika, dan pemikiran Islam.", category: "keagamaan" },
  { text: "Saya tertarik mengelola usaha atau merintis bisnis sendiri.", category: "bisnis" },
  { text: "Saya senang membandingkan harga, mengatur anggaran, atau membaca data keuangan.", category: "bisnis" },
  { text: "Saya tertarik pada ekonomi syariah, perbankan, atau layanan keuangan.", category: "bisnis" },
  { text: "Saya penasaran bagaimana pemasaran digital dapat membantu sebuah usaha berkembang.", category: "bisnis" },
  { text: "Saya senang memecahkan masalah dengan komputer, aplikasi, atau pemrograman.", category: "teknologi" },
  { text: "Saya tertarik memahami kecerdasan buatan dan cara teknologi bekerja.", category: "teknologi" },
  { text: "Saya menikmati mencoba perangkat atau aplikasi digital baru.", category: "teknologi" },
  { text: "Saya ingin membuat solusi digital yang bermanfaat bagi orang lain.", category: "teknologi" },
  { text: "Saya penasaran mengapa fenomena alam terjadi dan ingin mencari penjelasannya.", category: "sains" },
  { text: "Saya menikmati kegiatan praktikum, pengamatan, atau penelitian.", category: "sains" },
  { text: "Saya tertarik pada lingkungan, makhluk hidup, pangan, atau keberlanjutan.", category: "sains" },
  { text: "Saya nyaman memecahkan soal yang membutuhkan logika dan ketelitian.", category: "sains" },
  { text: "Saya senang menulis, berbicara, atau menyampaikan gagasan kepada banyak orang.", category: "komunikasi" },
  { text: "Saya tertarik membuat konten, berita, video, atau materi publikasi.", category: "komunikasi" },
  { text: "Saya ingin memahami cara pesan dan media memengaruhi masyarakat.", category: "komunikasi" },
  { text: "Saya menikmati membaca, berdiskusi, dan melihat suatu isu dari beragam sudut pandang.", category: "komunikasi" }
];

const answerOptions = [
  { label: "Sangat tidak setuju", value: 1 },
  { label: "Tidak setuju", value: 2 },
  { label: "Netral", value: 3 },
  { label: "Setuju", value: 4 },
  { label: "Sangat setuju", value: 5 }
];

/* Sebarkan butir antarkategori agar setiap halaman tidak membocorkan satu bidang saja. */
(() => {
  const order = ["pendidikan", "keagamaan", "bisnis", "teknologi", "sains", "komunikasi"];
  const original = questions.slice();
  const interleaved = [];
  for (let round = 0; round < 4; round += 1) {
    order.forEach((category) => {
      const item = original.filter((question) => question.category === category)[round];
      if (item) interleaved.push(item);
    });
  }
  questions.splice(0, questions.length, ...interleaved);
})();
