(function () {
'use strict';

angular.module('webApp.Route.Welcome.Controller', [])

.controller('WelcomeController', function () {
  var ctrl = this;
  ctrl.list = ['one', 'two', 'three'];
});

})();