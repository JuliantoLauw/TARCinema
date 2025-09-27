const DEMO_MOVIES = [
  { id:'m1', title:'Demo Film A', poster:'assets/posters/kimetsu.jpeg', synopsis:'Sinopsis A', duration:'120m', genre:'Action', rating:'13+' },
  { id:'m2', title:'Demo Film B', poster:'assets/posters/avenger.jpg', synopsis:'Sinopsis B', duration:'110m', genre:'Drama', rating:'17+' },
  { id:'m3', title:'Demo Film C', poster:'assets/posters/avengerdoomsday.jpg', synopsis:'Sinopsis C', duration:'90m', genre:'Comedy', rating:'SU' },
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
      <img src="${m.poster}" alt="${m.title}">
      <h3>${m.title}</h3>
      <p class="muted">${m.genre} • ${m.rating}</p>
      <p><a class="btn" href="?id=${m.id}">Detail</a></p>
    </div>`;
    (i<2 ? nowPlaying : coming).append(html);
  });

  $('#searchInput').on('input', function(){
    const q = $(this).val().toLowerCase();
    $('.card').each(function(){
      const t = $(this).find('h3').text().toLowerCase();
      $(this).toggle(t.indexOf(q)>=0);
    });
  });
}