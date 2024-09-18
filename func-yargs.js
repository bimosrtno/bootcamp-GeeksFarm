const fs = require('fs');
const validator = require('validator');

// membaca file JSON 
const processContacts = (name) => {
  fs.readFile('data/contacts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const contacts = JSON.parse(data);

      if (name) {
        const result = contacts.find(contact => contact.name === name);
        if (result) {
          console.log('Data ditemukan');
          console.log(`Name: ${result.nama}`);
          console.log(`Email: ${result.email}`);
          console.log(`Phone: ${result.mobile}`);
        } else {
          console.log('Data tidak ditemukan');
        }
      } else {
        contacts.forEach(contact => {
          console.log('Name:', contact.name);
          console.log('Email:', contact.email);
          console.log('Phone:', contact.mobile);
          console.log('---');
        });
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
};

// menambahkan contact baru
const addContact = (contact) => {
  if (!validateContact(contact)) {
    return;
  }

  try {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log('Data berhasil disimpan');
  } catch (err) {
    console.error('Error saving file:', err);
  }
};

//menghapus Contact berdasarkan nama
const deleteContact = (name) => {
  fs.readFile('data/contacts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const contacts = JSON.parse(data);

      const index = contacts.findIndex(contact => contact.name === name);

      if (index !== -1) {
        contacts.splice(index, 1);

        fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), (err) => {
          if (err) {
            console.error('Error writing file:', err);
          } else {
            console.log('Kontak berhasil dihapus');
          }
        });
      } else {
        console.log('Data tidak ditemukan');
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
};

// memperbarui contact berdasarkan nama
const updateContact = (oldName, updatedData) => {
  fs.readFile('data/contacts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      const contactIndex = contacts.findIndex(contact => contact.name === oldName);

      if (contactIndex !== -1) {
        // Update data kontak yang ditemukan
        if (updatedData.name) {
          contacts[contactIndex].name = updatedData.name;
        }
        if (updatedData.email) {
          contacts[contactIndex].email = updatedData.email;
        }
        if (updatedData.mobile) {
          contacts[contactIndex].mobile = updatedData.mobile;
        }

        // Simpan perubahan ke file
        fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2), 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return;
          }
          console.log('Kontak berhasil diperbarui');
        });
      } else {
        console.log('Data tidak ditemukan');
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
};

// Fungsi untuk validasi kontak
const validateContact = (contact) => {
  if (isNameDuplicate(contact.name)) {
    console.log('Nama sudah ada');
    return false;
  }

  if (contact.email && !validator.isEmail(contact.email)) {
    console.log('Email tidak valid');
    return false;
  }

  if (contact.mobile && !validator.isMobilePhone(contact.mobile, 'id-ID')) {
    console.log('Nomor telepon tidak valid');
    return false;
  }

  return true;
};

// Fungsi memeriksa duplikasi nama
const isNameDuplicate = (name) => {
  try {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts.some(contact => contact.name === name);
  } catch (err) {
    console.error('Error reading file:', err);
    return false;
  }
};

// Ekspor fungsi
module.exports = {
  processContacts,
  addContact,
  deleteContact,
  updateContact
};