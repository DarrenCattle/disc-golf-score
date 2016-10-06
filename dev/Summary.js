import React from "react";

console.log('imported Summary.js');

var Summary = React.createClass({
  formatSign: function (n) {
    return n > 0 ? "+" + n : n.toString();
  },
  render: function () {
    var strokes = this.formatSign(this.props.info.courseScore-this.props.info.coursePar);
    return (
      <div>
        <div>----------</div>
        <div>Course Name: {this.props.info.courseName}</div>
        <div>Total Distance: {this.props.info.courseLength}</div>
        <div>Total Holes: {this.props.info.holes}</div>
        <div>Strokes for par: {this.props.info.coursePar}</div>
        <div>Your Strokes: {strokes}</div>
        <div>Your Score: {this.props.info.courseScore}</div>
      </div>
    )
  }
});

module.exports = Summary;