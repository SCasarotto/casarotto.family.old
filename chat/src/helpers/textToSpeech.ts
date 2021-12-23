// TODO: Add ability to adjust options
export const textToSpeech = (text: string) => {
  const msg = new SpeechSynthesisUtterance();
  // const voices = window.speechSynthesis.getVoices();
  // msg.voice = voices[10]; // Note: some voices don't support altering params
  // msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 1; //0 to 2
  msg.text = text;
  msg.lang = 'en-US';
  window.speechSynthesis.speak(msg);
};
export const stopTextToSpeech = () => window.speechSynthesis.cancel();
