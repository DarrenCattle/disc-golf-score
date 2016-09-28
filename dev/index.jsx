import React from "react";
import ReactDOM from "react-dom";

console.log('init');

var holeLib = {
  addPar: function () {
    this.setState({par: this.par+1});
  },
  removePar: function () {
    this.setState({par: this.par-1});
  }
};

var generateDefaultHoles = function (n) {
  var result = [];
  var length = 0, par = 0, score = 0;
  for(var a = 1; a <= n; a++) {
    result[a] = {
      key: "hole_" + a,
      number: a,
      distance: 300,
      par: 3,
      score: 3
    };
    length += 300, par += 3, score += 3;
  }
  result[0] = {
    holes: n,
    courseName: 'Sunnyvale Trailer Park',
    courseLength: length,
    coursePar: par,
    courseScore: score
  };
  return result;
};

var sunnyvale = generateDefaultHoles(9);
console.log(sunnyvale);

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

var Summary = React.createClass({
  render: function () {
    return (
      <div>
        <div>----------</div>
        <div>Course Name: {this.props.info.courseName}</div>
        <div>Total Distance: {this.props.info.courseLength}</div>
        <div>Total Holes: {this.props.info.holes}</div>
        <div>Strokes for par: {this.props.info.coursePar}</div>
        <div>Your Strokes: {this.props.info.courseScore-this.props.info.coursePar}</div>
        <div>Your Score: {this.props.info.courseScore}</div>
      </div>
    )
  }
});

var Game = React.createClass({
  getInitialState: function () {
    return {
      data: sunnyvale
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
    //console.log(this.state.data);
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
    console.log(this.state.data);
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


var initial = (
  <Game />
); 

ReactDOM.render(
  initial,
  document.querySelector("#app")
);
