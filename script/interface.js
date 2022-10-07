
function flip(card) {
    if (game.setCard(card.id)) {
        card.classList.add("flip")
    };
    if (game.secondCard) {

        if (game.checkMatch()) {
            if (game.cards.every((card) => card.flipped === true)) {
                win();
            }

            let firstCard = document.getElementById(game.firstCard.id).children[0];
            let secondCard = document.getElementById(game.secondCard.id).children[0];

            firstCard.children[0].classList.add("match");
            secondCard.children[0].classList.add("match");

            game.continueGame();

        }
        else {


            setTimeout(() => {
                let firstCard = document.getElementById(game.firstCard.id);
                let secondCard = document.getElementById(game.secondCard.id);

                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                game.unflipCards()
            }, 700)
        }
    }


}


function timeFormat(time, t) {
    if ((("0") + t).length <= 2) {
        time.innerHTML = "0" + t;
    }

    else {
        time.innerHTML = t;
    }
}



function startGame() {
    let loginScreen = document.querySelector(".loginScreen");

    loginScreen.classList.add("disappear")

    cards = game.createCard();
    game.shuffleCards(cards);
    createBoard();
    chronometer.start();
}



function createBoard() {
    let board = document.querySelector(".board")
    for (let card of cards) {
        board.innerHTML += '<div class="card" onclick="flip(this)" id="' + card.id + '" data-icon="' + card.icon + '"><div class="cardFront"><img src="./assets/' + card.icon + '.png" alt=""></div><div class="cardBack">&lt/&gt</div></div>'

    }
}

function win() {
    let winScreen = document.querySelector(".winScreen")

    winScreen.classList.remove("disappear")
    chronometer.stop();
    inputPlayer();
    game.createPodium();    
}

function restart() {
    let board = document.querySelector(".board")
    let winScreen = document.querySelector(".winScreen")
    let loginScreen = document.querySelector(".loginScreen");

    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

    winScreen.classList.add("disappear");
    board.innerHTML = "";
    seconds.innerHTML = "00"
    minutes.innerHTML = "00"
    startGame();
    



}

