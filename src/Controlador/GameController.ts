import { GameModel } from "../Modelo/GameModel.js";
import { GamePresenter } from "../Vista/GamePresenter.js";
import { GameView } from "../Vista/GameView.js";

export class GameController {

    private _validLetterCodes: string[] = [
        "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP",
        "KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL",
        "KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Semicolon"
    ];

    private game: GameModel;
    private view: GameView;
    private presenter: GamePresenter;

    constructor(game: GameModel, view: GameView, presenter: GamePresenter){
        this.game = game;
        this.view = view;
        this.presenter = presenter;

        this.initializeCellClicks();
    }


    private initializeCellClicks(): void {

        const rows = document.querySelectorAll(".row");

        rows.forEach((row, rowIndex) => {

            const cells = row.querySelectorAll(".cell");

            cells.forEach((cell, colIndex) => {

                cell.addEventListener("click", () => {

                    if (rowIndex + 1 === this.game.getTurn()) {

                        document.querySelectorAll(".cell").forEach(c =>
                            c.classList.remove("active")
                        );

                        cell.classList.add("active");

                        this.game.setPosition(colIndex);
                    }
                });

            });
        });
    }


    newLetter(code: string): void {

        const letter = this.transformCodeToLetter(code);

        const positionBefore = this.game.getPosition();

        this.game.addLetterTry(letter);

        this.view.setLetter(
            this.game.getTurn(),
            positionBefore,
            letter
        );

        this.moveCursorVisual();
    }

    backspacePressed ( ) : void { 

        const currentPosition = this.game.getPosition(); 
        if ( currentPosition < this.game.getWordTarget().length) { 
            this.game.deleteLetter(); 
            this.view.deleteLetter(this.game.getTurn(),currentPosition);
        } else if ( currentPosition > 0 ) {
            this.game.deleteLetter(); 
            this.view.deleteLetter( this.game.getTurn(), currentPosition - 1); 
        }     
        this.moveCursorVisual();
    } 

    

        

    enterPressed() {

        const evaluation = this.game.enterTry();

        if (!evaluation) return;

        const { wordTry, result } = evaluation;

        result.forEach((state, index) => {

            const letter = wordTry[index];

            this.view.paintCell(this.game.getTurn() - 1, index, state);
            this.view.paintKeyBoard(letter, state);
        });

        this.checkGameStatus();
    }


    newKeyPressed(code: string){

        if (this.isValidLetter(code)){
            this.newLetter(code);
        }
        else if (this.isEnterKey(code)){
            this.enterPressed();
        }
        else if (this.isBackspaceKey(code)){
            this.backspacePressed();
        }
    }

    isValidLetter(code: string): boolean {
        return this._validLetterCodes.includes(code);
    }

    isEnterKey(code: string): boolean {
        return code === "Enter";
    }

    isBackspaceKey(code: string): boolean {
        return code === "Backspace";
    }

    transformCodeToLetter(code: string): string {
        if (code === "Semicolon") return "Ñ";
        return code.split("y")[1];
    }

    checkGameStatus() {
        if (this.game.isWinner()) {
            this.presenter.goToWinner();
        } else
        if (this.game.isLoser()) {
            this.presenter.goToLoser();
        }
    }

    private moveCursorVisual(): void {

        document.querySelectorAll(".cell").forEach(c =>
            c.classList.remove("active")
        );

        const row = document.getElementById("row_" + this.game.getTurn());

        if (!row) return;

        const cells = row.querySelectorAll(".cell");

        const pos = this.game.getPosition();

        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
    }
}