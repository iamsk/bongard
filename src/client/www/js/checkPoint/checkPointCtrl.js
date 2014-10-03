define([
    'app',
    'text!data/gameInfo.json'
], function(
    module,
    gameInfo
) {
    return {
        name: 'CheckPointCtrl',

        inject: ['$scope', '$state', '$stateParams', 'localStorageService', '$ionicPopup'],

        init: function() {
            this.$.settings.page = 'checkPoint';
            this.$.checkPointType = this.$stateParams.type;

            this._gameInfo = angular.fromJson(gameInfo);
            this._checkPointsData = _.find(this._gameInfo.checkPointTypes, {
                name: this.$.checkPointType
            });

            this._gameStatus = angular.fromJson(this.localStorageService.get('gameStatus')) || {};

            this.$.currentCheckPointLevel = parseInt(this.$stateParams.id || this._gameStatus[this.$.checkPointType] || 0);
            this.$.checkPointLevelsCount = this._checkPointsData.checkPoints.length;
            this.$.leftChances = 3;

            this._initCurrentLevel();
        },

        _initCurrentLevel: function() {
            var checkPoint = this._checkPointsData.checkPoints[this.$.currentCheckPointLevel];
            if (!checkPoint) {
                return;
            }
            this.$.author = checkPoint.author;

            var imagesIds = [];
            while (imagesIds.length < 6) {
                var randomInt = 10 + _.random(1, 6);
                if (imagesIds.length >= 3) {
                    randomInt += 10
                }
                if (_.indexOf(imagesIds, randomInt) < 0) {
                    imagesIds.push(randomInt);
                }
            }
            this.$.images = _.chain(imagesIds).shuffle().map(function(imageName) {
                return {
                    id: imageName,
                    url: checkPoint.imagesPath + imageName + '.jpg'
                };
            }).value();
        },

        isClickable: function() {
            return _.filter(this.$.images, {
                selected: true
            }).length < 3;
        },

        showToolTip: function() {
            _.forEach(this.$.images, function(image) {
                image.selected = false;
            });
            _.chain(this.$.images).filter(function(image) {
                return image.id < 20;
            }).slice(0, 2).forEach(function(image) {
                image.selected = true;
            });
        },

        canConfirm: function() {
            return _.filter(this.$.images, {
                selected: true
            }).length === 3;
        },

        confirm: function() {
            var selectedImageIds = _.chain(this.$.images).filter({
                selected: true
            }).pluck('id').sortBy().value();
            var isAnswerRight = !(_.last(selectedImageIds) > 20 && _.first(selectedImageIds) < 20);
            if (isAnswerRight) {
                this._nextLevel();
            } else {
                this.$.leftChances--;
                var self = this;
                if (this.$.leftChances === 0) {
                    this.$ionicPopup.alert({
                        title: 'Advertisment',
                        template: 'You have to see an ad before continue as your punishment ^_^ <br /> This is an ad!'
                    }).then(function() {
                        self.$.leftChances++;
                    });
                } else {
                    this.$ionicPopup.alert({
                        title: 'Left Chances',
                        template: 'You get only ' + this.$.leftChances + ' chances left for this step. Otherwise you have to see an ad. ^_^'
                    });
                }
            }
        },

        _nextLevel: function() {
            if (this.$.currentCheckPointLevel === this._checkPointsData.checkPoints.length) {
                alert("you win");
            } else {
                this._gameStatus[this.$.checkPointType] = ++this.$.currentCheckPointLevel;
                this.localStorageService.set('gameStatus', angular.toJson(this._gameStatus));

                this._initCurrentLevel();
            }
        }
    };
});