document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");

  async function loadQuiz() {
    try {
      const res = await fetch("https://lamonta.onrender.com/api/quiz");
      console.log("Fetch quiz status:", res.status);
      const data = await res.json();
      console.log("Quiz data ricevuti:", data);
      if (!data.quiz || data.quiz.length === 0) {
        quizForm.innerHTML = "<p>Quiz non disponibile</p>";
        return;
      }
      renderQuiz(data.quiz.slice(0, 4));
    } catch (error) {
      console.error("Errore fetch quiz:", error);
      quizForm.innerHTML = "<p>Errore nel caricamento del quiz</p>";
    }
  }

  function renderQuiz(quizData) {
    quizForm.innerHTML = "";
    quizData.forEach((domanda, i) => {
      const fieldset = document.createElement("fieldset");
      fieldset.innerHTML = `
        <legend><strong>${i + 1}. ${domanda.testoDomanda}</strong></legend>
        <label><input type="radio" name="q${i}" value="A"> ${domanda.opzioneA}</label><br>
        <label><input type="radio" name="q${i}" value="B"> ${domanda.opzioneB}</label><br>
        <label><input type="radio" name="q${i}" value="C"> ${domanda.opzioneC}</label><br>
        <label><input type="radio" name="q${i}" value="D"> ${domanda.opzioneD}</label><br>
      `;
      quizForm.appendChild(fieldset);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Invia Risposte";
    submitBtn.type = "submit";
    quizForm.appendChild(submitBtn);
  }

  loadQuiz();
});
