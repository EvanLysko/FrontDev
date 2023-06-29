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
document.getElementById("leftArrow").addEventListener("click", scrollLeft, false);
document.getElementById("rightArrow").addEventListener("click", scrollRight, false);

function styling() {

// //fix styling
// let width = document.body.clientWidth;
// let height = document.body.clientHeight;

// //height = height - the 300px for map and current
// height -= 370;

// //width = width - the 300px for map --- to dynamically set width of 
// let currentWidth = width - 346;
// console.log(width);
// document.getElementById("current").style.width = currentWidth.toString()+"px";
// document.getElementById("mapAirWrapper").style.width = (width - 740).toString()+"px";
// let airPolWidth = 354;
// let mapWidth = Math.max(300, width - 740 - airPolWidth - 12);
// document.getElementById("airPolWrapper").style.width = airPolWidth.toString() +"px";
// document.getElementById("map").style.width = mapWidth.toString() +"px";



// // document.getElementById("weatheralert").style.height = Math.floor(height*.06).toString()+"px";
// let searchHeight = Math.floor(height*.08);
// let search = document.getElementById("search");
// search.style.height = searchHeight.toString()+"px";
// search.style.width = currentWidth.toString()+"px";
// let mapAirHeader = document.getElementById("mapAirHeader");
// mapAirHeader.style.width = (width -740).toString()+"px";
// mapAirHeader.style.height = searchHeight.toString()+"px";
// // document.getElementById("hourly").style.height = Math.floor(height*.4).toString()+"px";
// document.getElementById("hourlyHeader").style.height = Math.floor(height*.06).toString()+"px";
// // document.getElementById("daily").style.height = Math.floor(height*.4).toString()+"px";
// document.getElementById("dailyHeader").style.height = Math.floor(height*.06).toString()+"px";
// // document.getElementById("footer").style.height = Math.floor(height*.06).toString()+"px";

// searchHeight = searchHeight * .9;

// document.getElementById("location").style.height = (searchHeight-8).toString()+"px";
// document.getElementById("location").style.margin = (Math.floor((searchHeight-8)/8)).toString()+"px";

// document.getElementById("locButton").style.height = (searchHeight-8).toString()+"px";
// document.getElementById("locButton").style.margin = (Math.floor((searchHeight-8)/8)).toString()+"px";

// document.getElementById("slider").style.height = (searchHeight-8).toString()+"px";
// document.getElementById("slider").style.margin = (Math.floor((searchHeight-8)/8)).toString()+"px";

// // need slider::after top (c)
// let afterTop = document.head.appendChild(document.createElement("style"));
// let topcalc = Math.floor((searchHeight-8)/4).toString();
// let topstring = ".slider:after {top: " + topcalc + "px;}";
// afterTop.innerHTML = topstring;

// //slider:before height and width (little box)
// let beforestyle = document.head.appendChild(document.createElement("style"));
// let sizecalc =  Math.floor(searchHeight-16).toString();
// let beforestring = ".slider:before {height: " + sizecalc + "px;}";
// beforestyle.innerHTML = beforestring;

// //input:checked + .slider:after top (F)
// let inputstyle = document.head.appendChild(document.createElement("style"));
// inputstyle.innerHTML = "input:checked + .slider:after {top:" + topcalc + "px;}";

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
          //make air pollution call
          let airPolQuery = "http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
          console.log(airPolQuery);
          getJSON(airPolQuery, function (err, airdata) {
            //this is where we do stuff with data
            //clear page
            clearPage();
            //load new info
            console.log(data);
            getCurrent(data, name);
            getHourly(data);
            getDaily(data);

            // air pol
            getAirPol(airdata);

            //map
            let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18, attribution: '[insert correct attribution here!]' });

            let container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }

            let precipitationcls = L.OWM.precipitationClassic({showLegend: false, opacity: 0.6, appId: '354df9aa15dc96f28892023bb5d27f18'});
    
            let map = L.map('map', { center: new L.LatLng(lat, lon), zoom: 7, layers:[osm, precipitationcls] , attributionControl: false, dragging: false, zoomControl: false});

            let pin = L.icon({
              iconUrl: 'resources/pin.png',
              iconSize: [30, 50]
            });
            L.marker([lat,lon], {title:name, icon:pin}).addTo(map);
            getAlerts(data);
          });
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
          //make air pollution call
          let airPolQuery = "http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
          console.log(airPolQuery);
          getJSON(airPolQuery, function (err, airdata) {
            //this is where we do stuff with data
            //clear page
            clearPage();
            //load new info
            console.log(data);
            getCurrent(data, name);
            getHourly(data);
            getDaily(data);

            // air pol
            getAirPol(airdata);

            //map
            let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18, attribution: '[insert correct attribution here!]' });

            let container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }

            let precipitationcls = L.OWM.precipitationClassic({showLegend: false, opacity: 0.6, appId: '354df9aa15dc96f28892023bb5d27f18'});
    
            let map = L.map('map', { center: new L.LatLng(lat, lon), zoom: 7, layers:[osm, precipitationcls] , attributionControl: false, zoomControl: false});

            let pin = L.icon({
              iconUrl: 'resources/pin.png',
              iconSize: [30, 50]
            });
            L.marker([lat,lon], {title:name, icon:pin}).addTo(map);
            getAlerts(data);
          });
        }
        });
      }
        });
}

