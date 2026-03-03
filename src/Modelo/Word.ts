export class Word {

    private word: string;
    constructor(word: string){
        this.word = word;
    }

    get Word(){
        return this.word;
    }
    set Word(word: string){
        this.word = word;
    }

    toString(){
        return this.word;
    }
}