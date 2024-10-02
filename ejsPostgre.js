const express = require("express");
const ejsLayout = require("express-ejs-layouts");
const validator = require('validator');
// impor data postgre dari file db.js
const pool = require("./db.js");
const app = express();
const port = 3000;

// Pengaturan view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(ejsLayout);
app.set("layout", "layout/layouts");

// file stastis
app.use(express.static("image"), express.static("src"), express.static("cssEjs"));

// Middleware 
app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});

// Middleware untuk parsing JSON
app.use(express.json());

// Baca semua kontak dari database PostgreSQL
const readContacts = async () => {
    const result = await pool.query('SELECT * FROM contacts ORDER BY name ASC');
    return result.rows;
};

// Menyimpan kontak baru ke postgresql
const saveContact = async (name, email, mobile) => {
    await pool.query('INSERT INTO contacts (name, email, mobile) VALUES ($1, $2, $3)', [name, email, mobile]);
};

// Memperbarui kontak di postgresql
const updateContact = async (oldName, oldEmail, oldMobile, name, email, mobile) => {
    await pool.query('UPDATE contacts SET name = $1, email = $2, mobile = $3 WHERE name = $4 AND email = $5 AND mobile = $6', 
        [name, email, mobile, oldName, oldEmail, oldMobile]);
};

// Menghapus kontak di postgresql
const deleteContact = async (name, email, mobile) => {
    await pool.query('DELETE FROM contacts WHERE name = $1 AND email = $2 AND mobile = $3', [name, email, mobile]);
};

// Rute untuk menampilkan halaman kontak
app.get("/contact", async (req, res) => {
    try {
        const contacts = await readContacts();
        const message = contacts.length === 0 ? "Data kosong" : null;
        res.render("contact", { contacts, title: "Halaman Kontak", message });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data kontak" });
    }
});

// Rute untuk menambahkan kontak baru
app.post("/contacts/add", async (req, res) => {
    const { name, email, mobile } = req.body;

    if (!validateContact({ name, email, mobile })) {
        return res.status(400).json({ message: "Kontak tidak valid" });
    }

    try {
        await saveContact(name, email, mobile);
        res.json({ message: "Kontak berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Kesalahan saat menambahkan kontak tolong periksa lagi" });
    }
});

// Rute untuk memperbarui kontak berdasarkan kombinasi `name`, `email`, dan `mobile`
app.post("/contacts/update", async (req, res) => {
    const { oldName, oldEmail, oldMobile, name, email, mobile } = req.body;

    if (!validateContact({ name, email, mobile })) {
        return res.status(400).json({ message: "Kontak tidak valid, periksa lagi" });
    }

    try {
        await updateContact(oldName, oldEmail, oldMobile, name, email, mobile);
        res.json({ message: "Kontak berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui kontak" });
    }
});

// Rute untuk menghapus kontak berdasarkan kombinasi `name`, `email`, dan `mobile`
app.delete("/contacts/delete", async (req, res) => {
    const { name, email, mobile } = req.body;

    try {
        await deleteContact(name, email, mobile);
        res.json({ message: "Berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus kontak" });
    }
});

// Validasi kontak
const validateContact = (contact) => {
    if (contact.email && !validator.isEmail(contact.email)) {
        console.log('Email tidak valid');
        return false;
    }
    return true;
};

// Error handling
app.use((req, res) => {
    res.status(404).send("Tidak ditemukan: 404");
});

// Menjalankan server
app.listen(port, () => {
    console.log(`berjalan di port ${port}`);
});