function getWeather() {// get current weather
  //get input
  let input = document.getElementById("location").value;
  let check = parseInt(input);
  console.log(input);
  console.log(check);
  if (input == "") {
    getByCity("new york");
  }
  else if (isNaN(check) == true){//if it is city
    getByCity(input);

  }
  else {//it is zip 
    getByZip(input);
  }
}


function clearPage() {
  let hourly = document.getElementById("hourlyTilesRow");
  let daily = document.getElementById("dailyTilesRow");

  document.getElementById("current").innerHTML = "";
  hourly.innerHTML = "";
  daily.innerHTML = "";
  document.getElementById("airPolWrapper").innerHTML = "";

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


function hourlyTimeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = weekdays[a.getDay()];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let isPM = a.getHours() > 12;
  let hour = isPM? a.getHours() - 12 : a.getHours();
  let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
  let time = hour + ':' + min + ' ' + (isPM? 'pm' : 'am') + '|' + day + ' ' + date + ' ' + month;
  return time;
}

function dailyTimeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = weekdays[a.getDay()];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = day + ' ' +  date + ' ' + month + ' ' + year;
  return time;
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
  header.id = "currentHeader";

  let unit = "&#8451";
  let speedUnit = "km/h";
  if (getUnits() == "&units=imperial") {//if american units
    unit = "&#8457";
    speedUnit = "mph";
  }

  //currentContentWrapper
  let currentContentWrapper = document.createElement("div");
  currentContentWrapper.id = "currentContentWrapper";

  //information
  let currentInfoWrapper = document.createElement("div");
  currentInfoWrapper.id = "currentInfoWrapper";
  let information = document.createElement("p");
  let info = "Temperature: " + temp + " " + unit + "<br>" +
  "Feels Like: " + feelsLike + " " + unit + "<br>" +
  "Humidity: " + humidity + "%" + "<br>" +
  "UV Index: " + UV_Index  + "<br>" +
  "Wind: " + wind + " " + speedUnit;
  information.id = "currentInfo";
  
  console.log(info);
  information.innerHTML = info;
  currentInfoWrapper.appendChild(information); 

  let current = document.getElementById("current");
  current.appendChild(header);
  currentContentWrapper.appendChild(currentInfoWrapper);

  //choose and add icon
  let icon = chooseIcon(data.current);
  let iconWrapper = document.createElement("div");
  let weatherIcon = document.createElement("img");
  weatherIcon.src = icon;
  weatherIcon.id = "currentIcon";
  iconWrapper.id = "currentIconWrapper";

  let desc = document.createElement("h3");
  desc.innerHTML = data.current.weather[0].description;
  iconWrapper.appendChild(weatherIcon);
  iconWrapper.appendChild(desc);
  currentContentWrapper.appendChild(iconWrapper);
  current.appendChild(currentContentWrapper);

  

}

function getHourly(data) {
  //for every hour make logo with description and include temp, humidity, uvi, pop (chance of precip)
  //make div to contain each hour, put 18 and make the wrapper have a scrollbar
  let tooltipCounter = 0;
  let temps = [];
  let hourly = document.getElementById("hourlyTilesRow");
  
  for (let i = 0; i < 31; i++) {
   
    hourly.appendChild(getHourlyTile(data.hourly[i], first? tooltipCounter < 3? tooltipCounter : 0 : 0));
    tooltipCounter++;
    temps.push(data.hourly[i].temp);
  }
  drawHourlyChart(temps);
}

