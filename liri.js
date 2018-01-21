require("dotenv").config();
var fs = require("fs")
var Twitter = require('twitter');
var inquirer = require("inquirer");
var request = require('request'); 
var Spotify = require('node-spotify-api');

// read key file which gets my unique keys from the .env file

fs.readFile('keys.js', "utf8", function(error, data){
		console.log("****************"); 
		console.log(process.env.TWITTER_CONSUMER_KEY);
		console.log("****************");
		console.log(data);
		if (error) {
			console.log("error reading keys.js")
		}		
})		
 	 
// blueprint for making a twitter client to access the twitter API

var client = new Twitter({
			  consumer_key: process.env.TWITTER_CONSUMER_KEY,
			  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
			  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
			});	 

// blueprint for making a spotify client to access spotify API

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET     
  });

//****************  SPOTIFY PROCESSES ***************************
 
// command line example:

// $ node liri "spotify-this-song" "all the young dudes"


if(process.argv[2] == "spotify-this-song"){
  var spotty = process.argv[2];
   console.log("READING ARGV[2]");
   console.log(spotty);

   // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items); 
      });
    };
    
 


//******************  TWITTER  PROCESSES ************************

// command line examples:

// to post a tweet --> $ node liri "post" "Tea Time"
// to get tweets about a subject --> $ node liri "get" "Taxes"


 if(process.argv[2] == "post"){

      var post = process.argv[3];

// make instance of twitter client and use post method to post a tweet

      client.post('statuses/update', {status: post})

      .then(function (tweet) {     
        console.log(tweet);
      })
      .catch(function (error) {
        throw error;
      })
    };

  if(process.argv[2] == "get"){

      var post = process.argv[3];       
      console.log(post);

  // make instance of twitter client and use get method to get tweets about subject

      client.get('search/tweets', {q: post}, function(error, tweets, response) {
        console.log(tweets);
      })
 
    };


// *******************  MOVIES - OMDB API ***************************************

// command line example to get movie information

// $ node liri "movie-this" "Rocky"

if(process.argv[2] == "movie-this"){
  var movie = process.argv[3];
  // request('http://www.omdbapi.com/?i=tt3896198&apikey=dd5c4259', function (error, response, body) {
  request('http://www.omdbapi.com/?t=' + movie + '&apikey=dd5c4259', function (error, response, body) {
  
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

// ***********************  USE FS TO READ RANDOM.TXT AND USE IN COMMAND **************************

//    I realized that I should have put all the above commands inside each of their own functions,  
//    that way I could've just called the functions to complete this last part of the homework 
//    So I pseudo coded what I would've done had I put the above in functions.

fs.readFile("./random.txt", "utf8", function(error, data) {
 
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  var command = data;
  // We will then print the contents of data
  console.log("READING RANDOM.TXT +++++++++++++++++++++++++++++++++++++++")
  console.log(data);

  // Then split it by commas - dataArr[0] will be command (get, post, movie-this )
  //  and  dataArr[1] will be title, tweet, person -  user wants to get info on
  var dataArr = data.split(",");

  // if(dataArr[0] == "spotify-this-song"){
  //   do spotify function
  // }

  // if(dataArr[0] == "get"){
  //   do twitter get function
  // }

  // if(dataArr[0] == "post"){
  //   do twitter post function
  // }

  // if(dataArr[0] == "movie-this"){
  //   do movie function
  // }
   

});


     