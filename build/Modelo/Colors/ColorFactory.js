import { LetterState } from "../LetterState.js";
import { Green } from "./Green.js";
import { Orange } from "./Orange.js";
import { Grey } from "./Grey.js";
var ColorFactory = /** @class */ (function () {
    function ColorFactory() {
    }
    ColorFactory.create = function (state) {
        switch (state) {
            case LetterState.Correct:
                return new Green();
            case LetterState.Misplaced:
                return new Orange();
            default:
                return new Grey();
        }
    };
    return ColorFactory;
}());
export { ColorFactory };
