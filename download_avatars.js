var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var args = process.argv.slice(2);


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

if (args.length != "2"){
  console.log("Invalid input! Please enter in the following order: *repoOwner* *repoName*.");
} else{
  getRepoContributors(args[0], args[1], downloadImageByURL);
}
