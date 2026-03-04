import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { LetterState } from "./LetterState.js";
import { WordEvaluator } from "./WordEvaluator.js"

export class GameModel {

    private wordEvaluator: WordEvaluator;
    private currentTurn: number = 1;
    private currentTry: string = "";
    private currentPosition: number = 0;  
    private winner: boolean = false;
    private wordTarget: string;

    constructor (wordTarget: string){
        this.wordEvaluator = new WordEvaluator();
        this.wordTarget = wordTarget; 
    }

    addLetterTry(letter: string): void{

        if (this.currentPosition < MAX_WORD_SIZE){

            if (this.currentPosition < this.currentTry.length){
                this.currentTry =
                    this.currentTry.substring(0, this.currentPosition) +
                    letter +
                    this.currentTry.substring(this.currentPosition + 1);
            } else {
                this.currentTry += letter;
            }

            this.currentPosition++;
        }
    }

    deleteLetter(): void{

        if (this.currentPosition < this.currentTry.length){

            this.currentTry =
                this.currentTry.substring(0, this.currentPosition) +
                this.currentTry.substring(this.currentPosition + 1);

        }
        else if (this.currentPosition > 0){

            this.currentPosition--;

            this.currentTry =
                this.currentTry.substring(0, this.currentPosition);
        }
    }


    setPosition(position: number): void{
        this.currentPosition = position;
    }

    enterTry(): { wordTry: string, result: LetterState[] } | null {

        if (this.currentTry.length != MAX_WORD_SIZE){
            return null;
        }

        const wordTry = this.currentTry;
        const result = this.wordEvaluator.evaluate(wordTry, this.wordTarget)

        if (wordTry == this.wordTarget){
            this.winner = true;
        }

        this.currentTurn++;
        this.currentTry = "";
        this.currentPosition = 0; 

        return {wordTry, result};
    }

    isWinner(): boolean{
        return this.winner;
    }

    isLoser(): boolean{
        return this.currentTurn > MAX_ATTEMPTS;
    }

    getTurn(): number{
        return this.currentTurn;
    }

    getPosition(): number{
        return this.currentPosition;
    }

    getWordTarget(): string{
        return this.wordTarget;
    }
}