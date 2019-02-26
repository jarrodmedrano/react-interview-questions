import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Search extends Component {
  state = {
    searchTerm: '',
    serverResponse: []
  };

  async getData() {
    const res = await axios(
      `https://api.github.com/users/${this.state.searchTerm}`
    );
    const data = await res.data;

    this.setState({
      serverResponse: [...this.state.serverResponse, data]
    })
  }

  setSearchTerm = e => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
  };

  handleKeyUp = e => {
    if(e.keyCode === 13) {
      this.setState({
        serverResponse: []
      }, this.getData)
    }
  };

  render() {

    return (
      <div>

        <h2>
          Simple API call
        </h2>

        <p>Display a github user after entering a search term and pressing enter</p>

        <input type="text" value={this.state.searchTerm} onChange={e => this.setSearchTerm(e)} onKeyUp={(e) => this.handleKeyUp(e)} />
        <br />
        {
          this.state.serverResponse.map((item, id) => {
            return (
              <div key={id}>
                <img src={item.avatar_url} />
                <h2>{item.login}</h2>
              </div>
            )
          })
        }
      </div>
    )
  }
}

class App extends Component {
  state = {
    inputText: ''
  };

  handleChange(value) {
    this.setState({
      inputText: value
    })
  }


  render() {
    return (
      <div className="App">
        {/*Create an input box that sets the text of another element*/}
        <h1>Simple One Way Binding</h1>
        <p>Render the text of the input underneath it</p>
        <input type="text" value={this.state.inputText} onChange={e => this.handleChange(e.target.value)} />
        <br />
        {this.state.inputText}

        <Search/>
      </div>
    );
  }
}

export default App;
