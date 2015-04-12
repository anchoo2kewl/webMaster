Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {

  angular.module('main',['angular-meteor', 'ui.router']);

  angular.module("main").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('posts', {
          url: '/posts',
          templateUrl: 'posts-list.ng.html',
          controller: 'PostsListCtrl'
        })
        .state('postsDetails', {
          url: '/posts/:postsId',
          templateUrl: 'post-details.ng.html',
          controller: 'PostDetailsCtrl'
        });

        $urlRouterProvider.otherwise("/posts");
  }]);

   

  angular.module("main").controller("PostsListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.posts = $meteor.collection(Posts);
      $scope.remove = function(post){
        $scope.posts.remove(post);
      };

      $scope.removeAll = function(){
        $scope.posts.remove();
      };

    }]);

  angular.module("main").controller("PostDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){


      $scope.post = $meteor.object(Posts, $stateParams.postsId, false);

      $scope.save = function() {
      $scope.post.save().then(function(numberOfDocs){
        console.log('save success doc affected ', numberOfDocs);
        }, function(error){
          console.log('save error', error);
        });
      };

      $scope.reset = function() {
        $scope.post.reset();
      };

  }]);
}