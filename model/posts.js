Posts = new Mongo.Collection("posts");

Posts.allow({
  insert: function (userId, posts) {
    return userId && posts.owner === userId;
  },
  update: function (userId, posts, fields, modifier) {
    if (userId !== posts.owner)
      return false;

    return true;
  },
  remove: function (userId, posts) {
    if (userId !== posts.owner)
      return false;

    return true;
  }
});