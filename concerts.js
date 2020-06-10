var keys = require("./keys");
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');

function myConcert(userInput) {
    var artist = userInput;
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;

    axios.get(url).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                console.log("Concert Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("Concert Venue: " + response.data[i].venue.name);
                console.log('--------------------------------------------------')
                fs.appendFileSync('log.txt', "\r\n" + "Concert Search Log----------------------" + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "-----------------------------------------"+ "\r\n", 'utf8');
            }
        }
    );

};

module.exports = myConcert;