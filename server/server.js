var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var DButilsAzure = require('./DButils');
var morgan = require('morgan');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var port = 4000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
//create a new form
app.post('/createForm', function(req, res)
{
    var formName=req.body.formName;
    var formFields=req.body.formFields;
    let id=1;
    let count=0;
    //get form ID
    DButilsAzure.execQuery("Select Max(FormId) AS formid from Forms").then(function(result1){
        if(result1.length > 0)
        {
            id=result1[0].formid+1;
        }

        //insert new form to Forms table
        DButilsAzure.execQuery("INSERT INTO Forms VALUES ('" + id + "', '" + formName + "', '" + count + "')").then(function(result2){
            //insert fields to FormField table
            for(let i=0;i<formFields.length;i++)
            {
                DButilsAzure.execQuery("INSERT INTO FormField VALUES ('" + id + "', '" + formFields[i].fieldName + "', '" + formFields[i].fieldType + "')").then(function(result3){
                    
                }).catch(function (err) { res.status(400).send(err); });
            }
            res.sendStatus(200);
        }).catch(function (err) { res.status(401).send(err); });
    }).catch(function (err) { res.status(402).send(err); });
})