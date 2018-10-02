var request = require('request');
var fs = require('fs');
var args = process.argv.slice(2);

if(!fs.existsSync("./.env")){
  console.log("Environment configuration missing. Please check if .env file is properly setup in your application root folder");
  return;
}

require('dotenv').config();


console.log("Welcome to the GitHub Avatar Downloader!");


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    headers: {
      'User-Agent': 'request',
    },
    url:`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
  };

  request.get(options, function(err,res,body){
    var contributors = JSON.parse(body);
    cb(contributors);
  });
}


function downloadImageByURL(object) {
  if(fs.existsSync("./avatars")){
    for (const keys in object){
      var user  = object[keys];
      console.log("Downloading avatar image from: "+user.avatar_url)
      request.get(user.avatar_url)
      .on("error", function(err){
        throw err;})
      .pipe(fs.createWriteStream("./avatars/" + user.login + ".jpg"));
    }
  } else{
    console.log("Indicated directory doesn't exist. Please create ./avatars folder and try again!")
  }
}

if (args.length != "2"){
  console.log("Invalid input! Please enter in the following order: *repoOwner* *repoName*.");
} else{
  getRepoContributors(args[0], args[1], downloadImageByURL);
}
