angular.module('Forms')
    .controller('submitFormController', ['$scope', '$rootScope','$routeParams', '$http', '$location', function ($scope, $rootScope,$routeParams, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.formId=$routeParams.formId; //the current form
        self.formFields=[]; //field from DB
        self.result={}; //the form submission

        //get all form fields
        $http.get(serverUrl + "formFields/"+self.formId).then(function (res) {
            self.formFields=res.data;
        }, function (res) {
            alert('Form Not Found');
        }
        );

        //save form submission on DB
        self.saveInput=function(){
            //prepare object in order to sent to server
            self.result.formId=self.formId;
            self.result.submit=[];
            for(let i=0;i<self.formFields.length;i++)
            {
                self.result.submit[i]={"fieldName":self.formFields[i].fieldName,
                                        "value":self.formFields[i].value};
                // self.result.submit[i].fieldName=self.formFields[i].fieldName;
                // self.result.submit[i].value=self.formFields[i].value;
            }

            //save the answer using the server
            $http.put(serverUrl + "addSubmission",self.result).then(function (res) {
                alert('Submited');
                $location.path("/formsList");
            }, function (res) {
                alert('Submission Failed');
            }
            );
        }

    }]);
