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
        let card = this.cards.filter((card) => card.id == id)[0];

        if (this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true
        }

        else if (card !== this.firstCard) {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true

        }
    },

    continueGame: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.continueGame();
    },


    checkMatch: function () {
        return game.firstCard.icon === game.secondCard.icon

    },

    cards: null,

    createCard: function () {
        this.cards = []

        for (let tech of this.techs) {
            this.cards.push(this.createPair(tech))
        }

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards

    },

    createPair: function (tech) {
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
        return tech + parseInt(Math.random() * 1000)
    },


    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }
    },





    orderPodium: function (a, b) {
        if ((a.minutes + a.seconds) > (b.minutes + b.seconds)) {
            return 1
        }
        else {
            return -1
        }
    },

    i:1,

    createPodium: function (){
      let ordenedPodium = players.sort(this.orderPodium);
      let podium = document.querySelector(".leaderBoard");

      
        podium.innerHTML = ""
      for(player of ordenedPodium){
        
        podium.innerHTML += '<tr><td class="rank">'+this.i+'</td><td class="player">'+player.name+'</td><td class="time">'+player.minutes+":"+player.seconds+'</td></tr> '
        this.i++;
      }
    }
}



let chronometer = {

    timeInterval: "",

    watch: () => {
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
        chronometer.timeInterval = setInterval(chronometer.watch, 1000)

    },

    stop: () => {
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
        // console.log("localStorage preenchido")
    }
    else {
        players = [];
        // console.log("localStorage vazio")

    }

    let player = players.filter(player => player.name === inputName.value)[0];

    if (player !== undefined && players.length !== 0) {
        // console.log("Já existe")
        // console.log(players)


        

        if (player.minutes >= minutes) {
            player.minutes = minutes;
            // console.log("minutos menor")

            if (player.seconds > seconds) {
                player.seconds = seconds;
                localStorage.setItem("players", JSON.stringify(players));;
                // console.log("segundos menor")
            }

        }

    }

    else {
        let newPlayer = { name: inputName.value, minutes: minutes, seconds: seconds }

        players.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(players));
        // console.log("ñ existe");
        // console.log("Jogador adicionado");
    }



    // console.log(players)
}

