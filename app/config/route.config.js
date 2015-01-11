(function () {
'use strict';

angular.module('webApp.Config.Route', [
  'ui.router'
])
.config(config);

config.$inject = ['$locationProvider', '$urlRouterProvider'];
function config($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  }).hashPrefix('!');

  $urlRouterProvider.otherwise('/');
}

})();