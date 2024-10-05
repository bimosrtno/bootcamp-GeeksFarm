import React from "react";
import ReactDOM from "react-dom/client";    


const el = document.getElementById("root")

const root = ReactDOM.createRoot(el)
function App(props) {
    return (
        <div>
            <h1>halo {props.name},profesi {props.job}</h1>
        </div>
    )
}
function Data(){
    return(
        <div> 
            <App name="asep" job="dokter"/>
            <App name="ujang" job="polisi"/>
        </div>
    )
}
//root.render(Data/>)

export default Data