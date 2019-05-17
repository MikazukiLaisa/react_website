// express
const express = require('express');
const fs = require("fs");
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    next();
  });

// GET
app.get('/api', (req, res) => {
 
 res.send(read("./blog01.txt"));
});

// listen
app.listen(3020, () => {
 console.log('Example app listening on port 3020!');
});

function read(filePath) {
  var content = new String();
  if(check(filePath)) {;
    content = fs.readFileSync(filePath, 'utf8');
  }
  return content;
};

function check(filePath) {
  var isExist = false;
  try {
    fs.statSync(filePath);
    isExist = true;
  } catch(err) {
    isExist = false;
  }
  return isExist;
}