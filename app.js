var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var AWS = require('aws-sdk');

app.use(bodyParser.text());

AWS.config.update({
    region: "us-east-2",
     accessKeyID: 'AKIAJUZAYCBIAOY65SIQ',
     secretAccessKey: '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',
});
var s3 = new AWS.S3();//{params: {Bucket: 'elasticbeanstalk-us-east-2-205654503547'}});

app.get('/image-uploaded', function (req, res) {
    res.send('Hello World!');
});

app.post('/image-uploaded',function(req,res){
console.log('requesty:');    
console.log(req.body);
var BUCKET_NAME = 'elasticbeanstalk-us-east-2-205654503547';
var OLD_KEY = req.file.filename.toString();
var NEW_KEY = req.file.filename.toString()+'New';

// Copy the object to a new location
    s3.copyObject({
        Bucket: BUCKET_NAME, 
        CopySource: `${BUCKET_NAME}${OLD_KEY}`, 
        Key: NEW_KEY
    }, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});