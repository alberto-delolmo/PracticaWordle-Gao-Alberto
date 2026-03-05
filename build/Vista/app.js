import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";
var wordsCollection = WordRepository.getInstance();
var pickedWord = wordsCollection.getRandomWord();
console.log(pickedWord);
var gamePresenter = new GamePresenter();
var gameModel = new GameModel(pickedWord);
var gameView = new GameView();
var gameController = new GameController(gameModel, gameView, gamePresenter);
sessionStorage.setItem("pickedWord", pickedWord);
document.addEventListener("keydown", function (e) {
    gameController.newKeyPressed(e.code);
});
Array.from(document.getElementsByClassName("key")).forEach(function (element) { return element.addEventListener("click", function (e) {
    gameController.newKeyPressed(e.target.value);
}); });
