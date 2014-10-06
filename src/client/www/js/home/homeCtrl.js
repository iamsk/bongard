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
            this.$.settings.page = 'home';
            this.$.gameInfo = angular.fromJson(gameInfo);
            this.$.gameStatus = this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};
            this.$.buttonClasses = {
                'simple': 'button-balanced',
                'medium': 'button-energized',
                'hard': 'button-assertive',
                'complex': 'button-royal'
            }
        }
    };
});