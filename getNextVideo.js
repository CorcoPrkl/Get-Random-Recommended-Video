app  = require('https');
fs = require('fs');

var apiKey = fs.readFileSync('apiKey.txt', 'utf8'); 
var parseArray = "";

//default video to start the parsing
var videoURL = "ouZQ7rgAq-I";
var lastVideo = "";
var i = 0;
var videoCount = 99;

//if given a command line argument, use it as the videoURL
var arguments = process.argv.slice(2);
if (arguments[0]) { videoURL = arguments[0]; }

//if given a number, run the script that many times
if (arguments[1]) { videoCount = arguments[1] ; }

function getNextVideo(videoId) {
parseString = "";    

app.get('https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId='+videoURL+'&type=video&key='+apiKey, (res) => {

//encode response to string instead of using block
res.setEncoding('utf8');    

//response data will be split to 6 data-packets, combine them in to one string
res.on('data', (d) => {

parseString += d;
    
});

res.on('end', (e) => {    
    parsedData = JSON.parse(parseString);
    
    lastVideo = videoURL; 
    do {
    randomVideo = Math.floor(Math.random() * ((5 - 1)) + 1);
    videoURL = parsedData.items[randomVideo].id.videoId;
    } while (lastVideo == videoURL)
    
    
    console.log(parsedData.items[randomVideo].snippet.title +" - "+ videoURL);   
    i++;
    if (i < videoCount) {    getNextVideo(videoURL); }
});       
 
    
});

}

getNextVideo(videoURL);