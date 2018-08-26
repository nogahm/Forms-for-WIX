var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());

var DButilsAzure = require('./DButils');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var port = 3000;

//create a new form
app.post('/createForm', function(req, res)
{
    var formName=req.body.formName;
    var formFields=req.body.formFields;
    var id=1;
    //get form ID
    DButilsAzure.execQuery("Select max(FormId) From Forms").then(function(result1){
        if(result1.length>0)
        {
            id=result1[0].FormId+1;
        }

        //insert new form to Forms table
        DButilsAzure.execQuery("Insert Into Forms Values('"+id+"', '"+formName+"', 0)").then(function(result2){
            //insert fields to FormField table
            for(var i=0;i<formFields.length;i++)
            {
                DButilsAzure.execQuery("Insert Into FormField Values('"+id+"', '"+formFields[i].fieldName+"', '"+formFields[i].fieldType+"')").then(function(result3){
                }).catch(function (err) { res.status(400).send(err); });
            }
            res.sendStatus(200);
        }).catch(function (err) { res.status(400).send(err); });
    }).catch(function (err) { res.status(400).send(err); });
})