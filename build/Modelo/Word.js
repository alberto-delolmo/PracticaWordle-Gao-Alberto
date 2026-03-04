var Word = /** @class */ (function () {
    function Word(word) {
        this.word = word;
    }
    Object.defineProperty(Word.prototype, "Word", {
        get: function () {
            return this.word;
        },
        set: function (word) {
            this.word = word;
        },
        enumerable: false,
        configurable: true
    });
    Word.prototype.toString = function () {
        return this.word;
    };
    return Word;
}());
export { Word };
