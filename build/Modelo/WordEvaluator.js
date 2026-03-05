import { LetterState } from "./LetterState.js";
var WordEvaluator = /** @class */ (function () {
    function WordEvaluator() {
    }
    WordEvaluator.prototype.evaluate = function (wordTry, wordTarget) {
        var result = new Array(wordTry.length);
        var targetLetters = wordTarget.split("");
        for (var i = 0; i < wordTry.length; i++) {
            if (wordTry[i] == wordTarget[i]) {
                result[i] = LetterState.Correct;
                targetLetters[i] = "_";
            }
        }
        for (var i = 0; i < wordTry.length; i++) {
            if (result[i] == LetterState.Correct) {
                continue;
            }
            var index = targetLetters.indexOf(wordTry[i]);
            if (index != -1) {
                result[i] = LetterState.Misplaced;
                targetLetters[index] = "_";
            }
            else {
                result[i] = LetterState.Wrong;
            }
        }
        return result;
    };
    return WordEvaluator;
}());
export { WordEvaluator };
