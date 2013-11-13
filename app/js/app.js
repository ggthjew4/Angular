'use strict';

/* App Module */

angular.module('myApps', ['fundCastDirective']);

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/phones', {
            templateUrl: 'partials/phone-list.html',
            controller: PhoneListCtrl
        }).
        when('/phones/:phoneId', {
            templateUrl: 'partials/phone-detail.html',
            controller: PhoneDetailCtrl
        }).
        otherwise({
            redirectTo: '/phones'
        });
    }
]);

angular.module('fundcast', []).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/fundCast/:contentId', {
            templateUrl: 'fundCastPartials/fundCast-detail.html',
            controller: fundCastDetailCtrl
        }).
        otherwise({
            redirectTo: '/phones'
        });
    }
]);

angular.module('fundCastDirective', [])
    .directive('fundooRating', function() {
        return {
            restrict: 'EACM',
            template: '<object id="myExperience928199562001" class="BrightcoveExperience">' + '<param name="bgcolor" value="#FFFFFF" />' + '<param name="width" value="480" />' + '<param name="height" value="270" />' + '<param name="playerID" value="2238117460001" />' + '<param name="isVid" value="true" />' + '<param name="isUI" value="true" />' + '<param name="dynamicStreaming" value="true" />' + '<param name="@videoPlayer" value="{{test}}"/>' + '<param name="includeAPI" value="true" />' + '</object>',
            replace: true,
            link: function(scope, elem, attrs) {
                var mainScope = angular.element('div.clean').scope();
                console.log('TEST!!!%o', mainScope.mainFundCast);
                //scope.test = mainScope.mainFundCast.videoId;
            }
        }
    });



// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.directives']);

/* Controllers */

function stageController($scope) {

    $scope.title = 'Planet Shop';

    $scope.items = [{
        title: 'Moon',
        price: '9.99€',
        src: 'http://brunoscopelliti.com/demo-resources/moon.png'
    }, {
        title: 'Sun',
        price: '29.99€',
        src: 'http://brunoscopelliti.com/demo-resources/sun.png'
    }, {
        title: 'Earth',
        price: '19.99€',
        src: 'http://brunoscopelliti.com/demo-resources/earth.png'
    }, {
        title: 'Pluton',
        price: '5.50€',
        src: 'http://brunoscopelliti.com/demo-resources/pluton.png'
    }, {
        title: 'Mars',
        price: '24.00€',
        src: 'http://brunoscopelliti.com/demo-resources/mars.png'
    }];

    $scope.cartItems = [];

    $scope.buyItem = function(title, price) {
        var objAdded = {
            title: title,
            price: price
        };
        $scope.cartItems.push(objAdded);
    }

}


/* Directives */

angular.module('myApp.directives', []).

directive('itemCard', function() {
    // return the directive definition object 
    return {
        scope: {
            title: '@itemTitle',
            price: '@itemPrice',
            src: '@itemSrc'
        },
        controller: function($scope, $element, $attrs, $location) {
            $scope.addToCart = function(t, p) {
                var mainScope = angular.element("#main").scope();
                console.log('tet %O', mainScope);
                mainScope.buyItem(t, p);
                return false;
            };
        },
        replace: true,
        template: '<div class="item-int"><h3>{{title}}</h3><div class="data"><img src="{{src}}" title="{{title}}"><span class="left">price: {{price}}</span><span class="right"><a ng-click="addToCart(title, price);">Add to cart</a></span></div></div>'
    };
}).directive('shoppingCart', function() {
    return {
        replace: true,
        restrict: 'EACM',
        template: '<div class="sCart"><img src="http://brunoscopelliti.com/demo-resources/cart.png" alt="Items: "/> <span class="quantity">{{cartItems.length}}</span></div>'
    };
});
