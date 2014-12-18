'use strict';

angular.module('webApp.Route.Welcome', [
  'ui.router',
  'ngLocalize',

  'webApp.Route.Welcome.Controller',
])

.config(function ($stateProvider) {
  $stateProvider.state('welcome', {
    url: '/',
    templateUrl: 'routes/welcome/welcome.template.html',
    controller: 'WelcomeController',
    controllerAs: 'ctrl',
    // TODO this should be abstracted
    resolve: {
      locale: ['locale', function (locale) {
        return locale.ready(['common']).then(function () {
          return locale;
        });
      }],
    },
  });
});