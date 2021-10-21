const mysql = require('mysql');

var db = mysql.createConnection({
  user:'root',
  password: 'password',
  database: 'quoteDatabase',
});

db.connect((err, response) => {
  if (err) {
    console.log('there was an error in connecting');
  } else {
    console.log('connected');
  }
})

const getQuote = function (id, callback) {
  var queryString = `SELECT quote FROM quotes WHERE id = ${id}`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const postQuote = function (quote, callback) {
  var queryString = `INSERT INTO quotes VALUES (null, ?)`;
  db.query(queryString, [quote], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getNumQuotes = function (callback) {
  var queryString = 'SELECT COUNT(*) FROM quotes';
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
}

module.exports = {
  getQuote,
  postQuote,
  getNumQuotes,
};