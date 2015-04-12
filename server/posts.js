Meteor.publish("posts", function (options, searchString) {
  if (searchString == null)
    searchString = '';

  Counts.publish(this, 'numberOfPosts', Posts.find({
    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or:[
      {$and:[
        {"published": true},
        {"published": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]}), { noReady: true });
  return Posts.find({
    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or:[
      {$and:[
        {"published": true},
        {"published": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]} ,options);
});