
// menentukan nama tempat data disimpan di localStorage
const KUNCI_STORAGE = 'E_REPORT_DATA';

// 1. variabel global untuk menyimpan data laporan
let daftarLaporan = [];

// fungsi muat data ketika halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', muatData);

// READ => Mengambil data dari data.js
function muatData() {
    daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
    tampilkanDataTabel();
}

// menampilkan data ke halaman web
function tampilkanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');

    // memastikan tabel kosong
    tabelBody.innerHTML = '';

    // menampilkan baris data
    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    });
}

// membuat satu baris <tr> untuk satu laporan
function buatBarisLaporan(laporan) {
    const baris = document.createElement('tr');

    baris.innerHTML = `
        <td>
            <strong>${laporan.pelapor}</strong>
        </td>

        <td>${laporan.kategori}</td>

        <td>${laporan.deskripsi}</td>
         <td>
            <span class="badge-status pending">
                ${laporan.status}
            </span>
        </td>
    `;

    return baris;
}

// 3. CREATE => menambahkan data laporan baru dari form
function handleFormSubmit(event) {

    event.preventDefault();

    // mengambil isi form
    const form = event.target;
    const nama = form.reporter.value.trim();
    const kategori = form.category.value;
    const deskripsi = form.description.value.trim();

    // pengecekan value (validasi)
    if (!nama || !kategori || !deskripsi) {
        return console.log("Mohon lengkapi semua data!");
    }

    // membuat objek laporan baru
    const laporanBaru = {
        id: `rep-${Date.now()}`,
        pelapor: nama,
        kategori: kategori,
        deskripsi: deskripsi,
        status: 'menunggu'
    };

    // menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);

    // menyimpan ke dalam local storage
    simpanData();

    // menampilkan ulang tabel
    tampilkanDataTabel();

    // mengosongkan form
    form.reset();

    // sweet alert
   Swal.fire({
    title: 'Yeay! Berhasil!',
    text: 'Laporan kamu berhasil dikirim.',
    imageUrl: 'https://media.giphy.com/media/SFieoudjhGu7Fq3nPL/giphy.gif',
    imageWidth: 180,
    imageHeight: 180,
    imageAlt: 'Vibing animation',
    confirmButtonText: 'Oke!',
    confirmButtonColor: '#5784e0',
    background: '#f9fafb',
    color: '#172A46'
});
}

// proses menyimpan data ke local storage
function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan));
}
