
export class WordRepository {

    private static _instance: WordRepository | null = null;

    private wordsCollection: string[] = [
        "JUEGO",
        "TALAR",
        "BAILE",
        "ANDAR",
        "MONTE",
        "PLAYA",
        "PLATA",
        "ARBOL",
        "QUESO"
    ];

    private constructor() {}

    public static getInstance(): WordRepository {
        if (this._instance === null) {
            this._instance = new WordRepository();
        }
        return this._instance;
    }

    public getRandomWord(): string {
        const index = Math.floor(Math.random() * this.wordsCollection.length);
        return this.wordsCollection[index];
    }
}
