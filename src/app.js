import "./style.css";

// Valores posibles de carta
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ["♦", "♥", "♠", "♣"];

// Para guardar las cartas actuales
let currentCards = [];

// Función que devuelve una carta aleatoria
function getRandomCard() {
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit };
}

// Función que genera N cartas aleatorias
function generateRandomCards(count) {
  let cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(getRandomCard());
  }
  return cards;
}

// Función que pinta cartas en el contenedor
function renderCards(cards, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
      <div class="top">${card.suit}</div>
      <div class="value">${formatValue(card.value)}</div>
      <div class="bottom">${card.suit}</div>
    `;
    cardDiv.style.color = (card.suit === "♦" || card.suit === "♥") ? "red" : "black";
    container.appendChild(cardDiv);
  });
}

// Para convertir 1→A, 11→J, 12→Q, 13→K
function formatValue(value) {
  if (value === 1) return "A";
  if (value === 11) return "J";
  if (value === 12) return "Q";
  if (value === 13) return "K";
  return value;
}

// Evento del botón "Draw"
document.getElementById("drawButton").addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  currentCards = generateRandomCards(count);
  document.getElementById("sortLog").innerHTML = "";

  renderCards(currentCards, "cardsContainer");
});

function selectionSortWithSteps(cards) {
  let steps = [];
  let arr = [...cards.map(card => ({ ...card }))]; // Clonamos cartas

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].value < arr[min].value) {
        min = j;
      }
    }

    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }

    // Guardamos una copia del estado actual
    steps.push([...arr.map(card => ({ ...card }))]);
  }

  return steps;
}

function renderSortLog(steps, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  steps.forEach((step, index) => {
    const row = document.createElement("div");
    row.className = "sort-step";

    const label = document.createElement("div");
    label.className = "step-label";
    label.textContent = `${index}`;
    row.appendChild(label);

    step.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card small";
      cardDiv.innerHTML = `
        <div class="top">${card.suit}</div>
        <div class="value">${formatValue(card.value)}</div>
        <div class="bottom">${card.suit}</div>
      `;
      cardDiv.style.color = (card.suit === "♦" || card.suit === "♥") ? "red" : "black";
      row.appendChild(cardDiv);
    });

    container.appendChild(row);
  });
}

document.getElementById("sortButton").addEventListener("click", () => {
  const steps = selectionSortWithSteps(currentCards);
  renderSortLog(steps, "sortLog");
});

