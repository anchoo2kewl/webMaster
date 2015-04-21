angular.module("main").controller("PostDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.post = $meteor.object(Posts, $stateParams.postsId, false); 

    var subscriptionHandle;
    $meteor.subscribe('posts').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

}]);