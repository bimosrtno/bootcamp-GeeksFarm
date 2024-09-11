const readline = require("node:readline");
const { stdin: input, stdout: output } =require("node:process");
const {log} = require("node:console");   
const fs =require("fs");
const rl = readline.createInterface ({input, output});

//validator
const validator= require ("validator");


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
    
   // validator 
   if (validator.isEmail(answer2)) {
    userdata.email = `Email kamu adalah ${answer2}`;

    // Menyimpan data ke file
    const content = `${userdata.name}\n${userdata.phone}\n${userdata.email}\nData berhasil disimpan`; // tambah data berhasil disimpan kalau mau di print
    
    fs.writeFileSync(`test3.txt`, content);
    console.log("Data berhasil disimpan.");

} else {
    console.log("Format email yang anda masukkan salah.");
}
    const content=`${userdata.name}\n${userdata.phone}\n${userdata.email}\n`;
    
    //const content=`${userdata.name}\n${userdata.phone}\n${userdata.email}\n`;
    //hapus userdata email kalau gamau terbawa
    
    rl.close();
    
    

  // tutup di akhir  
}) 
 })
  })