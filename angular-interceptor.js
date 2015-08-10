(function () {
  'use strict';
  
  var myApp = angular.module('SampleApp', []);
 
  myApp.controller('MyAppController', MyAppCtrl);
  myApp.factory('MyAppFactory', MyAppFctry);
  myApp.factory('MyAppHeaderInterceptor', MyAppHeaderIntr);
  myApp.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.interceptors.push('MyAppHeaderInterceptor'); 
  }]);
  
  MyAppCtrl.$inject = ['MyAppFactory', '$log'];
  MyAppFctry.$inject = ['$http', '$log'];
  MyAppHeaderIntr.$inject = ['$q', '$log'];
  
  
  function MyAppHeaderIntr ($q, $log) {
    return {
      request: function (config) {
        $log.info('Intercepted Object Config :: ', config);
      } 
    };
  }
  
  function MyAppCtrl (MyAppService, $log) {
    MyAppService.getWeather().then(function (response) {
      $log.info('Weather Data :: ', response.main.temp);
    });
      
  }
  
  function MyAppFctry ($http, $log) {
    
    var weatherResponse = {
        getWeather: getWeather
    };
    
    return weatherResponse;
   
    function getWeather () {
     return $http.get('http://api.openweathermap.org/data/2.5/weather?q=Chennai,in').then(function (response) {
        return response.data;
      });    
    }
  }
  
})();
