'use strict';
describe('customerManagementApp', function () {

  // load the controller's module
  beforeEach(module('customerManagementApp', ['ngRoute', 'angularUtils.directives.dirPagination']));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('getDataController', {
      $scope: scope
    });
  }));

});


describe('Controller: customerAppController', function () {

  // load the controller's module
  beforeEach(module('customerManagementApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('customerAppController', {
      $scope: scope
    });
  }));

  it('should attach a list of customers to the scope', function () {
    expect(scope.customers.length).toBe(50);
  });
});
