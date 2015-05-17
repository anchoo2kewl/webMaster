angular.module("main").controller("PostDetailsCtrl", ['$scope', '$stateParams', '$meteor', 'myService',
  function($scope, $stateParams, $meteor, myService){

    $scope.post = $meteor.object(Posts, {alias: $stateParams.postsAlias}, false); 

    var converter = new Showdown.converter();
    // $scope.post.content = converter.makeHtml($scope.post.content);
    // console.log($scope.post);

    var subscriptionHandle;
    $meteor.subscribe('posts').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.mathSplit = function (content) {
        // console.log(content);
        if(content)
        {

            $scope.post.markdown = converter.makeHtml(content);
            $scope.post.markdown = myService.splitMath($scope.post.markdown);
        }
    };

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

}]);