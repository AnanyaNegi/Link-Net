const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
require("dotenv").config();
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
    res.render("home", {
     });
  });
  


  
  app.post("/", function(req, res) {

    const firstname = req.body.fName;
    const secname = req.body.lName;
    const email = req.body.email;
  
    const data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: secname,
        }
      }]
    };
  
    const jsonData = JSON.stringify(data);
  
  const url="https://us10.api.mailchimp.com/3.0/lists/e27a67ecde";
  const options={
    method:"post",
    auth:process.env.AUTH
  }
  const request=https.request(url,options,function(response){
  
 
    if(response.statusCode===200){

      res.sendFile(__dirname + "/success.html");
  }
  else{
  
    res.sendFile(__dirname + "/failure.html");
  }
  


response.on("data",function(data){
    console.log(JSON.parse(data));
  })
  })
  request.write(jsonData);
  request.end();
  });



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
