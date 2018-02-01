// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'app.auth',
    'app.logger',
    'app.router',
    'app.layout',
    'app.profile',
    'app.dietitian',
    'app.myDietitian',
    'ionic',
    'nl2br',
    'ngCordova',
    'monospaced.elastic',
    'ngAnimate'])

    .config(['$httpProvider', function($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])

    .run(function($ionicPlatform,$rootScope,$http, $ionicConfig, $timeout, $ionicPopup, $ionicHistory, $state, $location, ConnectivityMonitor, $localStorage) {
        $rootScope.currentUser = null;
        $rootScope.currentState = null;
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState=angular.fromJson(toState.pageType);

            if (toState.$$finishAuthorize) {
                return;
            }

            ConnectivityMonitor.startWatching();

        });

        if($localStorage.__identity != undefined && $localStorage.__identity.token)
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;


        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $ionicPlatform.registerBackButtonAction(function(e) {
            e.preventDefault();
            function showConfirm() {
                var confirmPopup = $ionicPopup.show({
                    title : 'Exit My Society?',
                    template : 'Are you sure you want to exit My Society?',
                    buttons : [{
                        text : 'Cancel',
                        type : ' button-assertive'
                    }, {
                        text : 'OK',
                        type : 'button-positive',
                        onTap : function() {
                            ionic.Platform.exitApp();
                        }
                    }]
                });
            };

            // Is there a page to go back to?
            if ($ionicHistory.backView()) {
                // Go back in history
                console.log('can Go Back '+$location.path());
                $ionicHistory.backView().go();
            } else {
                // This is the last page: Show confirmation popup
                console.log('pa '+$location.path());
                if ($location.path() === "/app/notice" || $location.path() === "/auth/login") {
                    showConfirm();
                } else {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.notice');
                }

            }

            return false;
        }, 101);
    });
