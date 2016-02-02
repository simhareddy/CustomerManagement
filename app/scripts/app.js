'use strict';

/**
 * @ngdoc overview
 * @name customerManagementApp
 * @description
 * # customerManagementApp
 *
 * Main module of the application.
 */
var app = angular
  .module('customerManagementApp', ['ngRoute', 'angularUtils.directives.dirPagination']);
  
  app.config(function ($routeProvider) {
    $routeProvider
      $routeProvider.
            when('/', {
                templateUrl: 'views/cardView.html',
                controller: 'customerAppController'
            }).
            when('/listView', {
                templateUrl: 'views/listView.html',
                controller    :'customerAppController'

            }).
            when('/addCustomer', {
                templateUrl: 'views/addCustomer.html',
                controller: 'customerAppController'
            }).
            otherwise({
                redirectTo: '/'
            });
  });
  
app.controller('getDataController', function($rootScope,$scope, $http){

   $http.get('/customers/')
        .success(function (data) {
           $rootScope.customers = data.customers;
		   console.log('inside success');
        });
}); 
 
app.controller('customerAppController', function($rootScope,$scope){
	
	$scope.pagination = {
		perPage: 12,
		perPageOptions: [12, 24, 50],
		currentPage: 1,
		total: 0
	};
	
	$scope.customers= $rootScope.customers;
	$scope.pagination.total = Math.ceil($scope.customers.length/$scope.pagination.perPage);
	
	if($scope.pagination.currentPage != $scope.pagination.total)
		this.visibleCustomers = ($scope.pagination.currentPage * $scope.pagination.perPage);
	else
		this.visibleCustomers = $scope.customers.length;
	
	$scope.visibleCustomers = this.visibleCustomers ;
		
	$scope.pageChanged = function(newPage){
  
		$scope.pagination.currentPage = newPage;
		
		if($scope.pagination.currentPage != $scope.pagination.total)
			this.visibleCustomers = ($scope.pagination.currentPage * $scope.pagination.perPage);
		else
			this.visibleCustomers = $scope.customers.length;
		$scope.visibleCustomers = this.visibleCustomers ;
	};
		
	
	$scope.delete = function(index){
        
        $scope.customers.splice( $scope.customers.indexOf(index),1);
	
		if($scope.pagination.currentPage != $scope.pagination.total)
			this.visibleCustomers = ($scope.pagination.currentPage * $scope.pagination.perPage);
		else
			this.visibleCustomers = $scope.customers.length;
	
		$scope.visibleCustomers = this.visibleCustomers ;
    };
	
	
	
	$scope.addCustomer = function() {
	
	var id = ($rootScope.customers[$rootScope.customers.length-1].id + 1);
    var customerDetails = {'id': id,'Name': $scope.customer.name, 'Location': $scope.customer.location, 'orders': $scope.customer.orders, 'image':'/images/User.jpg'};
    
	$rootScope.customers.push(customerDetails);
    
	console.log($rootScope.customers);
    $scope.customer.name= "";
    $scope.customer.location = "";
    $scope.customer.orders= "";
	
	document.getElementById("addCustomer").innerHTML = 'Hi, Customer added successfully. ';
    /* var messageElement = angular.element( document.querySelector( '#addCustomer' ) );
    messageElement.append('Hi, Customer added successfully. '); */
  };
  
  $scope.model = {
	  selected: {}
  };
  
  $scope.getTemplate = function (customer) {
	 // console.log('Inside getTemplate: '+customer.Name);
	  //console.log('Inside getTemplate selected: '+$scope.model.selected.Name);
	  //console.log($scope.model.selected.id);
	  //console.log(customer.id);
		if($scope.model.selected.id == undefined){
		  return 'display';
		}		
        else if (customer.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };
	
	$scope.editCustomer = function (customer) {
		console.log('inside edit method');
		//console.log(customer);
        $scope.model.selected = angular.copy(customer);
		$scope.getTemplate(customer);
    };

    $scope.saveCustomer = function (customer) {
        console.log("Saving customer"+customer.id);
		var data = $scope.customers;
		console.log(data);
		var idx = data.map(function(d) { return d['id']; }).indexOf(customer.id);
		//var idx = $scope.customers.indexOf();
		console.log('index::'+idx);
		var customerDetails = {'id': customer.id,'Name': $scope.model.selected.customer.Name, 'Location': $scope.model.selected.customer.Location, 'orders': $scope.model.selected.customer.orders, 'image':'/images/User.jpg'};
		$scope.model.selected = customerDetails;
        $scope.customers[idx] = angular.copy($scope.model.selected);
		console.log($scope.customers[idx]);
		console.log(angular.copy($scope.model.selected));
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };
  
});