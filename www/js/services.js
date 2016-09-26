angular.module('app.services', [])

		//your_app_name_   >>>>>  app


  .service('AuthService', function () {

    this.saveUser = function (user) {
      window.localStorage.app_user = JSON.stringify(user);
    };

    this.getLoggedUser = function () {

      return (window.localStorage.app_user) ?
        JSON.parse(window.localStorage.app_user) : null;
    };

  })

  .service('PostService', function ($http, $q) {

    this.getUserDetails = function (userId) {
      var dfd = $q.defer();

      $http.get('database.json').success(function (database) {
        //find the user
        var user = _.find(database.users, function (user) { return user._id == userId; });
        dfd.resolve(user);
      });

      return dfd.promise;
    };

    this.getUserPosts = function (userId) {
      var dfd = $q.defer();

      $http.get('database.json').success(function (database) {

        //get user posts
        var userPosts = _.filter(database.posts, function (post) { return post.userId == userId; });
        //sort posts by published date
        var sorted_posts = _.sortBy(userPosts, function (post) { return new Date(post.date); });

        //find the user
        var user = _.find(database.users, function (user) { return user._id == userId; });

        //add user data to posts
        var posts = _.each(sorted_posts.reverse(), function (post) {
          post.user = user;
          return post;
        });

        dfd.resolve(posts);
      });

      return dfd.promise;
    };

    this.getUserLikes = function (userId) {
      var dfd = $q.defer();

      $http.get('database.json').success(function (database) {
        //get user likes
        //we will get all the posts
        var slicedLikes = database.posts.slice(0, 4);
        // var sortedLikes =  _.sortBy(database.posts, function(post){ return new Date(post.date); });
        var sortedLikes = _.sortBy(slicedLikes, function (post) { return new Date(post.date); });

        //add user data to posts
        var likes = _.each(sortedLikes.reverse(), function (post) {
          post.user = _.find(database.users, function (user) { return user._id == post.userId; });
          return post;
        });

        dfd.resolve(likes);

      });

      return dfd.promise;

    };

    this.getFeed = function (page) {

      var pageSize = 5, // set your page size, which is number of records per page
        skip = pageSize * (page - 1),
        totalPosts = 1,
        totalPages = 1,
        dfd = $q.defer();

      $http.get('database.json').success(function (database) {

        totalPosts = database.posts.length;
        totalPages = totalPosts / pageSize;

        var sortedPosts = _.sortBy(database.posts, function (post) { return new Date(post.date); }),
          postsToShow = sortedPosts.slice(skip, skip + pageSize);

        //add user data to posts
        var posts = _.each(postsToShow.reverse(), function (post) {
          post.user = _.find(database.users, function (user) { return user._id == post.userId; });
          return post;
        });

        dfd.resolve({
          posts: posts,
          totalPages: totalPages
        });
      });

      return dfd.promise;
    };
  })