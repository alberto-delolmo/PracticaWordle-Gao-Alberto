import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../Aplicacion/env.js";
import { WordEvaluator } from "./WordEvaluator.js";
var GameModel = /** @class */ (function () {
    function GameModel(wordTarget) {
        this.currentTurn = 1;
        this.currentTry = "";
        this.currentPosition = 0;
        this.winner = false;
        this.wordEvaluator = new WordEvaluator();
        this.wordTarget = wordTarget;
    }
    GameModel.prototype.addLetterTry = function (letter) {
        if (this.isCurrentPositionValid()) {
            if (this.currentPosition < this.currentTry.length) {
                this.replaceLetter(letter);
            }
            else {
                this.currentTry += letter;
            }
            this.currentPosition++;
        }
    };
    GameModel.prototype.replaceLetter = function (letter) {
        var wordSlice1 = this.currentTry.substring(0, this.currentPosition);
        var wordSlice2 = this.currentTry.substring(this.currentPosition + 1);
        this.currentTry = wordSlice1 + letter + wordSlice2;
    };
    GameModel.prototype.deleteLetter = function () {
        if (this.currentPosition < this.currentTry.length) {
            this.currentTry =
                this.currentTry.substring(0, this.currentPosition) +
                    this.currentTry.substring(this.currentPosition + 1);
        }
        else if (this.currentPosition > 0) {
            this.currentPosition--;
            this.currentTry =
                this.currentTry.substring(0, this.currentPosition);
        }
    };
    GameModel.prototype.setPosition = function (position) {
        if (position >= 0 && position < MAX_WORD_SIZE) {
            this.currentPosition = position;
        }
    };
    GameModel.prototype.isCurrentPositionValid = function () {
        return (this.currentPosition >= 0 && this.currentPosition < MAX_WORD_SIZE);
    };
    GameModel.prototype.enterTry = function () {
        if (this.currentTry.length != MAX_WORD_SIZE) {
            return null;
        }
        var wordTry = this.currentTry;
        var result = this.wordEvaluator.evaluate(wordTry, this.wordTarget);
        if (wordTry == this.wordTarget) {
            this.winner = true;
        }
        this.newTurn();
        return { wordTry: wordTry, result: result };
    };
    GameModel.prototype.newTurn = function () {
        this.currentTurn++;
        this.currentTry = "";
        this.currentPosition = 0;
    };
    GameModel.prototype.isWinner = function () {
        return this.winner;
    };
    GameModel.prototype.isLoser = function () {
        return this.currentTurn > MAX_ATTEMPTS;
    };
    GameModel.prototype.getTurn = function () {
        return this.currentTurn;
    };
    GameModel.prototype.getPosition = function () {
        return this.currentPosition;
    };
    GameModel.prototype.getWordTarget = function () {
        return this.wordTarget;
    };
    return GameModel;
}());
export { GameModel };
