angular.module('Forms')
    .controller('submitFormController', ['$scope', '$rootScope','$routeParams', '$http', '$location', function ($scope, $rootScope,$routeParams, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.formId=$routeParams.formId;
        self.formFields=[];

        //get all form fields
        $http.get(serverUrl + "formFields/"+self.formId).then(function (res) {
            self.formFields=res.data;
        }, function (res) {
            alert('Form Not Found');
        }
        );

    }]);
