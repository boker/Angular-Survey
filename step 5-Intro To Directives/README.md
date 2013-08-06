##Step 5: Intro to Directives

In this step we've added the functionality to expand a particular row of a survey to see more details like categoryId and number of particpants.
Let's jump into what we've done

* Meet custom directive

First let's look at what we've done in the surveylist.html file

    <td>
        {{survey.name}}
        <my-accordion>
            <div>Category Id: {{survey.categoryid}}</div>
            <div>No of Participants: {{survey.numberOfParticpants}}</div>                        
        </my-accordion>
    </td>

Instead of just displaying the survey's name, we've included "<my-accordian>" element. Remember earlier we said that directives are an angular way to extend the html. 
Basically when angular hits this element, it looks up the list of directives registered with it. To make things simple to understand, angular then calls the link function of the directive.
Let's look at how this directive is declared and implemented.

    myApp.directive('myAccordion', [function() {
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
    }]);

The following are the explaination of the elements of directive declaration:
(for full syntax refer to : )
  1. The first parameter is the name of the directive being declared.
  2. The second parameter is an array (familiar now?), whose last parameter is the directive function.
     This function can either return a function or an object.
  3. Let's look at the object being returned first
     1. restrict: 'E' - This is a way to telling angular that this directive can only be used as an element. Other options are A and C for attribute and class.
     2. replace: true - By this we are indicating that the element should be replaced totally by our template.
     3. template: '...' - This is the html content which replaces the <my-accordian> element.
     4. transclude: true - When this is set to true, then the inner content of the directive is replaced at the position indicated by "ng-transclude" in the template.
        So in this case the content:

          <div>Category Id: {{survey.categoryid}}</div>
          <div>No of Participants: {{survey.numberOfParticpants}}</div>                        

    forms the inner content of 

        <div class="accordion-content" ng-show="open" ng-transclude>
        
    5. scope: {} - this is a bit tricky. This property can be set to true/false and an object. If it is set to true, then a new scope inherited by the parent scope is created for this directive.
      If this is false, then the scope passed to the link function is the parent scope.
      If an object is assigned ot this, then a new scope which doesn't enherit from any other scope is created, called isolate scope. An this is passed to the link function.
      We have created an isolate scope for our case, since we do not want to polute the parent scope.. nor are we interested in methods that may have been assigned on the parent scope.
    6. link: function()... - 90% of the time, we will be working with the link function.
        This function is invoked by angular runtime, when it encounters the directive. While doing so, angular passes us a few important parameters like scope and element.
        The elm parameter actually refers to the element and is similar to JQuery's representation of an html element.
        Inside this function, we are declaring a scope property called "open" and on the click of the <h5> element we are simply toggling the open property to true/false.
    7. scope.$apply('open = !open') - We need to wrap our changes inside a scope.$apply call, at any place that is not an angular code structure. In this case we are updating the value of open, inside a sort of JQuery event handler, which is not monitored by angular.
       Doing this notifies angular of the change and it then refreshes the view.
       
In multiple places I've refered to JQuery. If the JQuery library is loaded before the angular library, then the "elm" parameter being passed is wrapped in a JQuery object. If not then it is wrapped in a JQLite object.
JQLite is a lightweigth equivalent of the angular library with limited API.
    
    
