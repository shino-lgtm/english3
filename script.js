const quizData = [
  {
    jp: "チェックインをお願いします。",
    en: "I'd like to check in, please.",
    choices: [
      "I'd like to check in, please.",
      "Can you call a taxi for me?",
      "Do you have Wi-Fi?"
    ],
    audio: "audio/1.mp3"
  },
  {
    jp: "予約があります。",
    en: "I have a reservation.",
    choices: [
      "I have a reservation.",
      "Here is my passport.",
      "What time is check-out?"
    ],
    audio: "audio/2.mp3"
  },
  {
    jp: "名前は○○です。",
    en: "My name is ○○.",
    choices: [
      "My name is ○○.",
      "A non-smoking room, please.",
      "Thank you very much."
    ],
    audio: "audio/3.mp3"
  },
  {
    jp: "パスポートを見せます。",
    en: "Here is my passport.",
    choices: [
      "Here is my passport.",
      "Do you have Wi-Fi?",
      "Can I leave my luggage here?"
    ],
    audio: "audio/4.mp3"
  },
  {
    jp: "禁煙の部屋をお願いします。",
    en: "A non-smoking room, please.",
    choices: [
      "A non-smoking room, please.",
      "I'd like to check in, please.",
      "Can you call a taxi for me?"
    ],
    audio: "audio/5.mp3"
  },
  {
    jp: "Wi-Fiは使えますか？",
    en: "Do you have Wi-Fi?",
    choices: [
      "Do you have Wi-Fi?",
      "My name is ○○.",
      "What time is check-out?"
    ],
    audio: "audio/6.mp3"
  },
  {
    jp: "チェックアウトは何時ですか？",
    en: "What time is check-out?",
    choices: [
      "What time is check-out?",
      "Thank you very much.",
      "I have a reservation."
    ],
    audio: "audio/7.mp3"
  },
  {
    jp: "荷物を預けてもいいですか？",
    en: "Can I leave my luggage here?",
    choices: [
      "Can I leave my luggage here?",
      "Do you have Wi-Fi?",
      "Here is my passport."
    ],
    audio: "audio/8.mp3"
  },
  {
    jp: "タクシーを呼んでもらえますか？",
    en: "Can you call a taxi for me?",
    choices: [
      "Can you call a taxi for me?",
      "A non-smoking room, please.",
      "My name is ○○."
    ],
    audio: "audio/9.mp3"
  },
  {
    jp: "ありがとうございました。",
    en: "Thank you very much.",
    choices: [
      "Thank you very much.",
      "I'd like to check in, please.",
      "Can I leave my luggage here?"
    ],
    audio: "audio/10.mp3"
  }
];

let currentQuestion = 0;

const questionText = document.getElementById('question-text');
const playButton = document.getElementById('play-question');
const choicesContainer = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');

function showQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.jp}`;
  feedback.textContent = '';
  nextButton.style.display = 'none';

  playAudio(q.audio);

  choicesContainer.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    btn.onclick = () => checkAnswer(choice, q.en, q.audio);
    choicesContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct, audio) {
  if (selected === correct) {
    feedback.textContent = '✅ 正解！';
    playAudio(audio);
  } else {
    feedback.textContent = '❌ 不正解...';
  }
  nextButton.style.display = 'inline-block';
  Array.from(document.getElementsByClassName('choice-btn')).forEach(btn => btn.disabled = true);
}

function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

playButton.onclick = () => {
  const q = quizData[currentQuestion];
  playAudio(q.audio);
};

nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    questionText.textContent = "🎉 お疲れさまでした！全問終了です。";
    choicesContainer.innerHTML = '';
    feedback.textContent = '';
    nextButton.style.display = 'none';
    playButton.style.display = 'none';
  }
};

showQuestion();
