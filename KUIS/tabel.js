const data = [
    { no: 1, nama: "Putri Wahyuni", nim: "2310271", jurusan: "Sistem Informasi Kelautan" },
    { no: 2, nama: "Nuril Khairiyah", nim: "2300231", jurusan: "Sistem Informasi" },
    { no: 3, nama: "Shinta", nim: "2388421", jurusan: "Teknik Informatika" },
    { no: 4, nama: "Mahen", nim: "2398721", jurusan: "Manajemen" },
    { no: 5, nama: "Budi", nim: "2381231", jurusan: "Akuntansi" }
];

const colors = ['highlight-purple', 'highlight-green', 'highlight-blue', 'highlight-yellow', 'highlight-red'];

const tbody = document.querySelector("#myTable tbody");

data.forEach((item, index) => {
    const row = document.createElement("tr");

    // Menambahkan kolom dengan logika yang diberikan
    for (let i = 0; i < 5; i++) {
        const cell = document.createElement("td");
        let text = '';

        // Tentukan isi dari setiap kolom
        switch (i) {
            case 0:
                text = item.no;
                // Menambahkan event listener untuk kolom "No" agar mendeteksi keydown
                cell.tabIndex = 0; // Membuat cell dapat di-fokus untuk menerima keydown
                cell.textContent = text;
                cell.addEventListener("keydown", function (event) {
                    console.log(`Key pressed in No column: ${event.key}`); // Mencetak tombol yang ditekan di konsol
                });
                break;
            case 1:
                text = item.nama;
                break;
            case 2:
                text = item.nim;
                break;
            case 3:
                text = item.jurusan;
                break;
            case 4:
                // Membuat cell link
                const link = document.createElement("a");
                link.href = "#";
                link.id = `link${index + 1}`;
                link.textContent = "Lihat Profil";
                cell.appendChild(link);
                break;
            default:
                break;
        }

        if (i !== 4) {
            cell.textContent = text; // Set text content untuk kolom yang bukan link
        }

        // Tambahkan cell ke dalam baris
        row.appendChild(cell);
    }

    // Tambahkan baris ke dalam tbody
    tbody.appendChild(row);

    // Event listener pada kolom "Nama"
    row.querySelector(`td:nth-child(2)`).addEventListener('click', function () {
        // Tampilkan pop-up dengan informasi mahasiswa
        alert(`Nama: ${item.nama}\nNIM: ${item.nim}\nJurusan: ${item.jurusan}`);
        
        // Hapus semua warna dari baris sebelumnya
        document.querySelectorAll("#myTable tbody tr").forEach(tr => {
            tr.classList.remove(...colors);
        });
        // Tambahkan warna berbeda berdasarkan indeks
        row.classList.add(colors[index % colors.length]);
    });

    // Event listener pada link "Lihat Profil"
    const linkButton = row.querySelector(`a[id="link${index + 1}"]`);
    linkButton.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah navigasi link
        // Ubah warna latar belakang baris yang diklik
        row.classList.toggle(colors[index % colors.length]);
    });

    // Event listener untuk mouseover
    row.addEventListener('mouseover', function () {
        row.classList.add('highlight-blue'); // Tambahkan kelas warna saat mouse berada di atas
    });

    // Event listener untuk mouseout
    row.addEventListener('mouseout', function () {
        row.classList.remove('highlight-blue'); // Hapus kelas warna saat mouse keluar
    });

    // Event listener untuk shake saat baris di-klik
    row.addEventListener('click', function () {
        // Tambahkan kelas shake
        row.classList.add('shake');

        // Hapus kelas shake setelah 0.5 detik
        setTimeout(() => {
            row.classList.remove('shake');
        }, 500);
    });

    // Event listener untuk double click pada jurusan
    row.querySelector(`td:nth-child(4)`).addEventListener('dblclick', function () {
        // Tampilkan pop-up dengan informasi jurusan
        alert(`Jurusan: ${item.jurusan}\nNama: ${item.nama}\nNIM: ${item.nim}`);

        // Tambahkan kelas shake saat jurusan di-double click
        row.classList.add('shake');

        // Hapus kelas shake setelah 0.5 detik
        setTimeout(() => {
            row.classList.remove('shake');
        }, 500);
    });
});

// Tambahkan event listener pada judul tabel
document.getElementById("tableTitle").addEventListener('click', function () {
    const table = document.getElementById("myTable");
    table.classList.toggle("small-table"); // Toggle kelas untuk mengecilkan tabel
    table.classList.toggle("blue-background"); // Toggle kelas untuk mengubah latar belakang
});
