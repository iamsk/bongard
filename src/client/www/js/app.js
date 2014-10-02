define([
    'require'
], function(
    require
) {
    var module = angular.module('bongard', [
        'ui.router',
        'classy',
        'restangular',
        'gettext',
        'LocalStorageModule'
    ]).config(['$compileProvider',
        function($compileProvider) {
            // please refer to the angular source code about $$SanitizeUriProvider part.
            // we have to rewrite these two white list regex, because the ms-appx is used by Microsoft.
            // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|ms-appx):/);
            // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx):|data:image\//);
        }
    ]).run(function(Restangular) {

    });

    require([
        './home/homeCtrl',
        'text!./home/homeTpl.html',
        './checkPoint/checkPointCtrl',
        'text!./checkPoint/checkPointTpl.html'
    ], function(
        homeCtrl,
        homeTpl,
        checkPointCtrl,
        checkPointTpl
    ) {
        module.classy.controllers([
            homeCtrl,
            checkPointCtrl
        ]).config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                // $urlRouterProvider.otherwise('');

                $stateProvider.state('home', {
                    url: '/home',
                    template: homeTpl
                }).state('checkPoint', {
                    url: "/checkPoint/:type",
                    template: checkPointTpl
                });;
            }
        ]);

        angular.bootstrap(document, ['bongard']);
    });
    return module;
});