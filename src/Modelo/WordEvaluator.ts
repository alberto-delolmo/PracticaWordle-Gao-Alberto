import { LetterState } from "./LetterState";

export class WordEvaluator {

    evaluate(wordTry: string, wordTarget: string): LetterState[] {
        const result: LetterState[] = new Array(wordTry.length);
        const targetLetters = wordTarget.split("");

        for(let i = 0; i < wordTry.length ; i++){
            if (wordTry[i] == wordTarget[i]){
                result[i] = LetterState.Correct;
            }
        }


        for (let i = 0 ; i < wordTry.length; i++){

            if (result[i] == LetterState.Correct){
                continue;
            }

            const index = targetLetters.indexOf(wordTry[i]);

            if (index != -1) {
                result[i] = LetterState.Misplaced;
            }else{
                result[i] = LetterState.Wrong
            }
        }
        return result;
    }
}
