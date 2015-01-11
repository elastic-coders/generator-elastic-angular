(function () {
'use strict';

angular.module('webApp.Config.Route', [
  'ui.router'
])

.config(function ($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  }).hashPrefix('!');

  $urlRouterProvider.otherwise('/');
});

})();