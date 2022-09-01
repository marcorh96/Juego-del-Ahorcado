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
var savedWords = ["HTML", "ALURA", "MARCO", "UNO", "PALABRA"];
var keysUsed = [];
var wrongWords = [];
var arrayRandom = [];
var endGame = 0;
var oportunity = 0;
var screenGameActive = false;
var keyDown;
var random;
document.onkeyup = function (event) {
    if (screenGameActive) return inputActive();
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
    keysUsed = arrayRandom = wrongWords = [];
    endGame = oportunity = 0;
    wordSelected.innerHTML = guessedWords.innerHTML = wrongWordsResult.innerHTML = inputPrueba.value = '';
    gameFinishedVictory.style.display = gameFinishedLose.style.display = 'none';
    random;
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
    var fixedSavedWord = textAreaAddWord.value;
    if (fixedSavedWord == undefined || fixedSavedWord == "") return alert("Rellene el campo por favor!"), textAreaAddWord.value = '';
    else if (fixedSavedWord) {
        (savedWords.includes(fixedSavedWord)) ? alert("Esa palabra ya existe!") : (screenGameActive = true,
            savedWords.push(fixedSavedWord),
            newGame(),
            screenAddWord.style.display = "none",
            screenGame.style.display = "block");
    }
}

function cancel() {
    screenGameActive = false;
    screenAddWord.style.display = "none";
    screenPrincipal.style.display = "block";
}
function searchWord(keyDown) {
    if (keyDown.match(/^[A-ZÑ]*$/)) {
        if (endGame == arrayRandom.length && keysUsed.includes(keyDown)) return alert("El juego ha concluido!!");
        else if (random.includes(keyDown) && oportunity != 6) {
            if (!keysUsed.includes(keyDown)) return fnKeysUsed();
            else if (keysUsed.includes(keyDown)) return alert("Esa palabra ya fue incluida!");
        } else {
            if (oportunity != 6 && endGame != arrayRandom.length) {
                if (!wrongWords.includes(keyDown)) return fnWrongWords();
                else if (wrongWords.includes(keyDown)) return alert("Esa palabra ya fue utilizada!");
            } else if (oportunity == 6) return alert("Alcanzaste el maximo de oportunidades permitidas");
            else if (endGame == arrayRandom.length) return alert("El juego ha concluido!!");
        }
    }
}
function inputActive() {
    (inputPrueba.value) ? (keyDown = inputPrueba.value.toUpperCase(),
        inputPrueba.value = '',
        searchWord(keyDown)) :
        (inputPrueba.value == undefined || inputPrueba.value == "") ? (keyDown = String.fromCharCode(event.keyCode),
            (keyDown.toUpperCase().charCodeAt(0) == 192) ?
                keyDown = "Ñ" : keyDown = String.fromCharCode(event.keyCode)
            , searchWord(keyDown)) : inputPrueba = true;
}
function fnWrongWords() {
    oportunity++;
    wrongWords.push(keyDown);
    wrongWordsResult.innerHTML += '<span  class="wrong-words">' + keyDown + '</span>';
    document.getElementById(oportunity).style.display = "block";
    if (oportunity == 6) return gameFinishedLose.style.display = 'block';
}
function fnKeysUsed() {
    var elements = document.querySelectorAll('.' + keyDown);
    keysUsed.push(keyDown);
    (endGame != arrayRandom.length) ? (
        elements.forEach(element => {
            element.style.visibility = "visible";
            endGame++;
            if (endGame == arrayRandom.length) return gameFinishedVictory.style.display = "block";
        })) : alert("El juego ha concluido!!");
}

textAreaAddWord.addEventListener('input', updateValue);
function updateValue(e) {
    //var regExp = /[A-ZÑ]/i;
    textAreaAddWord.value = textAreaAddWord.value.replaceAll(/[^A-ZÑ]/g, '')
     if (textAreaAddWord.value.length > 8) return alert("Sobrepaso el limite de palabras permitidas"),
        textAreaAddWord.value = textAreaAddWord.value.substr(0, 8);
}




