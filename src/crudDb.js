let currentContact = {};

// Fungsi untuk menampilkan form tambah kontak
function showAddContactForm() {
    document.getElementById("addContactForm").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Fungsi untuk menyembunyikan form tambah kontak
function hideAddContactForm() {
    document.getElementById("addContactForm").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Fungsi untuk menampilkan detail kontak
function showDetails(name, email, mobile) {
    currentContact = { name, email, mobile };
    const detailText = `Nama: ${name}<br>Email: ${email}<br>Nomor: ${mobile}`;
    document.getElementById("detailText").innerHTML = detailText;
    document.getElementById("detailContact").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Fungsi untuk menyembunyikan detail kontak
function hideDetailContact() {
    document.getElementById("detailContact").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Fungsi untuk menambahkan kontak baru
function addContact() {
    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const mobile = document.getElementById("newMobile").value;

    fetch('/contacts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mobile }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => console.error('Error:', error));
}

// Fungsi untuk mengedit kontak
function editContact() {
    const newName = prompt("Nama baru:", currentContact.name);
    const newEmail = prompt("Email baru:", currentContact.email);
    const newMobile = prompt("Nomor baru:", currentContact.mobile);

    if (newName && newEmail && newMobile) {
        fetch(`/contacts/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldName: currentContact.name, oldEmail: currentContact.email, oldMobile: currentContact.mobile, name: newName, email: newEmail, mobile: newMobile }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fungsi untuk menghapus kontak
function deleteContact() {
    if (confirm("Yakin menghapus kontak ini?")) {
        fetch(`/contacts/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: currentContact.name, email: currentContact.email, mobile: currentContact.mobile }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fungsi untuk mencari nama di tabel
function searchTable() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const table = document.getElementById("contactsTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(input) > -1 ? "" : "none";
        }
    }
}

// <!-- showDetails Function: Mengambil kontak yang ditampilkan untuk digunakan saat mengedit atau menghapus -->
// <!-- editContact Function: Mengambil data yang ada dari pop-up untuk pengeditan -->
// <!-- deleteContact Function: Menggunakan kontak saat ini untuk menghapus kontak yang sesuai -->
// <!-- searchTable Funtion : mencari data dari tabel berdasarakan nama -->
// <!-- Fungsi fetch untuk mengirimkan permintaan HTTP secara asinkron tanpa perlu memuat ulang halaman  -->