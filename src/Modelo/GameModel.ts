import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../env.js";
import { LetterState } from "./LetterState.js";
import { WordEvaluator } from "./WordEvaluator.js"

export class GameModel {

    private wordEvaluator: WordEvaluator;
    private currentTurn: number = 1;
    private currentTry: string = "";
    private winner: boolean = false;
    private wordTarget: string;

    
    public getWordEvaluator(): WordEvaluator {
        return this.wordEvaluator;
    }

    public setWordEvaluator(value: WordEvaluator): void {
        this.wordEvaluator = value;
    }

    public getCurrentTurn(): number {
        return this.currentTurn;
    }

    public setCurrentTurn(value: number): void {
        this.currentTurn = value;
    }

    public getCurrentTry(): string {
        return this.currentTry;
    }

    public setCurrentTry(value: string): void {
        this.currentTry = value;
    }

    // wordTarget
    public getWordTarget(): string {
        return this.wordTarget;
    }

    public setWordTarget(value: string): void {
        this.wordTarget = value;
    }


    constructor (wordTarget: string){
        this.wordEvaluator = new WordEvaluator();
        this.wordTarget = wordTarget; 
    }

    //Miro a ver si puedo añadir letra y si se puede la añado 
    addLetterTry(letter: string): void{
        if (this.currentTry.length < MAX_WORD_SIZE){
            this.currentTry += letter;
        }
    }


    //eliminamos la letra directamente
    deleteLetter(): void{
        this.currentTry = this.currentTry.slice(0-1);
    }

    // Miramos si coinciden la longitud de las palabras (sino NULL)
    // Si coinciden las palabras --> WINNER
    // Actualizamos el intento y el turno
    // Devolvemos la tupla del intento y el resultado para que la UI pueda pintar las letras
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

        return {wordTry, result};
    }

    //actualizamos el atributo
    isWinner(): boolean{
        return this.winner;
    }

    //cuando supera los intentos --> LOSER
    isLoser(): boolean{
        return this.currentTurn > MAX_ATTEMPTS;
    }




}