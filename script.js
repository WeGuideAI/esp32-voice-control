// Change this to your ESP32's local IP
const ESP32_IP = "http://192.168.1.50";  

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("SpeechRecognition not supported in this browser. Use Chrome/Edge!");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    let command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("result").innerText = "Heard: " + command;

    fetch(`${ESP32_IP}/control?cmd=${encodeURIComponent(command)}`)
      .then(r => r.text())
      .then(t => console.log("ESP32:", t))
      .catch(e => console.error("Error:", e));
  };

  recognition.onerror = e => {
    alert("Speech error: " + e.error);
  };
}
