angular.module('Forms')
    .controller('formSubmissionsController', ['$scope', '$rootScope', '$routeParams', '$http', '$location', function ($scope, $rootScope, $routeParams, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.formId = $routeParams.formId; //the current form
        self.formFields = []; //field from DB
        self.submissions = [];
        self.subArr = [];
        //get all form fields
        $http.get(serverUrl + "formFields/" + self.formId).then(function (res) {
            self.formFields = res.data;
        }, function (res) {
            alert('Form Not Found');
        }
        );

        //get all form submissions into array
        $http.get(serverUrl + "formSubmission/" + self.formId).then(function (res) {
            let formsub = res.data;
            for (let i = 0; i < formsub.length; i++) {
                let subId = formsub[i].SubmissionId;
                let fieldName = formsub[i].FieldName;
                if (typeof self.submissions[subId] == "undefined") {
                    self.submissions[subId] = [];
                }
                (self.submissions[subId])[fieldName] = formsub[i].InputValue;
            }
            //copy to array
            let index = 0;
            for (let i = 0; i < self.submissions.length; i++) {
                if (typeof self.submissions[i] !== "undefined") {
                    self.subArr[index] = self.submissions[i];
                    index++;
                }
            }
        }, function (res) {
            alert('Form Submission Not Found');
        }
        );
    }]);
