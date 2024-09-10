const readline = require("node:readline");
const { stdin: input, stdout: output } =require("node:process");
const {log} = require("node:console");   
const fs =require("fs");

const rl = readline.createInterface ({input, output});

//variabel menyimpan jawaban

let userdata={
    name:``,
    phone:``,
    email:``, 
};

//pertanyaan 1

rl.question ("siapa nama kamu?", (answer)=> {
    userdata.name= `nama kamu adalah ${answer}`;

    
//pertanyaan 2

rl.question ("nomor telp?",(answer1)=>{
    
    userdata.phone=`nomor telp kamu adalah ${answer1}`;

    

// pertanyaan 3

rl.question ("email?",(answer2)=>{
    userdata.email=`email kamu adalah ${answer2}`;


    const content=`${userdata.name}\n${userdata.phone}\n${userdata.email}\n`;
    
    rl.close();
    fs.writeFileSync(`test3.txt`, content);
    

  // tutup di akhir  
}) 
 })
  })