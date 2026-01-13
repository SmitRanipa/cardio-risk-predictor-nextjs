export function speakRisk(probability: number, label: string) {
  if (!("speechSynthesis" in window)) return;

  const percent = (probability * 100).toFixed(1);

    const text = `Sir, आपका  कार्डियो Risk ${percent} Percent है।
                 नीचे आप Detail Me Analysis देख सकते हैं।`;

                //  कार्डियो Risk

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "hi-IN"; // Hinglish support
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(utterance);
}
