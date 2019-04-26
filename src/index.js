//Setting Variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "Ten",
  "Nine",
  "Eigth",
  "Seven",
  "Six",
  "Five",
  "Four",
  "Three",
  "Two"
];
//Manipulando DOM
let div1 = document.getElementById("app");
let paragraph1 = document.getElementById("paragraph1");
let paragraph2 = document.getElementById("paragraph2");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

//Variaveis do Jogo
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

//Stando CSS of the Buttons
button2.style.display = "none";
button3.style.display = "none";
showStatus();

//Alterando CSS of the Buttons
button1.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  button1.style.display = "none";
  button2.style.display = "inline";
  button3.style.display = "inline";
  showStatus();
});

//Criando Decks
function createDeck() {
  //Defininado o array deck
  let deck = [];

  //Inserindo Valores dentro do objeto Card
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        value: values[valueIdx],
        suit: suits[suitIdx]
      };
      //Inserindo valores do objeto dentro do deck
      deck.push(card);
    }
  }

  // retorna deck como array de objetos
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

//Pega objeto Card e retorna no formato desejado
function getCardString(card) {
  return card.value + " of " + card.suit;
}

//Pega o array deck e seleciona o ultimo valor
function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

// inicializa a funcao e armazena o array em deck

function showStatus() {
  if (!gameStarted) {
    paragraph1.innerText = "Welcome to Blackjack";
  }
  let dealerCardString = "";
  for (let i = 0; i < deck.length; i++) {
    dealerCardString += getCardString(dealerCards[i]);
  }

  let playerCardString = "";
  for (let i = 0; i < deck.length; i++) {
    playerCardString += getCardString(playerCards[i]);
  }

  updateScores();

  paragraph1.innerText =
    "Dealer has:\n" +
    dealerCardString +
    "(score: " +
    dealerScore +
    ")\n\n" +
    "Player has: \n" +
    playerCardString +
    "(score: " +
    playerScore +
    ")\n\n";

  if (gameOver) {
    if (playerWon) {
      paragraph1.innerText += "You Win!";
    } else {
      paragraph1.innerText += "Dealer Wins";
    }
    button1.style.display = "inline";
    button2.style.display = "none";
    button3.style.display = "none";
  }
}
