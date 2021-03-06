/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library
//***********************************************************
var Spotify = require('node-spotify-api');
console.log("tk");
 
var spotify = new Spotify({
id: "7b1b67a4b188436e9a6336041cfcd955",
secret: "9ed1ccc2d3aa499a860c3a8317822b9f"
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
if (err) {
  return console.log('Error occurred: ' + err);
}

console.log(data.tracks.items); 
});

//************************************************************
// var client_id = 'CLIENT_ID'; // Your client id
// var client_secret = 'CLIENT_SECRET'; // Your secret
var client_id = '7b1b67a4b188436e9a6336041cfcd955'; // Your client id
var client_secret = '9ed1ccc2d3aa499a860c3a8317822b9f'; // Your secret


// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // // use the access token to access the Spotify Web API
    var token = body.access_token;
    
    var options = {
      url: 'https://api.spotify.com/v1/users/388tzqndkcp1z9v8vmu6l9lt5', //  my  spotify username 
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

// //        SAYS i'M UNAUTHORIZED FOR SPOTIFYWEBAPI WRAPPER.

// var SpotifyWebApi = require('spotify-web-api-node');
// //     // credentials are optional
//     var spotifyApi = new SpotifyWebApi({
//       clientId : '7b1b67a4b188436e9a6336041cfcd955',
//       clientSecret : '9ed1ccc2d3aa499a860c3a8317822b9f' 
      
//     });

// //     // Get Elvis' albums
// //     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
// //       .then(function(data) {
// //         console.log('Artist albums', data.body);
// //       }, function(err) {
// //         console.error(err);
// //       });

// spotifyApi.setAccessToken('token');
    // // Get Elvis' albums
    // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    //   .then(function(data) {
    //     console.log('Artist albums', data.body);
    //   }, function(err) {
    //     console.error(err);
    //   });
