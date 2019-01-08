//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };

  jsonData = JSON.stringify(data)

  var options = {
    url: "https://us7.api.mailchimp.com/3.0/lists/7864625ffc",
    method: "POST",
    headers: {
      "Authorization": "megha1 d61ee248ed1019da26f48dad5aecdefa-us7"
    },
    body: jsonData,

  };
  request(options, function(error, response, body){
   if (response.statusCode != 200 || error == true) {
      res.sendFile(__dirname + "/failure.html");
    }else{
      res.sendFile(__dirname + "/success.html");
    }
  });
});
app.post('/failure', function(req, res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server have started");
});

// Api key
// d61ee248ed1019da26f48dad5aecdefa-us7

// 7864625ffc
