import React from "react";

class TotalLikes extends React.Component {
  render() {
    return <h5>| total {this.props.count}</h5>;
  }
}

export default TotalLikes;
