const express = require("express");
const fs = require("fs");
const ejsLayout = require("express-ejs-layouts");
const validator = require('validator');

const app = express();
const port = 3000;

// Pengaturan view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(ejsLayout);
app.set("layout", "layout/layouts");

// Menyajikan file statis (gambar)
app.use(express.static("image"));

// Middleware untuk logging
app.use((req, res, next) => {
    console.log("TIme:", Date.now());
    next();
});

// Middleware untuk parsing JSON
app.use(express.json());

// Fungsi untuk membaca kontak dari JSON
const readContacts = () => {
    const data = fs.readFileSync("./data/contacts.json", "utf-8");
    return JSON.parse(data);
};

// Fungsi untuk menyimpan kontak ke JSON
const saveContacts = (contacts) => {
    fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts, null, 2));
};

// Rute untuk memperbarui kontak berdasarkan indeks
app.post("/contacts/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const { name, email, mobile } = req.body;

    const contacts = readContacts();

    if (index >= 0 && index < contacts.length) {
        contacts[index].name = name;
        contacts[index].email = email;
        contacts[index].mobile = mobile;
        saveContacts(contacts);
        return res.json({ message: "Kontak berhasil diperbarui" });
    }

    res.status(404).json({ message: "Kontak tidak ditemukan" });
});

// Rute untuk menghapus kontak berdasarkan indeks
app.delete("/contacts/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);

    const contacts = readContacts();

    if (index >= 0 && index < contacts.length) {
        contacts.splice(index, 1);
        saveContacts(contacts);
        return res.json({ message: "Kontak berhasil dihapus" });
    }

    res.status(404).json({ message: "Kontak tidak ditemukan" });
});

// Rute untuk menampilkan halaman kontak
app.get("/contact", (req, res) => {
    const contacts = readContacts();
    const message = contacts.length === 0 ? "Data kosong" : null;
    res.render("contact", { contacts, title: "Halaman Kontak", message });
});

// Rute untuk menangani halaman utama
app.get("/", (req, res) => {
    const nama = "bimo";
    res.render("index", { nama, title: "Halaman Utama" });
});

// Rute untuk halaman tentang
app.get("/about", (req, res) => {
    res.render("about", { title: "Halaman Tentang" });
});

// Rute untuk menambahkan kontak baru
app.post("/contacts/add", (req, res) => {
    const { name, email, mobile } = req.body;
    const newContact = { name, email, mobile };

    if (!validateContact(newContact)) {
        return res.status(400).json({ message: "Kontak tidak valid" });
    }

    const contacts = readContacts();
    contacts.push(newContact);
    saveContacts(contacts);
    res.json({ message: "Kontak berhasil ditambahkan" });
});

// Validasi kontak
const validateContact = (contact) => {
    if (isNameDuplicate(contact.name)) {
        console.log('Nama sudah ada');
        return false;
    }

    if (contact.email && !validator.isEmail(contact.email)) {
        console.log('Email tidak valid');
        return false;
    }

    return true;
};

// Memeriksa duplikasi nama
const isNameDuplicate = (name) => {
    const contacts = readContacts();
    return contacts.some(contact => contact.name === name);
};

// Penanganan 404
app.use((req, res) => {
    res.status(404).send("Tidak ditemukan: 404");
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Berjalan di port ${port}`);
});
