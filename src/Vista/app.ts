import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { Word } from "../Modelo/Word.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";

const wordsCollection = WordRepository.getInstance();

const pickedWord: Word = wordsCollection.getRandomWord();

console.log(pickedWord.toString());


const gameModel: GameModel = new GameModel(pickedWord.toString());
const gameController: GameController = new GameController(gameModel);
const gameView: GameView = new GameView();
const gamePresenter: GamePresenter = new GamePresenter(gameView, gameController);

gamePresenter.init();
