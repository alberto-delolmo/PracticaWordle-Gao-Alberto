import { GameController } from "../Controlador/GameController";
import { GameModel } from "../Modelo/GameModel";
import { Word } from "../Modelo/Word";
import { WordRepository } from "../Aplicacion/WordRepository";

const wordsCollection = WordRepository.getInstance();

const pickedWord: Word = wordsCollection.getRandomWord();

console.log(pickedWord.toString());

const gameModel: GameModel = new GameModel(pickedWord.toString());
const game: GameController = new GameController(gameModel);

Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    game.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

document.addEventListener("keydown", (e)=>{
    game.newKeyPressed(e.code);
});