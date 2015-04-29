angular.module("main").controller("PostDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.post = $meteor.object(Posts, $stateParams.postsId, false); 

    var converter = new Showdown.converter();
    // $scope.post.content = converter.makeHtml($scope.post.content);
    // console.log($scope.post);

    var subscriptionHandle;
    $meteor.subscribe('posts').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.markdown = function (content) {
    	if(content)
    		return converter.makeHtml(content);
    };

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

}]);