function getDaily(data) {
  //for every day make logo with description and include temp, min, max, humidity, uvi, pop (chance of precip)
  //make div to contain each day, put 18 and make the wrapper have a scrollbar
  let tooltipCounter = 0;
  for (let i = 0; i < 6; i++) {
    let daily = document.getElementById("dailyTilesRow");
    daily.appendChild(getDailyTile(data.daily[i], first? tooltipCounter < 3? tooltipCounter : 0 : 0));
    tooltipCounter++;
  }

}

function getHourlyTile(hourlyData, tileType) {

  //get units
  let unit = "&#8451";
  if (getUnits() == "&units=imperial") {//if american units
    unit = "&#8457";
  }

  //get variables from api
  let temp = hourlyData.temp;
  let humidity = hourlyData.humidity;
  let UV_Index = hourlyData.uvi;
  let precip = hourlyData.pop;
  let time = hourlyTimeConverter(hourlyData.dt);
  let hour = time.split("|")[0];
  let date = time.split("|")[1];
  let status = hourlyData.weather[0].description;
  
  let tileAndTempWrapper = document.createElement("div");
  tileAndTempWrapper.className = "tileWrapper";

  let tileWrapper = document.createElement("div");
  tileWrapper.className = "container " + " tileContainer " + (tileType == 0? "lessInfo" : tileType == 1? "moreInfo" : "tooltip");

  let lessInfoWrapper = document.createElement("div");
  lessInfoWrapper.className = "lessInfoWrapper";

  let timeDisplay = document.createElement("h3");
  timeDisplay.className = "weatherTileTime";
  timeDisplay.innerHTML = time;

  let icon = document.createElement("img");
  icon.className = "weatherTileIcon";
  icon.src = chooseIcon(hourlyData);
  icon.alt = status + "icon";

  let weatherStatus = document.createElement("h4");
  weatherStatus.className = "weatherTileStatus";
  weatherStatus.innerHTML = status;

  let moreInfoWrapper = document.createElement("div");
  moreInfoWrapper.className = "moreInfoWrapper";

  let tooltip = document.createElement("p");
  tooltip.className = "weatherTileTooltip";
  tooltip.innerHTML = "Click<br>to see<br>more info";

  let moreInfo = document.createElement("p");
  moreInfo.className = "weatherInfo";
  moreInfo.innerHTML = "Humidity: " + humidity + "%" + "<br>" +
    "UV Index: " + UV_Index  + "<br>" +
    "Precip: " + precip + "%";

  let timeHeader = document.createElement("h3");
  timeHeader.className = "weatherTileTime";
  timeHeader.innerHTML = hour;

  let dateHeader = document.createElement("h5");
  dateHeader.className = "weatherTileTimeDate";
  dateHeader.innerHTML = date;

  lessInfoWrapper.appendChild(icon);
  lessInfoWrapper.appendChild(weatherStatus);
  tooltip.style.display = tileType == 2? "block" : "none";
  moreInfo.style.display = tileType == 2? "none" : "block";
  moreInfoWrapper.appendChild(tooltip);
  moreInfoWrapper.appendChild(moreInfo);

  moreInfoWrapper.style.display = tileType > 0? "block" : "none";
  lessInfoWrapper.style.display = tileType > 0? "none" : "block";
  tileWrapper.appendChild(lessInfoWrapper);
  tileWrapper.appendChild(moreInfoWrapper);

  tileAndTempWrapper.appendChild(tileWrapper);
  tileAndTempWrapper.appendChild(timeHeader);
  tileAndTempWrapper.appendChild(dateHeader);

  tileWrapper.addEventListener("click", toggleWeatherTileEventPassthrough);

  return tileAndTempWrapper;
}

