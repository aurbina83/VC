'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'uiGmapgoogle-maps', 'google.places', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('Register', {
        url:'/register',
        templateUrl:'/templates/register.html',
        controller: 'UserRegistrationController',
        controllerAs: 'vm'
    })
    .state('Login', {
        url: '/login',
        templateUrl: '/templates/login.html',
        controller: 'UserLoginController',
        controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
