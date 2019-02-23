//VARIABLES
var wins = 0;
var attemptsRemaining = 10;
var possibleAnswers = ["SYMBOL", "PAINTING", "MEMORY", "IMAGERY", "ABSTRACT", "DREAM", "FANTASY", "SATIRE", "ABSURD", "ICONOGRAPHY", "MODERNISM", "SURREALISM", ];
var answer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
var answerArray = answer.split("");
var displayArray = Array(answerArray.length + 1).join("_").split("");
var guessArray = [];
document.getElementById("wordDisplay").textContent = displayArray.join(" ")

// FUNCTIONS
function reset() {
    attemptsRemaining = 10;
    answer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    answerArray = answer.split("");
    displayArray = Array(answerArray.length + 1).join("_").split("");
    guessArray = [];
    document.getElementById("guessesDisplay").textContent = guessArray;
    document.getElementById("attemptsDisplay").textContent = attemptsRemaining;
    document.getElementById("wordDisplay").textContent = displayArray.join(" ");
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val)
            indexes.push(i);
    }
    return indexes;
}

// MAIN PROCESS
document.onkeyup = function (event) {
    var letter = event.key.toUpperCase();
    var letterIndex = getAllIndexes(answerArray, letter);

    if (guessArray.indexOf(letter) != -1 || displayArray.indexOf(letter) != -1) {
        return;
    }

    // WRONG GUESS
    if (letterIndex.length == 0) {
        guessArray.push(letter);
        document.getElementById("guessesDisplay").textContent = guessArray.join(" ");
        attemptsRemaining--;

        if (attemptsRemaining < 1) {
            document.getElementById("resultDisplay").textContent = "Intelligence without ambition is a bird without wings. Try again.";
            reset();
            return;
        } else {
            document.getElementById("attemptsDisplay").textContent = attemptsRemaining;
        }
        // CORRECT GUESS
    } else {
        for (i = 0; i < letterIndex.length; i++) {
            displayArray[letterIndex[i]] = letter;
        }
        document.getElementById("wordDisplay").textContent = displayArray.join(" ");

        if (displayArray.indexOf("_") == -1) {
            wins++;
            document.getElementById("winsDisplay").textContent = wins;
            document.getElementById("resultDisplay").textContent = answer;
            reset();
            return;
        }
    }
}