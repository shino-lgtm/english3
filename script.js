const quizData = [
  {
    questionEn: "I'd like to check in, please.",
    choices: [
      "I'd like to check in, please.",
      "I'd like some breakfast, please.",
      "Could you call a taxi, please?"
    ],
    answerIndex: 0
  },
  {
    questionEn: "Could you keep my luggage until 3 p.m.?",
    choices: [
      "Could you keep my luggage until 3 p.m.?",
      "Can I order breakfast?",
      "Please clean my room."
    ],
    answerIndex: 0
  },
  {
    questionEn: "Is breakfast included?",
    choices: [
      "Is breakfast included?",
      "What time is breakfast?",
      "I'd like to cancel breakfast."
    ],
    answerIndex: 0
  }
];

let currentQuestionIndex = 0;

const questionText = document.getElementById('question-text');
const choicesDiv = document.getElementById('choices');
const playBtn = document.getElementById('play-question');
const feedbackDiv = document.getElementById('feedback');
const nextBtn = document.getElementById('next-button');

function loadQuestion() {
  const current = quizData[currentQuestionIndex];
  questionText.textContent = current.questionEn; // 英文の問題文表示

  choicesDiv.innerHTML = '';
  current.choices.forEach((choice, i) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'choice';
    radio.value = i;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));
    choicesDiv.appendChild(label);
    choicesDiv.appendChild(document.createElement('br'));
  });

  feedbackDiv.textContent = '';
  nextBtn.style.display = 'none';
}

playBtn.addEventListener('click', () => {
  const current = quizData[currentQuestionIndex];
  const utterance = new SpeechSynthesisUtterance(current.questionEn);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
});

choicesDiv.addEventListener('change', e => {
  const current = quizData[currentQuestionIndex];
  if (parseInt(e.target.value) === current.answerIndex) {
    feedbackDiv.textContent = 'Correct!';
  } else {
    feedbackDiv.textContent = 'Try again.';
  }
  nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= quizData.length) {
    alert('Quiz complete! Well done!');
    currentQuestionIndex = 0;
  }
  loadQuestion();
});

loadQuestion();
