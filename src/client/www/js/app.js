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
        'LocalStorageModule',
        'ionic'
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
        'text!./tabsTpl.html',
        'text!./aboutTpl.html',
        'text!./contactTpl.html',

        './home/homeCtrl',
        'text!./home/homeTpl.html',
        './checkPoint/checkPointCtrl',
        'text!./checkPoint/checkPointTpl.html',
        './archieved/archievedCtrl',
        'text!./archieved/archievedTpl.html'
    ], function(
        tabsTpl,
        aboutTpl,
        contactTpl,

        homeCtrl,
        homeTpl,
        checkPointCtrl,
        checkPointTpl,
        archievedCtrl,
        archievedTpl
    ) {
        module.classy.controllers([
            homeCtrl,
            checkPointCtrl,
            archievedCtrl
        ]).config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/home');

                $stateProvider.state('tabs', {
                    abstract: true,
                    template: tabsTpl
                }).state('tabs.home', {
                    url: '/home',
                    views: {
                        home: {
                            template: homeTpl
                        }
                    }
                }).state('tabs.checkPoint', {
                    url: "/checkPoint/:type",
                    views: {
                        home: {
                            template: checkPointTpl
                        }
                    }
                }).state('tabs.archieved', {
                    url: "/archieved:type/",
                    views: {
                        home: {
                            template: archievedTpl
                        }
                    }
                }).state('tabs.about', {
                    url: '/about',
                    views: {
                        about: {
                            template: aboutTpl
                        }
                    }
                }).state('tabs.contact', {
                    url: '/contact',
                    views: {
                        contact: {
                            template: contactTpl
                        }
                    }
                });
            }
        ]);

        angular.bootstrap(document, ['bongard']);
    });
    return module;
});