var request = require('request');
var token = require('./secrets');
var fs = require('fs');

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

  });
}

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
//   // for (keys in result){
//   //   console.log(result[keys].avatar_url);
//   // }
// });

function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
    .on("error", function(err){
      throw err;
    })
    .pipe(fs.createWriteStream("./" + filePath));
}


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")