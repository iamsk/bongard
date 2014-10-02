define([
    'require'
], function(
    require
) {
    var module = angular.module('bongard', [
        'ui.router',
        'classy',
        'restangular',
        'gettext'
    ]).config(['$compileProvider',
        function($compileProvider) {
            // please refer to the angular source code about $$SanitizeUriProvider part.
            // we have to rewrite these two white list regex, because the ms-appx is used by Microsoft.
            // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|ms-appx):/);
            // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx):|data:image\//);
        }
    ]).run(function(Restangular) {
        
    }).factory('snsApi', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/index/sns/api');
        });
    });

    require([
        './home/homeCtrl',
        'text!./home/homeTpl.html'
    ], function(
        homeCtrl,
        homeTpl
    ) {
        module.classy.controllers([
            homeCtrl
        ]).config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                // $urlRouterProvider.otherwise('');

                $stateProvider.state('home', {
                    url: '',
                    template: homeTpl
                });
            }
        ]);

        angular.bootstrap(document, ['bongard']);
    });
    return module;
});