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
document.getElementById("checkbox").addEventListener("click", getWeather, false);

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
document.getElementById("location").style.margin = (Math.floor((search-8)/8)).toString()+"px";

document.getElementById("locButton").style.height = (search-8).toString()+"px";
document.getElementById("locButton").style.margin = (Math.floor((search-8)/8)).toString()+"px";

document.getElementById("slider").style.height = (search-8).toString()+"px";
document.getElementById("slider").style.margin = (Math.floor((search-8)/8)).toString()+"px";

// need slider::after top (c)
let afterTop = document.head.appendChild(document.createElement("style"));
let topcalc = Math.floor((search-8)/6).toString();
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

//const for oneAPI call
let intro = "http://api.openweathermap.org/data/2.5/onecall?lat=";
let lonPre = "&lon=";
let appID = "&appid=";
let APIKey = "354df9aa15dc96f28892023bb5d27f18";

//const for geolocate
let geoIntroZip = "http://api.openweathermap.org/geo/1.0/zip?zip=";
let geoIntroCity = "http://api.openweathermap.org/geo/1.0/direct?q=";
let limit = "&limit=";



function getByZip(zip) {//make query string with zip code
  //geolocate to get lon and lat
  let geoString = geoIntroZip + zip + appID + APIKey;
  console.log(geoString);
  getJSON(geoString, function(err, data) {
    if (err !== null) {//if there's an error code
      
    } 
    else {
      //this is where we do stuff with data
      let lat = data.lat.toString();
      let lon = data.lon.toString();
      let name = data.name;

      console.log(lat + lon + name);
      let units = getUnits();
      let queryString = intro + lat + lonPre + lon + units + appID + APIKey;
      console.log(queryString);
      getJSON(queryString, function(err, data) {
        if (err !== null) {//if there's an error code
          
        } 
        else {
          //this is where we do stuff with data
          //clear page
          clearPage();
          //load new info
          console.log(data);
          getCurrent(data, name);
          getHourly(data);
          getDaily(data);
          getMap(data);
          getAlerts(data);
        }
      });
    }
  });    
}

function getByCity(city) {//make query string with city
  //geolocate to get lon and lat
  let geoString = geoIntroCity + city + appID + APIKey;
  console.log(geoString);
  getJSON(geoString, function(err, data) {
    if (err !== null) {//if there's an error code
      
    } 
    else {
      //this is where we do stuff with data
      let lat = data[0].lat.toString();
      let lon = data[0].lon.toString();
      let name = data[0].name;

      console.log(lat + lon + name);
      let units = getUnits();
      let queryString = intro + lat + lonPre + lon + units + appID + APIKey;
      console.log(queryString);
      getJSON(queryString, function(err, data) {
        if (err !== null) {//if there's an error code
          
        } 
        else {
          //this is where we do stuff with data
          //clear page
          clearPage();
          //load new info
          console.log(data);
          getCurrent(data, name);
          getHourly(data);
          getDaily(data);
          getMap(data);
          getAlerts(data);
        }
      });
    }
  });    
}

function getWeather() {// get current weather
  //get input
  let input = document.getElementById("location").value;
  let check = parseInt(input);
  console.log(check);

  if (isNaN(check) == true){//if it is city
    getByCity(input);
    
  }
  else {//it is zip 
    getByZip(input);
  }
}


function clearPage() {
  document.getElementById("current").innerHTML = "";
  document.getElementById("weatheralert").innerHTML = "";
  document.getElementById("hourly").innerHTML = "";
  document.getElementById("daily").innerHTML = "";
  document.getElementById("map").innerHTML = "";
}

function getUnits() {
  let units = "&units=";
  let check = document.getElementById("checkbox").checked;

  if (check == false){//celcius
    units += "metric";
  }
  else {
    units += "imperial";
  }
  return units;
}


