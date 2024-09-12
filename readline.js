const readline = require("node:readline");
const { stdin: input, stdout: output } =require("node:process");
const {log} = require("node:console");   
const fs =require("fs");
const rl = readline.createInterface ({input, output});

///validator
const validator= require ("validator");


///variabel menyimpan jawaban

let userdata={
    name:``,
    phone:``,
    email:``, 
};

///function membaca menambah menyimopan

function readFileAndCombineData (filepath, newData){
    try {
    // baca isi file
        const file= fs.readFileSync(filepath,"utf-8");
        const contacts = JSON.parse(file);
        //menambahkan data baru
        contacts.push(newData);
        fs.writeFileSync(filePath, JSON.stringify(contacts,null,2));
    
} catch (err) {
    console.error("error reading or writing:", err);
}
}

/// function mengumpulkan dan menyimpan
function processUserData (){
///pertanyaan 1

rl.question ("siapa nama kamu?", (nama)=> {
    userdata.name= `nama kamu adalah ${nama}`;

    
///pertanyaan 2

rl.question ("nomor telp?",(mobile)=>{
    
    userdata.phone=`nomor telp kamu adalah ${mobile}`;

/// pertanyaan 3

rl.question ("email?",(email)=>{
    userdata.email=`email kamu adalah ${email}`;
    
   // validator 
   if (validator.isEmail(email)) {
    userdata.email = `Email kamu adalah ${email}`;

    /// Menyimpan data ke file
    // const content = `${userdata.name}\n${userdata.phone}\n${userdata.email}\nData berhasil disimpan`; // tambah data berhasil disimpan kalau mau di print
    const newData ={
        name: userdata.name,
        phone: userdata.phone,
        email: userdata.email,
    };
    /// panggil function
    readFileAndCombineData("data/contacts.json","utf-8", newData);

    //const file= fs.readFileSync("data/contacts.json","utf-8");
    //const contacts = JSON.parse(file);
    //contacts.push(data);
    //fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
    
    console.log("Data berhasil disimpan.");
} else {
    console.log("Format email yang anda masukkan salah.");
}
    //const content=`${userdata.name}\n${userdata.phone}\n${userdata.email}\n`;
    
    //const content=`${userdata.name}\n${userdata.phone}\n${userdata.email}\n`;
    ///hapus userdata email kalau gamau terbawa
    
    ///membuat object yang berisi data yang diinput user
    // const result = { userdata.name ,userdataphone ,userdataemail };
    
    //const file= fs.readFileSync("data/contacts.json","utf-8");
    //const contacts = JSON.parse(file);
    //contacts.push(content);

    
    rl.close();
    
    

  /// tutup di akhir  
});
 });
  });
}
  /// panggil function
  processUserData();