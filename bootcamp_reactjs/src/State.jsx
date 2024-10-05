import React from "react";
import ReactDOM from "react-dom/client";


class Counting extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        count: 0
    }
}
render() {
        return (
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <button onClick={() => this.setState({count: this.state.count + 1})}>LIKES </button>
        <span style={{ marginLeft: '10px' }}>Total Likes: {this.state.count}</span>
        </div>
        )
    }
}

//exprot 
export default Counting

