const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbyLuGGoCxe_Kpdcv8e5ZfRYZPSooycfvhkT381SzGmP-V1Jv7IOYssiM5X13bjmhKchhQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  /* ================= ELEMENT ================= */
  const landingPage = document.getElementById("landingPage");
  const testPage = document.getElementById("testPage");

  const sectionBiodata = document.getElementById("section-biodata");
  const sectionInstruction = document.getElementById("section-instruction");
  const sectionQuestions = document.getElementById("section-questions");

  const questionsContainer = document.getElementById("questionsContainer");
  const progressText = document.getElementById("progressText");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  /* ================= STATE ================= */
  let currentStep = 0;
  const stepSize = 5;
  const answers = {};

  /* ================= LANDING ================= */
  document.getElementById("startTestBtn").onclick = () => {
    landingPage.classList.add("hidden");
    testPage.classList.remove("hidden");
  };

  /* ================= BIODATA ================= */
  document.getElementById("btnToInstruction").onclick = () => {
    const fields = ["nama", "asalSekolah", "kelas", "whatsapp"];
    for (const id of fields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Lengkapi data diri terlebih dahulu.");
        return;
      }
    }

    sectionBiodata.classList.add("hidden");
    sectionInstruction.classList.remove("hidden");
  };

  /* ================= INSTRUCTION ================= */
  document.getElementById("btnToQuestions").onclick = () => {
    sectionInstruction.classList.add("hidden");
    sectionQuestions.classList.remove("hidden");
    renderQuestions();
  };

  /* ================= RENDER QUESTIONS ================= */
  function renderQuestions() {
    questionsContainer.innerHTML = "";

    const start = currentStep * stepSize;
    const end = start + stepSize;

    progressText.innerText = `Soal ${start + 1} – ${Math.min(
      end,
      questions.length
    )} dari ${questions.length}`;

    questions.slice(start, end).forEach((q, index) => {
      const qIndex = start + index;

      const div = document.createElement("div");
      div.className = "question-item";

      div.innerHTML = `
        <p class="question-text">${qIndex + 1}. ${q.text}</p>
        <div class="options-row">
          ${answerOptions
            .map(
              (opt) => `
            <label class="option-label">
              <input type="radio" name="q-${qIndex}" value="${opt.value}"
                ${answers[qIndex] === opt.value ? "checked" : ""}>
              <span>${opt.label}</span>
            </label>
          `
            )
            .join("")}
        </div>
      `;

      questionsContainer.appendChild(div);
    });

    prevBtn.classList.toggle("hidden", currentStep === 0);
    nextBtn.classList.toggle("hidden", end >= questions.length);
    submitBtn.classList.toggle("hidden", end < questions.length);
  }

  /* ================= SAVE ANSWERS ================= */
  function saveAnswers() {
    document.querySelectorAll("input[type=radio]:checked").forEach((el) => {
      const index = el.name.split("-")[1];
      answers[index] = Number(el.value);
    });
  }

  /* ================= NAVIGATION ================= */
  nextBtn.onclick = () => {
    saveAnswers();
    currentStep++;
    renderQuestions();
  };

  prevBtn.onclick = () => {
    saveAnswers();
    currentStep--;
    renderQuestions();
  };

  /* ================= SUBMIT ================= */
  submitBtn.onclick = () => {
    saveAnswers();

    const answerArray = questions.map((q, i) => ({
      category: q.category,
      value: answers[i] || 0,
    }));

    const scores = calculateScores(answerArray);

    const nama = document.getElementById("nama").value.trim();
    const asalSekolah = document.getElementById("asalSekolah").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();

    // Gunakan generateResult untuk narrative & rekomendasi
    const result = generateResult(nama, scores);

    const hasilTes = {
      nama,
      asalSekolah,
      kelas,
      whatsapp,

      skorHumaniora: scores.humaniora,
      skorSains: scores.sains,
      skorKeagamaan: scores.keagamaan,
      skorTeknologi: scores.teknologi,

      kategoriUtama: result.dominantCategory,
      rekomendasi: result.recommendations.join(", "),
      narrative: result.narrative,
    };

    // Simpan ke localStorage
    localStorage.setItem("hasilTes", JSON.stringify(hasilTes));

    // Kirim ke Google Sheet
    kirimKeGoogleSheet({
      ...hasilTes,
      catatan: "Tes selesai normal",
    });

    // Pindah ke halaman hasil
    window.location.href = "result.html";
  };

  /* ================= GOOGLE SHEET ================= */
  function kirimKeGoogleSheet(payload) {
    const formData = new URLSearchParams(payload);

    fetch(SHEET_API_URL, {
      method: "POST",
      body: formData,
    })
      .then(() => console.log("✅ Data terkirim ke Google Sheet"))
      .catch((err) => console.error("❌ Gagal kirim:", err));
  }
});
