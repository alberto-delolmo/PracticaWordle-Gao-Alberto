import { LetterState } from "../Modelo/LetterState";

type KeyState = "correct" | "misplaced" | "wrong";

export class GameView {

    setLetter(turn: number, position: number, letter: string): void {
        
        //He buscado este metodo en Internet y te permite recoger del HTML cualquier elemento con ese ID
        //Si lo encuentra lo devuelve, sino es NULL
        const row = document.getElementById("row_"+ turn);
        
        if (row != null){
            //Este método te permite recuperar las diferentes posiciones que hay dentro de ese elemento
            const cell = row.children[position];
            cell.textContent = letter;
        }
    }

    deleteLetter(turn: number, position: number): void {
        const row = document.getElementById("row_"+ turn);
        
        if(row != null){
            const cell = row.children[position];
            cell.textContent = "";
        }
    }

    paintCell(turn: number, position: number, state: LetterState): void {
        const row = document.getElementById("row_"+ turn);

        if (row != null){
            const cell = row.children[position];
            const css = this.processState(state);
            cell.classList.add(css);
        }
    }

    paintKeyBoard (letter: string, state: LetterState){
        const button = document.querySelector("button[value=Key" + letter.toUpperCase() +"]");

        if (button != null){

            const currentState = button.getAttribute("data-state") as KeyState | null;

            if (this.hasToChange(currentState, state)){
                button.classList.remove("key-green");
                button.classList.remove("key-yellow");
                button.classList.remove("key-grey");

                let newState : KeyState;

                if (state == LetterState.Correct){
                    button.classList.add("key-green");
                    newState = "correct";
                } else if( state == LetterState.Misplaced){
                    button.classList.add("key-yellow");
                    newState = "misplaced";
                }else{
                    button.classList.add("key-grey");
                    newState = "wrong";
                }

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