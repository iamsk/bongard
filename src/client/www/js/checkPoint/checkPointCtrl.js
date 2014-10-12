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

            this._checkPointsData = _.find(this.$.gameInfo.checkPointTypes, {
                name: this.$.checkPointType
            });

            this.$.currentCheckPointLevel = parseInt(this.$stateParams.id || this.$.gameStatus[this.$.checkPointType] || 0);
            this.$.checkPointLevelsCount = this._checkPointsData.checkPoints.length;

            this._initCurrentLevel();
        },

        _initCurrentLevel: function() {
            this._selectedImages = null;
            var checkPoint = this._checkPointsData.checkPoints[this.$.currentCheckPointLevel];
            if (!checkPoint) {
                return;
            }
            this.$.leftChances = 3;
            this.$.author = checkPoint.author;

            var imagesIds = [];
            while (imagesIds.length < 8) {
                var randomInt = 10 + _.random(1, 6);
                if (imagesIds.length >= 4) {
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
            }).length < 4;
        },

        showToolTip: function() {
            if (this._selectedImages) {
                var self = this;
                _.forEach(this.$.images, function(image) {
                    if (_.indexOf(self._selectedImages, image) === -1) {
                        image.selected = false;
                    } else {
                        image.selected = true;
                    }
                });
                return;
            }
            _.forEach(this.$.images, function(image) {
                image.selected = false;
            });
            var filterFun;
            if (_.random(1) === 0) {
                filterFun = function(image) {
                    return image.id < 20;
                }
            } else {
                filterFun = function(image) {
                    return image.id > 20;
                }
            }
            this._selectedImages = _.chain(this.$.images).filter(filterFun).shuffle().slice(0, 2).forEach(function(image) {
                image.selected = true;
            }).value();
        },

        canConfirm: function() {
            return _.filter(this.$.images, {
                selected: true
            }).length === 4;
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
                    window.plugins && window.plugins.AdMob.createInterstitialView();
                    self.$.leftChances = 3;
                } else {
                    this.$ionicPopup.alert({
                        title: 'Left Chances',
                        template: 'You get only <strong>' + this.$.leftChances + '</strong> chances left for this level. Otherwise you have to see an ad. ^_^'
                    });
                }
            }
        },

        _nextLevel: function() {
            if (this.$.currentCheckPointLevel === this._checkPointsData.checkPoints.length - 1) {
                this.$ionicPopup.alert({
                    title: 'You Win',
                    template: 'Congratulations! You already passed all of the tests in this section and proved you have a really high IQ.'
                })
            }
            this.$.currentCheckPointLevel++;
            if(!this.$.gameStatus[this.$.checkPointType] || this.$.gameStatus[this.$.checkPointType] < this.$.currentCheckPointLevel) {
                this.$.gameStatus[this.$.checkPointType] = this.$.currentCheckPointLevel;
                this.localStorageService.set('gameStatus', angular.toJson(this.$.gameStatus));
            }

            this._initCurrentLevel();
        }
    };
});