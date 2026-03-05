import { IColor } from "./IColor";

export class Orange implements IColor {

    getCellClass(): string {
        return "cell-orange";
    }

    getKeyClass(): string {
        return "key-orange";
    }

    getKeyState() {
        return "misplaced";
    }

}