var WordRepository = /** @class */ (function () {
    function WordRepository() {
        this.wordsCollection = [
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
