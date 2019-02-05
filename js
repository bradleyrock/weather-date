// -------------------------------------------- / Switch Div onClick 

$('#weather, #locale').on('load',
  function() {
    $('#weather').fadIn(3000)
    $('#locale').fadOut(3000)
  }
);

$('#date').hide();
$('#time, #date').on('click',
  function() {
    $('#time, #date').toggle()
  }
);

$('#mute').hide();
$('#unmute, #mute').on('click',
  function() {
    $('#unmute, #mute').toggle()
  }
);

$('.window').hide();
$('.home, .window').on('click',
  function() {
    $('.home, .window').toggle()
  }
);

// -------------------------------------------- / Location & Temp 

var weather = '<span id="temperature"></span><span id="deg">&deg; | </span><span id="condition"></span>',
    geoAPI = "AIzaSyDC6U1aZXcePTAR20iwRKIuJ26LqXX6t5s",
    geoString = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%latitude%,%longitude%&key=%geoAPI%",
    weatherKey = "56e678830a6e621a5f38e1b43296e432",
    weatherStr = "https://api.darksky.net/forecast/%weatherKey%/%latitude%,%longitude%?callback=?";
 
function locationDescription(e) {
    var t = geoString.replace(/%latitude%/g, e.latitude).replace(/%longitude%/g, e.longitude).replace(/%geoAPI%/g, geoAPI);
    $.getJSON(t, function(e) {
        $("#locale").html(e.results[0].formatted_address) // get address, city, stat, zip, country
    })
}

function currentWeather(e) {
    var t = weatherStr.replace(/%weatherKey%/g, weatherKey).replace(/%latitude%/g, e.latitude).replace(/%longitude%/g, e.longitude);
    $.getJSON(t, function(e) {
        $("#temperature").html(parseInt(e.currently.temperature)), $("#condition").html(e.currently.summary) // get temperature and condition
    })
}

function weatherApp() {
    navigator.geolocation.getCurrentPosition(function(e) {
        var t = e.coords.latitude,
            a = e.coords.longitude,
            r = {latitude: t, longitude: a};
        locationDescription(r), currentWeather(r)})}
        $("#weather").html(weather), $(document).ready(function() {
        weatherApp()
}) 
  
// -------------------------------------------- / Date

var currentDate = new Date,
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();
day < 10 && (day = "0" + day), month < 10 && (month = "0" + month), 
  document.getElementById("date").innerHTML = month + "." + day + "." + year;

// -------------------------------------------- / Time  

    now = setInterval(brClock, 1000);

function brClock() {
var today = new Date(),
    h = today.getHours(),
    m = today.getMinutes(),
    h = hrFormat(h),
    m = checkTime(m),
    n = midNight(n);

  function hrFormat(f) {
      if (f > 12) {f = f - 12};  // change 24hr format to 12hr format
      return f;
  }

  function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }
  
  function midNight(n) {
      if (h == 0) {
        h = 12;
    }
  }

    var d = new Date(),
    weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
    var dayname = weekday[d.getDay()];
    var time = h + ":" + m;
    document.getElementById("time").innerHTML = dayname + " " + time;
}
