import { LetterState } from "../LetterState.js";
import { IColor } from "./IColor.js";
import { Green } from "./Green.js";
import { Orange } from "./Orange.js";
import { Grey } from "./Grey.js";

export class ColorFactory {

    static create(state: LetterState): IColor {

        switch(state) {
            case LetterState.Correct:
                return new Green();

            case LetterState.Misplaced:
                return new Orange();

            default:
                return new Grey();
        }
    }
}