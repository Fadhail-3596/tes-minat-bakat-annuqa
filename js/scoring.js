const CATEGORY_ORDER = ["pendidikan", "keagamaan", "bisnis", "teknologi", "sains", "komunikasi"];
const CATEGORY_DETAILS = {
  pendidikan: { label: "Pendidikan", narrative: "Kamu cenderung tertarik pada proses belajar, membantu orang lain berkembang, dan pengembangan masyarakat." },
  keagamaan: { label: "Keagamaan & Kajian Islam", narrative: "Kamu cenderung tertarik pada kajian keislaman, teks, nilai, dan penerapan agama dalam kehidupan." },
  bisnis: { label: "Bisnis & Ekonomi", narrative: "Kamu cenderung tertarik pada usaha, keuangan, pemasaran, dan pengembangan organisasi." },
  teknologi: { label: "Teknologi & Inovasi Digital", narrative: "Kamu cenderung tertarik pada komputer, sistem digital, pemrograman, dan teknologi baru." },
  sains: { label: "Sains & Lingkungan", narrative: "Kamu cenderung tertarik pada pengamatan, penalaran, penelitian, dan fenomena alam." },
  komunikasi: { label: "Komunikasi & Kreativitas", narrative: "Kamu cenderung tertarik pada penyampaian gagasan, penulisan, media, dan kreativitas." }
};

const CLUSTERS = [
  { id: "keagamaan", label: "Keagamaan & Sosial Spiritual", dimensions: ["keagamaan"], programs: ["Pendidikan Agama Islam (PAI)", "Pendidikan Bahasa Arab (PBA)", "Ilmu al-Quran dan Tafsir (IQT)", "Tasawuf dan Psikoterapi"] },
  { id: "teknologi", label: "Teknik & Teknologi Digital", dimensions: ["teknologi"], programs: ["Teknologi Informasi", "Kecerdasan Buatan (AI)", "Teknik Sipil"] },
  { id: "bisnis", label: "Bisnis, Hukum & Manajemen", dimensions: ["bisnis"], programs: ["Ekonomi Syari’ah", "Perbankan Syariah", "Bisnis Digital", "Hukum Ekonomi Syari’ah (Mu'amalah)", "Hukum Keluarga Islam (Ahwal Syakhsiyyah)", "Hukum Bisnis"] },
  { id: "humaniora", label: "Sains, Pendidikan & Humaniora", dimensions: ["pendidikan", "sains", "komunikasi"], programs: ["Biologi", "Matematika", "Kimia", "Teknologi Hasil Pertanian (THP)", "Sains Lingkungan", "Pendidikan Islam Anak Usia Dini (PIAUD)", "Ilmu Komunikasi", "Sastra Indonesia"] }
];

function calculateScores(answers) {
  const scores = Object.fromEntries(CATEGORY_ORDER.map(category => [category, 0]));
  answers.forEach(answer => {
    if (!answer || !Object.prototype.hasOwnProperty.call(scores, answer.category)) return;
    const value = Number(answer.value);
    if (Number.isInteger(value) && value >= 1 && value <= 5) scores[answer.category] += value;
  });
  return scores;
}

function getDominantCategories(scores) {
  return CATEGORY_ORDER.slice().sort((a, b) => (Number(scores[b]) || 0) - (Number(scores[a]) || 0) || CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)).slice(0, 3);
}
function getDominantCategory(scores) { return getDominantCategories(scores)[0] || CATEGORY_ORDER[0]; }

function generateResult(scores) {
  const dominantCategories = getDominantCategories(scores);
  const clusterScores = CLUSTERS.map(cluster => ({
    ...cluster,
    // Rata-rata skor dimensi agar klaster dengan lebih banyak dimensi tidak otomatis diuntungkan.
    score: cluster.dimensions.reduce((sum, key) => sum + (Number(scores[key]) || 0), 0) / cluster.dimensions.length
  })).sort((a, b) => b.score - a.score || CLUSTERS.findIndex(c => c.id === a.id) - CLUSTERS.findIndex(c => c.id === b.id));
  const primaryCluster = clusterScores[0];
  const preferredProgram = cluster => {
    if (cluster.id !== "humaniora") return cluster.programs[0];
    const bestDimension = ["pendidikan", "sains", "komunikasi"].sort((a, b) => (Number(scores[b]) || 0) - (Number(scores[a]) || 0) || CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b))[0];
    return bestDimension === "pendidikan" ? "Pendidikan Islam Anak Usia Dini (PIAUD)" : bestDimension === "komunikasi" ? "Ilmu Komunikasi" : "Biologi";
  };
  const primaryName = preferredProgram(primaryCluster);
  const alternatives = [];
  for (const cluster of clusterScores.slice(1)) {
    const name = preferredProgram(cluster);
    if (name !== primaryName && !alternatives.some(item => item.name === name) && alternatives.length < 2) alternatives.push({ name, cluster: cluster.label });
  }
  while (alternatives.length < 2) {
    const name = primaryCluster.programs.find(program => program !== primaryName && !alternatives.some(item => item.name === program));
    if (!name) break;
    alternatives.push({ name, cluster: primaryCluster.label });
  }
  return {
    dominantCategory: dominantCategories[0], dominantCategories,
    categoryLabel: dominantCategories.map(key => CATEGORY_DETAILS[key].label).join(" • "),
    narrative: `Tiga bidang dengan skor tertinggi adalah ${dominantCategories.map(key => CATEGORY_DETAILS[key].label).join(", ")}. Klaster dengan skor rata-rata tertinggi adalah ${primaryCluster.label}. Gunakan hasil ini sebagai bahan eksplorasi, lalu pertimbangkan kemampuan dan informasi resmi prodi.`,
    primaryRecommendation: { name: primaryName, cluster: primaryCluster.label },
    alternativeRecommendations: alternatives,
    recommendations: [primaryName, ...alternatives.map(item => item.name)],
    primaryCluster: primaryCluster.id,
    clusterScores: Object.fromEntries(clusterScores.map(cluster => [cluster.id, Math.round(cluster.score * 10) / 10]))
  };
}

if (typeof module !== "undefined" && module.exports) module.exports = { CATEGORY_ORDER, CATEGORY_DETAILS, CLUSTERS, calculateScores, getDominantCategories, getDominantCategory, generateResult };
