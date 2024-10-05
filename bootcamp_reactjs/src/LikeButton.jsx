import React from "react";

class likeButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>
        {" "} Like
      </button>
    );
  }
}

export default likeButton;

