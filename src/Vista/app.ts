import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";

init();

function init(){
    const wordsCollection = WordRepository.getInstance();

    const pickedWord: string = wordsCollection.getRandomWord();

    console.log(pickedWord);

    const gamePresenter: GamePresenter = new GamePresenter();
    const gameModel: GameModel = new GameModel(pickedWord);
    const gameView: GameView = new GameView();
    const gameController: GameController = new GameController(gameModel, gameView, gamePresenter);

    setKeyboardListener(gameController);
    setScreenKeyboardListener(gameController);
    setLoseMessage(pickedWord);
}

function setKeyboardListener(gameController: GameController){
    document.addEventListener("keydown", (e) =>{
        gameController.newKeyPressed(e.code);
    });
}

function setScreenKeyboardListener(gameController: GameController){
    Array.from(document.getElementsByClassName("key")).
    forEach(element => element.addEventListener("click", (e)=>{
        gameController.newKeyPressed((<HTMLButtonElement>e.target).value);
    }));
}

function setLoseMessage(pickedWord: string){
    const loseMessage = document.getElementById("lose_message");

    if (loseMessage) {
        loseMessage.innerHTML =
            `La palabra era: <span class="lose-word">${pickedWord}</span>`;
    }
}


