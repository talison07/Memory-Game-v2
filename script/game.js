// "use strict"
let game = {
    firstCard: null,
    secondCard: null,
    lockMode: false,

    techs: [
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
    ],

    players: [],

    setCard: function (id) {
        //this function gets the card clicked
        let card = this.cards.filter((card) => card.id == id)[0];
        //here is the card clicked

        if (this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            //if "firstCard" is null (empty)... I input the current card on "firstCard"
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true
        }

        else if (card !== this.firstCard) {
            //if the current card is different of "firstCard" it means the card is the second card clicked
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true

        }
    },

    continueGame: function () {
        //this function resets the clicked cards
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        //this function unflip cards
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.continueGame();
    },


    checkMatch: function () {
        //this function check if there is a match between the cards
        return game.firstCard.icon === game.secondCard.icon

    },

    cards: null,

    createCard: function () {
        //this function create the cards and your pairs
        this.cards = []

        for (let tech of this.techs) {
            this.cards.push(this.createPair(tech))
        }

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards

    },

    createPair: function (tech) {
        //this funciton create a pair of cards
        return [{
            id: this.createId(tech),
            icon: tech,
            flipped: false,
        },

        {
            id: this.createId(tech),
            icon: tech,
            flipped: false,
        }]
    },


    createId: function (tech) {
        //this function create a random id
        return tech + parseInt(Math.random() * 1000)
    },


    shuffleCards: function () {
        //this function shuffle the cards
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }
    },





    orderPodium: function (a, b) {
        // this function sorts the players according to theirs times
        if ((a.minutes + a.seconds) > (b.minutes + b.seconds)) {
            return 1
        }
        else {
            return -1
        }
    },



   
}



let chronometer = {

    timeInterval: "",

    watch: () => {
        //this function is the chronometer
        let minutes = document.getElementById("minutes");
        let seconds = document.getElementById("seconds");



        let s = parseInt(seconds.innerHTML);
        let m = parseInt(minutes.innerHTML);

        s++;
        timeFormat(seconds, s);

        if (seconds.innerHTML == 60) {
            s = 0;
            timeFormat(seconds, s)
            m++;
            timeFormat(minutes, m)

        }
    },

    start: () => {
        //this function starts the chronometer
        chronometer.timeInterval = setInterval(chronometer.watch, 1000)
    },

    stop: () => {
        //this function stop the chronometer
        clearInterval(chronometer.timeInterval);

    },


}




let players;
function inputPlayer() {
    let inputName = document.querySelector(".inputName");
    let minutes = document.getElementById("minutes").innerHTML;
    let seconds = document.getElementById("seconds").innerHTML;

    if (localStorage.getItem("players") !== null) {
        players = JSON.parse(localStorage.getItem("players"));
        // if localStorage filled
    }
    else {
        players = [];
        // if localStorage unfilled

    }

    let player = players.filter(player => player.name === inputName.value)[0];
    //Here is the current player

    if (player !== undefined && players.length !== 0) {
        // check if the player already exists
        




        if (player.minutes >= minutes) {
            // check if the current player minutes are lower
            player.minutes = minutes;
            

            if (player.seconds > seconds) {
                // check if the current player seconds are lower
                player.seconds = seconds;
                localStorage.setItem("players", JSON.stringify(players));;
                
            }

        }

    }

    else {
        //if the current player don't exists... Create a new player
        let newPlayer = { name: inputName.value, minutes: minutes, seconds: seconds }

        players.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(players));
        
    }
}

