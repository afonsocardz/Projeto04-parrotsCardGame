let par = [];

let cartas = [];

let cardNum = Number(prompt());

for (x = 0 ; x < cardNum; x++){
    cartas[x];
}

cartas = embaralhaCartas(cartas);

setupGame(cartas);

const embaralhaCartas = (cartas) => {

}

const cardCompare  = (par) => {
    
}

const selectHandler = (ele) => {
    let selectedCard = ele.querySelector("#idCarta");
    par.push(selectedCard);

    if (par.length === 2){
        cardCompare(par);
    }

}

const setupGame = (arrayEmbaralhado) => {
    //gerar html
}

const gameFinished = (isGameOver) => {
    if(!isGameOver) return;
    alert();
}



