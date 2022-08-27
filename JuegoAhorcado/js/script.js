var screenPrincipal = document.getElementById("screenPrincipal");
var screenGame = document.getElementById("screenGame");
var screenAddWord = document.getElementById("screenAddWord");
var wordSelected = document.getElementById("wordSelected");
var guessedWords = document.getElementById("guessedWords");
var wrongWordsResult = document.getElementById("wrongWordsResult");
var textAreaAddWord = document.getElementById("textAreaAddWord");
var gameFinishedVictory = document.getElementById("gameFinishedVictory");
var gameFinishedLose = document.getElementById("gameFinishedLose");
var inputPrueba = document.getElementById("input-prueba");
var savedWords = ["HTML","ALURA","MARCO","UNO","PALABRA"];
var random;
var keysUsed = [];
var arrayRandom = [];
var endGame = 0;
var oportunity = 0;
var screenGameActive = false;
document.onkeydown = function (event) {
    var words = inputPrueba.value;
    //inputPrueba.value = words.slice(0, -1);
    var keyDown = String.fromCharCode(event.keyCode);
    searchWord(keyDown);
}

window.focus();



function randomWords() {
    random = savedWords[Math.floor(Math.random() * savedWords.length)];
    arrayRandom = random.split("");
    for (var i = 0; i < random.length; i++) {
        wordSelected.innerHTML += '<img src="imagenes/Rectangle 6.png" class="words-space">';
        guessedWords.innerHTML += ' <span class="' + arrayRandom[i] + '">' + arrayRandom[i] + '</span>';
    }
}

function newGame() {
    screenGameActive = true;
    wordSelected.innerHTML = '';
    guessedWords.innerHTML = '';
    wrongWordsResult.innerHTML = '';
    inputPrueba.value = '';
    gameFinishedVictory.style.display = "none";
    gameFinishedLose.style.display = 'none';
    random;
    keysUsed = [];
    arrayRandom = [];
    endGame = 0;
    oportunity = 0;
    randomWords();
    for (var i = 1; i <= 6; i++) {
        document.getElementById(i).style.display = "none";
    }
}
function desistGame() {
    screenGameActive = false;
    screenGame.style.display = "none";
    screenPrincipal.style.display = "block";
}
function gameStart() {
    screenGameActive = true;
    screenPrincipal.style.display = "none";
    screenGame.style.display = "block";
    newGame();
}
function addWord() {
    screenGameActive = false;
    screenPrincipal.style.display = "none";
    screenAddWord.style.display = "block";
    textAreaAddWord.value = '';

}
function saveWord() {
    screenGameActive = true;
    savedWords.push(textAreaAddWord.value.toUpperCase());
    newGame();
    screenAddWord.style.display = "none";
    screenGame.style.display = "block";
}
function cancel() {
    screenGameActive = false;
    screenAddWord.style.display = "none";
    screenPrincipal.style.display = "block";
}
function searchWord(keyDown){
    if (screenGameActive == true) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (endGame == arrayRandom.length && keysUsed.includes(keyDown)) {
                alert("El juego ha concluido!!")
            }
            else if (random.includes(keyDown) && oportunity != 6) {
                if (!keysUsed.includes(keyDown)) {
                    keysUsed.push(keyDown);
                    if (endGame != arrayRandom.length) {
                        var elements = document.querySelectorAll('.' + keyDown);
                        elements.forEach(element => {
                            element.style.visibility = "visible";
                            endGame++;
                            if(endGame == arrayRandom.length){
                                gameFinishedVictory.style.display = "block";
                            }
                        });
                    } else{
                        alert("El juego ha concluido!!")
                    }
                }
            } else {
                if (oportunity != 6 && endGame != arrayRandom.length) {
                    oportunity++;
                    wrongWordsResult.innerHTML += '<span  class="wrong-words">' + keyDown + '</span>';
                    document.getElementById(oportunity).style.display = "block";
                    if(oportunity == 6){
                        gameFinishedLose.style.display = 'block';
                    }
                } else if (oportunity == 6) {
                    alert("Alcanzaste el maximo de oportunidades permitidas")
                } else if (endGame == arrayRandom.length) {
                    alert("El juego ha concluido!!")
                }
            }
        }
    }
}

