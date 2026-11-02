const arcanaData = [
  { name: "The Fool", numeral: "0", symbol: "🤹", meaning: "Spontaneity, new beginnings, infinite potential" },
  { name: "The Magician", numeral: "I", symbol: "🪄", meaning: "Manifestation, resourcefulness, inspired power" },
  { name: "The High Priestess", numeral: "II", symbol: "🌙", meaning: "Intuition, sacred knowledge, mystery" },
  { name: "The Empress", numeral: "III", symbol: "👑", meaning: "Abundance, creativity, maternal grace" },
  { name: "The Emperor", numeral: "IV", symbol: "🏛️", meaning: "Authority, discipline, established structure" },
  { name: "The Hierophant", numeral: "V", symbol: "📜", meaning: "Spiritual tradition, mentors, ethics" },
  { name: "The Lovers", numeral: "VI", symbol: "❤️", meaning: "Alignment of values, harmony, soul choices" },
  { name: "The Chariot", numeral: "VII", symbol: "⚔️", meaning: "Willpower, triumph, directed resolve" },
  { name: "Strength", numeral: "VIII", symbol: "🦁", meaning: "Inner courage, quiet mastery, patience" },
  { name: "The Hermit", numeral: "IX", symbol: "🏮", meaning: "Introspection, inner light, silent guidance" },
  { name: "Wheel of Fortune", numeral: "X", symbol: "☸️", meaning: "Inevitable cycles, cosmic shift, destiny" },
  { name: "Justice", numeral: "XI", symbol: "⚖️", meaning: "Objective truth, cause and consequence, clarity" },
  { name: "The Hanged Man", numeral: "XII", symbol: "🌲", meaning: "Surrender, altered perspective, sacred pause" },
  { name: "Death", numeral: "XIII", symbol: "🥀", meaning: "Profound transformation, endings, rebirth" },
  { name: "Temperance", numeral: "XIV", symbol: "🏺", meaning: "Alchemy, patience, middle-path balance" },
  { name: "The Devil", numeral: "XV", symbol: "⛓️", meaning: "Shadow attachment, illusion, hidden chains" },
  { name: "The Tower", numeral: "XVI", symbol: "⚡", meaning: "Sudden awakening, breakdown of false walls" },
  { name: "The Star", numeral: "XVII", symbol: "⭐", meaning: "Serenity, inspired hope, enduring faith" },
  { name: "The Moon", numeral: "XVIII", symbol: "🐺", meaning: "Dreams, instinct, navigating the mist" },
  { name: "The Sun", numeral: "XIX", symbol: "☀️", meaning: "Vitality, radiant truth, total clarity" },
  { name: "Judgement", numeral: "XX", symbol: "🎺", meaning: "Higher reckoning, awakening, life call" },
  { name: "The World", numeral: "XXI", symbol: "🪐", meaning: "Wholeness, completed journey, integration" }
];

let currentCard = null;
let currentDob = "";

function revealCard() {
  const inputElem = document.getElementById("birthdayInput");
  const rawVal = inputElem.value;

  if (!rawVal) {
    alert("Please select or enter your birth date first!");
    return;
  }

  // Handle both "yyyy-mm-dd" and "dd/mm/yyyy" or Date picker parsing
  let year, month, day;

  if (inputElem.valueAsDate) {
    const d = inputElem.valueAsDate;
    year = d.getUTCFullYear();
    month = d.getUTCMonth() + 1;
    day = d.getUTCDate();
  } else {
    const delimiter = rawVal.includes("-") ? "-" : rawVal.includes("/") ? "/" : ".";
    const parts = rawVal.split(delimiter).map(Number);
    if (parts[0] > 1000) {
      year = parts[0]; month = parts[1]; day = parts[2];
    } else {
      day = parts[0]; month = parts[1]; year = parts[2];
    }
  }

  currentDob = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  // Numerology Reduction (Century + Year + Month + Day)
  const century = Math.floor(year / 100);
  const shortYear = year % 100;
  let total = century + shortYear + month + day;

  while (total > 22) {
    total = total.toString().split("").reduce((sum, d) => sum + parseInt(d), 0);
  }

  const cardIndex = total === 22 ? 0 : total;
  currentCard = arcanaData[cardIndex];

  // Update card elements
  document.getElementById("cardNumeral").innerText = currentCard.numeral;
  document.getElementById("cardTitle").innerText = currentCard.name;
  document.getElementById("cardMeaning").innerText = currentCard.meaning;
  
  // Use high-contrast embedded seal graphic instead of broken web image
  const imgElem = document.getElementById("cardImage");
  if (imgElem) {
    imgElem.style.display = "none"; // Hide standard img tag to prevent broken image icon
  }

  // Place decorative seal inside card if not present
  let symbolBox = document.getElementById("cardSymbolBox");
  if (!symbolBox) {
    symbolBox = document.createElement("div");
    symbolBox.id = "cardSymbolBox";
    symbolBox.style.height = "210px";
    symbolBox.style.display = "flex";
    symbolBox.style.flexDirection = "column";
    symbolBox.style.justifyContent = "center";
    symbolBox.style.alignItems = "center";
    symbolBox.style.background = "#14121b";
    symbolBox.style.borderRadius = "8px";
    symbolBox.style.border = "1px solid #735c2b";
    symbolBox.style.margin = "8px 0";
    document.querySelector(".card-inner").insertBefore(symbolBox, document.querySelector(".card-footer"));
  }
  symbolBox.innerHTML = `
    <div style="font-size: 64px; filter: drop-shadow(0 0 10px #c29b38);">${currentCard.symbol}</div>
    <div style="color: #eed699; font-family: 'Cinzel', serif; font-size: 13px; margin-top: 10px; letter-spacing: 2px;">ARCANUM ${currentCard.numeral}</div>
  `;

  // Update date badge
  const badge = document.getElementById("dobBadge");
  if (badge) badge.innerText = `Aligned Date: ${currentDob}`;

  // Make card visible
  const scene = document.getElementById("cardScene");
  scene.style.display = "flex";

  const actionArea = document.getElementById("actionArea");
  if (actionArea) actionArea.style.display = "block";

  // Trigger 3D flip
  const cardBox = document.getElementById("cardBox");
  cardBox.classList.remove("is-flipped");
  setTimeout(() => {
    cardBox.classList.add("is-flipped");
  }, 100);
}

// Allow flipping on click
document.getElementById("cardBox").addEventListener("click", function() {
  this.classList.toggle("is-flipped");
});

// Canvas Save Feature
function downloadCardImage() {
  if (!currentCard) return;

  const canvas = document.getElementById("exportCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 900;

  // Background
  ctx.fillStyle = "#111018";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gold border
  ctx.strokeStyle = "#c29b38";
  ctx.lineWidth = 8;
  ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

  // Text