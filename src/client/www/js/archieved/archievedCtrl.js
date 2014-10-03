define([
    'app',
    'text!data/gameInfo.json'
], function(
    module,
    gameInfo
) {
    return {
        name: 'ArchievedCtrl',

        inject: ['$scope', '$state', 'localStorageService', '$stateParams'],

        init: function() {
            this.$.settings.page = 'archieved';
            var gameStatus = this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};
            
            this.$.checkPointType = this.$stateParams.type;
            var self = this;
            this.$.list = _.filter(_.find(angular.fromJson(gameInfo).checkPointTypes, {name: self.$.checkPointType}).checkPoints, function(checkPoint, checkPointIndex) {
                return checkPointIndex < gameStatus[self.$.checkPointType] || 0;
            });
        }
    };
});