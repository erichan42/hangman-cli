var cons = require('./Constructors.js');
var prompt = require('prompt');
var fs = require("fs");
var _ = require('lodash');

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function start() {
    fs.readFile("movies.json", "utf8", initial, function (error, data) {
        if (error) {
            return console.log(error);
        }
        initial(data);
    });
}

function initial(data) {
    var a = JSON.parse(data);
    var words = a[Math.floor(Math.random() * a.length)].title;
    var one = new cons.Word(words);
    one.setWord();
    var two = new cons.Letter();
    function promptLetter() {
        if (one.lives !== 0) {
            console.log('Guess a letter!');
            one.printWord();
            prompt.get('Letter chosen', function (err, result) {
                if (err) console.log(err);
                var letterChosen = result['Letter chosen'].toLowerCase();
                if(letterChosen === 'stop') {
                    one.lives = 0;
                }
                if (typeof (letterChosen) === 'string' && letterChosen.length < 2) {
                    var trufal = two.checkLetter(letterChosen);
                    if (trufal) {
                        one.letterCheck(letterChosen);
                    }
                }
                var solved = one.checkSol();
                if (!solved) {
                    promptLetter();
                } else {
                    one.printWord();
                    console.log('You win! Next clue.');
                    start(initial);
                }
            });
        } else {
            console.log('The answer was ' + '\"' + words + '\"');
            console.log('You lose!');
            prompt.stop();
        }
    }
    promptLetter();
}
start();