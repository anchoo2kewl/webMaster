angular.module("main").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

angular.module("main").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('manage', {
          url: '/manage',
          templateUrl: 'client/posts/views/posts-list.ng.html',
          controller: 'PostsListCtrl'
        })
        .state('new', {
          url: '/new',
          templateUrl: 'client/posts/views/posts-new.ng.html',
          controller: 'PostsListCtrl'
        })
        .state('home', {
          url: '/',
          templateUrl: 'client/posts/views/pl-raw.ng.html',
          controller: 'PostsListCtrl'
        })
        .state('PostDetails', {
          url: '/posts/:postsId',
          templateUrl: 'client/posts/views/post-details.ng.html',
          controller: 'PostDetailsCtrl'
        })
        .state('postsEdit', {
          url: '/edit/:postsId',
          templateUrl: 'client/posts/views/post-edit.ng.html',
          controller: 'PostEditCtrl',
            resolve: {
              "currentUser": ["$meteor", function($meteor){
                return $meteor.requireUser();
              }]
            }
        });

        $urlRouterProvider.otherwise("/");
  }]);