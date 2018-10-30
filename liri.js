//module that loads environment variables from a .env file
require("dotenv").config();
//pull in information from the key.js file
const keys = require("./key.js");
//helps to read file
const fs = require("fs");
//npm request package
var request = require("request");

//
const Spotify = require('node-spotify-api');
//pulls in API key information for Spotify
const spotify = new Spotify(keys.spotify);

//prints key information
// console.log("KEYS", keys);

var input = process.argv;
var action = process.argv[2];

//
switch (action) {
  case 'concert-this':
    console.log("You want a concert for ", input);
    bandsInTown(input);
    break;

  case 'spotify-this-song':
    console.log("You want a song for ", input);
    getSpotify(input);
    break;
  case 'movie-this':
    console.log("You want movie info on ", input);
    break;
  case 'do-what-it-says':
    console.log("Do what it says");
    break;
  default:
    console.log("No idea what you are asking for...");
}

//create a function that will connect with Bands in Town API

function bandsInTown(artist) {
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body)
      // console.log(info)
      console.log(info[0].offers[0])
      // console.log("============================================================================================================")
      // console.log(response.info.required[0]);
      // console.log(movie.required[3]);
      // console.log(movie.required[5]);
    }
  });
}



// create a function that will connect with Spotify API
function getSpotify(songName) {
  spotify
    .search({ type: 'track', query: songName, limit:3 })
    .then(function (response) {

      console.log(response.tracks.items[0].artists[0]);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].preview_url);
      console.log(response.tracks.items[0].name[0]);
    })
    .catch(function (err) {
      console.log(err);
    });
}


// create a function that will connect with OMbd API
var request = require("request");
var movieName = input;
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body)
      console.log("============================================================================================================")
      console.log(movie.Year);
      console.log(movie.Rated);
      console.log(movie.Ratings[1]);
      console.log(movie.Country);
      console.log(movie.Language);
      console.log(movie.Plot);
      console.log(movie.Actors);
  }
});