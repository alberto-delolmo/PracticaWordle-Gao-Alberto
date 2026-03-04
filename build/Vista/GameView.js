import { LetterState } from "../Modelo/LetterState.js";
var GameView = /** @class */ (function () {
    function GameView() {
    }
    //Busca la celda de la posición y número y la devuelve
    // Si no está, es null
    GameView.prototype.getCell = function (turn, position) {
        var row = document.getElementById("row_" + turn);
        if (row == null) {
            return null;
        }
        return row.children[position];
    };
    //Cambia la letra de la celda en la que está
    GameView.prototype.setLetter = function (turn, position, letter) {
        var cell = this.getCell(turn, position);
        if (cell != null) {
            cell.textContent = letter;
        }
    };
    //elimina la letra de la celda en la que está
    GameView.prototype.deleteLetter = function (turn, position) {
        var cell = this.getCell(turn, position);
        if (cell != null) {
            cell.textContent = "";
        }
    };
    //Pinta la celda de acuerdo con el state indicado
    GameView.prototype.paintCell = function (turn, position, state) {
        var cell = this.getCell(turn, position);
        if (cell == null) {
            return;
        }
        cell.classList.add(this.getCellClass(state));
    };
    //Busca el elemento con la key indicada en todo el documento HTML, llama a método hasToChange,
    //comprueba si debe cambiar el state y lo cambia o no, actualizando su estado para futuros 
    // cambios de letra
    GameView.prototype.paintKeyBoard = function (letter, state) {
        var button = document.querySelector("button[value=Key" + letter.toUpperCase() + "]");
        if (button != null) {
            var currentState = button.getAttribute("state");
            if (this.hasToChange(currentState, state)) {
                button.classList.remove("key-green");
                button.classList.remove("key-orange");
                button.classList.remove("key-grey");
                var newState = this.getKeyState(state);
                button.classList.add("key-" + newState);
                button.setAttribute("state", newState);
            }
        }
    };
    //Convierte el estado en el color de la celda para usar el css
    GameView.prototype.getCellClass = function (state) {
        if (state == LetterState.Correct) {
            return "cell-green";
        }
        if (state == LetterState.Misplaced) {
            return "cell-orange";
        }
        return "cell-grey";
    };
    //Convierte el estado en el string que lo representa
    GameView.prototype.getKeyState = function (state) {
        if (state == LetterState.Correct) {
            return "correct";
        }
        if (state == LetterState.Misplaced) {
            return "misplaced";
        }
        return "wrong";
    };
    //Comprueba si debe cambiar o no el estado de la letra aplicando lógica y prioridad
    GameView.prototype.hasToChange = function (currentState, newState) {
        if (currentState == null) {
            return true;
        }
        if (currentState == "correct") {
            return false;
        }
        if (currentState == "misplaced" && newState != LetterState.Correct) {
            return false;
        }
        return true;
    };
    GameView.prototype.showLoseWord = function (word) {
        var messageElemet = document.getElementById("lose_message");
        if (messageElemet) {
            messageElemet.textContent = "La palabra era: ".concat(word);
        }
    };
    return GameView;
}());
export { GameView };
