angular.module("main").controller("PostEditCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){


    // $scope.post.created = new Date();
    // $scope.post.updated = new Date();
    $scope.post = $meteor.object(Posts, $stateParams.postsId, false); 

    var subscriptionHandle;
    $meteor.subscribe('posts').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.save = function() {
      $scope.post.created = new Date();
      $scope.post.updated = new Date();

      console.log($scope.post.created);
      console.log($scope.post);
    $scope.post.save().then(function(numberOfDocs){
      console.log('save success doc affected ', numberOfDocs);
      }, function(error){
        console.log('save error', error);
      });
    };

    $scope.reset = function() {
      $scope.post.reset();
    };

    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });

}]);