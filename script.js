const QUIZ_API = "https://lamonta.onrender.com/api/quiz";
const ISCRIZIONE_API = "https://lamonta.onrender.com/api/iscrizione";

const quizForm = document.getElementById("quizForm");
const quizFeedback = document.getElementById("quizFeedback");
const iscrizioneForm = document.getElementById("iscrizioneForm");
const formFeedback = document.getElementById("formFeedback");
const finale = document.getElementById("finale");
const codicePartecipazione = document.getElementById("codicePartecipazione");
const pin = document.getElementById("pin");

let quizData = [];

async function loadQuiz() {
  const res = await fetch(QUIZ_API);
  const data = await res.json();
  quizData = data.quiz.slice(0, 4);
  renderQuiz();
}

function renderQuiz() {
  quizForm.innerHTML = "";
  quizData.forEach((domanda, i) => {
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = 
      <legend><strong>${i + 1}. ${domanda.testoDomanda}</strong></legend>
      <label><input type="radio" name="q${i}" value="A"> ${domanda.opzioneA}</label><br>
      <label><input type="radio" name="q${i}" value="B"> ${domanda.opzioneB}</label><br>
      <label><input type="radio" name="q${i}" value="C"> ${domanda.opzioneC}</label><br>
      <label><input type="radio" name="q${i}" value="D"> ${domanda.opzioneD}</label><br>
    ;
    quizForm.appendChild(fieldset);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Invia Risposte";
  submitBtn.type = "submit";
  quizForm.appendChild(submitBtn);
}

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let punteggio = 0;
  quizData.forEach((d, i) => {
    const risposta = document.querySelector(input[name="q${i}"]:checked);
    if (risposta && risposta.value === d.opzioneCorretta) {
      punteggio++;
    }
  });

  if (punteggio >= 3) {
    quizFeedback.textContent = "";
    quizForm.classList.add("hidden");
    iscrizioneForm.classList.remove("hidden");
  } else {
    quizFeedback.textContent = Hai totalizzato ${punteggio}/4. Riprova!;
  }
});

iscrizioneForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(iscrizioneForm);
  const data = Object.fromEntries(formData.entries());

  data.risposteQuiz = quizData.map((d, i) => {
    const risposta = document.querySelector(input[name="q${i}"]:checked);
    return {
      idDomanda: d.idDomanda,
      rispostaUtente: risposta ? risposta.value : ""
    };
  });

  const res = await fetch(ISCRIZIONE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (res.ok) {
    codicePartecipazione.textContent = result.codicePartecipazione;
    pin.textContent = result.pin;
    iscrizioneForm.classList.add("hidden");
    finale.classList.remove("hidden");
  } else {
    formFeedback.textContent = result.error || "Errore iscrizione.";
  }
});
