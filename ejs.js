const express = require("express");
// func baca json
const fs = require('fs');
const app= express();
//const path = require("path");
const port= 3000;

// view engine ejs
app.set("view engine", "ejs");


//get, send, render 
app.get(`/`,(req,res)=>{
    //res.sendFile("./index.html", {root:__dirname});
const nama= "bimo"
    res.render("index" ,{nama ,title: "homepage"});
});

app.get("/about",(req,res)=>{
    
    //res.sendFile("./about.html",{root:__dirname});
    res.render("about",{title: "about page"});
});

app.get("/contact", (req, res) => {
    // Baca file contacts.json
    fs.readFile('./data/contacts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Kesalahan saat membaca file');
        }
        
        // Mengurai data JSON
        let contacts;
        try {
            contacts = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send('Kesalahan saat mengurai file');
        }

        // Render dengan pesan jika kosong
        // Ternary operator adalah carauntuk mengekspresikan pernyataan if-else
        const message = contacts.length === 0 ? 'Data kosong' : null;
        
        res.render('contact', { contacts, title: "Contact Page", message });
    });
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
