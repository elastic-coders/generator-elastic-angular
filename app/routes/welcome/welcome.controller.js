(function () {
'use strict';

angular.module('webApp.Route.Welcome.Controller', [])

.controller('WelcomeController', WelcomeController);

WelcomeController.$inject = [];
function WelcomeController() {
  var ctrl = this;
  ctrl.list = ['one', 'two', 'three'];
}

})();