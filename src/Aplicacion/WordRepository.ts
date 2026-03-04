import { Word } from "../Modelo/Word.js";

export class WordRepository {

    private static _instance: WordRepository | null = null;

    private wordsCollection: Word[] = [
        new Word("JUEGO"),
        new Word("TALAR"),
        new Word("BAILE"),
        new Word("ANDAR"),
        new Word("MONTE"),
        new Word("PLAYA"),
        new Word("PLATA"),
        new Word("ARBOL"),
        new Word("QUESO")
    ];

    private constructor() {}

    public static getInstance(): WordRepository {
        if (this._instance === null) {
            this._instance = new WordRepository();
        }
        return this._instance;
    }

    public getRandomWord(): Word {
        const index = Math.floor(Math.random() * this.wordsCollection.length);
        return this.wordsCollection[index];
    }
}
