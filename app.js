const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(function middleware(req, res, next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

console.log(__dirname);


// first get method, root path '/', function 
// app.get('/', function(req, res) {
//   res.send('Hello Express');
// });

// display an html file as a response:
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// app.get('/json', function(req, res) {
//   var response = 'Hello json';
//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     res.json({"message": response.toUpperCase()});
//   } else {
//     res.json({"message": response});
//   }
// });

// // chaining middleware functions and handlers
// const middleware = (req, res, next) => {
//   req.time =  new Date().toString;
//   next();
// }


// app.get('/now', middleware, (req, res) => {
//   res.send({
//     time: req.time
//     });
// });

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
  console.log(req.params);
//   console.log(req);
});

app.get('/name', (req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json({name: `${firstName}, ${lastName}`});

})

app.post('/name', (req, res) => {
    res.send({
        name: req.body
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
 module.exports = app;
