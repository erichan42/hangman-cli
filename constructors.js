var _ = require('lodash');

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function Word(word) {
    this.actualWord = word;
    this.word = this.actualWord.toLowerCase();
    this.length = this.word.length;
    this.guess = '';
    this.printGuesses = '_';
    this.lives = 10;

    this.setWord = function() {
        for(let i = 0; i < this.length; i++) {
            this.guess += this.actualWord.substring(i,i+1) + ' ';
        }
        this.actualWord = this.guess;
        this.guess = this.guess.toLowerCase();
        for (let i = 1; i < this.guess.length; i++) {
            if (this.guess.substring(i, i + 1) === ' ') {
                this.printGuesses += ' ';
            } else if(_.includes(alphabet,this.guess.substring(i, i + 1))) {
                this.printGuesses += '_';
            } else {
                this.printGuesses += this.guess.substring(i, i + 1);
            }
        }
    }
    this.letterCheck = function (c) {
        this.c = c;
        if (_.includes(alphabet,this.c)) {
            var init = 0;

            if (this.guess.indexOf(this.c) !== -1) {
                console.log('Correct!!!');
            } else {
                this.lives--;
                console.log('Incorrect!!! You have ' + this.lives + ' lives left.');
            }

            while (this.guess.indexOf(this.c, init) !== -1) {
                let num = this.guess.indexOf(this.c, init);
                let str = this.printGuesses;
                if(this.guess.substring(num, num + 1).toUpperCase() === this.actualWord.substring(num,num+1)) { 
                    this.printGuesses = str.substring(0, num) + this.guess.substring(num, num + 1).toUpperCase() + str.substring(num + 1);
                } else {
                   this.printGuesses = str.substring(0, num) + this.guess.substring(num, num + 1) + str.substring(num + 1);
                }
                init = this.guess.indexOf(this.c, init) + 1;
            }
        }
    }
    this.printWord = function () {
        console.log(this.printGuesses);
    }
    this.checkSol = function () {
        if (this.printGuesses !== this.actualWord) {
            return false;
        }
        return true;
    }
}

function Letter() {
    this.usedLetters = [];

    this.checkLetter = function (a) {
        this.a = a;
        if (this.a !== '') {
            if (!_.includes(this.usedLetters, this.a)) {
                this.addLetter(this.a);
                return true;
            } else {
                console.log('You already used that letter!');
                return false;
            }
        }
    }
    this.addLetter = function (b) {
        this.b = b;
        this.usedLetters.push(this.b);
    }
    this.printArr = function () {
        console.log(this.usedLetters);
    }
}

module.exports = {
    Word: Word,
    Letter: Letter
}