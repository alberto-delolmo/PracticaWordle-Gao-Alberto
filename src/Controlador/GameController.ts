import {GameModel} from "../Modelo/GameModel.js";
import { GamePresenter } from "../Vista/GamePresenter.js";
import { GameView } from "../Vista/GameView.js";



export class GameController {
    private _validLetterCodes: string[] = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA",
         "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
    private game: GameModel;
    private view: GameView;
    private presenter: GamePresenter;

    public getGame(): GameModel {
        return this.game;
    }
    public setGame(value: GameModel) {
        this.game = value;
    }

    constructor(game: GameModel, view: GameView, presenter: GamePresenter){
        this.game = game;
        this.view = view;
        this.presenter = presenter;
    }

    newLetter(code: string): void {
        let letter = this.transformCodeToLetter(code);
        this.game.addLetterTry(letter);
        this.view.setLetter(this.game.getTurn(), this.game.getPosition() - 1, letter);
    }

    /**
     * Comprueba si code es una letra y si es valida.
     * @param code 
     * @returns Si el parámetro code esta contenido en la lista _validLetterCodes, retorna true,
     * en caso contrario retorna false.
     */
    isValidLetter(code: string):boolean {
        return  this._validLetterCodes.includes(code);
    }

    /**
     * Comrueba si code es "Enter"
     * @param code 
     * @returns Retorna true si es "Enter", por lo contrario false.
     */
    isEnterKey(code: string):boolean {
        return code=="Enter";
    }
    /**
     * Comprueba si code es "Backspace"
     * @param code 
     * @returns Retorna true si es "Backspace", por lo contrario false.
     */
    isBackspaceKey(code: string):boolean{
        return code=="Backspace";
    }
    
    /**
     * Transforma de code a letra. Si es semicolon retorna ñ. En caso contrario con split toma la letra correspondiente después del "y" (KeyQ) -> (Q)
     * @param code 
     * @returns Retorna la letra correspondiente del code.
     */
    transformCodeToLetter(code: string):string{
        let letter: string = "";
        if (code=="Semicolon") letter = "Ñ";
        else letter = code.split("y")[1];
        return letter;
    }

    /**
     * Metodo para cuando es presionado enter
     */
    enterPressed() {
        const evaluation = this.game.enterTry();

        if (evaluation === null) {
            return null;
        }

        const {wordTry, result} = evaluation;

        result.forEach((state, index) =>{
            const letter = wordTry[index];

            this.view.paintCell(this.game.getTurn()-1, index, state);
            this.view.paintKeyBoard(letter, state);
        });

        this.checkGameStatus();
    }



    /**
     * Metodo para cuando es presionado borrar, si la posicion es mayor que cero borra la ultima letra y regresa una posicion.
     */
    backspacePressed():void{
        console.log("Elimina la posicion " + this.game.getPosition);
        this.game.deleteLetter();
        this.view.deleteLetter(this.game.getTurn(), this.game.getPosition());
    }
    /**
     * Metodo para cuando es presionado una tecla, comprueba si es una letra valido, si es el enter o si es el backspace.
     * @param code 
     */
    newKeyPressed(code: string){ 
        if (this.isValidLetter(code)){
            this.newLetter(code);
            return null;
        } else if (this.isEnterKey(code)){
            return this.enterPressed();
        } else if (this.isBackspaceKey(code)){
            this.backspacePressed();
            return null;
        } 
    }

    checkGameStatus() {
        if (this.game.isWinner()) {
            this.presenter.goToWinner();
        }
        if (this.game.isLoser()) {
            this.presenter.goToLoser();
        }
    }
}