const yargs = require("yargs");
const fs = require("fs");
const validator = require("validator");


yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,          
            type: 'string',              
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,         
            type: 'string',              
        },
        mobile: {
            describe: 'Contact Mobile Phone Number',
            demandOption: true,          
            type: 'string',              
        },
    },
    handler(argv) {
        
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile,
        };

        // Validasi dan penyimpanan data
        if (validateContact(contact)) {
            readFileAndCombineData(contact);
        }
    }
});


yargs.parse();

// Fungsi untuk validasi kontak
function validateContact(contact) {
    // Validasi nama 
    if (isNameDuplicate(contact.name)) {
        console.log("namanya sudah ada");
        return false;
    }

    // Validasi email 
    if (contact.email && !validator.isEmail(contact.email)) {
        console.log("emailnya salah");
        return false;
    }

    // Validasi nomor telepon 
    if (!validator.isMobilePhone(contact.mobile, 'id-ID')) {
        console.log("nomernya salah.");
        return false;
    }

    // Jika semua validasi lolos
    return true;
}

// Fungsi memeriksa duplikasi file
function isNameDuplicate(name) {
    try {
        const file = fs.readFileSync('data/contacts.json', "utf-8");
        const contacts = JSON.parse(file);

        // Memeriksa duplikasi
        return contacts.some(contact => contact.name === name);
    } catch (err) {
        console.error("Error reading file:", err);
        return false;
    }
}

// Fungsi membaca menambahkan data baru
function readFileAndCombineData(newData) {
    if (!validateContact(newData)) {
        
        return;
    }
    
    try {
        // Membaca file
        const file = fs.readFileSync('data/contacts.json', "utf-8");
        const contacts = JSON.parse(file);

        // Menambahkan data 
        contacts.push(newData);

        // Menulis file
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

        console.log("Contact saved successfully.");
    } catch (err) {
        console.error("Error reading or writing file:", err);
    }
}
