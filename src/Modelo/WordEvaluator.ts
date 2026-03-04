import { LetterState } from "./LetterState.js";

export class WordEvaluator {
    
    //Uso los _ de forma que elimino las letras que ya se han evualuado para que si
    //hay doble coincidencia no vuelva a ocurrir --> por ejemplo: 
    // SALDO (palabra a acertar) y LLAVE (intento)
    evaluate(wordTry: string, wordTarget: string): LetterState[] {
        const result: LetterState[] = new Array(wordTry.length);
        const targetLetters = wordTarget.split("");
        
        //Miramos aquellas letras correctas
        for(let i = 0; i < wordTry.length ; i++){
            if (wordTry[i] == wordTarget[i]){
                result[i] = LetterState.Correct;
                targetLetters[i] = "_"; 
            }
        }

        
        for (let i = 0 ; i < wordTry.length; i++){
            //Si es correcta continuamos con la siguiente
            if (result[i] == LetterState.Correct){
                continue;
            }
            const index = targetLetters.indexOf(wordTry[i]);
            
            //Miramos si se encuentra en otra posición y por tanto es amarilla
            if (index != -1) {
                result[i] = LetterState.Misplaced;
                targetLetters[index] = "_";
            }else{
                //Si no son rojas
                result[i] = LetterState.Wrong
            }
        }
        return result;
    }
}