function getDailyTile(dailyData, tileType) {
 //get units
 let unit = "&#8451";
 if (getUnits() == "&units=imperial") {//if american units
   unit = "&#8457";
  }

 //get variables from api
 let temp = dailyData.temp.day;
 let min = dailyData.temp.min;
 let max = dailyData.temp.max;
 let UV_Index = dailyData.uvi;
 let precip = dailyData.pop;
 let time = dailyTimeConverter(dailyData.dt);
 let status = dailyData.weather[0].description;
 
 let tileAndTempWrapper = document.createElement("div");
 tileAndTempWrapper.className = "tileWrapper";

 let tileWrapper = document.createElement("div");
 tileWrapper.className = "container " + " tileContainer " + (tileType == 0? "lessInfo" : tileType == 1? "moreInfo" : "tooltip");

 let lessInfoWrapper = document.createElement("div");
 lessInfoWrapper.className = "lessInfoWrapper";

 let timeDisplay = document.createElement("h3");
 timeDisplay.className = "weatherTileTime";
 timeDisplay.innerHTML = time;

 let icon = document.createElement("img");
 icon.className = "weatherTileIcon";
 icon.src = chooseIcon(dailyData);
 icon.alt = status + "icon";

 let weatherStatus = document.createElement("h4");
 weatherStatus.className = "weatherTileStatus";
 weatherStatus.innerHTML = status;

 let moreInfoWrapper = document.createElement("div");
 moreInfoWrapper.className = "moreInfoWrapper";

 let tooltip = document.createElement("p");
 tooltip.className = "weatherTileTooltip";
 tooltip.innerHTML = "Click<br>to see<br>more info";

 let moreInfo = document.createElement("p");
 moreInfo.className = "weatherInfo";
 moreInfo.innerHTML = "Min: " + min + " " + unit + "<br>" +
 "Max: " + max + " " + unit + "<br>" +
 "UV Index: " + UV_Index  + "<br>" +
 "Precip: " + precip + "%";

 let temperature = document.createElement("h3");
 temperature.className = "weatherTileTemp";
 temperature.innerHTML = temp + " " + unit;

  let date = document.createElement("h3");
  date.className = "weatherTileDate";
  date.innerHTML = time;

  lessInfoWrapper.appendChild(temperature);
 lessInfoWrapper.appendChild(icon);
 lessInfoWrapper.appendChild(weatherStatus);
 tooltip.style.display = tileType == 2? "block" : "none";
 moreInfo.style.display = tileType == 2? "none" : "block";
 moreInfoWrapper.appendChild(tooltip);
 moreInfoWrapper.appendChild(moreInfo);

 moreInfoWrapper.style.display = tileType > 0? "block" : "none";
 lessInfoWrapper.style.display = tileType > 0? "none" : "block";
 tileWrapper.appendChild(lessInfoWrapper);
 tileWrapper.appendChild(moreInfoWrapper);

 tileAndTempWrapper.appendChild(tileWrapper);
 tileAndTempWrapper.appendChild(date);

 tileWrapper.addEventListener("click", toggleWeatherTileEventPassthrough);

 return tileAndTempWrapper;
}


function toggleWeatherTileEventPassthrough(e) {
  let target = e.target;
  while (!target.className.includes("tileWrapper")) {
    target = target.parentElement;
  }
  toggleWeatherTile(target);
}

function toggleWeatherTilePassthrough(target) {
  while (!target.className.includes("tileWrapper")) {
    target = target.parentElement;
  }
  toggleWeatherTile(target);
}

let first = true;
function toggleWeatherTile(tileWrapper) {
  let lessInfo = tileWrapper.getElementsByClassName("lessInfo")[0];
  let moreInfo = tileWrapper.getElementsByClassName("moreInfo")[0];
  let tooltip = tileWrapper.getElementsByClassName("tooltip")[0];
  if (lessInfo != null) {
    tileWrapper.getElementsByClassName("lessInfoWrapper")[0].style.display = "none";
    tileWrapper.getElementsByClassName("moreInfoWrapper")[0].style.display = "block";

    lessInfo.className = lessInfo.className.replace("lessInfo", "moreInfo");

  } else if (moreInfo != null) {
    tileWrapper.getElementsByClassName("moreInfoWrapper")[0].style.display = "none";
    tileWrapper.getElementsByClassName("lessInfoWrapper")[0].style.display = "block";

    moreInfo.className = moreInfo.className.replace("moreInfo", "lessInfo");

  } else if (tooltip != null) {//if tooltip tile
    tileWrapper.getElementsByClassName("weatherTileTooltip")[0].style.display = "none";
    tileWrapper.getElementsByClassName("weatherInfo")[0].style.display = "block";
    tileWrapper.getElementsByClassName("moreInfoWrapper")[0].style.display = "none";
    tileWrapper.getElementsByClassName("lessInfoWrapper")[0].style.display = "block";

    tooltip.className = tooltip.className.replace("tooltip", "lessInfo");
  }

  //once they click something the first time, change all existing tooltip tiles to lessinfo
  if (first) {
    first = false;
    let tooltipTiles = document.querySelectorAll(".tooltip, .moreInfo");//TODO watch this for bugs
    for (let i = 0; i < tooltipTiles.length; i++) {
      toggleWeatherTilePassthrough(tooltipTiles[i]);
    }
  }
}

