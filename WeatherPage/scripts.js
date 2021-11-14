"use strict"

/*

get input automatically if possible then if not have an input field for city/zip
metric/american

current weather information
hourly for 2 days
daily for 7 days
air pollution API and link to information
national weather alert banner
weather map

include dynamic features that depend on weather data maybe clothing items depending on temp, umbrella depending on rain

try to make it so that the page doesn't require scrolling and is as useful as possible
*/
styling();
window.addEventListener("resize", styling, false);

function styling() {

//fix styling
let width = document.body.clientWidth;
let height = document.body.clientHeight;

//height = height - the 300px for map and current
height -= 370;

//width = width - the 300px for map --- to dynamically set width of 
width -= 346;
console.log(width);
document.getElementById("current").style.width = width.toString()+"px";

document.getElementById("header").style.height = Math.floor(height*.12).toString()+"px";
document.getElementById("weatheralert").style.height = Math.floor(height*.06).toString()+"px";
let search = Math.floor(height*.08);
document.getElementById("search").style.height = search.toString()+"px";
document.getElementById("hourly").style.height = Math.floor(height*.32).toString()+"px";
document.getElementById("daily").style.height = Math.floor(height*.32).toString()+"px";
document.getElementById("footer").style.height = Math.floor(height*.08).toString()+"px";


document.getElementById("location").style.height = (search-8).toString()+"px";
document.getElementById("location").style.margin = (Math.floor((search-8)/5)).toString()+"px";

document.getElementById("slider").style.height = (search-8).toString()+"px";
document.getElementById("slider").style.margin = (Math.floor((search-8)/5)).toString()+"px";

// need slider::after top (c)
let afterTop = document.head.appendChild(document.createElement("style"));
let topcalc = Math.floor((search-8)/20).toString();
let topstring = ".slider:after {top: " + topcalc + "px;}";
afterTop.innerHTML = topstring;

//slider:before height and width (little box)
let beforestyle = document.head.appendChild(document.createElement("style"));
let sizecalc =  Math.floor(search-16).toString();
let beforestring = ".slider:before {height: " + sizecalc + "px;}";
beforestyle.innerHTML = beforestring;

//input:checked + .slider:after top (F)
let inputstyle = document.head.appendChild(document.createElement("style"));
inputstyle.innerHTML = "input:checked + .slider:after {top:" + topcalc + "px;}";

}

let APIKey = "354df9aa15dc96f28892023bb5d27f18";
let current1st = "http://api.openweathermap.org/data/2.5/weather?";
let current2nd = "&appid=";


function getCurrent(){

}

function getByZip() {

}

function getByCity(city) {
    let starter = "q=";
    let queryString = current1st + starter + city + current2nd + APIKey;
    console.log(queryString);
    let currentData = getJSON(queryString,
        function(err, data) {
            if (err !== null) {
              alert('Something went wrong: ' + err);
            } 
            else {//this is where we do stuff with data
                //add icon
                //get icon based off of condition codes with other function
                let icon = "resources/"+ data.weather[0].main + ".png";
                let weatherIcon = document.createElement("img")
                weatherIcon.src = icon;
                weatherIcon.id = "weatherIcon";
                document.getElementById("current").appendChild(weatherIcon);
            }
          });
}

function getJSON(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      let status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
}

getByCity("clarion,pa,us");


