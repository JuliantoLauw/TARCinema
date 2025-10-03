$(document).ready(function() {

    const SEAT_PRICE = 45000;
    const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const COLUMNS = 10;

    let selectedSeats = [];

    const DUMMY_SEAT_DATA = [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    function renderSeatMap(data) {
        const $seatMap = $('#seat-map');
        $seatMap.empty();

        for (let i = 0; i < ROWS.length; i++) {
            const rowLabel = ROWS[i];

            $seatMap.append(`<div class="row-label">${rowLabel}</div>`);

            for (let j = 1; j <= COLUMNS; j++) {
                const seatId = `${rowLabel}${j}`;
                const isOccupied = data[i][j - 1] === 1;
                const statusClass = isOccupied ? 'occupied' : 'available';

                const $seat = $(`
                    <div class="seat ${statusClass}" data-seat-id="${seatId}">
                        ${j}
                    </div>
                `);

                $seatMap.append($seat);
            }

            $seatMap.append(`<div class="row-label">${rowLabel}</div>`);
        }
    }

    function updateSummary() {
        const count = selectedSeats.length;
        const total = count * SEAT_PRICE;

        $('#seat-count').text(count);

        const totalFormatted = `Rp ${total.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
        $('#total-price').text(totalFormatted);

        const $list = $('#selected-seats-list');
        $list.empty();

        if (count === 0) {
            $list.append('<li class="placeholder">Pilih kursi yang tersedia.</li>');
            $('#checkout-btn').prop('disabled', true);
        } else {
            selectedSeats.sort().forEach(seat => {
                const priceFormatted = `Rp ${SEAT_PRICE.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
                $list.append(`<li>Kursi ${seat} (${priceFormatted})</li>`);
            });
            $('#checkout-btn').prop('disabled', false);
        }
    }

    $('#seat-map').on('click', '.seat.available', function() {
        const $seat = $(this);
        const seatId = $seat.data('seat-id');

        if ($seat.hasClass('selected')) {
            $seat.removeClass('selected');
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        }
        else {
            $seat.addClass('selected');
            selectedSeats.push(seatId);
        }

        updateSummary();
    });

    const $cinema = $('#select-cinema');
    const $date = $('#select-date');
    const $time = $('#select-time');

    function checkShowtimeSelected() {
        const cinemaText = $cinema.find('option:selected').text();
        const timeText = $time.val();

        $('#summary-cinema').text(cinemaText !== 'Pilih Bioskop' ? cinemaText : '-');
        $('#summary-time').text(($date.val() && timeText) ? `${$date.val()} | ${timeText}` : '-');

        if ($cinema.val() && $date.val() && $time.val()) {
            selectedSeats = [];
            renderSeatMap(DUMMY_SEAT_DATA);
            updateSummary();
        } else {
            $('#seat-map').empty().append('<p class="initial-prompt">Pilih waktu tayang di atas untuk menampilkan denah kursi.</p>');
            selectedSeats = [];
            updateSummary();
        }
    }

    $cinema.on('change', checkShowtimeSelected);
    $date.on('change', checkShowtimeSelected);
    $time.on('change', checkShowtimeSelected);

    updateSummary();
    $('#checkout-btn').on('click', function() {
      // Ambil data dari halaman
      const cinema = $('#select-cinema option:selected').text();
      const date = $('#select-date').val();
      const time = $('#select-time').val();
      const movieTitle = $('.showtime-header h1').text().replace('Film Pilihan Anda: ', '').trim(); // Asumsi judul ada di h1
      const total = $('#total-price').text();

      // Buat objek pesanan
      const orderDetails = {
          movieTitle: movieTitle || 'Demo Film A', // Fallback jika judul tidak ditemukan
          cinema: cinema,
          showtime: `${date} | ${time}`,
          seats: selectedSeats, // Ambil dari variabel global 'selectedSeats' yang sudah ada
          totalPriceText: total,
          totalPriceValue: selectedSeats.length * SEAT_PRICE
      };

      // Simpan di sessionStorage untuk diambil di halaman checkout
      sessionStorage.setItem('TARCinemaOrder', JSON.stringify(orderDetails));

      // Arahkan ke halaman checkout
      window.location.href = 'checkout.html';
  });

});
