(function () {
  'use strict';
  describe('customerManagementApp', function () {

    // load the controller's module
    beforeEach(module('customerManagementApp', ['ngRoute', 'angularUtils.directives.dirPagination']));

    var MainCtrl, $http,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$http_) {
      scope = $rootScope.$new();
      MainCtrl = $controller('getDataController', {
        $scope: scope
      });
      $http = _$http_;
    }));

    it('Testing customer data', function () {

      expect(scope.customers.length).toBe('50');
      /*var data;
       $http
       .get('/customers/')
       .then(function (response) {
       data = response.customers;
       //console.log('inside success');
       });
       expect(data).toBeNull();*/

    });
  });


  /*describe('Controller: customerAppController', function () {

   // load the controller's module
   beforeEach(module('customerManagementApp'));

   var customerAppController,getDataController,
   scope;
   var $http;

   // Initialize the controller and a mock scope
   beforeEach(inject(function ($controller, $rootScope) {
   scope = $rootScope.$new();
   customerAppController = $controller('customerAppController', {
   $scope: scope
   });
   }));

   beforeEach(inject(function ($controller, $rootScope , _$http_) {
   scope = $rootScope.$new();
   getDataController = $controller('getDataController', {
   $scope: scope
   });
   $http = _$http_;
   }));

   it('Testing customer data', function () {

   var data;
   $http.get('/customers/')
   .success(function (response) {
   data = response.customers;
   //console.log('inside success');
   });
   expect(data).toBe();

   });
   });*/

}());
