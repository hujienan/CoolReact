import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const scaleNames = {
  c : 'Celsius',
  f : 'Fahrenheit'
}

function convertFromCtoF(c) {
  return (c * 9 / 5) + 32;
}

function convertFromFtoC(f) {
  return (f - 32) * 5 / 9;
}

function convert(func, temperature) {
  const val = parseFloat(temperature);
  if(Number.isNaN(val)) {
    return '';
  }
  return func(val).toString();
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale : scaleNames.c,
      temperature : "",
      isBoiling : false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(val) {
    
    this.setState({
      temperature : val
    });
    if(parseFloat(val) >= 100){
      this.setState({
        isBoiling : true
      });
    }else{
      this.setState({
        isBoiling : false
      });
    }
  }


  render() {
    const celsius = this.state.temperature;
    const fahrenheit = convert(convertFromCtoF, this.state.temperature);
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onHandleInput={this.handleInputChange}
        />
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onHandleInput={this.handleInputChange}
        />
        <ResultOutput 
          isBoiling={this.state.isBoiling}
        />
      </div>
    )
  }
}

class ResultOutput extends React.Component {
  render() {
    const result = this.props.isBoiling ? (
      <p>Boiling</p>
    ) : (
      <p>Not Boiling</p>
    );

    return result;
  }
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    if(this.props.scale === 'c') {
      this.props.onHandleInput(e.target.value)
    }
    if(this.props.scale === 'f') {
      this.props.onHandleInput(convert(convertFromFtoC, e.target.value))
    }
  }

  render() {
    return (
      <fieldset>
        <legend>Enter in {scaleNames[this.props.scale]} </legend>
        <input 
          value={this.props.temperature}
          onChange={this.handleInputChange}
        />
      </fieldset>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));