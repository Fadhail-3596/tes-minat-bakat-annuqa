const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyLuGGoCxe_Kpdcv8e5ZfRYZPSooycfvhkT381SzGmP-V1Jv7IOYssiM5X13bjmhKchhQ/exec";
const RESULT_WINDOW_PREFIX = "annuqayah-tmb-result:";

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const landingPage = byId("landingPage");
  const landingFooter = byId("landingFooter");
  const testPage = byId("testPage");
  const sectionBiodata = byId("section-biodata");
  const sectionInstruction = byId("section-instruction");
  const sectionQuestions = byId("section-questions");
  const questionsContainer = byId("questionsContainer");
  const progressText = byId("progressText");
  const progressBar = byId("progressBar");
  const progressTrack = byId("progressTrack");
  const progressCaption = byId("progressCaption");
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");
  const biodataForm = byId("biodataForm");
  const biodataError = byId("biodataError");
  const questionError = byId("questionError");
  let currentStep = 0;
  const stepSize = 4;
  const answers = {};
  const fields = ["nama", "asalSekolah", "kelas", "whatsapp"];

  const showSection = (section) => {
    [sectionBiodata, sectionInstruction, sectionQuestions].forEach((item) => item.classList.add("hidden"));
    section.classList.remove("hidden");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const showError = (element, message) => { element.textContent = message; element.classList.remove("hidden"); };
  const hideError = (element) => { element.textContent = ""; element.classList.add("hidden"); };

  byId("startTestBtn").addEventListener("click", () => {
    landingPage.classList.add("hidden"); landingFooter.classList.add("hidden"); testPage.classList.remove("hidden");
    showSection(sectionBiodata); byId("nama").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "smooth" });
  });
  byId("backToHomeBtn").addEventListener("click", () => {
    if (!window.confirm("Keluar dari tes? Jawaban yang belum dikirim akan hilang.")) return;
    testPage.classList.add("hidden"); landingPage.classList.remove("hidden"); landingFooter.classList.remove("hidden"); window.scrollTo({ top: 0, behavior: "smooth" });
  });
  byId("backToBiodataBtn").addEventListener("click", () => showSection(sectionBiodata));

  biodataForm.addEventListener("submit", (event) => {
    event.preventDefault(); hideError(biodataError);
    for (const id of fields) {
      const input = byId(id);
      if (!input.value.trim()) { showError(biodataError, "Mohon lengkapi semua data yang bertanda *."); input.focus(); return; }
    }
    const phone = byId("whatsapp").value.trim();
    if (!/^[+\d][\d\s().-]{7,23}$/.test(phone)) { showError(biodataError, "Periksa kembali nomor WhatsApp yang dimasukkan."); byId("whatsapp").focus(); return; }
    if (!byId("dataConsent").checked) { showError(biodataError, "Mohon setujui pemberitahuan pengiriman data sebelum melanjutkan."); byId("dataConsent").focus(); return; }
    showSection(sectionInstruction);
  });
  byId("btnToQuestions").addEventListener("click", () => { currentStep = 0; showSection(sectionQuestions); renderQuestions(); });

  function renderQuestions() {
    questionsContainer.replaceChildren();
    const start = currentStep * stepSize;
    const end = Math.min(start + stepSize, questions.length);
    progressText.textContent = `Pernyataan ${start + 1}–${end} dari ${questions.length}`;
    const progress = Math.round((end / questions.length) * 100);
    progressBar.style.width = `${progress}%`; progressTrack.setAttribute("aria-valuenow", String(end));
    progressCaption.textContent = progress < 35 ? "Mulai dengan santai dan jawab sesuai dirimu." : progress < 70 ? "Kamu sudah melewati sebagian tes." : "Tinggal sedikit lagi. Jawab sesuai minatmu.";
    hideError(questionError);
    questions.slice(start, end).forEach((question, offset) => {
      const index = start + offset;
      const fieldset = document.createElement("fieldset"); fieldset.className = "question-item";
      const legend = document.createElement("legend"); legend.className = "question-text";
      const number = document.createElement("span"); number.className = "question-number"; number.textContent = `${index + 1}.`;
      legend.append(number, document.createTextNode(` ${question.text}`)); fieldset.appendChild(legend);
      const options = document.createElement("div"); options.className = "options-row";
      answerOptions.forEach((option) => {
        const label = document.createElement("label"); label.className = "option-label";
        const input = document.createElement("input"); input.type = "radio"; input.name = `q-${index}`; input.value = String(option.value);
        input.checked = answers[index] === option.value;
        input.setAttribute("aria-label", `${index + 1}. ${question.text} — ${option.label}`);
        const span = document.createElement("span"); span.className = "option-content";
        span.textContent = option.label;
        label.append(input, span); options.appendChild(label);
      });
      fieldset.appendChild(options); questionsContainer.appendChild(fieldset);
    });
    prevBtn.classList.toggle("hidden", currentStep === 0);
    nextBtn.classList.toggle("hidden", end >= questions.length);
    submitBtn.classList.toggle("hidden", end < questions.length);
  }
  function saveVisibleAnswers() {
    const start = currentStep * stepSize; const end = Math.min(start + stepSize, questions.length);
    for (let index = start; index < end; index += 1) {
      const selected = document.querySelector(`input[name="q-${index}"]:checked`);
      if (selected) answers[index] = Number(selected.value); else delete answers[index];
    }
  }
  function validateVisibleAnswers() {
    saveVisibleAnswers();
    const start = currentStep * stepSize; const end = Math.min(start + stepSize, questions.length); const missing = [];
    for (let index = start; index < end; index += 1) if (![1, 2, 3, 4, 5].includes(answers[index])) missing.push(index);
    if (missing.length) {
      showError(questionError, `Masih ada ${missing.length} pernyataan yang belum dijawab pada bagian ini.`);
      document.querySelector(`input[name="q-${missing[0]}"]`)?.focus(); return false;
    }
    hideError(questionError); return true;
  }
  nextBtn.addEventListener("click", () => {
    if (!validateVisibleAnswers()) return; currentStep += 1; renderQuestions();
    questionsContainer.querySelector("input")?.focus({ preventScroll: true }); sectionQuestions.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  prevBtn.addEventListener("click", () => { saveVisibleAnswers(); currentStep -= 1; renderQuestions(); sectionQuestions.scrollIntoView({ behavior: "smooth", block: "start" }); });

  submitBtn.addEventListener("click", () => {
    if (!validateVisibleAnswers()) return;
    if (Object.keys(answers).length !== questions.length) { showError(questionError, "Ada jawaban yang belum lengkap. Periksa kembali setiap bagian."); return; }
    submitBtn.disabled = true; submitBtn.textContent = "Menyiapkan hasil…";
    const answerArray = questions.map((question, index) => ({ category: question.category, value: answers[index] }));
    const scores = calculateScores(answerArray); const result = generateResult(scores);
    const data = {
      nama: byId("nama").value.trim(), asalSekolah: byId("asalSekolah").value.trim(), kelas: byId("kelas").value.trim(), whatsapp: byId("whatsapp").value.trim(),
      skorPendidikan: scores.pendidikan, skorKeagamaan: scores.keagamaan, skorBisnis: scores.bisnis, skorTeknologi: scores.teknologi, skorSains: scores.sains, skorKomunikasi: scores.komunikasi,
      kategoriUtama: result.dominantCategory, kategoriDominan: result.dominantCategories, kategoriLabel: result.categoryLabel,
      rekomendasi: result.recommendations.join("|"), rekomendasiUtama: result.primaryRecommendation.name, rekomendasiAlternatif: result.alternativeRecommendations.map(item => item.name), klasterUtama: result.primaryCluster, skorKlaster: result.clusterScores, narrative: result.narrative, jumlahPertanyaan: questions.length,
      tanggalTes: new Date().toISOString(), popularPrograms: result.popularPrograms,
      /* Kolom kompatibilitas untuk endpoint spreadsheet versi lama. */
      skorHumaniora: Math.round((scores.pendidikan + scores.komunikasi) / 2), skorSains: scores.sains,
      skorKeagamaan: scores.keagamaan, skorTeknologi: scores.teknologi, catatan: "Tes selesai normal"
    };
    try { localStorage.setItem("hasilTes", JSON.stringify(data)); } catch (error) { /* window.name tetap menjadi fallback untuk mode file lokal */ }
    try { window.name = RESULT_WINDOW_PREFIX + encodeURIComponent(JSON.stringify(data)); } catch (error) { /* lanjutkan navigasi */ }
    kirimKeGoogleSheet(data);
    window.location.href = "result.html";
  });

  function kirimKeGoogleSheet(payload) {
    try {
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => formData.set(key, Array.isArray(value) ? value.join(", ") : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "")));
      fetch(SHEET_API_URL, { method: "POST", body: formData, mode: "no-cors", keepalive: true }).catch((error) => console.warn("Pengiriman ke Google Sheets tidak berhasil.", error));
    } catch (error) { console.warn("Pengiriman ke Google Sheets tidak berhasil.", error); }
  }
});
