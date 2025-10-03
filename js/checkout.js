$(document).ready(function() {
    const orderDetails = JSON.parse(sessionStorage.getItem('TARCinemaOrder'));
    let currentTotal = 0;

    // Jika tidak ada data pesanan, arahkan kembali ke home
    if (!orderDetails) {
        alert("Tidak ada data pesanan. Silakan pilih film terlebih dahulu.");
        window.location.href = 'index.html';
        return;
    }

    currentTotal = orderDetails.totalPriceValue;
    renderSummary(orderDetails, currentTotal);

    // Event listener untuk tombol voucher
    $('#apply-voucher-btn').on('click', function() {
        const voucherCode = $('#voucher-code').val().toUpperCase();
        const statusEl = $('#voucher-status');

        // Simulasi validasi voucher
        if (voucherCode === 'TARCINEMA50') {
            const discount = currentTotal * 0.5;
            currentTotal -= discount;
            statusEl.text('Voucher berhasil digunakan! Anda mendapat diskon 50%.').removeClass('error').addClass('success');
            renderSummary(orderDetails, currentTotal);
            $(this).prop('disabled', true); // Nonaktifkan tombol setelah dipakai
        } else {
            statusEl.text('Kode voucher tidak valid.').removeClass('success').addClass('error');
        }
    });

    // Event listener untuk tombol bayar
    $('#pay-btn').on('click', function() {
        // Simulasi proses pembayaran berhasil
        saveOrderToHistory(orderDetails); // Panggil fungsi baru untuk menyimpan riwayat

        $('#success-popup').removeClass('hidden');

        // Hapus data dari sessionStorage setelah berhasil
        sessionStorage.removeItem('TARCinemaOrder');
    });

    // Fungsi baru untuk menyimpan pesanan ke riwayat di localStorage
    function saveOrderToHistory(order) {
      // 1. Ambil data riwayat yang sudah ada, atau buat array kosong jika belum ada
      const history = JSON.parse(localStorage.getItem('TARCinemaHistory')) || [];

      // 2. Tambahkan detail baru ke objek pesanan
      order.bookingCode = `TAR-${Date.now()}`; // Buat kode booking unik
      order.status = 'Berhasil';
      order.orderDate = new Date().toISOString(); // Catat waktu pemesanan

      // 3. Tambahkan pesanan baru ke dalam array riwayat
      history.unshift(order); // unshift() agar data terbaru selalu di atas

      // 4. Simpan kembali array riwayat yang sudah diperbarui ke localStorage
      localStorage.setItem('TARCinemaHistory', JSON.stringify(history));
    }

    // Event listener untuk tombol tutup popup
    $('#close-popup-btn').on('click', function() {
        window.location.href = 'index.html';
    });

});

// Fungsi untuk menampilkan ringkasan pesanan
function renderSummary(details, total) {
    const formattedTotal = `Rp ${total.toLocaleString('id-ID')}`;
    const summaryCard = $('#summary-card');

    summaryCard.html(`
        <div class="summary-item">
            <span class="label">Film</span>
            <span class="value">${details.movieTitle}</span>
        </div>
        <div class="summary-item">
            <span class="label">Bioskop</span>
            <span class="value">${details.cinema}</span>
        </div>
        <div class="summary-item">
            <span class="label">Waktu</span>
            <span class="value">${details.showtime}</span>
        </div>
        <div class="summary-item">
            <span class="label">Kursi</span>
            <span class="value">${details.seats.join(', ')}</span>
        </div>
        <div class="summary-item summary-total">
            <span class="label">Total Bayar</span>
            <span class="value">${formattedTotal}</span>
        </div>
    `);
}
