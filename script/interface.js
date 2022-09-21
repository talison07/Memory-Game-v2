function flip (card){
    if(card.classList=="card"){
        card.classList.add("flip")
    }
    else{
        card.classList.remove("flip")
    }
}


let techs = [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"
]
let cards = null;

startGame();

function startGame() {
    cards = createCard(techs);
    shuffleCards(cards);
    createBoard();
    console.log(cards)
}

function createCard(techs) {
    let cards = []

    for (let tech of techs) {
        cards.push(createPair(tech))
    }

    return(cards.flatMap(pair => pair))

}

function createPair(tech) {
    return [{
        id: createId(tech),
        icon: tech,
        flipped: false,
    },

    {
        id: createId(tech),
        icon: tech,
        flipped: false,
    }]
}

function createId(tech) {
    return tech + parseInt(Math.random() * 1000)
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
        
    }
}

function createBoard (){
    let board = document.querySelector(".board")
    for(let card of cards){
        board.innerHTML+=   '<div class="card" onclick="flip(this)" id="'+card.id+'data-icon="'+card.icon+'"><div class="cardFront"><img src="./assets/'+card.icon+'.png" alt=""></div><div class="cardBack">&lt/&gt</div></div>'

    }
}
