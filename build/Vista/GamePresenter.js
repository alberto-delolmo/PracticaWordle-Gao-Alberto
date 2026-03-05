var GamePresenter = /** @class */ (function () {
    function GamePresenter() {
    }
    GamePresenter.prototype.goToWinner = function () {
        location.assign("/winner");
    };
    GamePresenter.prototype.goToLoser = function () {
        location.assign("/loser");
        document.getElementById("lose_message").textContent = "La palabra era: ".concat(sessionStorage.getItem("pickedWord"));
    };
    return GamePresenter;
}());
export { GamePresenter };
