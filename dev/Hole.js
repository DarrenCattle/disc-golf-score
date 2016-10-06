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
  generateStyle: function () {
    var hole = this.state.info;
    //clrs.cc selection
    var colorMap = {
      "-2": "#39CCCC",
      "-1": "#7FDBFF",
      "0": "#01FF70",
      "1": "#FFDC00",
      "2": "#FF851B",
      "3": "#FF4136"
    };
    var diff = hole.score-hole.par;
    var holeColor = diff > 3 ? colorMap[3] : diff < -2 ? colorMap[-2] : colorMap[diff];
    var style = {
      display: "inline-block",
      margin: "1%",
      textAlign: "center",
      width: "150px",
      backgroundColor: holeColor
    };
    return style;
  },
  formatSign: function (n) {
    return n > 0 ? "+" + n : n.toString();
  },
  render: function () {
    var hole = this.state.info;
    return (
      <div id={hole.key} style={this.generateStyle()}>
        <div><button style={{width:"50%",position:"relative",top:"-2px"}} onClick={this.addStroke}>+</button>
        <button style={{width:"50%",position:"relative",top:"-2px"}} onClick={this.removeStroke}>-</button></div>
        <div>Hole {hole.number} | {hole.distance + ' ft.'}</div>
        <div style={{"fontSize":"200%","textAlign":"center"}}>{this.formatSign(hole.score-hole.par)}</div>
        <div>Par {hole.par} | Strokes {hole.score}</div>
        <div><button style={{width: "50%"}} onClick={this.addPar}>+ Par</button>
        <button style={{width: "50%"}} onClick={this.removePar}>- Par</button></div>
      </div>
    );
  }
});

module.exports = Hole;