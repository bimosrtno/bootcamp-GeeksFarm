const yargs = require ("yargs");
//console.log (yargs.argv);
const fs =require("fs");

yargs.command ({
    command:`add`,
    describe:`add new contact`,
    builder:{
        name:{
            describe: `Contact Name`,
            demandOption:true, 
            type:`string`,
        },
        email:{
            describe:`contact email`,
            demandOption:false,
            type:`string`,
        },
        mobile:{
            describe:`contact mobile phone number`,
            demandOption:true,
            type:`string`,
        },
    },
    handler(argv){
        const contact={
            name:argv.name,
            email:argv.email,
            mobile:argv.mobile,
        };
        readFileAndCombineData(contact);
    }
});
yargs.parse();
        
// function mengumpulkan dan menyimpan
function readFileAndCombineData (newData){
    try {
    // baca isi file
        const file= fs.readFileSync(`data/contacts.json`,"utf-8"); //langusng kasi alamat file jangan filepath
        const contacts = JSON.parse(file);
        //menambahkan data baru
        contacts.push(newData);
        fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts,null,2)); // langsung kasih alamat file jangan filepath
    
    } catch (err) {
        console.error("error reading or writing:", err);
    }
}