import React from 'react';

var QuoteList = (props) => {
  return (
    <div>
      <h1> Quotes </h1>
      {props.quotes.map((quote, i) => {
        return (
        <p key={i} >{quote}</p>
        )
      })}
    </div>
  )}

export default QuoteList;