import { LetterState } from "./LetterState.js";
var WordEvaluator = /** @class */ (function () {
    function WordEvaluator() {
    }
    //Uso los _ de forma que elimino las letras que ya se han evualuado para que si
    //hay doble coincidencia no vuelva a ocurrir --> por ejemplo: 
    // SALDO (palabra a acertar) y LLAVE (intento)
    WordEvaluator.prototype.evaluate = function (wordTry, wordTarget) {
        var result = new Array(wordTry.length);
        var targetLetters = wordTarget.split("");
        //Miramos aquellas letras correctas
        for (var i = 0; i < wordTry.length; i++) {
            if (wordTry[i] == wordTarget[i]) {
                result[i] = LetterState.Correct;
                targetLetters[i] = "_";
            }
        }
        for (var i = 0; i < wordTry.length; i++) {
            //Si es correcta continuamos con la siguiente
            if (result[i] == LetterState.Correct) {
                continue;
            }
            var index = targetLetters.indexOf(wordTry[i]);
            //Miramos si se encuentra en otra posición y por tanto es amarilla
            if (index != -1) {
                result[i] = LetterState.Misplaced;
                targetLetters[index] = "_";
            }
            else {
                //Si no son rojas
                result[i] = LetterState.Wrong;
            }
        }
        return result;
    };
    return WordEvaluator;
}());
export { WordEvaluator };
