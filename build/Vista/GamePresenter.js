var GamePresenter = /** @class */ (function () {
    function GamePresenter() {
    }
    GamePresenter.prototype.goToWinner = function () {
        location.assign("/winner");
    };
    GamePresenter.prototype.goToLoser = function () {
        location.assign("/loser");
    };
    return GamePresenter;
}());
export { GamePresenter };
