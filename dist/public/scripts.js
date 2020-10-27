mapboxgl.accessToken = 'pk.eyJ1IjoiZmlvcmVsbzExIiwiYSI6ImNrZTA0NWIycDA3YmUyenA5YWM5NzRzcDMifQ.ZpmfuUWR-3_15jYJGWQkhw';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [19.819025, 41.327953],
  zoom: 12,
});

const btn = document.querySelector('#btnPosts');

btn.addEventListener('click', () => {
  getLocation();
});

async function getPosts() {
  return await fetch('/api/post')
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

async function getLocation() {
  let posts = await getPosts();

  posts = posts.map((post) => {
    return { ...post, location: post.location.split(',') }
  })

  const bounds = new mapboxgl.LngLatBounds();

  posts.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({ element: el, anchor: 'bottom'})
      .setLngLat(loc.location)
      .addTo(map);

    bounds.extend(loc.location);

    new mapboxgl.Popup({ offset: 30, })
      .setLngLat(loc.location)
      .setHTML(`
        <div style ="text-align: center; max-width: 90px; font-size: 10px;">
            <img src="shop.svg" style="max-width: 30px">
            <h2>${loc.name}</h2>
            <p>${loc.description}</p>
        </div>`)
      .addTo(map);
  });
}




