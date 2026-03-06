import { IColor } from "./IColor";

export class Grey implements IColor {

    getCellClass(): string {
        return "cell-grey";
    }

    getKeyClass(): string {
        return "key-grey";
    }

    getKeyState() {
        return "wrong";
    }

}