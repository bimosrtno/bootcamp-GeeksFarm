const yargs = require('yargs');
const { processContacts, addContact, deleteContact, updateContact } = require('./func-yargs.js');

//  menambahkan contact
yargs.command({
  command: 'add',
  describe: 'Add new contact',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Contact Email',
      demandOption: false,
      type: 'string'
    },
    mobile: {
      describe: 'Contact Mobile Phone Number',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile
    };
    addContact(contact);
  }
})

//  menampilkan semua contact
.command({
  command: 'list',
  describe: 'List all contacts',
  handler() {
    processContacts();
  }
})

// menampilkan detail contact berdasarkan nama
.command({
  command: 'detail',
  describe: 'Get contact details by name',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    processContacts(argv.name);
  }
})

// menghapus contact berdasarkan nama
.command({
  command: 'delete',
  describe: 'Delete contact by name',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.name);
  }
})

// memperbarui contact berdasarkan nama
.command({
  command: 'update',
  describe: 'Update contact by name',
  builder: {
    name: {
      describe: 'Current Contact Name',
      demandOption: true,
      type: 'string'
    },
    newname: {
      describe: 'New Contact Name',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'New Contact Email',
      demandOption: false,
      type: 'string'
    },
    mobile: {
      describe: 'New Contact Mobile Phone Number',
      demandOption: false,
      type: 'string'
    }
  },
  handler(argv) {
    const updatedData = {
      name: argv.newname,
      email: argv.email,
      mobile: argv.mobile
    };
  
    updateContact(argv.name, updatedData);
  }
})

.parse();

// comand cli
// list = menampilkan semua contact
// add = menambah concatact
// delete = menghapus contact
// detail = menampilkan detail contact
// update = memperbarui contact