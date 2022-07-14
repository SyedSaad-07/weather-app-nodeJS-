const request = require('request');

const forecast = (address, callback) => {

    const URL = 'http://api.weatherstack.com/current?access_key=7b1b27be0844343759f6431cf3a6e071&query='+address;

    // request({},(error, response)) =>
    request({url: URL, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to Weather services! ',undefined);
        }else if (response.body.error){
            callback('Unable to find weather of this location. Try another search!')
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+ '. It is currently '+response.body.current.temperature+' degrees out. And feels like '+response.body.current.feelslike+' degrees out.');
        }
    })
}

module.exports = forecast;