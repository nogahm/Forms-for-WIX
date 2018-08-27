let app = angular.module('Forms', ["ngRoute"]);

// app.config(['ngDialogProvider', function (ngDialogProvider) {
//     ngDialogProvider.setDefaults({
//         className: 'ngdialog-theme-default',
//         plain: true,
//         showClose: true,
//         closeByDocument: true,
//         closeByEscape: true
//     });
// }]);


app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');


    $routeProvider.when('/formsList', {
        templateUrl: 'components/formsList.html',
        controller: 'formsListController as formsCtrl'
    })
        .when('/formBuilder', {
            templateUrl: 'components/formBuilder.html',
            controller: 'formBuilderController as buildCtrl'
        })
        .when('/submitForm', {
            templateUrl: 'components/submitForm.html',
            controller: 'submitFormController as submitCtrl'
        })
        .otherwise({ redirectTo: '/formsList' });
}]);