angular.module('Forms')
    .controller('submitFormController', ['vcRecaptchaService', '$scope', '$rootScope', '$routeParams', '$http', '$location', function (vcRecaptchaService, $scope, $rootScope, $routeParams, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.formId = $routeParams.formId; //the current form
        self.formFields = []; //field from DB
        self.result = {}; //the form submission
        self.captchaResponse = null;

        //get all form fields from DB
        $http.get(serverUrl + "formFields/" + self.formId).then(function (res) {
            self.formFields = res.data;
        }, function (res) {
            alert('Form Not Found');
        }
        );

        //save form submission on DB
        self.saveInput = function () {
            //check captcha
            self.captchaRes = vcRecaptchaService.getResponse();
            $http.post("https://www.google.com/recaptcha/api/siteverify", { secret: "6LdTe3AUAAAAACzCn7R2bUsK19tsXSFWCxrpYQqx", response: self.captchaRes }).then(function (res) {
                // alert(res.data);

                //only if captcha if good continue
                //prepare object in order to sent to server
                self.result.formId = self.formId;
                self.result.submit = [];
                for (let i = 0; i < self.formFields.length; i++) {
                    //manually check if tel - tel type only supported in Safari 8
                    if (self.formFields[i].FieldType == "tel") {
                        let value = self.formFields[i].Input;
                        //check exactly 10 digits
                        if (value.length != 10) {
                            alert("Enter valid tel number");
                            return;
                        }
                        //check all chars are numbers
                        for (let i = 0; i < value.length; i++) {
                            if (value[i] > "9" || value[i] < "0") {
                                alert("Enter valid tel number");
                                return;
                            }
                        }
                    }
                    //save result for sending
                    self.result.submit[i] = {
                        "fieldName": self.formFields[i].FieldName,
                        "value": self.formFields[i].Input
                    };
                }
                //save the answer on DB
                $http.put(serverUrl + "addSubmission", self.result).then(function (res) {
                    alert('Submited');
                    $location.path("/formsList");
                }, function (res) {
                    alert('Submission Failed');
                }
                );

            }, function (res) {
                alert('eror in captcha ' + res.data);
            })


        }
    }]);
