import {GameModel} from "../Modelo/GameModel";
import { LetterState } from "../Modelo/LetterState";



export class GameController {
    private _validLetterCodes: string[] = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA",
         "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
    private game: GameModel;

    constructor(game: GameModel){
        this.game = game;
    }

    newLetter(code: string): void {
        let letter = this.transformCodeToLetter(code);
        this.game.addLetterTry(letter);
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

        const status = this.checkGameStatus();

        return {
            wordTry: evaluation.wordTry,
            result: evaluation.result,
            status: status
        };
    }



    /**
     * Metodo para cuando es presionado borrar, si la posicion es mayor que cero borra la ultima letra y regresa una posicion.
     */
    backspacePressed():void{
        this.game.deleteLetter();
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
            return "WINNER";
        }
        if (this.game.isLoser()) {
            return "LOSER";
        }
        return "CONTINUE";
    }
}