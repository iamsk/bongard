define([
    'app',
    'text!data/gameInfo.json'
], function(
    module,
    gameInfo
) {
    return {
        name: 'HomeCtrl',

        inject: ['$scope', '$state', 'localStorageService'],

        init: function() {
            this.$.gameInfo = angular.fromJson(gameInfo);
            this.$.gameStatus = this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};
            this.$.buttonClasses = {
                'simple': 'button-balanced',
                'medium': 'button-energized',
                'senior': 'button-assertive',
                'BT': 'button-royal'
            }
        }
    };
});