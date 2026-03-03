import { LetterState } from "../Modelo/LetterState";

type KeyState = "correct" | "misplaced" | "wrong";

export class GameView {

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

            const currentState = button.getAttribute("data-state") as KeyState | null;

            if (this.hasToChange(currentState, state)){
                button.classList.remove("key-green");
                button.classList.remove("key-yellow");
                button.classList.remove("key-grey");

                let newState = this.getKeyState(state);
                button.classList.add("key-"+newState);
                button.setAttribute("state", newState);
            }
        }
    }

    private processState(state: LetterState): string {
        if (state == LetterState.Correct){
            return "cell-green";
        }else if(state == LetterState.Misplaced){
            return "cell-yellow";
        } else{
            return "cell-grey";
        }
    }

    private getCellClass(state: LetterState): string{
        if (state == LetterState.Correct){
            return "cell-green";
        }
        if(state == LetterState.Misplaced){
            return "cell-yellow";
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