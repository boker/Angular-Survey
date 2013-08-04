Angular-Survey
==============

### Please see the note at the bottom before attempting to run any code and hitting your head against the wall... or wishing you had mine to hit.

This is an attempt to teach angular from scratch, a small step at a time, to folks who have probably never worked with any javascript MV* kind of frameworks.
The focus is on learning angular, keeping it simple and not introduce TDD or any other concept etc. which might make for a separate topic.
Once you are through with the tutorial, I would encorage you to go through the angular documentation and many other videos/articles on the web to get a more in-depth understanding of the framework.

A hypothetical Survey application has been taken, and only a very small portion of this will be built.. leaving the rest up to the readers as an excercise.
The tutorial is organized as a set of steps (the next step builds on the previous step) as follows:

###Step 0: 
This is a seed html page using twitter bootstrap. 
The page contains a simple menu, with a static list of surveys. It contains nothing angular, but what the starting page should look like.

###Step 1: 
This step introduces the very minimal angular bootstrapping. It covers the following:
* simple bootstrapping
* controller
* ng-repeat, to create the list of surveys dynamically
* {{}} syntax
* ng-click directive
* ng-href and ng-even directives

###Step 2: 
This provides more structure to the above and introduces the following:
* defining the main application module
* introduces routing and partial pages

###Step 3: 
This introduces a new page for survey edit. In the process it covers the following:
* ng-model
* Forms
* validation
* ng-select

###Step 4: 
This introduces services. In addition it covers the following:
* $http service
* Services, Factories and Providers


###Step 5: This step introduces the concept of promises


###Step 6: This introduces the concept of filters


###Step 7: This shows the development of a custom directive


###Step 8: Takes a further dive into the world of directives and tries to use a JQuery Plugin internally to provide a declarative interface to JQuery


###Browser Compatibility: Please run the examples on chrome only. Also the code will either need to be mapped to a web application or the chrome will need to be started in unsafe mode, to allow for CORS requests..


