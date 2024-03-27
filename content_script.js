console.log("content script is running !!!!");

const synth = window.speechSynthesis;
const speakData = new SpeechSynthesisUtterance();


function setSpeech() {
  return new Promise(function (resolve, reject) {
    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

speakData.pitch = 0.7;
let s = setSpeech();
s.then((voices) => {
  speakData.voice = voices[2];
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.mess == "START") {
    let text = window.getSelection().toString();
    console.log(text);
    if (text.length <= 0) {
        return null;
    }
    speakData.text = text;
    synth.speak(speakData);
  }
  else if(request.mess == "STOP"){
    console.log(request.mess);
    synth.cancel();
    return null;
  }

});
