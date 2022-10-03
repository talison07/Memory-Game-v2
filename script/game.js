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
        if (a.time > b.time) {
            return 1
        }
        else {
            return -1
        }
    }
}
