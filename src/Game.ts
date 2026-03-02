import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {Interface} from "./Interface.js";

export class Game {
    //Atributos del juego
    private _pickedWord: string
    private _actualWord: string
    private _turn: number
    private _actualPosition: number
    private _validLetterCodes: string[]
    private _interface: Interface
    //Constructor, crea un wordle on la respuesta como el parámetro
    constructor(pickedWord: string){
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._turn = 1;
        this._actualPosition = 0;
        this._validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        this._interface = new Interface();
    }
    //Getters y setters
    get pickedWord(){
        return this._pickedWord;
    }
    set pickedWord(word){
        this._pickedWord = word;
    }

    get actualWord(){
        return this._actualWord;
    }
    set actualWord(word){
        this._actualWord = word;
    }

    get turn(){
        return this._turn;
    }
    set turn(num){
        this._turn = num;
    }

    get actualPosition(){
        return this._actualPosition;
    }
    set actualPosition(num){
        this._actualPosition = num;
    }

    get validLetterCodes() {
        return this._validLetterCodes
    }
    set validLetterCodes(letters) {
        this._validLetterCodes = letters;
    }

    get interface() {
        return this._interface;
    }
    set interface(i) {
        this._interface = i;
    }
    
    /**
     * Comprueba si code es una letra y si es valida.
     * @param code 
     * @returns Si el parámetro code esta contenido en la lista _validLetterCodes y la posicion actual es menor que la del tamaño maximo de la palabra, retorna true,
     * en caso contrario retorna false.
     */
    isValidLetter(code: string):boolean {
        
        return  this._validLetterCodes.includes(code) && this._actualPosition < MAX_WORD_SIZE;
    }
    /**
     * Comrueba si code es "Enter"
     * @param code 
     * @returns Retorna true si es "Enter", por lo contrario false.
     */
    isEnterKey(code: string):boolean {
        return code=="Enter";
    }
    /**
     * Comprueba si code es "Backspace"
     * @param code 
     * @returns Retorna true si es "Backspace", por lo contrario false.
     */
    isBackspaceKey(code: string):boolean{
        return code=="Backspace";
    }
    /**
     * Transforma de code a letra. Si es semicolon retorna ñ. En caso contrario con split toma la letra correspondiente después del "y" (KeyQ) -> (Q)
     * @param code 
     * @returns Retorna la letra correspondiente del code.
     */
    transformCodeToLetter(code: string):string{
        let letter: string = "";
        if (code=="Semicolon") letter = "Ñ";
        else letter = code.split("y")[1];
        return letter;
    }

    newLetter(code: string):void{
        let letter: string = this.transformCodeToLetter(code);
        this._interface.setNewLetter(this.turn, this.actualPosition, letter);
        this._actualPosition = this._actualPosition + 1;
        this._actualWord += letter;
    }

    checkWordIsRight():void{
        if (this._actualWord == this._pickedWord){
            location.assign("/winner");
        }
    }

    checkRightLetters = ():void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (this._pickedWord[i]==this._actualWord[i]){
                this._interface.changeBackgroundPosition(this._turn, i, "rightLetter");
            }
        }
    }

    checkMisplacedLetters = ():void=> {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidences: number = 0;
        let isMisplacedLetter: boolean;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = this._actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
            if (this._pickedWord[i]==this._actualWord[i]) isMisplacedLetter=false;
            if (numberOfCoincidences>0 && isMisplacedLetter) this._interface.changeBackgroundPosition(this._turn, i, "misplacedLetter");
            
        }
    }

    checkWrongLetters = ():void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidences = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = this._actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidences==0) this._interface.changeBackgroundPosition(this._turn, i, "wrongLetter");
        }
    }

    updateAfterANewWord = ():void=>{
        this.checkRightLetters();
        this.checkMisplacedLetters();
        this.checkWrongLetters();
        this._turn = this._turn + 1;
        this._actualPosition = 0;
        this._actualWord = "";
    }

    checkGameIsOver():void{
        if (this.turn == MAX_ATTEMPTS){
            location.assign("/loser");
        }
    }

    enterPressed():void{
        if (this._actualWord.length == MAX_WORD_SIZE){
            this.checkWordIsRight();
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }

    backspacePressed():void{
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;
            this._interface.deleteLetter(this._turn, this._actualPosition);
        }
    }

    newKeyPressed(code: string):void{ 
        if (this.isValidLetter(code)) this.newLetter(code);
        if (this.isEnterKey(code)) this.enterPressed();
        if (this.isBackspaceKey(code)) this.backspacePressed();
        this._interface.changeBackgroundKey(code);
    }

    
}