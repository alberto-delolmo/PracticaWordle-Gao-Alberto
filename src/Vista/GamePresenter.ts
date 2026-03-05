export class GamePresenter {

    

    goToWinner(): void{
        location.assign("/winner");
    }

    goToLoser(): void {
        location.assign("/loser");
        document.getElementById("lose_message")!.textContent = `La palabra era: ${sessionStorage.getItem("pickedWord")}`;
    }
}
