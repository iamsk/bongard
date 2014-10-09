define([
], function(
) {
    var PRE_FIX = 'bgImagesContainer';

    function imagesContainer($parse, $timeout) {
        return {
            restrict: 'A',

            link: function($scope, $element, $attrs, $ctrl) {
                $scope.$watch($attrs[PRE_FIX], function(newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    $timeout(function() {
                        angular.forEach($element.find('button'), function(elem) {
                            elem.style.height = elem.offsetWidth + 'px';
                        });
                    });
                });
            }
        };
    }
    var directive = {};
    directive[PRE_FIX] = ['$parse', '$timeout', imagesContainer];
    return directive;
});