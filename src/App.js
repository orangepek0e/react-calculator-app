import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeypadComponent from './components/KeypadComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: ''
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.onkeydown = this.handleKeyDown;
  }

  handleKeyDown(event) {
    if (/[-0-9()+*/]/.test(event.key)) {
      this.setState({
        result: this.state.result + event.key
      });
    } else if ('Backspace' === event.key) {
      this.backspace();
    } else if ('Enter' === event.key || '=' === event.key) {
      this.calculate();
    }
     
  }

  calculate = () => {
    try {
      this.setState({
        //eslint-disable-next-line
        result: (eval(this.state.result.replace('(', '*(')) || '') + ''
      });
    } catch(e) {
      this.setState({
        result: 'error'
      });
    }
  }

  reset = () => {
    this.setState({
      result: ''
    });
  }

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    });
  }

  onClick = button => {
    if (button === '=') {
      this.calculate();
    } else if (button === 'C') {
      this.reset()
    } else if (button === 'CE') {
      this.backspace();
    } else {
      this.setState({
        result: this.state.result + button
      });
    }

  }

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1 className="calculator-header">Simple Calculator App</h1>
          <ResultComponent result={this.state.result} />
          <KeypadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;
