const express = require('express');
const bodyP = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyP.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
  const fir = req.body.fname;
  const las = req.body.lname;
  const mailid = req.body.email;

  var data = {
    members: [{
      email_address: mailid,
      status: 'subscribed',
      merge_fields: {
        FNAME: fir,
        LNAME: las
      }
    }]
  };
  const url = 'https://us18.api.mailchimp.com/3.0/lists/865fbd42a2';
  const options = {
    method: 'POST',
    auth: 'harishRT:4d806426c8afba20ef3afadb297fb51e-us18'
  }
  console.log(mailid);

  const jsondata = JSON.stringify(data);
  const reques = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/fail.html')
    }
    response.on('data', function(data) {
      console.log(JSON.parse(data));
    })
  });

  reques.write(jsondata);
  reques.end();
})

app.post('/f', function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server is running in port 3000')
});

//

//
