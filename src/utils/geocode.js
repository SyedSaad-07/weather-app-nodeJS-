const request = require('request');

const geoCode = (address, callback) => {

    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicy1tLXNhYWQiLCJhIjoiY2w1YjQwZjU3MDN5aTNwcGVmZmVzaDY5dSJ9.V--BLZnBofzLPcEZgaeP2g';

    request({url: URL, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services! ',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search! ', undefined)
        }else{
            callback(undefined, {
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode