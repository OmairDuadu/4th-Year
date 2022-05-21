// Requiring and importing all the modules 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
const AWS = require("aws-sdk");
const fs = require('fs');
const s3 = new AWS.S3();
AWS.config.update({region: 'eu-west-1'});
const rekognition = new AWS.Rekognition({ region: 'eu-west-1'});
const axios = require('axios');
const FormData = require('form-data');
const multer  = require('multer');
const morgan = require('morgan');
const upload = multer({ dest: './uploads/' });
require("dotenv").config();

module.exports = axios;

const { Rekognition } = require('aws-sdk');
const { response } = require('express');

//add other middleware
app.use(cors({
    origin : "http://localhost:3000",
    methods : ["GET","POST"],
    credentials : true
}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload())
app.use(express.static(__dirname + "/public"));
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('lib'));
app.use('/scss', express.static('scss'));
app.use('/uploads', express.static('uploads'));
app.use('/html', express.static('html'));
app.use('/node_modules',express.static('node_modules'));


// Below is all the listeners to move between the pages in the 
app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/index.html", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/about.html", function(req, res){
    res.sendFile(__dirname+"/public/html/about.html");
});

app.get("/service.html", function(req, res){
    res.sendFile(__dirname+"/public/html/service.html");
});

app.get("/project.html", function(req, res){
    res.sendFile(__dirname+"/public/html/project.html");
});

app.get("/contact.html", function(req, res){
    res.sendFile(__dirname+"/public/html/contact.html");
});


//Image upload post and functionality
app.post('/upload',  (req, res) => {
    try {
        
        if(!req.files) {
            res.status(400);
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            
            console.log(req.files.file);

            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + avatar.name);

            //Amazon S3 object upload.
            (async() => {
                await 
                s3.putObject({
                    Body: fs.readFileSync(avatar.name),
                    Bucket: "fyp-img",
                    Key: avatar.name,
                }).promise();
            })();
            
            // Set params for rekognition
            const params = {
                Image: {
                    S3Object: {
                        Bucket: 'fyp-img',
                        Name: avatar.name
                    },
                },
                Attributes: ['ALL']
            };

            //Timeout function to give time for the object to be uploaded
            setTimeout(() => {
                //analyse face with rekognition
                rekognition.detectFaces(params, function(err, response) {
                    if (err) {
                    console.log(err, err.stack); // an error occurred
                    } else {
                    console.log(`Detected faces for: ${avatar.name}`)
                    
                    response.FaceDetails.forEach(data => {
                        return data
                        
                    }) // for response.faceDetails
                    //returning the response data from the 
                    res.send({faceData : response.FaceDetails})
                    console.log(response.FaceDetails)
                    } // if
                    // res.send(data)
                });
            }, 1000);
            

            //Timeout function
            setTimeout(() => {
                var paramsDel = {
                    Bucket: "fyp-img", 
                    Key: avatar.name
                };

                //deleting the file after analysis
                s3.deleteObject(paramsDel, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else     console.log("S3 Object Deleted!!");           // successful response
                });
            }, 2000);    
            
            
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
});