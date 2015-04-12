angular.module("main").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/posts");
    }
  });
}]);

angular.module("main").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('posts', {
          url: '/posts',
          templateUrl: 'client/posts/views/posts-list.ng.html',
          controller: 'PostsListCtrl'
        })
        .state('postsDetails', {
          url: '/posts/:postsId',
          templateUrl: 'client/posts/views/post-details.ng.html',
          controller: 'PostDetailsCtrl',
            resolve: {
              "currentUser": ["$meteor", function($meteor){
                return $meteor.requireUser();
              }]
            }
        });

        $urlRouterProvider.otherwise("/posts");
  }]);