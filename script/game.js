// "use strict"
export let game = {
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



export let chronometer = {

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


export async function inputPlayer() {
    let inputName = document.querySelector(".inputName");
    let minutes = document.getElementById("minutes").innerHTML;
    let seconds = document.getElementById("seconds").innerHTML;

    

    if (snapshotPlayers.length !== 0) {
        console.log(snapshotPlayers);
        // if localStorage filled
        console.log("db preenchido")
    }
    else {
        // if localStorage unfilled
        console.log("db vazio")

    }

    let player = snapshotPlayers.filter(player => player.name === inputName.value)[0];
    //Here is the current player
    console.log(player)
    

    if (player !== undefined){
        // check if the player already exists
        console.log("Jogador já existe")
        
        if (player.minutes >= minutes) {
            // check if the current player minutes are lower
            await updatePlayerMinutes(player, minutes);
            console.log("minutos menor")
            
            if (player.seconds >= seconds) {
                // check if the current player seconds are lower
                console.log("segundos menor");
                await updatePlayerSeconds(player, seconds);
                
            }

        }

    }

    else {
        //if the current player don't exists... Create a new player
        console.log("jogador não existe")
        let newPlayer = { name: inputName.value, minutes: minutes, seconds: seconds }

        addPlayer(newPlayer);
        
        console.log("jogador criado")
        

        
        
    }
}


import { snapshotPlayers, updatePlayerMinutes, updatePlayerSeconds, addPlayer} from "./firebase.js"
import {timeFormat } from "./interface.js";



