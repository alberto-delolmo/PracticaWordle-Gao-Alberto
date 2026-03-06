import { IColor } from "./IColor";

export class Green implements IColor {

    getCellClass(): string {
        return "cell-green";
    }

    getKeyClass(): string {
        return "key-green";
    }

    getKeyState() {
        return "correct";
    }

}