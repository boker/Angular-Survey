myApp.directive('myAccordion', function() {
    return {
        restrict: 'E',
        replace: true,
		template: '<div class="accordion"><h5>Expand</h5>' +
            '<div class="accordion-content" ng-show="open" ng-transclude></div></div>',
        transclude: true,
        scope: {},
        link: function(scope, elm) {
            scope.open = false;
            // assume we have no jQuery.
            angular.element(elm.children()[0]).bind('click', function() {
                scope.$apply('open = !open');
            });
        }
    };
});