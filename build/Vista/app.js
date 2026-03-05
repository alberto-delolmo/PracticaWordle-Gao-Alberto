import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";
init();
function init() {
    var repository = WordRepository.getInstance();
    var pickedWord = sessionStorage.getItem("pickedWordString");
    if (!pickedWord) {
        pickedWord = repository.getRandomWord();
        sessionStorage.setItem("pickedWordString", pickedWord);
    }
    console.log(pickedWord);
    var presenter = new GamePresenter();
    var model = new GameModel(pickedWord);
    var view = new GameView();
    var controller = new GameController(model, view, presenter);
    addKeyboardListener(controller);
    addScreenKeyboardListener(controller);
    setLoseMessage(pickedWord);
}
function addKeyboardListener(gameController) {
    document.addEventListener("keydown", function (e) {
        if (e.code === "Enter" || e.code === "Backspace" || e.code.startsWith("Key")) {
            e.preventDefault();
        }
        gameController.newKeyPressed(e.code);
    });
}
function addScreenKeyboardListener(gameController) {
    Array.from(document.getElementsByClassName("key")).
        forEach(function (element) { return element.addEventListener("click", function (e) {
        gameController.newKeyPressed(e.target.value);
    }); });
}
function setLoseMessage(word) {
    var loseMessage = document.getElementById("lose_message");
    if (loseMessage) {
        loseMessage.innerHTML =
            "La palabra era: <span class=\"lose-word\">".concat(word, "</span>");
    }
}
