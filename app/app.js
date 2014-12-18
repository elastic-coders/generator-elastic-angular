'use strict';

angular.module('webApp', [
  'ngAnimate',
  'ngSanitize',
  // Configuration
  'webApp.Config.Route',
  'webApp.Config.Localization',
  // Routes
  'webApp.Route.Welcome',
]);
