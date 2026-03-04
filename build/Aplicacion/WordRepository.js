import { Word } from "../Modelo/Word";
var WordRepository = /** @class */ (function () {
    function WordRepository() {
        this.wordsCollection = [
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
    }
    WordRepository.getInstance = function () {
        if (this._instance === null) {
            this._instance = new WordRepository();
        }
        return this._instance;
    };
    WordRepository.prototype.getRandomWord = function () {
        var index = Math.floor(Math.random() * this.wordsCollection.length);
        return this.wordsCollection[index];
    };
    WordRepository._instance = null;
    return WordRepository;
}());
export { WordRepository };
