import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";

const wordsCollection = WordRepository.getInstance();

const pickedWord: string = wordsCollection.getRandomWord();

console.log(pickedWord);

const gamePresenter: GamePresenter = new GamePresenter();
const gameModel: GameModel = new GameModel(pickedWord);
const gameView: GameView = new GameView();
const gameController: GameController = new GameController(gameModel, gameView, gamePresenter);
sessionStorage.setItem("pickedWord",pickedWord);

document.addEventListener("keydown", (e) =>{
    gameController.newKeyPressed(e.code);
})


Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    gameController.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

