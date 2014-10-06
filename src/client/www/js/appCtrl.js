define([
    'app',
    'text!data/gameInfo.json'
], function(
    module,
    gameInfo
) {
    return {
        name: 'AppCtrl',

        inject: ['$scope', '$state', 'localStorageService'],

        init: function() {
            ionic.Platform.ready(function() {
                window.StatusBar && window.StatusBar.hide();
            });
            this.$.gameInfo = angular.fromJson(gameInfo);
            this.$.gameStatus = this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};
            this.$.settings = {
                page: 'home'
            };
        },

        getCheckPoints: function(checkPointType) {
            return _.find(angular.fromJson(gameInfo).checkPointTypes, {
                name: self.$.checkPointType
            }).checkPoints;
        },

        saveGameStatus: function() {
            this.localStorageService.set('gameStatus', angular.toJson(this.$gameStatus));
        },

        goBack: function() {
            if (this.$.settings.page === 'checkPoint') {
                this.$state.go('tabs.home');
            } else if (this.$.settings.page === 'archieved') {
                this.$state.go('tabs.checkPoint.params', {
                    type: this.$state.params.type
                });
            }
        }
    };
});