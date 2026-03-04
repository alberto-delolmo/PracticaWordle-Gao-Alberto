import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { WordEvaluator } from "./WordEvaluator.js";
var GameModel = /** @class */ (function () {
    function GameModel(wordTarget) {
        this.currentTurn = 1;
        this.currentTry = "";
        this.winner = false;
        this.wordEvaluator = new WordEvaluator();
        this.wordTarget = wordTarget;
    }

    //Miro a ver si puedo añadir letra y si se puede la añado 
    GameModel.prototype.addLetterTry = function (letter) {
        if (this.currentTry.length < MAX_WORD_SIZE) {
            this.currentTry += letter;
        }
    };
    //eliminamos la letra directamente
    GameModel.prototype.deleteLetter = function () {
        this.currentTry = this.currentTry.slice(0 - 1);
    };
    // Miramos si coinciden la longitud de las palabras (sino NULL)
    // Si coinciden las palabras --> WINNER
    // Actualizamos el intento y el turno
    // Devolvemos la tupla del intento y el resultado para que la UI pueda pintar las letras
    GameModel.prototype.enterTry = function () {
        if (this.currentTry.length != MAX_WORD_SIZE) {
            return null;
        }
        var wordTry = this.currentTry;
        var result = this.wordEvaluator.evaluate(wordTry, this.wordTarget);
        if (wordTry == this.wordTarget) {
            this.winner = true;
        }
        this.currentTurn++;
        this.currentTry = "";
        return { wordTry: wordTry, result: result };
    };
    //actualizamos el atributo
    GameModel.prototype.isWinner = function () {
        return this.winner;
    };
    //cuando supera los intentos --> LOSER
    GameModel.prototype.isLoser = function () {
        return this.currentTurn > MAX_ATTEMPTS;
    };
    return GameModel;
}());
export { GameModel };
