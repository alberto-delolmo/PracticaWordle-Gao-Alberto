import { GameView } from "./GameView.js";
import { GameController } from "../Controlador/GameController.js";
import { LetterState } from "../Modelo/LetterState.js";

export class GamePresenter {

    constructor(
        private view: GameView,
        private controller: GameController
    ) {}

    //Inicializa los listeners del teclado
    init() {
        console.log("GamePresenter cargado");
        const keys = Array.from(document.getElementsByClassName("key"));
        keys.forEach(el =>
            el.addEventListener("click", e =>
                this.onKeyPressed((e.target as HTMLButtonElement).value)
            )
        );

        document.addEventListener("keydown", e =>
            this.onKeyPressed(e.code)
        );
    }

     //Recibe una tecla, la envía al Controller y decide qué pintar.
    private onKeyPressed(code: string) {
        const output = this.controller.newKeyPressed(code);

        if (output == null) {
            this.updateCurrentTry();
            return;
        }

        // Si hay salida, significa que se pulsó Enter y se evaluó la palabra
        this.paintEvaluation(output.wordTry, output.result);

        if (output.status === "WINNER") {
            location.assign("/winner");
        }
        if (output.status === "LOSER") {
            location.assign("/loser");
        }
    }

    /**
     * Pinta las letras que el usuario va escribiendo en la fila actual.
     * Esto se ejecuta cuando se escribe o borra una letra.
     */
    private updateCurrentTry() {
        const game = this.controller.getGame();
        const turn = game.getCurrentTurn();
        const word = game.getCurrentTry();

        // Limpia la fila y la vuelve a pintar
        for (let i = 0; i < 5; i++) {
            this.view.setLetter(turn, i, word[i] ?? "");
        }
    }

    /**
     * Pinta el resultado de una palabra evaluada:
     *  - Colores en las celdas
     *  - Colores en el teclado
     */
    private paintEvaluation(wordTry: string, result: LetterState[]) {
        const turn = this.controller.getGame().getCurrentTurn();

        result.forEach((state, pos) => {
            const letter = wordTry[pos];

            // Pintar celda
            this.view.paintCell(turn, pos, state);

            // Pintar teclado
            this.view.paintKeyBoard(letter, state);
        });
    }
}
