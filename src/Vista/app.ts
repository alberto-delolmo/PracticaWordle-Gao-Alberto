import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { Word } from "../Modelo/Word.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";

const wordsCollection = WordRepository.getInstance();

const pickedWord: Word = wordsCollection.getRandomWord();

console.log(pickedWord.toString());

const gamePresenter: GamePresenter = new GamePresenter();
const gameModel: GameModel = new GameModel(pickedWord.toString());
const gameView: GameView = new GameView();
const gameController: GameController = new GameController(gameModel, gameView, gamePresenter);

document.addEventListener("keydown", (e) =>{
    gameController.newKeyPressed(e.code);
})


