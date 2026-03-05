import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";
init();
function init() {
    var wordsCollection = WordRepository.getInstance();
    var pickedWord = wordsCollection.getRandomWord();
    console.log(pickedWord);
    var gamePresenter = new GamePresenter();
    var gameModel = new GameModel(pickedWord);
    var gameView = new GameView();
    var gameController = new GameController(gameModel, gameView, gamePresenter);
    setKeyboardListener(gameController);
    setScreenKeyboardListener(gameController);
    setLoseMessage(pickedWord);
}
function setKeyboardListener(gameController) {
    document.addEventListener("keydown", function (e) {
        if (e.code === "Enter" || e.code === "Backspace" || e.code.startsWith("Key")) {
            e.preventDefault();
        }
        gameController.newKeyPressed(e.code);
    });
}
function setScreenKeyboardListener(gameController) {
    Array.from(document.getElementsByClassName("key")).
        forEach(function (element) { return element.addEventListener("click", function (e) {
        gameController.newKeyPressed(e.target.value);
    }); });
}
function setLoseMessage(pickedWord) {
    var loseMessage = document.getElementById("lose_message");
    if (loseMessage) {
        loseMessage.innerHTML =
            "La palabra era: <span class=\"lose-word\">".concat(pickedWord, "</span>");
    }
}
