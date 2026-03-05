import { LetterState } from "../Modelo/LetterState.js";
var GameView = /** @class */ (function () {
    function GameView() {
    }
    GameView.prototype.initializeCellClicks = function (game) {
        var rows = document.querySelectorAll(".row");
        rows.forEach(function (row, rowIndex) {
            var cells = row.querySelectorAll(".cell");
            cells.forEach(function (cell, colIndex) {
                cell.addEventListener("click", function () {
                    if (rowIndex + 1 === game.getTurn()) {
                        document.querySelectorAll(".cell").forEach(function (c) {
                            return c.classList.remove("active");
                        });
                        cell.classList.add("active");
                        game.setPosition(colIndex);
                    }
                });
            });
        });
    };
    GameView.prototype.moveCursorVisual = function (game) {
        document.querySelectorAll(".cell").forEach(function (c) {
            return c.classList.remove("active");
        });
        var row = document.getElementById("row_" + game.getTurn());
        if (!row)
            return;
        var cells = row.querySelectorAll(".cell");
        var pos = game.getPosition();
        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
    };
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
                var newState = void 0;
                switch (state) {
                    case (LetterState.Correct):
                        button.classList.add("key-green");
                        newState = "correct";
                        break;
                    case (LetterState.Misplaced):
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
    return GameView;
}());
export { GameView };
