const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const model = require('./db/index.js');

//headers to allows CORS requests
// const headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10
// };
app.use(cors());
app.use(express.json());

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
// const quotes = [
//   'To not give your best, is to sacrifice the gift. - Steve Prefontaine',
//   'Pain is temporary, losing is forever',
//   'Is mayonaise an instrument? - Patrick Star',
//   'ANYTHING IS POSSIBLE!!!! - Kevin Garnett',
//   'Are you a different animal, and the same beast? - Kobe'
// ];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.get('/quote', (req,res) => {
  model.getNumQuotes((err, num) => {
    if (err) {
      return err;
    } else {
      var numOfQuotes = num[0]['COUNT(*)'];
      var index = getRandomInt(1,numOfQuotes);
      model.getQuote(index, (err, result) => {
        if (err) {
          return err;
        } else {
          var quote = result[0].quote;
          res.status(200).send({quote});
        }
      })
    }
  })
})

app.post('/quote', (req, res) => {
  model.postQuote(req.body.quote, (err, response) => {
    if (err) {
      return err;
    } else {
      res.status(200).send('success');
    }
  })
})

// app.get('/quote', (req, res) => {
//   var quoteIndex = getRandomInt(0,quotes.length);
//   res.status(200).send({quote: quotes[quoteIndex]});
// })

// app.post('/quote', (req, res) => {
//   quotes.push(req.body.quote);
//   res.status(200).send('success!');
// })

// const handleRequest = function(req, res) {
//   console.log(`Endpoint: ${req.url} Method: ${req.method}`);

//   // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
//   if (req.url == '/') {
//     console.log('redirecting');
//     res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
//     res.end();
//   }

//   // TODO: GET ONE
//   if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
//     var quoteIndex = getRandomInt(0,quotes.length);
//     res.writeHead(200, headers);
//     var quoteResponse = quotes[quoteIndex];
//     res.end(quoteResponse);
//   }
//   // TODO: POST/CREATE
//   else if ((req.url == '/quote' || req.url == '/quote') && req.method == "POST") {
//     quotes.push(req.data);
//     res.writeHead(201, headers);
//     res.end();
//   }

//   else if ((req.url == '/quote') && req.method == 'OPTIONS') {
//     res.writeHead(200, headers);
//     res.end();
//   }

// //CATCH ALL ROUTE
//   else {
//     res.writeHead(404,headers);
//     res.end('Page not found');
//   }
// }

//const server = http.createServer(handleRequest);
app.listen(port, () => {
  console.log('Server is running in the terminal!');
  console.log(`Listening on http://localhost:${port}`);
});

