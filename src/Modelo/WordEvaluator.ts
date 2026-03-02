import { LetterState } from "./LetterState";

export class WordEvaluator {

    evaluate(wordTry: string, wordTarget: string): LetterState[] {
        const result: LetterState[] = new Array(wordTry.length);
        const targetLetters = wordTarget.split("");

        for(let i = 0; i < wordTry.length ; i++){
            if (wordTry[i] == wordTarget[i]){
                result[i] = LetterState.Correct;
                targetLetters[i] = "_"; 
            }
        }


        for (let i = 0 ; i < wordTry.length; i++){

            if (result[i] == LetterState.Correct){
                continue;
            }

            const index = targetLetters.indexOf(wordTry[i]);

            if (index != -1) {
                result[i] = LetterState.Misplaced;
                targetLetters[index] = "_";
            }else{
                result[i] = LetterState.Wrong
            }
        }
        return result;
    }
}
