let currentContactIndex;

        // Fungsi untuk menampilkan form tambah kontak
        function showAddContactForm() {
            document.getElementById("addContactForm").style.display = "block"; // Tampilkan form
            document.getElementById("overlay").style.display = "block"; // Tampilkan overlay
        }

        // Fungsi untuk menyembunyikan form tambah kontak
        function hideAddContactForm() {
            document.getElementById("addContactForm").style.display = "none"; // Sembunyikan form
            document.getElementById("overlay").style.display = "none"; // Sembunyikan overlay
        }

        // Fungsi untuk menampilkan detail kontak
        function showDetails(name, email, mobile, index) {
            currentContactIndex = index; // Simpan index kontak saat ini
            const detailText = `Nama: ${name}<br>Email: ${email}<br>Nomor: ${mobile}`;
            document.getElementById("detailText").innerHTML = detailText; // Tampilkan detail di elemen
            document.getElementById("detailContact").style.display = "block"; // Tampilkan pop-up detail
            document.getElementById("overlay").style.display = "block"; // Tampilkan overlay
        }

        // Fungsi untuk menyembunyikan detail kontak
        function hideDetailContact() {
            document.getElementById("detailContact").style.display = "none"; // Sembunyikan detail
            document.getElementById("overlay").style.display = "none"; // Sembunyikan overlay
        }

        // Fungsi untuk menambahkan kontak baru
        function addContact() {
            const name = document.getElementById("newName").value; // Ambil nama dari input
            const email = document.getElementById("newEmail").value; // Ambil email dari input
            const mobile = document.getElementById("newMobile").value; // Ambil nomor telepon dari input

            // Kirim data kontak baru ke server
            fetch('/contacts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, mobile }), // Mengubah data menjadi JSON
            })
            .then(response => response.json()) // Mengambil respon dari server
            .then(data => {
                alert(data.message); // Tampilkan pesan dari server
                location.reload(); // Muat ulang halaman untuk menampilkan kontak terbaru
            })
            .catch(error => console.error('Error:', error)); // Tangani error
        }

        // Fungsi untuk mengedit kontak
        function editContact() {
            const name = document.getElementById("detailText").innerText.split("Nama: ")[1].split("\n")[0];
            const email = document.getElementById("detailText").innerText.split("Email: ")[1].split("\n")[0];
            const mobile = document.getElementById("detailText").innerText.split("Nomor: ")[1].trim();

            const newName = prompt("Masukkan nama baru:", name); // Prompt untuk memasukkan nama baru
            const newEmail = prompt("Masukkan email baru:", email); // Prompt untuk memasukkan email baru
            const newMobile = prompt("Masukkan nomor baru:", mobile); // Prompt untuk memasukkan nomor baru

            if (newName && newEmail) { // Pastikan nama dan email baru ada
                // Kirim data yang diperbarui ke server
                fetch(`/contacts/update/${currentContactIndex}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newName, email: newEmail, mobile: newMobile }), // Mengubah data menjadi JSON
                })
                .then(response => response.json()) // Mengambil respon dari server
                .then(data => {
                    alert(data.message); // Tampilkan pesan dari server
                    location.reload(); // Muat ulang halaman untuk menampilkan kontak terbaru
                })
                .catch(error => console.error('Error:', error)); // Tangani error
            }
        }

        // Fungsi untuk menghapus kontak
        function deleteContact() {
            if (confirm("Yakin ingin menghapus kontak ini?")) { // Konfirmasi sebelum menghapus
                // Kirim permintaan untuk menghapus kontak ke server
                fetch(`/contacts/delete/${currentContactIndex}`, {
                    method: 'DELETE',
                })
                .then(response => response.json()) // Mengambil respon dari server
                .then(data => {
                    alert(data.message); // Tampilkan pesan dari server
                    location.reload(); // refresh untuk menampilkan kontak terbaru
                })
                .catch(error => console.error('Error:', error)); // Tangani error
            }
        }

        // Fungsi untuk mencari nama kontak di tabel
        function searchTable() {
            const input = document.getElementById("searchBar").value.toLowerCase();
            const table = document.getElementById("contactsTable");
            const tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName("td")[0]; // Ambil kolom nama
                if (td) {
                    const txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(input) > -1) {
                        tr[i].style.display = ""; // Tampilkan baris jika cocok
                    } else {
                        tr[i].style.display = "none"; // Sembunyikan baris jika tidak cocok
                    }
                }
            }
        }

    
// <!-- Pop-up Detail: Ditambahkan tombol "Edit" dan "Delete" di dalam pop-up detail  -->
// <!-- showDetails Function: Mengambil kontak yang ditampilkan untuk digunakan saat mengedit atau menghapus -->
// <!-- editContact Function: Mengambil data yang ada dari pop-up untuk pengeditan -->
// <!-- deleteContact Function: Menggunakan kontak saat ini untuk menghapus kontak yang sesuai -->
// <!-- searchTable Funtion : mencari data dari tabel berdasarakan nama -->