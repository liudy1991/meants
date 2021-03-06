'use strict';

namespace application {
  export class CoreRouteConfig {
    public static $inject: Array<string> = [
      '$stateProvider',
      '$urlRouterProvider'
    ];

    constructor($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.rule(function ($injector, $location) {
        let path = $location.path();
        let hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

        if (hasTrailingSlash) {
          // if last character is a slash, return the same url without the slash
          let newPath = path.substr(0, path.length - 1);
          $location.replace().path(newPath);
        }
      });

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'src/client/core/views/home.client.view.html',
          controller: 'HomeController'
        })
        .state('not-found', {
          url: '/not-found',
          templateUrl: 'src/client/core/views/404.client.view.html',
          data: {
            ignoreState: true,
            pageTitle: 'Not-Found'
          }
        })
        .state('bad-request', {
          url: '/bad-request',
          templateUrl: 'src/client/core/views/400.client.view.html',
          data: {
            ignoreState: true,
            pageTitle: 'Bad-Request'
          }
        })
        .state('forbidden', {
          url: '/forbidden',
          templateUrl: 'src/client/core/views/403.client.view.html',
          data: {
            ignoreState: true,
            pageTitle: 'Forbidden'
          }
        });
    }
  }

  angular
    .module('core')
    .config(CoreRouteConfig);
}