function scrollLeft() {
  console.log("scroll left");
  let content = document.querySelector("#hourly");
  let sl = content.scrollLeft;
  let cw = content.scrollWidth;
  let scrollStep = document.querySelector(".tileContainer").getBoundingClientRect().width;

  console.log("scroll step: " + scrollStep);
  console.log("scroll left: " + sl);
  console.log("content width: " + cw);
	
  if ((sl - scrollStep) <= 0) {
    content.scrollTo(0, 0);
  } else {
    console.log("scrolling left" + (sl - scrollStep));
    content.scrollTo((sl - scrollStep), 0);
  }
}

function scrollRight() {
  console.log("scroll right");
  let content = document.querySelector("#hourly");
  let sl = content.scrollLeft;
  let cw = content.scrollWidth;
  let scrollStep = document.querySelector(".tileContainer").getBoundingClientRect().width;

  console.log("scroll step: " + scrollStep);
  console.log("scroll left: " + sl);
  console.log("content width: " + cw);
	
  if ((sl + scrollStep) >= cw) {
    content.scrollTo(cw, 0);
  } else {
    console.log("scrolling right" + (sl + scrollStep));
    content.scrollTo((sl + scrollStep), 0);
  }
}

function getAlerts(data) {
}

function drawHourlyChart(temps) { 
  const canvas = document.querySelector("#hourlyChart");
  let tiles = document.querySelector("#hourly").querySelectorAll(".tileWrapper");
  let tileWidth = Number(tiles[0].getBoundingClientRect().width);
  let tileHeight = tiles[0].offsetHeight;
  let tilesAmount = tiles.length;
  let totalWidth = tileWidth * tilesAmount;
   //get units
 let unit = getUnits() == "&units=imperial"? "F" : "C";
  
  console.log(tiles);
  console.log(tilesAmount);
  console.log("tile width " + tileWidth);
  console.log(tileHeight);
  // canvas.style.width = totalWidth + "px";
  // canvas.style.height = "50" + "px";

  if (!canvas.getContext) {
      return;
  }
  const ctx = canvas.getContext('2d');

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  let max = Math.max(...temps);
  let avg = temps.reduce((a, b) => a + b, 0) / temps.length;
  let min = Math.min(...temps);
  let range = max - min;

  //draw average line
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, (avg - min) / range * 40 + 5);
  ctx.lineTo(totalWidth, (avg - min) / range * 40 + 5);
  ctx.stroke();

  //draw avg label
  ctx.textAlign = "start";
  ctx.font = "16px Arial";
  ctx.fillStyle = "#gray";
  let y = (avg - min) / range * 40 + 5;
  y = y - 6 < 8? y + 14 : y - 6;
  ctx.fillText("avg", 0, y);

  ctx.fillStyle = "#121212";

  //draw temp line
  ctx.strokeStyle = "#121212";
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.setLineDash([]);
  ctx.beginPath();
  let x = tileWidth/2 - 12;
  //draw first point
  ctx.moveTo(x, (temps[0] - min) / range * 40 + 5);
  ctx.fillRect(x-5,(temps[0] - min) / range * 40 - 5 + 5,10,10);
  //draw label bg
  y = (temps[0] - min) / range * 40 - 5 + 5;
  y = y - 20 < 0? y + 12 : y-20;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x-40,y,80,18);
  //draw label
  ctx.fillStyle = "#121212";
  ctx.fillText(temps[0] + " °" + unit, x, y + 15);
  for (let i = 1; i < temps.length; i++) {
    x += tileWidth;
    //draw line and point
    ctx.fillStyle = "#121212";
    ctx.lineTo(x, (temps[i] - min) / range * 40 + 5);
    ctx.fillRect(x-5,(temps[i] - min) / range * 40 - 5 + 5,10,10);
    //draw label bg
    ctx.fillStyle = "#FFFFFF";
    y = (temps[i] - min) / range * 40 - 5 + 5;
    y = y - 24 < 0? y + 12 : y-20;
    ctx.fillRect(x-40, y,80,18);
    //draw label
    ctx.fillStyle = "#121212";
    ctx.fillText(temps[i] + " °" + unit, x, y + 15);
    console.log(x, (temps[i] - min) / range * 40 + 5);
  }
  ctx.stroke();


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
  let icon = "";
  if ( temp < 300){//thunderstorm
    icon = "resources/thunderstorm_FILL0_wght400_GRAD0_opsz48.svg";
  }
  else if ( temp < 600){//rain
    icon = "resources/rainy_FILL0_wght400_GRAD0_opsz48.svg";
  }
  else if ( temp < 700){//snow
    icon = "resources/ac_unit_FILL0_wght400_GRAD0_opsz48.svg";
  }
  else if (temp < 800) {//atmosphere (going to use windy as icon )
    icon = "resources/air_FILL0_wght400_GRAD0_opsz48.svg"
  }
  else if ( temp == 800){//clear
    if (data.weather[0].icon == "01d") {
      icon = "resources/sunny_FILL0_wght400_GRAD0_opsz48.svg";
    }
    else {
      icon = "resources/clear_night_FILL0_wght400_GRAD0_opsz48.svg";
    }
  }
  else if ( temp == 801){//partly cloudy
    if (data.weather[0].icon == "02d") {
      icon = "resources/partly_cloudy_day_FILL0_wght400_GRAD0_opsz48.svg";
    }
    else {
      icon = "resources/partly_cloudy_night_FILL0_wght400_GRAD0_opsz48.svg";
    }
  }
  else if ( temp > 800){//cloudy
    icon = "resources/cloudy_FILL0_wght400_GRAD0_opsz48.svg";
  }
  return icon;
}

