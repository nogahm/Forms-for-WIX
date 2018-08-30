let app = angular.module('Forms', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    // rout to pages
    $routeProvider.when('/formsList', {
        templateUrl: 'components/formsList.html',
        controller: 'formsListController as formsCtrl'
    })
        .when('/formBuilder', {
            templateUrl: 'components/formBuilder.html',
            controller: 'formBuilderController as buildCtrl'
        })
        .when('/submitForm/:formId', {
            templateUrl: 'components/submitForm.html',
            controller: 'submitFormController as submitCtrl'
        })
        .when('/formSubmissions/:formId', {
            templateUrl: 'components/formSubmissions.html',
            controller: 'formSubmissionsController as submissionCtrl'
        })
        .otherwise({ redirectTo: '/formsList' });

}]);