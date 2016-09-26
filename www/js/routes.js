angular.module('app.routes', ['ionic','ngCordova'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })



  .state('tabsController.sHOP', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/sHOP.html',
        controller: 'sHOPCtrl'
      }
    }
  })
  

  .state('tabsController.page2', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/page2.html',
        controller: 'page2Ctrl'
      }
    }
  })
 

  .state('tabsController.page4', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/page4.html',
        controller: 'page4Ctrl'
      }
    }
  })
 .state('tabsController.nuribox',{
  url:'/nuribox',
  views: {
    'tab3':{
    templateUrl:'templates/nuribox/nuribox.html',
    controller: 'nuriCtrl'
      }
  }
})
 

 .state('tabsController.page5', {
   url: '/page5',
   views: {
     'tab4': {
       templateUrl: 'templates/page5.html',
       controller: 'page5Ctrl'
      }
    }
  })

 .state('page', {
   url: '/page6',
   templateUrl: 'templates/page.html',
   controller: 'pageCtrl'
  })









$urlRouterProvider.otherwise('/page1/page3')


  

});




  