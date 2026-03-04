var GameController = /** @class */ (function () {
    function GameController(game, view, presenter) {
        this._validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA",
            "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        this.game = game;
        this.view = view;
        this.presenter = presenter;
    }
    GameController.prototype.getGame = function () {
        return this.game;
    };
    GameController.prototype.setGame = function (value) {
        this.game = value;
    };
    GameController.prototype.newLetter = function (code) {
        var letter = this.transformCodeToLetter(code);
        this.game.addLetterTry(letter);
        this.view.setLetter(this.game.getTurn(), this.game.getPosition() - 1, letter);
    };
    /**
     * Comprueba si code es una letra y si es valida.
     * @param code
     * @returns Si el parámetro code esta contenido en la lista _validLetterCodes, retorna true,
     * en caso contrario retorna false.
     */
    GameController.prototype.isValidLetter = function (code) {
        return this._validLetterCodes.includes(code);
    };
    /**
     * Comrueba si code es "Enter"
     * @param code
     * @returns Retorna true si es "Enter", por lo contrario false.
     */
    GameController.prototype.isEnterKey = function (code) {
        return code == "Enter";
    };
    /**
     * Comprueba si code es "Backspace"
     * @param code
     * @returns Retorna true si es "Backspace", por lo contrario false.
     */
    GameController.prototype.isBackspaceKey = function (code) {
        return code == "Backspace";
    };
    /**
     * Transforma de code a letra. Si es semicolon retorna ñ. En caso contrario con split toma la letra correspondiente después del "y" (KeyQ) -> (Q)
     * @param code
     * @returns Retorna la letra correspondiente del code.
     */
    GameController.prototype.transformCodeToLetter = function (code) {
        var letter = "";
        if (code == "Semicolon")
            letter = "Ñ";
        else
            letter = code.split("y")[1];
        return letter;
    };
    /**
     * Metodo para cuando es presionado enter
     */
    GameController.prototype.enterPressed = function () {
        var _this = this;
        var evaluation = this.game.enterTry();
        if (evaluation === null) {
            return null;
        }
        var wordTry = evaluation.wordTry, result = evaluation.result;
        result.forEach(function (state, index) {
            var letter = wordTry[index];
            _this.view.paintCell(_this.game.getTurn() - 1, index, state);
            _this.view.paintKeyBoard(letter, state);
        });
        this.checkGameStatus();
    };
    /**
     * Metodo para cuando es presionado borrar, si la posicion es mayor que cero borra la ultima letra y regresa una posicion.
     */
    GameController.prototype.backspacePressed = function () {
        console.log("Elimina la posicion " + this.game.getPosition);
        this.game.deleteLetter();
        this.view.deleteLetter(this.game.getTurn(), this.game.getPosition());
    };
    /**
     * Metodo para cuando es presionado una tecla, comprueba si es una letra valido, si es el enter o si es el backspace.
     * @param code
     */
    GameController.prototype.newKeyPressed = function (code) {
        if (this.isValidLetter(code)) {
            this.newLetter(code);
            return null;
        }
        else if (this.isEnterKey(code)) {
            return this.enterPressed();
        }
        else if (this.isBackspaceKey(code)) {
            this.backspacePressed();
            return null;
        }
    };
    GameController.prototype.checkGameStatus = function () {
        if (this.game.isWinner()) {
            this.presenter.goToWinner();
        }
        if (this.game.isLoser()) {
            this.presenter.goToLoser();
        }
    };
    return GameController;
}());
export { GameController };