function getAirPol(airdata) {
  //get data from call
  let time = hourlyTimeConverter(airdata.list[0].dt);
  let airQuality = airdata.list[0].main.aqi;//this is int
  let airTableHTML = "<table id='table'><thead><tr><th>Qualitative name</th><th>Index</th><th colspan='4'>Pollutant concentration in μg/m<sup>3</sup></th></tr></thead><tbody><tr><td colspan='2'></td><td>NO<sub>2</sub></td><td>PM<sub>10</sub></td><td>O<sub>3</sub></td><td>PM<sub>25</sub></td></tr><tr id='good'><td>Good</td><td>1</td><td>0-50</td><td>0-25</td><td>0-60</td><td>0-15</td></tr><tr id='fair'><td>Fair</td><td>2</td><td>50-100</td><td>25-50</td><td>60-120</td><td>15-30</td></tr><tr id='moderate'><td>Moderate</td><td>3</td><td>100-200</td><td>50-90</td><td>120-180</td><td>30-55</td></tr><tr id='poor'><td>Poor</td><td>4</td><td>200-400</td><td>90-180</td><td>180-240</td><td>55-110</td></tr><tr id='verypoor'><td>Very Poor</td><td>5</td><td>&gt;400</td><td>&gt;180</td><td>&gt;240</td><td>&gt;110</td></tr></tbody></table>";

  //set up DOM elements
  let airPolWrapper = document.getElementById("airPolWrapper");
  let airPolTableWrapper = document.createElement("div");
  let airPolDataWrapper = document.createElement("div");
  let airDataString = "Air Quality Rating: " + airQualityRating(airQuality) + ": " + airQuality;
  let timeHeader = document.createElement("h4");
  let moreInfo = document.createElement("p");

  //set up styling ids
  airPolTableWrapper.id = "airPolTableWrapper";
  airPolDataWrapper.id = "airPolDataWrapper";
  timeHeader.id = "timeHeader";
  moreInfo.id = "moreInfo"

  //put together
  airPolTableWrapper.innerHTML = airTableHTML;//table in wrapper
  timeHeader.innerHTML = time;
  moreInfo.innerHTML = "For more information <a href='https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants' target='_blank' rel='noopener noreferrer'>Click Here</a>";
  airPolWrapper.appendChild(timeHeader);//put timeHeader in Wrapper
  airPolDataWrapper.appendChild(document.createTextNode(airDataString));//put datda in datawrapper 
  airPolWrapper.appendChild(airPolDataWrapper);//put dataWrapper in wrapper
  airPolWrapper.appendChild(airPolTableWrapper);//put tableWrapper in wrapper
  airPolWrapper.appendChild(moreInfo);

  highlightAirRow(airQuality);
  
}

function highlightAirRow(airRating) {
  switch (airRating) {
    case 1:
      document.getElementById("good").style.backgroundColor = "#eeeeee";
      break;
    case 2:
      document.getElementById("fair").style.backgroundColor = "#eeeeee";
      break;
    case 3:
      document.getElementById("moderate").style.backgroundColor = "#eeeeee";
      break;
    case 4:
      document.getElementById("poor").style.backgroundColor = "#eeeeee";
      break;
    case 5:
      document.getElementById("verypoor").style.backgroundColor = "#eeeeee";
      break;
  }
}

function airQualityRating(airRating) {
  switch (airRating) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
  }
}

getUnits();
getByCity("new york");