import React from "react";

var Summary = React.createClass({
  render: function () {
    return (
      <h1>
        <div>Course Name: + {this.props.info.courseName}</div>
        <div>Total Distance: + {this.props.info.courseLength}</div>
        <div>Total Holes: + {this.props.info.holes}</div>
        <div>Strokes for par: + {this.props.info.coursePar}</div>
        <div>Your Strokes: + {this.props.info.coursePar}</div>
        <div>Your Score: + {this.props.info.coursePar}</div>
      </h1>
    )
  }
});