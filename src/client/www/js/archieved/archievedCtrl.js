define([
    'app',
    'text!data/gameInfo.json'
], function(
    module,
    gameInfo
) {
    return {
        name: 'HomeCtrl',

        inject: ['$scope', '$state', 'localStorageService', '$stateParams'],

        init: function() {
            var gameInfo = angular.fromJson(gameInfo);
            var gameStatus = this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};
            
            var checkPoinType = $stateParams.type;
            this.$.list = _.filter(gameInfo[checkPoinType].checkPoints, function(checkPoint, checkPointIndex) {
                return checkPointIndex < gameStatus[checkPoinType] || 0;
            });
        }
    };
});