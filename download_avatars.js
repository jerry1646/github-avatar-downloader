var request = require('request');
var token = require('./secrets');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    },
    url:`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
  };

  request.get(options, function(err,res,body){
    var contributors = JSON.parse(body);
    cb(contributors);
  });
}


function downloadImageByURL(object) {
  for (const keys in object){
    var user  = object[keys];
    console.log(user.avatar_url)
    request.get(user.avatar_url)
      .on("error", function(err){
        throw err;
      })
      .pipe(fs.createWriteStream("./avatars/" + user.login + ".jpg"));
  }
}

getRepoContributors("jquery", "jquery", downloadImageByURL);