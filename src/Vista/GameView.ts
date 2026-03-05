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

                        document.querySelectorAll(".cell").forEach(c =>
                            c.classList.remove("active")
                        );

                        cell.classList.add("active");

                        game.setPosition(colIndex);
                    }
                });

            });
        });
    }

    moveCursorVisual(game: GameModel): void {

        document.querySelectorAll(".cell").forEach(c =>
            c.classList.remove("active")
        );

        const row = document.getElementById("row_" + game.getTurn());

        if (!row) return;

        const cells = row.querySelectorAll(".cell");

        const pos = game.getPosition();

        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
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
                button.classList.remove("key-green");
                button.classList.remove("key-orange");
                button.classList.remove("key-grey");
                

                let newState: KeyState;
                switch(state){
                    case(LetterState.Correct):
                        button.classList.add("key-green");
                        newState = "correct";
                        break;
                    

                    case(LetterState.Misplaced):
                        button.classList.add("key-orange");
                        newState = "misplaced";
                        break;
                    

                    default:
                        button.classList.add("key-grey");
                        newState = "wrong";
                }

                button.setAttribute("state", newState);
            }
        }
    }

    private getCellClass(state: LetterState): string{
        if (state == LetterState.Correct){
            return "cell-green";
        }
        if(state == LetterState.Misplaced){
            return "cell-orange";
        }
        return "cell-grey";
    }

    private getKeyState(state: LetterState): KeyState{
        if (state == LetterState.Correct){
            return "correct";
        }
        if (state == LetterState.Misplaced){
            return "misplaced";
        }
        return "wrong";
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