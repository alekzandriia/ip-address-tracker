const ipAddress = document.getElementById('ip-address');
const locations = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const search = document.getElementById('search');
let lat;
let lng;

// init map with current geolocation data
const map = L.map('map')
map.locate({setView:true, watch:false, maxZoom: 17})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// get ip location info & update map location
function locate (e) {
  e.preventDefault()

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // get value that user types in the form input
  let userQuery = document.getElementById('search-input').value

  // search api with user query
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_41hfunnlRDf1tDkDTlA8vkxY0h0Gb&ipAddress=${userQuery}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      ipAddress.textContent = `${result.ip}`;
      locations.textContent = `${result.location.city}`;
      timezone.textContent = `${result.location.timezone} UTC`;
      isp.textContent = `${result.isp}`;
      lat = result.location.lat;
      lng = result.location.lng;
      map.setView([`${lat}`, `${lng}`], 13)
    })
    .catch(error => console.log('error', error));
}

// Get ip info on page load
window.addEventListener('load', locate)

// Update ip info on form submit
search.addEventListener('submit', locate)









