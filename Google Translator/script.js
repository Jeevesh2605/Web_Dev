const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.querySelector(".translate-btn");
const fromLang = document.querySelector(".from-lang");
const toLang = document.querySelector(".to-lang");
const exchangeIcon = document.querySelector(".exchange i");

const fromVoice = document.querySelector(".from-voice");
const toVoice = document.querySelector(".to-voice");
const fromCopy = document.querySelector(".from-copy");
const toCopy = document.querySelector(".to-copy");

// Exchange languages and text
exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = fromLang.value;
    fromText.value = toText.value;
    toText.value = tempText;
    fromLang.value = toLang.value;
    toLang.value = tempLang;
});

// Translate button click
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");

    fetch("https://translate.astian.org/translate", {

        method: "POST",
        body: JSON.stringify({
            q: text,
            source: fromLang.value,
            target: toLang.value,
            format: "text"
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        toText.value = data.translatedText;
        toText.setAttribute("placeholder", "Translation");
    })
    .catch(() => {
        toText.setAttribute("placeholder", "Something went wrong.");
    });
});

// Text-to-Speech for from-text
fromVoice.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = fromLang.value;
    speechSynthesis.speak(utterance);
});

// Text-to-Speech for to-text
toVoice.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = toLang.value;
    speechSynthesis.speak(utterance);
});

// Copy text from from-text
fromCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value);
});

// Copy text from to-text
toCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value);
});
