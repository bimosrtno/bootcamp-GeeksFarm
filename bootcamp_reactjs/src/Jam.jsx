// lifecyle method

import React, {Component}  from 'react'; 

// jam 
class Jam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(), // menampilkan waktu
       };
    }
    //mulai timer 
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000); 
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    // refresh waktu di state
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(), // waktu terbaru
        });
    }
    render() {
        return (
            <div>
                <h2>{this.state.time}</h2>
            </div>
        );
    }
}

export default Jam;