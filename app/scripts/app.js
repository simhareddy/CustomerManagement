'use strict';

/**
 * @ngdoc overview
 * @name customerManagementApp
 * @description
 * # customerManagementApp
 *
 * Main module of the application.
 */
var customerManagementApp = angular
  .module('customerManagementApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

customerManagementApp.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/cardView.html',
    controller: 'customerAppController'
  }).when('/listView', {
    templateUrl: 'views/listView.html',
    controller: 'customerAppController'

  }).when('/addCustomer', {
    templateUrl: 'views/addCustomer.html',
    controller: 'customerAppController'
  }).otherwise({
    redirectTo: '/'
  });
});
// Controller for get the data from json file
customerManagementApp.controller('getDataController', function ($rootScope, $scope, $http) {

  $http.get('/customers/')
    .success(function (data) {
      $rootScope.customers = data.customers;
      console.log('inside success');
    });
});

// Controller for Add, Modify and Delete functionalities
customerManagementApp.controller('customerAppController', function ($rootScope, $scope, $filter) {
  // Creating a pagination object with default values
  $scope.pagination = {
    perPage: 12,
    perPageOptions: [12, 24, 50],
    currentPage: 1,
    total: 0
  };
  $scope.customers = $rootScope.customers;

  $rootScope.filterChange = function () {
    if ($scope.customerName.Name.trim().length > 0) {
      $scope.visibleCustomers = $filter('filter')($scope.customers, $scope.customerName).length;

      if ($scope.visibleCustomers > $scope.pagination.perPage) {
        $scope.visibleCustomers = $scope.noOfCustomers();
      }
    } else {
      $scope.visibleCustomers = $scope.noOfCustomers();
    }
  };

  $scope.noOfCustomers = function () {
    if ($scope.pagination.currentPage !== $scope.pagination.total) {
      this.visibleCustomers = ($scope.pagination.currentPage * $scope.pagination.perPage);
    }
    else {
      this.visibleCustomers = $scope.customers.length;
    }

    return this.visibleCustomers;
  };

  $scope.pagination.total = Math.ceil($scope.customers.length / $scope.pagination.perPage);

  $scope.visibleCustomers = $scope.noOfCustomers();

  // When page changed visible customers should be update
  $scope.pageChanged = function (newPage) {

    $scope.pagination.currentPage = newPage;

    $scope.visibleCustomers = $scope.noOfCustomers();
  };

  // Delete customer
  $scope.delete = function (customer) {

    $scope.customers.splice($scope.customers.indexOf(customer), 1);

    $scope.visibleCustomers = $scope.noOfCustomers();
  };

  // Add customer
  $scope.addCustomer = function () {

    var id = ($rootScope.customers[$rootScope.customers.length - 1].id + 1);
    var customerDetails = {
      'id': id,
      'Name': $scope.customer.Name,
      'Location': $scope.customer.Location,
      'orders': $scope.customer.orders,
      'image': $scope.customer.image
    };
    $rootScope.customers.push(customerDetails);

    // console.log($rootScope.customers);
    $scope.customer.Name = '';
    $scope.customer.Location = '';
    $scope.customer.orders = '';
    $scope.customer.image = '';

    document.getElementById('addCustomer').innerHTML = 'Hi, Customer added successfully. ';

  };

  $scope.model = {
    selected: {}
  };
  // Template change functionality for edit and display
  $scope.getTemplate = function (customer) {
    if ($scope.model.selected.id === undefined) {
      return 'display';
    }
    else if (customer.id === $scope.model.selected.id) {
      return 'edit';
    }
    else {
      return 'display';
    }
  };

// For edit customer
  $scope.editCustomer = function (customer) {
    $scope.model.selected = angular.copy(customer);
    $scope.getTemplate(customer);
  };
// Update the customer
  $scope.saveCustomer = function (customer) {
    // $scope.model.selected = angular.copy(customer);
    /*var data = $scope.customers;
     var idx = data.map(function (d) {
     return d['id'];
     }).indexOf(customer.id);*/
    var index = $scope.customers.indexOf(customer);
    $scope.customers[index] = angular.copy(customer);
    $scope.reset();
  };
// Reset the model object
  $scope.reset = function () {
    $scope.model.selected = {};
  };

});
