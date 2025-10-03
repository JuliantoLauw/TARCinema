$(document).ready(function() {
    // Cek halaman mana yang sedang aktif
    if ($('#history-list-container').length) {
        renderHistoryList();
    }

    if ($('#ticket-container').length) {
        renderHistoryDetail();
    }
});

// --- LOGIKA UNTUK HALAMAN DAFTAR RIWAYAT ---
function renderHistoryList() {
    const history = JSON.parse(localStorage.getItem('TARCinemaHistory')) || [];
    const container = $('#history-list-container');

    if (history.length === 0) {
        $('#empty-history-msg').removeClass('hidden');
        return;
    }

    history.forEach(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString('id-ID', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        const historyItemHtml = `
            <a href="history-detail.html?bookingCode=${order.bookingCode}" class="history-item">
                <div class="history-info">
                    <h3>${order.movieTitle}</h3>
                    <p>${order.cinema}</p>
                    <p>${orderDate}</p>
                </div>
                <div class="history-status">
                    <span>${order.status}</span>
                </div>
            </a>
        `;
        container.append(historyItemHtml);
    });
}


// --- LOGIKA UNTUK HALAMAN DETAIL TIKET ---
function renderHistoryDetail() {
    const bookingCode = new URLSearchParams(window.location.search).get('bookingCode');
    const history = JSON.parse(localStorage.getItem('TARCinemaHistory')) || [];
    const order = history.find(o => o.bookingCode === bookingCode);

    if (!order) {
        $('#error-msg').removeClass('hidden');
        return;
    }

    // Ganti judul halaman
    document.title = `Tiket ${order.movieTitle} - TARCinema`;

    const ticketHtml = `
        <div class="ticket-header">
            <h3>${order.movieTitle}</h3>
        </div>
        <div class="ticket-body">
            <div class="booking-code">
                <span class="label">Kode Booking</span>
                <p class="code">${order.bookingCode}</p>
                <div class="qr-placeholder">

[Image of a QR code]
</div>
            </div>
            <div class="ticket-details">
                <div class="detail-item">
                    <span class="label">Bioskop</span>
                    <span class="value">${order.cinema}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Tanggal & Jam</span>
                    <span class="value">${order.showtime}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Kursi</span>
                    <span class="value">${order.seats.join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Total Bayar</span>
                    <span class="value">${order.totalPriceText}</span>
                </div>
            </div>
        </div>
        <div class="ticket-footer">
            Tunjukkan kode ini kepada petugas di bioskop.
        </div>
    `;

    $('#ticket-container').html(ticketHtml);
}
