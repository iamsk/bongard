require.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',

        'lodash': '../bower_components/lodash/dist/lodash.min',
        'moment': '../bower_components/moment/min/moment.min',
        'angular': '../bower_components/angular/angular',
        'angular.ui.router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular.classy': './lib/classy',
        'restangular': '../bower_components/restangular/dist/restangular.min',
        'ionic': '../bower_components/ionic/release/js/ionic.min',
        'angular.ionic': '../bower_components/ionic/release/js/ionic-angular.min',
        'angular.animate': '../bower_components/angular-animate/angular-animate.min',
        'angular.santitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'angular.gettext': '../bower_components/angular-gettext/dist/angular-gettext.min',
        'angulartics.ga': '../bower_components/angulartics/dist/angulartics-ga.min',
        'angular.local.storage': '../bower_components/angular-local-storage/angular-local-storage.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular.ui.router': ['angular'],
        'angular.classy': ['angular'],
        'restangular': ['angular', 'lodash'],
        'angular.ionic': ['angular', 'ionic'],
        'angular.santitize': ['angular'],
        'angular.animate': ['angular'],
        'angular.gettext': ['angular'],
        'angulartics.ga': ['angulartics'],
        'angular.local.storage': ['angular']
    }
});

require(["bootstrap"]);
