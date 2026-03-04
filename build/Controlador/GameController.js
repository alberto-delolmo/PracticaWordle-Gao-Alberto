var GameController = /** @class */ (function () {
    function GameController(game, view, presenter) {
        this._validLetterCodes = [
            "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
            "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
            "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"
        ];
        this.game = game;
        this.view = view;
        this.presenter = presenter;
        this.initializeCellClicks();
    }
    GameController.prototype.initializeCellClicks = function () {
        var _this = this;
        var rows = document.querySelectorAll(".row");
        rows.forEach(function (row, rowIndex) {
            var cells = row.querySelectorAll(".cell");
            cells.forEach(function (cell, colIndex) {
                cell.addEventListener("click", function () {
                    if (rowIndex + 1 === _this.game.getTurn()) {
                        document.querySelectorAll(".cell").forEach(function (c) {
                            return c.classList.remove("active");
                        });
                        cell.classList.add("active");
                        _this.game.setPosition(colIndex);
                    }
                });
            });
        });
    };
    GameController.prototype.newLetter = function (code) {
        var letter = this.transformCodeToLetter(code);
        var positionBefore = this.game.getPosition();
        this.game.addLetterTry(letter);
        this.view.setLetter(this.game.getTurn(), positionBefore, letter);
        this.moveCursorVisual();
    };
    /*backspacePressed(): void {

        const positionBefore = this.game.getPosition();

        if (positionBefore > 0) {

            this.game.deleteLetter();

            this.view.deleteLetter(
                this.game.getTurn(),
                positionBefore - 1
            );

            this.moveCursorVisual();
        }
    }*/
    GameController.prototype.backspacePressed = function () {
        var currentPosition = this.game.getPosition();
        if (currentPosition < this.game.getWordTarget().length) {
            this.game.deleteLetter();
            this.view.deleteLetter(this.game.getTurn(), currentPosition);
        }
        else if (currentPosition > 0) {
            this.game.deleteLetter();
            this.view.deleteLetter(this.game.getTurn(), currentPosition - 1);
        }
        this.moveCursorVisual();
    };
    GameController.prototype.enterPressed = function () {
        var _this = this;
        var evaluation = this.game.enterTry();
        if (!evaluation)
            return;
        var wordTry = evaluation.wordTry, result = evaluation.result;
        result.forEach(function (state, index) {
            var letter = wordTry[index];
            _this.view.paintCell(_this.game.getTurn() - 1, index, state);
            _this.view.paintKeyBoard(letter, state);
        });
        this.checkGameStatus();
    };
    GameController.prototype.newKeyPressed = function (code) {
        if (this.isValidLetter(code)) {
            this.newLetter(code);
        }
        else if (this.isEnterKey(code)) {
            this.enterPressed();
        }
        else if (this.isBackspaceKey(code)) {
            this.backspacePressed();
        }
    };
    GameController.prototype.isValidLetter = function (code) {
        return this._validLetterCodes.includes(code);
    };
    GameController.prototype.isEnterKey = function (code) {
        return code === "Enter";
    };
    GameController.prototype.isBackspaceKey = function (code) {
        return code === "Backspace";
    };
    GameController.prototype.transformCodeToLetter = function (code) {
        if (code === "Semicolon")
            return "Ñ";
        return code.split("y")[1];
    };
    GameController.prototype.checkGameStatus = function () {
        if (this.game.isWinner()) {
            this.presenter.goToWinner();
        }
        if (this.game.isLoser()) {
            this.presenter.goToLoser();
        }
    };
    GameController.prototype.moveCursorVisual = function () {
        document.querySelectorAll(".cell").forEach(function (c) {
            return c.classList.remove("active");
        });
        var row = document.getElementById("row_" + this.game.getTurn());
        if (!row)
            return;
        var cells = row.querySelectorAll(".cell");
        var pos = this.game.getPosition();
        if (pos < cells.length) {
            cells[pos].classList.add("active");
        }
    };
    return GameController;
}());
export { GameController };
