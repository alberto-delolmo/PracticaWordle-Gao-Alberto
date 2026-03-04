"use strict";
// import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
// import {Interface} from "./Interface.js";
// export class Game {
//     //Atributos del juego
//     private _pickedWord: string
//     private _actualWord: string
//     private _turn: number
//     private _actualPosition: number
//     private _validLetterCodes: string[]
//     //Constructor, crea un wordle on la respuesta como el parámetro
//     constructor(pickedWord: string){
//         this._pickedWord = pickedWord;
//         this._actualWord = "";
//         this._turn = 1;
//         this._actualPosition = 0;
//         this._validLetterCodes = _validLetterCodes;
//     }
//     //Getters y setters
//     get pickedWord(){
//         return this._pickedWord;
//     }
//     set pickedWord(word){
//         this._pickedWord = word;
//     }
//     get actualWord(){
//         return this._actualWord;
//     }
//     set actualWord(word){
//         this._actualWord = word;
//     }
//     get turn(){
//         return this._turn;
//     }
//     set turn(num){
//         this._turn = num;
//     }
//     get actualPosition(){
//         return this._actualPosition;
//     }
//     set actualPosition(num){
//         this._actualPosition = num;
//     }
//     get validLetterCodes() {
//         return this._validLetterCodes
//     }
//     set validLetterCodes(letters) {
//         this._validLetterCodes = letters;
//     }
//     /**
//      * Transforma de code a letra. Si es semicolon retorna ñ. En caso contrario con split toma la letra correspondiente después del "y" (KeyQ) -> (Q)
//      * @param code 
//      * @returns Retorna la letra correspondiente del code.
//      */
//     transformCodeToLetter(code: string):string{
//         let letter: string = "";
//         if (code=="Semicolon") letter = "Ñ";
//         else letter = code.split("y")[1];
//         return letter;
//     }
//     /**
//      * Cambia el code a letra, coloca la letra en su posicion destinada, avanza el puntero _actualPosition en uno, y agrega dicho letra a la palabra formada.
//      * @param code 
//      */
//     newLetter(code: string):void{
//         let letter: string = this.transformCodeToLetter(code);
//         //this._interface.setNewLetter(this.turn, this.actualPosition, letter);
//         this._actualPosition = this._actualPosition + 1;
//         this._actualWord += letter;
//     }
//     /**
//      * Comprueba la pabra si es la misma que la de pickedWord
//      */
//     checkWordIsRight():string{
//         if (this._actualWord == this._pickedWord){
//             location.assign("/winner");
//             return "/winner"
//         } 
//         return "";
//     }
//     /**
//      * Comprueba las letras coinciden tanto en posicion como en valor con el de la palabra uno a uno y le pone el fondo "rightLetter"
//      */
//     checkRightLetters = ():void=>{
//         for(let i=0; i<MAX_WORD_SIZE; i++){
//             if (this._pickedWord[i]==this._actualWord[i]){
//                 //this._interface.changeBackgroundPosition(this._turn, i, "rightLetter");
//             }
//         }
//     }
//     /**
//      * Comprueba las letras que existen en la palabra correcta pero no estan en la posicion correcta y le pone el fondo "misplacedLetter"
//      */
//     checkMisplacedLetters = ():void=> {
//         let actualLetter: string = "";
//         let pattern: RegExp;
//         let numberOfCoincidences: number = 0;
//         let isMisplacedLetter: boolean;
//         for (let i=0; i<MAX_WORD_SIZE; i++){
//             isMisplacedLetter = true;
//             actualLetter = this._actualWord[i];
//             pattern = new RegExp(actualLetter,"g");
//             numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
//             if (this._pickedWord[i]==this._actualWord[i]) isMisplacedLetter=false;
//             //if (numberOfCoincidences>0 && isMisplacedLetter) this._interface.changeBackgroundPosition(this._turn, i, "misplacedLetter");
//         }
//     }
//     /**
//      * Comprueba las letras que no corresponden a la palabra correcta y les pone el fondo "wrongLetter"
//      */
//     checkWrongLetters = ():void=>{
//         let actualLetter = "";
//         let pattern:RegExp;
//         let numberOfCoincidences = 0;
//         for (let i=0; i<MAX_WORD_SIZE; i++){
//             actualLetter = this._actualWord[i];
//             pattern = new RegExp(actualLetter,"g");
//             numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
//             //if (numberOfCoincidences==0) this._interface.changeBackgroundPosition(this._turn, i, "wrongLetter");
//         }
//     }
//     /**
//      * Comprueba la palabra si tiene letras correctas, descolocada o erroneas, avanza un turno, resetea la posicion de columna y limpia a palabra introducida.
//      */
//     updateAfterANewWord = ():void=>{
//         this.checkRightLetters();
//         this.checkMisplacedLetters();
//         this.checkWrongLetters();
//         this._turn = this._turn + 1;
//         this._actualPosition = 0;
//         this._actualWord = "";
//     }
//     /**
//      * Comprueba si el jugador ha sobrepasado el limite de intentos y pierde si es asi.
//      */
//     checkGameIsOver():string{
//         if (this.turn == MAX_ATTEMPTS){
//             return "/loser";
//         }
//         return "";
//     }
//     /**
//      * Metodo para cuando es presionado enter, si la palabra tiene el tamaño maximo realiza las comprobaciones de si la palabra es correcta, si se acabo el juego y actualiza.
//      */
//     enterPressed():void{
//         if (this._actualWord.length == MAX_WORD_SIZE){
//             this.checkWordIsRight();
//             this.checkGameIsOver();
//             this.updateAfterANewWord();
//         }
//     }
//     /**
//      * Metodo para cuando es presionado borrar, si la posicion es mayor que cero borra la ultima letra y regresa una posicion.
//      */
//     backspacePressed():void{
//         if (this._actualPosition > 0) {
//             this._actualPosition -= 1;
//             //this._interface.deleteLetter(this._turn, this._actualPosition);
//         }
//     }
//     /**
//      * Metodo para cuando es presionado una tecla, comprueba si es una letra valido, si es el enter o si es el backspace.
//      * @param code 
//      */
//     newKeyPressed(code: string):void{ 
//         /**if (this.isValidLetter(code)) this.newLetter(code);
//         if (this.isEnterKey(code)) this.enterPressed();
//         if (this.isBackspaceKey(code)) this.backspacePressed();
//         this._interface.changeBackgroundKey(code);*/
//     }
// }
