angular.module('Forms')
    .controller('formSubmissionsController', ['$scope', '$rootScope', '$routeParams', '$http', '$location', function ($scope, $rootScope, $routeParams, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.formId = $routeParams.formId; //the current form
        self.formFields = []; //field from DB
        self.submissions = [];

        //get all form fields
        $http.get(serverUrl + "formFields/" + self.formId).then(function (res) {
            self.formFields = res.data;
        }, function (res) {
            alert('Form Not Found');
        }
        );

        //get all form submissions into array
        $http.get(serverUrl + "formSubmission/" + self.formId).then(function (res) {
            for (let i = 0; i < res.data.length; i++) {
                let subId = res.data[i].SubmissionId;
                let fieldName = res.data[i].FieldName;
                if (!self.submissions[subId]) {
                    self.submissions[subId] = [];
                }
                self.submissions[subId][fieldName] = res.data[i].InputValue;
            }
        }, function (res) {
            alert('Form Submission Not Found');
        }
        );


    }]);
