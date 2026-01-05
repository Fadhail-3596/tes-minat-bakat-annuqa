function calculateScores(answers) {
    const scores = {
      humaniora: 0,
      sains: 0,
      keagamaan: 0,
      teknologi: 0
    };
  
    answers.forEach(answer => {
      scores[answer.category] += answer.value;
    });
  
    return scores;
  }
  
  function getDominantCategory(scores) {
    let dominant = "";
    let maxScore = -1;
  
    for (const category in scores) {
      if (scores[category] > maxScore) {
        maxScore = scores[category];
        dominant = category;
      }
    }
  
    return dominant;
  }
    function getNarrative(category, name) {
    const narratives = {
      humaniora: `
        <p><strong>Hai ${name},</strong></p>
        <p>
          Kamu memiliki kecenderungan kuat dalam bidang <strong>humaniora</strong>.
          Kamu cenderung nyaman berinteraksi dengan orang lain, menyampaikan gagasan,
          serta memiliki kepedulian terhadap isu sosial, pendidikan, dan komunikasi.
        </p>
        <p>
          Potensi ini sangat mendukung kamu untuk berkembang di bidang pendidikan,
          dakwah, komunikasi, maupun kajian sosial yang membutuhkan empati,
          kemampuan berpikir kritis, dan komunikasi yang baik.
        </p>
      `,
      sains: `
        <p><strong>Hai ${name},</strong></p>
        <p>
          Kamu menunjukkan potensi kuat dalam bidang <strong>sains</strong>.
          Kamu cenderung menyukai analisis, ketelitian, serta memahami fenomena
          secara logis dan sistematis.
        </p>
        <p>
          Karakter ini sangat mendukung kamu untuk berkembang di bidang
          sains terapan, riset, dan bidang akademik yang menuntut ketekunan
          dan pemikiran rasional.
        </p>
      `,
      keagamaan: `
        <p><strong>Hai ${name},</strong></p>
        <p>
          Kamu memiliki kecenderungan kuat dalam bidang <strong>keagamaan</strong>.
          Kamu merasa nyaman dan termotivasi dalam mempelajari nilai-nilai Islam,
          Al-Qur’an, dan kajian keislaman secara mendalam.
        </p>
        <p>
          Potensi ini sangat sesuai untuk dikembangkan dalam bidang kajian keislaman,
          pendidikan agama, dakwah, dan pengembangan nilai spiritual di masyarakat.
        </p>
      `,
      teknologi: `
        <p><strong>Hai ${name},</strong></p>
        <p>
          Kamu memiliki kecenderungan kuat dalam bidang <strong>teknologi</strong>.
          Kamu tertarik pada dunia digital, sistem, logika, dan inovasi teknologi
          masa depan.
        </p>
        <p>
          Potensi ini sangat mendukung kamu untuk berkembang di bidang teknologi
          informasi, sistem digital, dan pengembangan solusi berbasis teknologi.
        </p>
      `
    };
  
    return narratives[category];
  }
  
  function getRecommendations(category) {
    const recommendations = {
      humaniora: [
        "Pendidikan Agama Islam",
        "Ilmu Komunikasi",
        "Sastra Indonesia",
        "Pendidikan Bahasa Arab"
      ],
      sains: [
        "Biologi",
        "Matematika",
        "Sains Lingkungan",
        "Teknologi Hasil Pertanian"
      ],
      keagamaan: [
        "Ilmu Al-Qur’an dan Tafsir",
        "Tasawuf dan Psikoterapi",
        "Hukum Keluarga Islam",
        "Hukum Ekonomi Syariah"
      ],
      teknologi: [
        "Teknologi Informasi",
        "Kecerdasan Buatan",
        "Bisnis Digital",
        "Teknik Sipil"
      ]
    };
  
    return recommendations[category];
  }
  
  function generateResult(name, scores) {
    const dominantCategory = getDominantCategory(scores);
    const narrative = getNarrative(dominantCategory, name);
    const recommendations = getRecommendations(dominantCategory);
  
    return {
      dominantCategory,
      narrative,
      recommendations
    };
  }
  