import React, { useState } from "react";


//export default function ColorCheck    
function ColorCheck() {
    const [color, setColor]= useState ("red");
    const [car, setCar]= useState ({
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
    });

    const updateColor = () => {
        setCar(previousState => {
            return {
                ...previousState,
                color: "blue"
            }
        })
    }
    
    return (
        <div>
            <h1>My favorite car is {car.model} it is a {car.color} !!!!!!!</h1>
            <button type= "button" onClick={updateColor}>ganti warna</button> 
            
            
            <h1> My favorite color is {color} !!!!!!!</h1>
            <button onClick={() => setColor("blue")}>Blue</button>
            <button onClick={() => setColor("red")}>Red</button>
            <button onClick={() => setColor("green")}>Green</button>
        </div>
    )
}


export default ColorCheck



// export bisa di atas atau dibawah