function getCurrent(data, name) {
  //get weather information
  console.log(data);
  let temp = data.current.temp;
  let feelsLike = data.current.feels_like;
  let UV_Index = data.current.uvi;
  let wind = data.current.wind_speed;
  let humidity = data.current.humidity;
  console.log(temp);

  //put it on the page
  //header
  let header = document.createElement("h1");
  header.innerHTML = "Current Weather in " + name;

  let unit = "&#8451";
  let speedUnit = "km/h";
  if (getUnits() == "&units=imperial") {//if american units
    unit = "&#8457";
    speedUnit = "mph";
  }

  //information
  let currentInfoWrapper = document.createElement("div");
  currentInfoWrapper.id = "currentInfoWrapper";
  let information = document.createElement("p");
  let info = "Temperature: " + temp + " " + unit + "<br>" +
  "Feels Like: " + feelsLike + " " + unit + "<br>" +
  "Humidity: " + humidity + "%" + "<br>" +
  "UV Index: " + UV_Index  + "<br>" +
  "Wind: " + wind + " " + speedUnit;
  
  console.log(info);
  information.innerHTML = info;
  currentInfoWrapper.appendChild(information); 

  let current = document.getElementById("current")
  current.appendChild(header);
  current.appendChild(currentInfoWrapper);

  //choose and add icon
  let icon = chooseIcon(data.current);
  let iconWrapper = document.createElement("div");
  let weatherIcon = document.createElement("img");
  weatherIcon.src = icon;
  weatherIcon.id = "currentIcon";
  iconWrapper.id = "currentIconWrapper"

  let desc = document.createElement("h3");
  desc.innerHTML = data.current.weather[0].description;
  iconWrapper.appendChild(weatherIcon);
  iconWrapper.appendChild(desc);
  document.getElementById("current").appendChild(iconWrapper);

  

}

function getHourly(data) {
  //for every hour make logo with description and include temp, humidity, uvi, pop (chance of precip)
  //make div to contain each hour, put 18 and make the wrapper have a scrollbar
  for (let i = 0; i < 17; i++) {
    //set up elements
    let hourlyWrapper = document.createElement("div");
    let hourlyIconWrapper = document.createElement("div");
    let hourlyIcon = document.createElement("img");
    let hourlyInfoWrapper = document.createElement("div");
    let hourlyInfo = document.createElement("p");
    let hourlyDesc = document.createElement("h4");
    let hourly = document.getElementById("hourly");

    //choose icon
    hourlyIcon.src = chooseIcon(data.hourly[i]);
    hourlyIcon.id = "hourlyIcon";

    //set syling ids
    hourlyWrapper.id = "hourlyWrapper";
    hourlyIconWrapper.id = "hourlyIconWrapper";
    hourlyInfoWrapper.id = "hourlyInfoWrapper";
    hourlyInfo.id = "hourlyInfo";
    hourlyDesc.id = "hourlyDesc";
    
    //get units
    let unit = "&#8451";
    if (getUnits() == "&units=imperial") {//if american units
      unit = "&#8457";
  }

    //get variables from api
    let temp = data.hourly[i].temp;
    let humidity = data.hourly[i].humidity;
    let UV_Index = data.hourly[i].uvi;
    let precip = data.hourly[i].pop;
    let desc = data.hourly[i].weather[0].description;

    hourlyDesc.innerHTML = desc;

    hourlyInfo.innerHTML = "Temperature: " + temp + " " + unit + "<br>" +
    "Humidity: " + humidity + "%" + "<br>" +
    "UV Index: " + UV_Index  + "<br>" +
    "Precip: " + precip + "%";

    hourlyInfoWrapper.appendChild(hourlyInfo);
    hourlyWrapper.appendChild(hourlyInfoWrapper);
    hourlyIconWrapper.appendChild(hourlyIcon);
    hourlyIconWrapper.appendChild(hourlyDesc);
    hourlyWrapper.appendChild(hourlyIconWrapper);
    hourly.appendChild(hourlyWrapper);

  }

}

function getDaily(data) {


}

function getAlerts(data) {


}

function getMap(data) {


}



function getJSON(url, callback){//get json from api
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      let status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
        console.log("no request error");
      } else {
        callback(status, xhr.response);
        console.log("error");
      }
    };
    xhr.send();
}



function chooseIcon(data) {
  let temp = parseInt(data.weather[0].id);
  console.log(temp);
  let icon = "";
  if ( temp < 300){//thunderstorm
    icon = "resources/storming.png";
    console.log(1);
  }
  else if ( temp < 600){//rain
    icon = "resources/rain.png";
    console.log(2);
  }
  else if ( temp < 700){//snow
    icon = "resources/snow.png";
    console.log(3);
  }
  else if ( temp == 800){//clear
    if (data.current[0].weather[0].icon == "01d") {
      icon = "resources/sunny.png";
    }
    else {
      icon = "resources/moony.png";
    }
    console.log(4);
  }
  else if ( temp == 801){//partly cloudy
    if (data.current.weather[0].icon == "02d") {
      icon = "resources/partlysunny.png";
    }
    else {
      icon = "resources/partlymoony.png";
    }
    console.log(5);
  }
  else if ( temp > 800){//cloudy
    icon = "resources/cloud.png";
    console.log(6);
  }
  console.log(icon);
  return icon;
}

getUnits();
