const express = require("express");
const app= express();
//const path = require("path");
const port= 3000;

//get dan send
app.get(`/`,(req,res)=>{
    res.sendFile("./index.html", {root:__dirname});
});

app.get("/about",(req,res)=>{
    res.sendFile("./about.html",{root:__dirname});
});

app.get("/contact",(req,res)=>{
    res.sendFile("./contact.html",{root:__dirname});
});

app.get("/product/:prodID/category/:catID",(req,res)=>{
    res.send(`product ID: ${req.params.prodID} <br> category ID: ${req.params.catID}`);
});

// use dan nulis status 
app.use(`/`, (req,res)=>{
    res.status(404);
    res.send (" not found : 404");
});


// jalan di port mana
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});



//cara lain

// app.get(`/`,(req,res)=>{
//res.sendfile(path.join(__dirname, `nama file html`));
//}) jangan lupa bikin const path di atas
