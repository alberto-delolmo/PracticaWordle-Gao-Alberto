import { Word } from "../Modelo/Word";

export class WordRepository {

    wordsCollection: Word[] = [
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

    getRandomWord(): Word {
        const index = Math.floor(Math.random() * this.wordsCollection.length);
        return this.wordsCollection[index];
    }
}
