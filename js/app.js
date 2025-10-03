const DEMO_MOVIES = [
  { 
    id:'m1', 
    title:'Demo Film A', 
    poster:'assets/posters/kimetsu.jpeg', 
    synopsis:'Sinopsis A', 
    duration:'120m', 
    genre:'Action', 
    rating:'13+', 
    director:'Haruo Sotozaki', 
    actors:'Natsuki Hanae, Akari Kito', 
    trailer:'https://www.youtube.com/embed/2MKkj1DQ0NU' 
  },
  { 
    id:'m2', 
    title:'Demo Film B', 
    poster:'assets/posters/avenger.jpg', 
    synopsis:'Sinopsis B', 
    duration:'110m', 
    genre:'Drama', 
    rating:'17+', 
    director:'Joss Whedon', 
    actors:'Robert Downey Jr., Chris Evans, Scarlett Johansson', 
    trailer:'https://www.youtube.com/embed/eOrNdBpGMv8' 
  },
  { 
    id:'m3', 
    title:'Demo Film C', 
    poster:'assets/posters/avengerdoomsday.jpg', 
    synopsis:'Sinopsis C', 
    duration:'90m', 
    genre:'Comedy', 
    rating:'SU', 
    director:'John Doe', 
    actors:'Jane Doe, Jack Smith', 
    trailer:'https://www.youtube.com/embed/dQw4w9WgXcQ' 
  },
];

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
function formatRp(n){ return n.toLocaleString('id-ID'); }

function renderHome(){
  const nowPlaying = $('#nowPlaying');
  const coming = $('#comingSoon');
  nowPlaying.empty(); coming.empty();
  DEMO_MOVIES.forEach((m,i)=>{
    const html = `<div class="card">
    <a href="film-detail.html?id=${m.id}">
      <img src="${m.poster}" alt="${m.title}">
    </a>
    <h3>${m.title}</h3>
    <p class="muted">${m.genre} • ${m.rating}</p>
    </div>`;
  (i<2 ? nowPlaying : coming).append(html);
    // const html = `<div class="card">
    //   <img src="${m.poster}" alt="${m.title}">
    //   <h3>${m.title}</h3>
    //   <p class="muted">${m.genre} • ${m.rating}</p>
    //   <p>
    //     <a class="btn" href="detail.html?id=${m.id}">Detail</a>
    //   </p>
    // </div>`;
    // (i<2 ? nowPlaying : coming).append(html);
  });

  $('#searchInput').on('input', function(){
    const q = $(this).val().toLowerCase();
    $('.card').each(function(){
      const t = $(this).find('h3').text().toLowerCase();
      $(this).toggle(t.indexOf(q)>=0);
    });
  });
}

function renderDetail() {
  const movieId = getQueryParam('id');
  if (!movieId) {
    $('#detailContainer').html('<p>Film tidak ditemukan.</p>');
    return;
  }

  const movie = DEMO_MOVIES.find(m => m.id === movieId);
  if (!movie) {
    $('#detailContainer').html('<p>Film tidak ditemukan.</p>');
    return;
  }

  const html = `
    <div class="detail-card">
      <div class="poster-col">
        <img src="${movie.poster}" alt="${movie.title}" class="poster-large">
      </div>
      <div class="detail-info">
        <h2>${movie.title}</h2>
        <p>
          <span class="badge">${movie.genre}</span>
          <span class="badge">${movie.duration}</span>
          <span class="badge">Rating: ${movie.rating}</span>
        </p>
        <a href="seat.html?id=${movie.id}" class="btn btn-primary">Beli Tiket</a>

        <h3>Sinopsis</h3>
        <p>${movie.synopsis}</p>

        <h3>Sutradara & Aktor</h3>
        <p><strong>Sutradara:</strong> ${movie.director || 'undefined'}</p>
        <p><strong>Aktor:</strong> ${movie.actors || 'undefined'}</p>

        <h3>Trailer</h3>
        <div class="trailer-box">
          ${movie.trailer 
            ? `
              <iframe width="100%" height="320"
                src="${movie.trailer}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
              <noscript>
                <p>Trailer tidak tersedia, 
                   <a href="${movie.trailer.replace('embed/', 'watch?v=')}" target="_blank">
                     Tonton di YouTube
                   </a>
                </p>
              </noscript>
            `
            : '<p>Tidak ada trailer</p>'
          }
        </div>
      </div>
    </div>
  `;

  $('#detailContainer').html(html);
}