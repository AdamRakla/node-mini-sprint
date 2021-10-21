import React from 'react';
import axios from 'axios';
import QuoteList from './quoteList.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputQuote: '',
      quotes: [],
    };
    this.getQuote = this.getQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getQuote() {
    axios.get('http://localhost:3000/quote')
      .then((quote) => {
        var response = quote.data.quote;
        this.setState({
          quotes: [...this.state.quotes, response]});
      })
  }

  componentDidMount() {
    this.getQuote();
  }

  addQuote(quote) {
    if (quote !== '') {
      axios.post('http://localhost:3000/quote', {quote})
      .then(() => {
        this.setState({
          inputQuote: '',
          quotes: [...this.state.quotes, quote]
        });
      })
    }
  }

  handleChange(event) {
    this.setState({inputQuote: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var quote = this.state.inputQuote;
    this.addQuote(quote);
  }

  render() {
    return (
      <div>
        <h1>Random Quote Generator</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea value ={this.state.inputQuote} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <div id="response">
          <QuoteList quotes={this.state.quotes}/>
        </div>
      </div>
    )
  }
};
