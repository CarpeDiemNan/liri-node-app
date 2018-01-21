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





     