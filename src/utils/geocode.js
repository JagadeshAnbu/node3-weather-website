const axios = require('axios');

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}&proximity=0,0&access_token=pk.eyJ1IjoiamFnYWRlc2gwNyIsImEiOiJjbTB1dHkwZ3EwYjF5MmxzZTE5eDFveHN4In0.W9A7svv6ozS8Mlxr18l40w&limit=1`;

  axios.get(url)
    .then(response => {
      const features = response.data.features;
      //  console.log(features)

      if (features && features.length > 0) {
        const latitude = features[0].geometry.coordinates[1];
        const longitude = features[0].geometry.coordinates[0];
        const location = features[0].properties.full_address;
        // console.log(location)
        callback(null, { latitude, longitude, location });
      } else {
        callback("No features found in the response", null);
      }
    })
    .catch(error => {
      if (error.response) {
        callback(`Error: ${error.response.data.message || "Invalid response from server"}`, null);
      } else if (error.request) {
        callback("Error: No response received from the server", null);
      } else {
        callback(`Error: ${error.message}`, null);
      }
    });
}

module.exports = geocode;
