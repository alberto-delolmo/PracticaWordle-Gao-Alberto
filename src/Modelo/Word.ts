export class Word {

    private word: string;
    constructor(wordsArray: string){
        this.word = wordsArray;
    }

    get Word(){
        return this.word;
    }
    set Word(wordsArray: string){
        this.word = wordsArray;
    }

    
}