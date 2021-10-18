$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(){
    $.ajax({
      url: 'http://localhost:3000/quote',
      type: 'GET',
      data: 0,
      contentType: 'text/plain',
      success: (data) => {
        var newNode = document.createElement('p');
        var text = document.createTextNode(data);
        newNode.appendChild(text);
        document.getElementById('response').appendChild(newNode);
      },
      error: function(error) {
        console.log('Error: Was not able to get quote from server');
      }
    })

  }

  function addQuote(quote){
    $.ajax({
      url: 'http://localhost:3000/quote',
      type: 'POST',
      data: quote,
      contentType: 'text/plain',
      success: () => {
        var newNode = document.createElement('p');
        var text = document.createTextNode(quote);
        newNode.appendChild(text);
        document.getElementById('response').appendChild(newNode);
      },
      error: function(error) {
        console.log('Error: Was not able to post quote to server');
      }
    })
  }
});
