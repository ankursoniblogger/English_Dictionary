const inputE1 = document.getElementById("input");
const infotextE1 = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("Meaning");
const audioEl = document.getElementById("audio")
console.log("Welcome to English dictionary");

async function fetchAPI(word) {

try {
    meaningContainerEl.style.display = "none"
    infotextE1.style.display = "block";
    infotextE1.innerText = `Searching the meaning of "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result = await fetch(url).then((res) => res.json());

    if(result.title){
        meaningContainerEl.style.display = "block";
        infotextE1.style.display = "none";
        titleEl.innerText = word;
        meaningEl.innerText = "N/A";
        audioEl.style.display = "none";
    
    }else{
        infotextE1.style.display = "none";
        meaningContainerEl.style.display = "block";
        audioEl.style.display = "inline-flex"
        titleEl.innerText = result[0].word;
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
        audioEl.src = result[0].phonetics[0].audio;

    }
    
} catch (error) {
    console.log(error);
    infotextE1.innerText =`an error happened, try again latter`;
    
}

}

inputE1.addEventListener("keyup" , (e) => {
  if(e.target.value && e.key === "Enter"){
    fetchAPI(e.target.value)
  }
})