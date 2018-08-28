angular.module('Forms')
    .controller('formsListController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        let formsInfo = []

        //get all forms information
        $http.get(serverUrl + "allForms").then(function (res) {
            self.formsInfo = res.data;
        }, function (res) {
            alert('Forms Not Found');
        }
        );

        self.createForm=function()
        {
            $location.path("/formBuilder");
        }

        self.openSubmitPage=function(formId)
        {
            $location.path("#/submitForm/"+formId);
        }
    }]);
