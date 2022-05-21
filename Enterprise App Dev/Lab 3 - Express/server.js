const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { colours } = require("nodemon/lib/config/defaults");
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static('public'));


app.use(cors({
    origin : "http://localhost:3000",
    methods : ["GET","POST"],
    credentials : true
}));

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

//get function for getting colours
app.get('/colour/:id', (req,res)=>{

    fs.readFile(__dirname + "/public/colours.json", (error, data) => {
        if(error) {
            throw error;
        }
        let colours = JSON.parse(data);

        let getColours = colours.find(color => color.colorId == req.params.id)

        res.cookie("colourCookie", JSON.stringify(getColours), {maxAge: 360000});

        res.json(getColours);
        console.log(getColours);
        console.log(req.cookies);
    });
});

//post function for creating new colours
app.post('/createcolours', (req,res)=>{

    fs.readFile(__dirname + "/public/colours.json", (error, data) => {
        if(error) {
            throw error;
        }

        let colours = JSON.parse(data);
        var numberL = colours.length 

        // creating new colour object to puch into array
        let newColour = {
            colorId : ++numberL,
            hexString : req.body.hexString,
            rgb : req.body.rgb,
            hsl : req.body.hsl,
            name : req.body.name
        }
        colours.push(newColour);

        //writing to file changes
        fs.writeFile(__dirname +'/public/colours.json', JSON.stringify(colours), err => {
            if (err) {
              console.error(err)
              return
            }
        })

        res.json(newColour)
        console.log(colours[newColour.colorId]);
    });

}); 

app.post('/editcolours/:id', (req,res)=>{

    //reading csv file contents into an object
    fs.readFile(__dirname + "/public/colours.json", (error, data) => {
        if(error) {
            throw error;
        }
        let colours = JSON.parse(data);
       
        // creating new colour object to puch into array
        let newColour = {
            colorId : req.body.colorId,
            hexString : req.body.hexString,
            rgb : req.body.rgb,
            hsl : req.body.hsl,
            name : req.body.name
        }

        colours[req.params.id] = newColour
        console.log(newColour)
        
        //writing to file changes
        fs.writeFile(__dirname +'/public/colours.json', JSON.stringify(colours), err => {
            if (err) {
              console.error(err)
              return
            }
        })
        
        res.json(newColour)
    });
});


//delete function for deleting a colour object
app.delete("/colours/:id",(req,res)=>{

    //reading csv file contents into an object
    fs.readFile(__dirname + "/public/colours.json", (error, data) => {
        if(error) {
            throw error;
        }
        let colours = JSON.parse(data);

        let updatedColours = colours.filter(color => color.colorId != req.params.id)
        
        //writing to file changes
        fs.writeFile(__dirname +'/public/colours.json', JSON.stringify(updatedColours), err => {
            if (err) {
              console.error(err)
            }
        })

        console.log(updatedColours[0])

        res.send({status : 'Deleted Sucessfully'})

    });  
    
});

//gather specific colour
app.post('/getColour', (req,res)=>{

    //reading csv file contents into an object
    fs.readFile(__dirname + "/public/colours.json", (error, data) => {
        if(error) {
            throw error;
        }
        let getcolours = JSON.parse(data);

        res.json(getcolours);
        console.log(colours[0]);
    });
}); 


