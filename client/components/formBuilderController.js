angular.module('Forms')
    .controller('formBuilderController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
        let self = this;
        let serverUrl = 'http://localhost:4000/';
        self.lable;
        self.name;
        self.type;
        self.types=["text", "color", "date", "email", "tel", "number"];
        self.fields=[];
        self.index=0;
        self.formName;

        //add field to form
        self.addField=function()
        {
            //add info to fields
            self.fields[self.index]={ fieldName:self.name, fieldType:self.type, fieldLabel:self.lable};
            self.index++;
            //TODO - clean form
            document.getElementById("fieldsForm").reset();
        }
        
        //add form to db
        self.saveForm=function()
        {
            //create form object
            self.form={formName:self.formName, formFields:self.fields }
            //save form on DB
            $http.post(serverUrl + "createForm", self.form).then(function (res) {
                //go to forms list page
                $location.path("/formsList");
                alert('Form Created');
            }, function (res) {
                alert('Forms Could Not Creat');
            }
            );
        }

    }]);
