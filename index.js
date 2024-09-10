console.log("halo");

nama="aditya kunto";
mobile="081320100407"

console.log(nama);
console.log(mobile);
console.log("nama saya " + nama + " nomor telp " + mobile);


// pemanggilan modul file system

const fs = require ("fs");

 fs.writeFileSync ("test2.txt" , "halo halo halo");


// fungtion read file 

fs.readFile("test2.txt", "utf-8", (err, data)=>{
 if (err) throw err;
 console.log(data)
});




 
