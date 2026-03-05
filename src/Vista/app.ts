import { GameController } from "../Controlador/GameController.js";
import { GameModel } from "../Modelo/GameModel.js";
import { WordRepository } from "../Aplicacion/WordRepository.js";
import { GamePresenter } from "./GamePresenter.js";
import { GameView } from "./GameView.js";

init();

function init(){
    const repository = WordRepository.getInstance();

    let pickedWord = sessionStorage.getItem("pickedWordString");

    if (!pickedWord) {
        pickedWord = repository.getRandomWord();
        sessionStorage.setItem("pickedWordString", pickedWord);
    }

    console.log(pickedWord);

    const presenter: GamePresenter = new GamePresenter();
    const model: GameModel = new GameModel(pickedWord);
    const view: GameView = new GameView();
    const controller: GameController = new GameController(model, view, presenter);

    addKeyboardListener(controller);
    addScreenKeyboardListener(controller);
    setLoseMessage(pickedWord);
}

function addKeyboardListener(gameController: GameController){
    document.addEventListener("keydown", (e) =>{

        if (e.code === "Enter" || e.code === "Backspace" || e.code.startsWith("Key")){
            e.preventDefault();
        }

        gameController.newKeyPressed(e.code);
    });
}

function addScreenKeyboardListener(gameController: GameController){
    Array.from(document.getElementsByClassName("key")).
    forEach(element => element.addEventListener("click", (e)=>{
        gameController.newKeyPressed((<HTMLButtonElement>e.target).value);
    }));
}

function setLoseMessage(word: string){
    const loseMessage = document.getElementById("lose_message");

    if (loseMessage) {
        loseMessage.innerHTML =
            `La palabra era: <span class="lose-word">${word}</span>`;
    }
}


