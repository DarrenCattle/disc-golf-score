import React from "react";
import Hole from "./Hole";
import Summary from "./Summary";

console.log('imported Game.js');

var Game = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.startData
    };
  },
  addHole: function () {
    var transform = this.state.data;
    var len = transform.length;
    transform.push({
      key: "hole_" + len,
      number: len,
      distance: 300,
      par: 3,
      score: 3
    });
    this.setState({data: transform});
    this.updateHoles();
  },
  removeHole: function () {
    var transform = this.state.data;
    if(transform.length > 2) {
      transform.pop();
      this.setState({data: transform});
      this.updateHoles();
    }
  },
  changeHole: function (hole, info) {
    var transform = this.state.data;
    transform[hole] = info;
    this.updateHoles();
  },
  updateHoles: function () {
    var transform = this.state.data;
    var distance = 0, totalPar = 0, totalScore = 0, name = transform[0].courseName;
    for(var a = 1; a < transform.length; a++) {
      var push = transform[a];
      distance += push.distance, totalPar += push.par, totalScore += push.score;
    }
    transform[0] = {
      holes: transform.length-1,
      courseName: name,
      courseLength: distance,
      coursePar: totalPar,
      courseScore: totalScore
    };
    this.setState({data: transform});
  },
  generateHoles: function () {
    var lines = [];
    var transform = this.state.data;
    for(var a = 1; a < transform.length; a++) {
      var push = transform[a];
      lines.push(
        <Hole 
          info={push} 
          key={push.key} 
          handleChange={this.changeHole}/>
      );
    }
    return lines;
  },
  render: function () {
    return (
      <div>
        <button id='addHole' onClick={this.addHole}>Add Hole</button>
        <button id='removeHole' onClick={this.removeHole}>Remove Hole</button>
        {this.generateHoles()}
        <Summary info={this.state.data[0]} />
      </div>
    );
  }
});

module.exports = Game;