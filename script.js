function playAudio(number) {
  const audio = new Audio(`audio/${number}.mp3`);
  audio.play();
}
