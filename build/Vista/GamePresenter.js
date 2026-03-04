var GamePresenter = /** @class */ (function () {
    function GamePresenter(view, controller) {
        this.view = view;
        this.controller = controller;
    }
    //Inicializa los listeners del teclado
    GamePresenter.prototype.init = function () {
        var _this = this;
        console.log("GamePresenter cargado");
        var keys = Array.from(document.getElementsByClassName("key"));
        keys.forEach(function (el) {
            return el.addEventListener("click", function (e) {
                return _this.onKeyPressed(e.target.value);
            });
        });
        document.addEventListener("keydown", function (e) {
            return _this.onKeyPressed(e.code);
        });
    };
    //Recibe una tecla, la envía al Controller y decide qué pintar.
    GamePresenter.prototype.onKeyPressed = function (code) {
        var output = this.controller.newKeyPressed(code);
        if (output == null) {
            this.updateCurrentTry();
            return;
        }
        // Si hay salida, significa que se pulsó Enter y se evaluó la palabra
        this.paintEvaluation(output.wordTry, output.result);
        if (output.status === "WINNER") {
            location.assign("/winner");
        }
        if (output.status === "LOSER") {
            location.assign("/loser");
        }
    };
    /**
     * Pinta las letras que el usuario va escribiendo en la fila actual.
     * Esto se ejecuta cuando se escribe o borra una letra.
     */
    GamePresenter.prototype.updateCurrentTry = function () {
        var _a;
        var game = this.controller.getGame();
        var turn = game.getCurrentTurn();
        var word = game.getCurrentTry();
        // Limpia la fila y la vuelve a pintar
        for (var i = 0; i < 5; i++) {
            this.view.setLetter(turn, i, (_a = word[i]) !== null && _a !== void 0 ? _a : "");
        }
    };
    /**
     * Pinta el resultado de una palabra evaluada:
     *  - Colores en las celdas
     *  - Colores en el teclado
     */
    GamePresenter.prototype.paintEvaluation = function (wordTry, result) {
        var _this = this;
        var turn = this.controller.getGame().getCurrentTurn();
        result.forEach(function (state, pos) {
            var letter = wordTry[pos];
            // Pintar celda
            _this.view.paintCell(turn, pos, state);
            // Pintar teclado
            _this.view.paintKeyBoard(letter, state);
        });
    };
    return GamePresenter;
}());
export { GamePresenter };
