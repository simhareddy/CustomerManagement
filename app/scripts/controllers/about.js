'use strict';

/**
 * @ngdoc function
 * @name customerManagementApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the customerManagementApp
 */
angular.module('customerManagementApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
