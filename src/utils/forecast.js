const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const apiKey = '3df207d375d5236f15f290a973c6c6ee';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(url)
        .then(response => {
            const { main, visibility, timezone } = response.data;
            callback(null, `The temperature is ${main.temp}°C, humitity is ${main.humidity}, visibility is ${visibility} meters, and the timezone is ${timezone} `);
        })
        .catch(error => {
            callback(`Error fetching data: ${error}`, null);
        });
}

module.exports = forecast; 
