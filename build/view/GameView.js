import { ColorFactory } from "../model/color/ColorFactory.js";
import { LetterState } from "../model/LetterState.js";
var GameView = /** @class */ (function () {
    function GameView() {
    }
    GameView.prototype.initializeCellClicks = function (game) {
        var _this = this;
        var rows = document.querySelectorAll(".row");
        rows.forEach(function (row, rowIndex) {
            var cells = row.querySelectorAll(".cell");
            cells.forEach(function (cell, colIndex) {
                cell.addEventListener("click", function () {
                    if (rowIndex + 1 === game.getTurn()) {
                        _this.clearActiveCells();
                        cell.classList.add("active");
                        game.setPosition(colIndex);
                    }
                });
            });
        });
    };
    GameView.prototype.moveCursorVisual = function (game) {
        this.clearActiveCells();
        var row = document.getElementById("row_" + game.getTurn());
        if (row == null) {
            return;
        }
        var cells = row.querySelectorAll(".cell");
        var pos = game.getPosition();
        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
    };
    GameView.prototype.clearActiveCells = function () {
        document.querySelectorAll(".cell").forEach(function (cell) {
            return cell.classList.remove("active");
        });
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
        var color = ColorFactory.create(state);
        cell.classList.add(color.getCellClass());
    };
    GameView.prototype.paintKeyBoard = function (letter, state) {
        var button = document.querySelector("button[value=Key" + letter.toUpperCase() + "]");
        if (button != null) {
            var currentState = button.getAttribute("state");
            if (this.hasToChange(currentState, state)) {
                button.classList.remove("key-green", "key-orange", "key-grey");
                var color = ColorFactory.create(state);
                button.classList.add(color.getKeyClass());
                button.setAttribute("state", color.getKeyState());
            }
        }
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
