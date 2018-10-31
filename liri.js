//module that loads environment variables from a .env file
require("dotenv").config();
//pull in information from the key.js file
const keys = require("./key.js");
//helps to read file
const fs = require("fs");
//npm request package
var request = require("request");
//npm spotify package
const Spotify = require('node-spotify-api');
//npm moment package
const moment = require('moment')
//pulls in API key information for Spotify
const spotify = new Spotify(keys.spotify);

//prints key information
// console.log("KEYS", keys);

//variables to use for command line
var input = process.argv[3];
var action = process.argv[2];

//switch to perform different actions based on different conditions
switch (action) {
  //action
  case 'concert-this':
    //prints what is being searched
    console.log("Concert for ", input);
    //calls bandsInTown function to run
    bandsInTown(input);
    //goes to the next action
    break;
  //action 
  case 'spotify-this-song':
    //prints what is being searched
    console.log("Information for the song ", input);
    //calls getSpotify function to run
    getSpotify(input);
    //goes to the next action
    break;
  //action  
  case 'movie-this':
    //prints what is being searched
    console.log("You want movie info on ", input);
    //call getOmbd function to run
    getOmbd(input);
    //goes to the next action
    break;
  //action
  case 'do-what-it-says':
    console.log("Do what it says");
    //goes to the next action
    break;
  //action
  default:
    //prints that we need to enter information another way/correct way
    console.log("No idea what you are asking for...");
}

//create a function that will connect with Bands in Town API
function bandsInTown(artist) {
  //request
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
    //alerts for error 
    if (!error && response.statusCode === 200) {
      //created variable to turn string into object
      var info = JSON.parse(body)
      var datetime = moment(info[0].datetime).format('MMMM DD, YYYY');
      //displays information found for the concert
      console.log("=====================================================")
      console.log("Venue: ", info[0].venue.name)
      console.log("Location: ", info[0].venue.city)
      console.log("Date: ", datetime);
    }
  });
}



// create a function that will connect with Spotify API
function getSpotify(songName) {
  //request
  spotify
    .search({ type: 'track', query: songName, limit: 3 })
    .then(function (response) {
      //displays information about the song
      console.log("=====================================================")

      console.log("Artist: ", response.tracks.items[0].artists[0].name);
      console.log("Song: ", response.tracks.items[0].name);
      console.log("Album: ", response.tracks.items[0].album.name);
      console.log("Link: ", response.tracks.items[0].external_urls.spotify);
    })
    //alerts error
    .catch(function (err) {
      console.log(err);
    });
};


//create a function that will connect with OMbd API
function getOmbd(movieTitle) {
  //require npm package
  var request = require("request");
  //created variable for user input of movie title
  var movieTitle = input;
  //ajax request from OMdb
  request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    //error alert 
    if (!error && response.statusCode === 200) {
      //created variable converts string into object
      const movie = JSON.parse(body)
      //displays information about the movie
      console.log("=====================================================")
      console.log("Year: ", movie.Year);
      console.log("Rated: ", movie.Rated);
      console.log("Rating: ", movie.Ratings[1]);
      console.log("Country: ", movie.Country);
      console.log("Language: ", movie.Language);
      console.log("Plot: ", movie.Plot);
      console.log("Cast: ", movie.Actors);
    }
  })
};



// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function (error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  action = data.split(",")[0];
  input = data.split(",")[1]

  console.log(action)

  switch (action) {
    //action
    case 'concert-this':
      //prints what is being searched
      console.log("Concert for ", input);
      //calls bandsInTown function to run
      bandsInTown(input);
      //goes to the next action
      break;
    //action 
    case 'spotify-this-song':
      //prints what is being searched
      console.log("Information for the song ", input);
      //calls getSpotify function to run
      getSpotify(input);
      //goes to the next action
      break;
    //action  
    case 'movie-this':
      //prints what is being searched
      console.log("You want movie info on ", input);
      //call getOmbd function to run
      getOmbd(input);
      //goes to the next action
      break;
    //action
    case 'do-what-it-says':
      console.log("Do what it says");
      //goes to the next action
      break;
    //action
    default:
      //prints that we need to enter information another way/correct way
      console.log("No idea what you are asking for...");
  }

  // We will then print the contents of data
  console.log(data);
});