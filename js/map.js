// Initialise la carte Leaflet
map = L.map('map').setView([48.8566, 2.3522], 13);

// // Ajouter les tuiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// // Ajouter un marqueur
// L.marker([48.8566, 2.3522]).addTo(map)
//   .bindPopup('Bienvenue à Paris !')
//   .openPopup();


 // Fonction pour déplacer la carte et ajouter un marqueur
function updateMap(lat, lng, ville) {
  // Déplace la vue de la carte aux nouvelles coordonnées
  map.setView([lat, lng], 13);

  // Ajoute un marqueur aux nouvelles coordonnées
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`${ville}`)
    .openPopup();
}
 