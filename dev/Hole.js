import React from "react";

console.log('imported Hole.js');

var Hole = React.createClass({
  getInitialState: function () {
    return { info: this.props.info };
  },
  addStroke: function () {
    var transform = this.state.info;
    transform.score += 1;
    this.setState({info: transform});
    this.props.handleChange(transform.number,transform);
  },
  removeStroke: function () {
    var transform = this.state.info;
    if(transform.score > 1) {
      transform.score -= 1;
      this.setState({info: transform});
      this.props.handleChange(transform.number,transform);
    }
  },
  addPar: function () {
    var transform = this.state.info;
    transform.par += 1;
    this.setState({info: transform});
    this.props.handleChange(transform.number,transform);
  },
  removePar: function () {
    var transform = this.state.info;
    if(transform.par > 1) {
      transform.par -= 1;
      this.setState({info: transform});
      this.props.handleChange(transform.number,transform);
    }
  },
  render: function () {
    var hole = this.state.info;
    return (
      <div id={hole.key}>
        <div>----------</div>
        <div>Hole: {hole.number}</div>
        <div>Score: {hole.score}</div>
        <div><button onClick={this.addStroke}>Add Stroke</button>
        <button onClick={this.removeStroke}>Remove Stroke</button></div>
        <div>Par: {hole.par}</div>
        <div><button onClick={this.addPar}>Add Par</button>
        <button onClick={this.removePar}>Remove Par</button></div>
        <div>Distance: {hole.distance}</div>
      </div>
    );
  }
});

module.exports = Hole;