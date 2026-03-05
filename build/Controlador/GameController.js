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
        this.view.initializeCellClicks(this.game);
    }
    GameController.prototype.newLetter = function (code) {
        var letter = this.transformCodeToLetter(code);
        var positionBefore = this.game.getPosition();
        this.game.addLetterTry(letter);
        this.view.setLetter(this.game.getTurn(), positionBefore, letter);
        this.view.moveCursorVisual(this.game);
    };
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
        this.view.moveCursorVisual(this.game);
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
        else if (this.game.isLoser()) {
            this.presenter.goToLoser();
        }
    };
    return GameController;
}());
export { GameController };
