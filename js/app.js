/**
 * Main AngularJS Web Application
 */
angular.module('HashBangURLs', ['ngRoute']).config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

angular.module('HTML5ModeURLs', ['ngRoute']).config(['$locationProvider', function($location) {
    $location.html5Mode(true);
}]);

angular.module('ex-uibootstrap', ['ui.bootstrap']);

angular.module('ex-formly', ['formly', 'formlyBootstrap'],
  function config(formlyConfigProvider) {
    // set templates here
    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapLabel',
      template: [
        '<label for="{{::id}}" class="col-sm-2 control-label">',
          '{{to.label}} {{to.required ? "*" : ""}}',
        '</label>',
        '<div class="col-sm-8">',
          '<formly-transclude></formly-transclude>',
        '</div>'
      ].join(' ')
    });
    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapCheckbox',
      template: [
        '<div class="col-sm-offset-2 col-sm-8">',
          '<formly-transclude></formly-transclude>',
        '</div>'
      ].join(' ')
    });
    formlyConfigProvider.setType({name: 'horizontalInput', extends: 'input',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });
    formlyConfigProvider.setType({name: 'horizontalCheckbox', extends: 'checkbox',
      wrapper: ['horizontalBootstrapCheckbox', 'bootstrapHasError']
    });
});

// Choose to inject either HashBangs or HTML5 mode, your preference.
var app = angular.module('app', ['HashBangURLs', 'ngAnimate',
     'ex-uibootstrap', 'ex-formly'],
    function ($routeProvider, $locationProvider, $httpProvider) {;}
)

app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

app.config([ '$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: '/home.html', controller:  'ViewHomeController'})
    .when('/about', {templateUrl: '/about.html', controller:  'ViewAboutController'})
    .when('/contact', {templateUrl: '/contact.html'})
    .otherwise({redirectTo: '/'});
}]);

app.directive("commonFooter", function () {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        templateUrl: "footer.html"
    };
});

app.directive("commonHeader", function () {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        templateUrl: "header.html",
        controller:  'HeaderCtrl'
    };
});

app.controller("HeaderCtrl", function ($scope, $location) {
    console.log('HeaderCtrl working');
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    var title = $scope.title = '数据库管理';
});

app.controller("AppCtrl", function ($scope, $log, $q, $timeout) {
    console.log("AppCtrl working");
});

app.controller("ViewHomeController", function ($scope, $uibModal) {
    console.log('ViewHomeController working');
    $scope.myInterval = 5000;
    var title = $scope.title = '数据库管理';
});

// 菜单管理
app.controller("FunTreeListCtrl", function($scope,$uibModal, $log) {
    $scope.groups = [
        {   title: '连接管理',
            content: '\
            <button type="button" class="btn btn-default btn-sm"\
                ng-click="newConnect(this)">新建连接</button><br>\
            <button type="button" class="btn btn-sm"\
                ng-click="editConnect(this)">编辑连接</button>\
            '
        }
    ];
    $scope.items = ['SQL Server', 'Oracle', 'Other'];
    $scope.animationsEnabled = true;
    $scope.newConnect = function(obj) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'connModal.html',
            controller: 'ModalInstanceCtrl as vm',
            size: "",
            resolve: {
                items: function () {return $scope.items;}
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.addItem = function() {};
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    console.log('FunTreeListCtrl working');
});

app.controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
        { label:'查询1', link: '/tab-grid.html' },
        { label:'查询2', link: '/tab-form.html' }
    ];

    $scope.switchMe = function(target) {
          //  debugger;
    };

    $scope.model = {name: 'Tabs'};
});


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $Modal service used above.
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    var vm = this;
    vm.env = {angularVersion: angular.version.full};
    vm.fields = [
        {
            key: 'name', type: 'horizontalInput',
            templateOptions: {
                label: '名称',  placeholder: '此连接名称'
            }
        } ,{
            key: 'host', type: 'horizontalInput',
            templateOptions: {
                label: '主机名',  placeholder: 'host/server, ip或者域名'
            }
        } ,{
            key: 'username', type: 'horizontalInput',
            templateOptions: {
                label: '用户名',  placeholder: '登录名'
            }
        } ,{
            key: 'password', type: 'horizontalInput',
            templateOptions: {
                type: "password", label: '密码',  placeholder: ''
            }
        } ,{
            key: 'options', type: 'horizontalInput',
            templateOptions: {
                label: '选项',  placeholder: '数据库连接选项，'
            }
        }
    ];

    vm.onSubmit = function() {
        $uibModalInstance.close($scope.selected.item);
    }
    vm.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
