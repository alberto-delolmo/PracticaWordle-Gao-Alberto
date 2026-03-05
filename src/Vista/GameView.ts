import { GameModel } from "../Modelo/GameModel.js";
import { LetterState } from "../Modelo/LetterState.js";

type KeyState = "correct" | "misplaced" | "wrong";

export class GameView {

    initializeCellClicks(game: GameModel): void {

        const rows = document.querySelectorAll(".row");

        rows.forEach((row, rowIndex) => {

            const cells = row.querySelectorAll(".cell");

            cells.forEach((cell, colIndex) => {

                cell.addEventListener("click", () => {

                    if (rowIndex + 1 === game.getTurn()) {

                        this.clearActiveCells();

                        cell.classList.add("active");

                        game.setPosition(colIndex);
                    }
                });

            });
        });
    }

    moveCursorVisual(game: GameModel): void {

        this.clearActiveCells();

        const row = document.getElementById("row_" + game.getTurn());

        if (row == null){
            return;
        } 

        const cells = row.querySelectorAll(".cell");

        const pos = game.getPosition();

        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
    }

    private clearActiveCells(): void {
        document.querySelectorAll(".cell").forEach(cell =>
            cell.classList.remove("active")
        );
    }

    private getCell(turn: number, position: number): Element | null{
        const row = document.getElementById("row_"+ turn);
        if(row == null){
            return null;
        }
        return row.children[position];
    }

    setLetter(turn: number, position: number, letter: string): void {
        const cell = this.getCell(turn, position);
        if (cell != null){
            cell.textContent = letter;
        }
    }

    deleteLetter(turn: number, position: number): void {
        const cell = this.getCell(turn, position);
        if (cell != null){
            cell.textContent = "";
        }
    }

    paintCell(turn: number, position: number, state: LetterState): void {
        const cell = this.getCell(turn, position);
        if (cell == null){
            return;
        }
        cell.classList.add(this.getCellClass(state));
    }

    paintKeyBoard (letter: string, state: LetterState){
        const button = document.querySelector("button[value=Key" + letter.toUpperCase() +"]");

        if (button != null){
            const currentState = button.getAttribute("state") as KeyState | null;

            if (this.hasToChange(currentState, state)){
                button.classList.remove("key-green", "key-orange", "key-grey");

                const newState = this.getKeyState(state);
                button.classList.add(this.getKeyClass(state));
                button.setAttribute("state", newState);
            }
        }
    }

    private getCellClass(state: LetterState): string{
        switch (state) {
            case LetterState.Correct:
                return "cell-green";
            case LetterState.Misplaced:
                return "cell-orange";
            default:
                return "cell-grey";
        }
    }

    private getKeyClass(state: LetterState): string{
        switch (state) {
            case LetterState.Correct:
                return "key-green";
            case LetterState.Misplaced:
                return "key-orange";
            default:
                return "key-grey";
        }
    }

    private getKeyState(state: LetterState): KeyState{
        switch (state) {
            case LetterState.Correct:
                return "correct";
            case LetterState.Misplaced:
                return "misplaced";
            default:
                return "wrong";
        }
    }

    private hasToChange(currentState: KeyState | null, newState: LetterState): boolean{

        if(currentState == null){
            return true;
        }
        if (currentState == "correct"){
            return false;
        }
        if (currentState == "misplaced" && newState != LetterState.Correct){
            return false;
        }
        return true;
    }
}