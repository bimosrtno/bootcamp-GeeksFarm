//validator
const validator = require ("validator") ;

//cek email

const email="bimosrtno@gmail.com"

if(validator.isEmail(email)) {
    console.log("format email anda benar");

} else {
    console.log("format email anda salah");
}

// == melihat velue === melihat tipe data
// buat dari codingan kemarin membuat result salah email dan nomer telfom
