var request = require('request');
var token = require('./secrets');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  // ...

  var options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    },
    url:`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
  };

  request.get(options, function(err,res,body){
    cb(err,JSON.parse(body));

  })
        // .on("error", function(err){
        //   throw err;
        // })
        // .on("response", function(response){
        //   console.log(`Response Code: ${response.statusCode}`);
        //   console.log(response);
        // });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  for (keys in result){
    console.log(result[keys].avatar_url);
  }
});