angular.module('app.controllers', ['ionic', 'ngCordova'])


  	//카테고리 부분
.controller('page2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

   //SHOP 부분
.controller('sHOPCtrl',  function ($scope, $ionicModal, $ionicPopup, $cordovaInAppBrowser, $interval, $ionicSlideBoxDelegate, PostService) {

 
    // QR 부분
    $ionicModal.fromTemplateUrl('templates/tabbuttons/qrbutton.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // sHOP부분
    $ionicModal.fromTemplateUrl('templates/cart/shopcart.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });
  




   		//메인 처음 슬라이드


   	  $scope.data = {};
    $scope.data.slides = [{
      imageURL: "img/example/exam1.jpg",
      avatar: "img/example/exam1.jpg",
      title: "Slide 1",
      data: "Slide 1 Content",
      color: "lightyellow"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 2",
      data: "Slide 2 Content",
      color: "lightpink"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 3",
      data: "Slide 3 Content",
      color: "grey"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 4",
      data: "Slide 4 Content",
      color: "orange"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 5",
      data: "Slide 5 Content",
      color: "turquoise"
    }, ];


   	//마지막 인		 최종 저장 하고 에러남 여기서 오작

  $scope.posts = [];
  $scope.page = 1;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    PostService.getFeed(1)
    .then(function(data){
      $scope.totalPages = data.totalPages;
      $scope.posts = data.posts;

      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.getNewData = function() {
    //do something to load your new data here
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadMoreData = function(){
    $scope.page += 1;

    PostService.getFeed($scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.totalPages;
      $scope.posts = $scope.posts.concat(data.posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    return $scope.totalPages > $scope.page;
  };

  $scope.doRefresh();






   })


.controller('customersCtrl', function($scope, $http,$window){

  $http.get("http://ec2-52-78-130-219.ap-northeast-2.compute.amazonaws.com/query.php")
    .success(function (response) {$scope.names = response.records;});

})


//QR code part!
.controller('QRController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {

    var vm = this;

    vm.scan = function(){
        $ionicPlatform.ready(function() {
            $cordovaBarcodeScanner
            .scan()
            .then(function(result) {
                // Success! Barcode data is here
                vm.scanResults = "We got a barcoden" +
                "Result: " + result.text + "n" +
                "Format: " + result.format + "n" +
                "Cancelled: " + result.cancelled;
            }, function(error) {
                // An error occurred
                vm.scanResults = 'Error: ' + error;
            });
        });
    };
    
    vm.scanResults = '';
})



   	//여기도 추가


.controller('ProductCtrl', function($scope, $stateParams, ShopService, $ionicPopup, $ionicLoading) {
  var productId = $stateParams.productId;

  ShopService.getProduct(productId).then(function(product){
    $scope.product = product;
  });

  // show add to cart popup on button click
  $scope.showAddToCartPopup = function(product) {
    $scope.data = {};
    $scope.data.product = product;
    $scope.data.productOption = 1;
    $scope.data.productQuantity = 1;

    var myPopup = $ionicPopup.show({
      cssClass: 'add-to-cart-popup',
      templateUrl: 'views/app/shop/partials/add-to-cart-popup.html',
      title: 'Add to Cart',
      scope: $scope,
      buttons: [
        { text: '', type: 'close-popup ion-ios-close-outline' },
        {
          text: 'Add to cart',
          onTap: function(e) {
            return $scope.data;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      if(res)
      {
        $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Adding to cart</p>', duration: 1000 });
        ShopService.addProductToCart(res.product);
        console.log('Item added to cart!', res);
      }
      else {
        console.log('Popup closed');
      }
    });
  };
})





   	//추가 아직 잘 몰

.controller('ProfileCtrl', function($scope, $stateParams, PostService, $ionicHistory, $state, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var userId = $stateParams.userId;

  $scope.myProfile = $scope.loggedUser._id == userId;
  $scope.posts = [];
  $scope.likes = [];
  $scope.user = {};

  PostService.getUserPosts(userId).then(function(data){
    $scope.posts = data;
  });

  PostService.getUserDetails(userId).then(function(data){
    $scope.user = data;
  });

  PostService.getUserLikes(userId).then(function(data){
    $scope.likes = data;
  });

  $scope.getUserLikes = function(userId){
    //we need to do this in order to prevent the back to change
    $ionicHistory.currentView($ionicHistory.backView());
    $ionicHistory.nextViewOptions({ disableAnimate: true });

    $state.go('app.profile.likes', {userId: userId});
  };

  $scope.getUserPosts = function(userId){
    //we need to do this in order to prevent the back to change
    $ionicHistory.currentView($ionicHistory.backView());
    $ionicHistory.nextViewOptions({ disableAnimate: true });

    $state.go('app.profile.posts', {userId: userId});
  };

})


 .controller('nuriCtrl', function ($scope, $window) {
    $scope.demo = 'nuri'


    // 기존에 있는 리스트를 모두 제거해서 다시 보여주는 방법으로 가야함
    $scope.setPlatform = function (p) {
      // document.body.classList.remove('platform-nuri')
      // document.body.classList.remove('platform-tool')
      // document.body.classList.remove('platform-mybox')
      // document.body.classList.add('platform-' + p)
      $scope.demo = p;
      if($scope.demo == "nuri"){
          $window.alert("누리박스");
      }
      else if($scope.demo == "tool"){
          $window.alert("보유교구");
      }
      else{
          $window.alert("마이상자");
      }
    }
    // $scope.$on('$ionicView.loaded', function () {
    //   Users.retrieveAllUserList(function () {
    //     $scope.users = Users.all();
    //     $scope.$apply();
    //   });
    // });




    // 이 내용을 DB Hadler에서 추가해야함  리스트 먼저 만들고 사전 만들어서 사전을 초기화하면서 리스트에 푸쉬하는 방식

    $scope.data = {};
    $scope.data.slides = [{
      imageURL: "img/example/exam1.jpg",
      avatar: "img/example/exam1.jpg",
      title: "Slide 1",
      data: "Slide 1 Content",
      color: "lightyellow"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 2",
      data: "Slide 2 Content",
      color: "lightpink"
    }, {
      imageURL: "img/example/exam1.jpg",
      title: "Slide 3",
      data: "Slide 3 Content",
      color: "grey"
    },];





  })



   //누리박스 부분
.controller('page4Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      //로그인 부분
.controller('page5Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicModal) {


}])




