/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2V0c29tZTc4NiIsImEiOiJjazV4Ym5uaW0wazJsM25ta21mMzhmaHpwIn0.Z5P7zcD2rNyx3VuluoXVQA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/getsome786/ck5xbswud0ksx1in4meiia98e',
    scrollZoom: false
    //   center: [136.997638, 35.164618],
    //   zoom: 10
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    //
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    bounds.extend(loc.coordinates);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}<p>`)
      .addTo(map);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
