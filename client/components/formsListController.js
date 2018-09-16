angular.module('Forms')
    .controller('formsListController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        let formsInfo = []; //////////////////////////////////////////////////////////////////////////////////////

        //get all forms information
        $http.get(serverUrl + "allForms").then(function (res) {
            self.formsInfo=res.data; ////////////////////////////////////////////////////////////////////////////
            //success
        }, function (res) {
            alert('Forms Not Found');
        }
        );

        //go to form builder page
        self.createForm = function () {
            $location.path("/formBuilder");
        }

        //go to form submit page
        self.openSubmitPage = function (formId) {
            $location.path("/submitForm/" + formId);
        }

        //go to form submissions page
        self.openSubmissionsPage = function (formId) {
            $location.path("/formSubmissions/" + formId);

        }
    }]);
