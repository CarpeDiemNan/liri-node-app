require("dotenv").config();
var fs = require("fs")
var Twitter = require('twitter');
// var client = "";

fs.readFile('keys.js', "utf8", function(error, data){
		console.log("****************"); 
		console.log(process.env.TWITTER_CONSUMER_KEY);
		console.log("****************");
		console.log(data);
		if (error) {
			console.log("error reading keys.js")
		}		
})
		
// var client = new Twitter(keys.twitter);		 

var client = new Twitter({
			  consumer_key: process.env.TWITTER_CONSUMER_KEY,
			  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
			  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
			});	 

client.post('statuses/update', {status: 'Almost time for a glass of wine :)'})
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  })


  client.get('search/tweets', {q: 'david bowie'}, function(error, tweets, response) {
   console.log(tweets);
});


  // Load your image
// var data = fs.readFile('horse.jpg');
// client.post('media/upload', {media: data})
//   .then(function () {
//     console.log(media);
//     var status = {
//       status: 'I love Horses too!',
//       media_ids: media.media_id_string // Pass the media id string
//     }
//   })
//   .catch(function (error) {
//     throw error;
//   })



// Make post request on media endpoint. Pass file data as media parameter
// var spotify = new Spotify(keys.spotify);

// function Animal(isRaining, whatNoise, whatColor) {
//   this.raining = isRaining;
//   this.noise = whatNoise;
//   this.color = whatColor;
//   this.makeNoise = function() {
//     if (this.raining === true) {
//       console.log(this.noise);
//     }
//   };
// }

// // sets the variables "dogs" and "cats" to be animal objects and initializes them with raining and noise properties
// var dogs = new Animal(true, "Woof!","Brown");
// var dogs2 = new Animal(true, "Woof!","Gray");
// var cats = new Animal(false, "Meow!","white");
// var birds = new Animal(true,"","green");
 
 // client.get(https://api.twitter.com/1.1/statuses/home_timeline.json);


 		// I think these don't work because my app isn't callback enabled when I set it up


// client.get('favorites/list', function(error, tweets, response) {
// 		  // if(error) throw error;
// 		  	if(error) console.log("There's an error getting the tweets")
// 		  console.log(tweets);  // The favorites. 
// 		  console.log(response);  // Raw response object. 
// 		});


// client.post('media/upload', {media: data}, function(error, media, response) {

//   if (!error) {

//     // If successful, a media object will be returned.
//     console.log(media);

//     // Lets tweet it
//     var status = {
//       status: 'I am a tweet',
//       media_ids: media.media_id_string // Pass the media id string
//     }

//     client.post('statuses/update', status, function(error, tweet, response) {
//       if (!error) {
//         console.log(tweet);
//       }
//     });

//   }
// });









 