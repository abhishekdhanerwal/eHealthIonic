(function() {
    'use strict';

    angular
        .module('app.myDietitian')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.myDietitian',
                config: {
                    url: '/myDietitian',
                    templateUrl: 'app/my-dietitian/myDietitian.html',
                    controller: 'MyDeititianController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
