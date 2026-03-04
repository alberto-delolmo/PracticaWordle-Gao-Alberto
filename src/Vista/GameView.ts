import { LetterState } from "../Modelo/LetterState.js";

type KeyState = "correct" | "misplaced" | "wrong";

export class GameView {

    //Busca la celda de la posición y número y la devuelve
    // Si no está, es null
    private getCell(turn: number, position: number): Element | null{
        const row = document.getElementById("row_"+ turn);
        if(row == null){
            return null;
        }
        return row.children[position];
    }
    
    //Cambia la letra de la celda en la que está
    setLetter(turn: number, position: number, letter: string): void {
        const cell = this.getCell(turn, position);
        if (cell != null){
            cell.textContent = letter;
        }
    }

    //elimina la letra de la celda en la que está
    deleteLetter(turn: number, position: number): void {
        const cell = this.getCell(turn, position);
        if (cell != null){
            cell.textContent = "";
        }
    }

    //Pinta la celda de acuerdo con el state indicado
    paintCell(turn: number, position: number, state: LetterState): void {
        const cell = this.getCell(turn, position);
        if (cell == null){
            return;
        }
        cell.classList.add(this.getCellClass(state));
    }

    //Busca el elemento con la key indicada en todo el documento HTML, llama a método hasToChange,
    //comprueba si debe cambiar el state y lo cambia o no, actualizando su estado para futuros 
    // cambios de letra
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

    //Convierte el estado en el color de la celda para usar el css
    private getCellClass(state: LetterState): string{
        if (state == LetterState.Correct){
            return "cell-green";
        }
        if(state == LetterState.Misplaced){
            return "cell-orange";
        }
        return "cell-grey";
    }

    //Convierte el estado en el string que lo representa
    private getKeyState(state: LetterState): KeyState{
        if (state == LetterState.Correct){
            return "correct";
        }
        if (state == LetterState.Misplaced){
            return "misplaced";
        }
        return "wrong";
    }

    //Comprueba si debe cambiar o no el estado de la letra aplicando lógica y prioridad
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