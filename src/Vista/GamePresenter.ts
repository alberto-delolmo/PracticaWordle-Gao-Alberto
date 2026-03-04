export class GamePresenter {

    goToWinner(): void{
        location.assign("/winner");
    }

    goToLoser(): void {
        location.assign("/loser")
    }
}
