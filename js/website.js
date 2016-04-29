var website = angular.module('website', []);

website.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.toggleModal = function (btnClicked){
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };
  });

website.controller('MessageForm', function ($scope, $http) {
  $scope.master = {};

  $scope.submit = function (message) {
    $scope.master = angular.copy(message);
    $scope.reset();
    console.log($scope.master);
    //http post req
    $http({
        method : "POST",
        url : "http://sidsenkumar11.github.io/",
        param: $scope.master
    }).then(function mySucces(response) {
        alert("success");
    }, function myError(response) {
        alert("testing_error");
    });
  }

  $scope.reset = function () {
    $scope.message = {};
  }
});

website.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title"><i class="fa fa-comment fa-fw"></i> {{ buttonClicked }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });