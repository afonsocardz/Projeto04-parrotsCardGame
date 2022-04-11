const gameDeck = [];

let par = [];

let selecionados = [];

let jogadas = 0;

function allAreTruthy(arr) {
  return arr.every(element => element);
}

function validateQtyOfCards() {
  let flag = false;
  let number = 0;
  while (!flag) {
    number = Number(prompt("Escolha um número par entre 4 e 14 para jogar:"));
    console.log(number);
    if ((number % 2) === 0 && number >= 4 && number <= 14) {
      flag = true;
    } else {
      alert("Insira um número par!");
      flag = false;
    }
  }
  return number;
}

const cardCompare = (par) => {
  let isEnd = [];
  if (par[0] === par[1]) {
    gameDeck[0].forEach(carta => {
      if (carta.id === par[0]) {
        carta.couple = true; 
      }
      isEnd.push(carta.couple);
    });
    while (par.length) {
      console.log("remove");
      par.pop();
      selecionados.pop();
    }
    if(allAreTruthy(isEnd)) setTimeout(function (){
      gameFinished()
    }, 2000) ;
    
    return true;
  }
  return false;
}

function chooseRandom(deck, qtyCards, set) {
  let randomCard = {};
  let randomPos = Math.floor(Math.random() * qtyCards);
  let cardList = [];
  Object.keys(deck).forEach(carta => {
    cardList.push(carta);
  });
  if (set) {
    deck[cardList[randomPos]].setNum += 1;
  }
  randomCard = deck[cardList[randomPos]];
  if (!set) {
    delete deck[cardList[randomPos]]
  } else {
    console.log(randomCard);
    if (deck[cardList[randomPos]].setNum > 1) {
      delete deck[cardList[randomPos]]
    }
  }
  return randomCard;
}

function printCard(carta) {
  let gameTable = document.querySelector("ul");

  gameTable.innerHTML += `
    <li>
      <div id="${carta.id}" class="card" onclick="selectHandler(this)">
        <div class="front"></div>
        <div class="back">
            <img  src="./assets/img/${carta.id}.gif"/>
        </div>
      </div>
    </li>`;
}

const selectHandler = (ele) => {
  jogadas++;
  ele.classList.add("active");
  selecionados.push(ele);
  par.push(ele.id);

  console.log(par);
  if (par.length >= 2) {
    console.log(selecionados);
    if (!cardCompare(par)) {
      setTimeout(function () {
        console.log("aqui" + selecionados)
        selecionados.forEach(element => {
          element.classList.remove("active");
        });
        while (par.length) {
          par.pop();
          selecionados.pop();
        }
      }, 1000);
    }
  };
}

const gameFinished = () => {
  let gameTable = document.querySelector("ul");
  alert(`Você venceu em ${jogadas} jogadas!`);
  let isPlayAgain = prompt("Deseja continuar: sim | não");

  if(isPlayAgain === 'não') return;

  gameTable.innerHTML = "";

  jogadas = 0;

  while(gameDeck.length){
    gameDeck.pop();
  }

  setupGame();
}

function prepareDeck(deck, qtyChoose) {
  let newDeck = [];
  for (let x = 0; x < qtyChoose / 2; x++) {
    let randomCard = chooseRandom(deck, Object.keys(deck).length, false);
    newDeck.push(randomCard);
  }
  return newDeck;
}

function prepareTable(cartas) {
  let deck = Object.assign({}, cartas);

  let qty = validateQtyOfCards();
  let newDeck = [];
  deck = prepareDeck(deck, qty);
  newDeck = Object.assign({}, deck);
  console.log(newDeck[0].id);

  let flag = false;
  while (!flag) {
    console.log(Object.keys(newDeck).length)
    let randomCard = chooseRandom(newDeck, Object.keys(newDeck).length, true);

    printCard(randomCard);
    if (Object.keys(newDeck).length < 1) {
      flag = true;
    }
  }
  return deck;
}

const setupGame = () => {
  let cartas = {
    bob: {
      id: "bobrossparrot",
      couple: false,
      setNum: 0
    },
    explody: {
      id: "explodyparrot",
      couple: false,
      setNum: 0
    },
    fiesta: {
      id: "fiestaparrot",
      couple: false,
      setNum: 0
    },
    metal: {
      id: "metalparrot",
      couple: false,
      setNum: 0
    },
    revertit: {
      id: "revertitparrot",
      couple: false,
      setNum: 0
    },
    triplets: {
      id: "tripletsparrot",
      couple: false,
      setNum: 0
    },
    unicorn: {
      id: "unicornparrot",
      couple: false,
      setNum: 0
    }
  };
  gameDeck.push(prepareTable(cartas));
}

setupGame();




