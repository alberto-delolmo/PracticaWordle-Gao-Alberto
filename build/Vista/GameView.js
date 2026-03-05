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
    GameView.prototype.getCell = function (turn, position) {
        var row = document.getElementById("row_" + turn);
        if (row == null) {
            return null;
        }
        return row.children[position];
    };
    GameView.prototype.setLetter = function (turn, position, letter) {
        var cell = this.getCell(turn, position);
        if (cell != null) {
            cell.textContent = letter;
        }
    };
    GameView.prototype.deleteLetter = function (turn, position) {
        var cell = this.getCell(turn, position);
        if (cell != null) {
            cell.textContent = "";
        }
    };
    GameView.prototype.paintCell = function (turn, position, state) {
        var cell = this.getCell(turn, position);
        if (cell == null) {
            return;
        }
        cell.classList.add(this.getCellClass(state));
    };
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
    GameView.prototype.getCellClass = function (state) {
        if (state == LetterState.Correct) {
            return "cell-green";
        }
        if (state == LetterState.Misplaced) {
            return "cell-orange";
        }
        return "cell-grey";
    };
    GameView.prototype.getKeyState = function (state) {
        if (state == LetterState.Correct) {
            return "correct";
        }
        if (state == LetterState.Misplaced) {
            return "misplaced";
        }
        return "wrong";
    };
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
