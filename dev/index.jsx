import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

/*Structure
Game
  Hole
  Summary
*/

console.log('init');

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

var sunnyvale = generateDefaultHoles(18);

var initial = (
  <Game startData={sunnyvale}/>
); 

ReactDOM.render(
  initial,
  document.querySelector("#app")
);