var byId = function (id) {
    return document.getElementById(id);
}; //shorten document.getElementbyId()
var OPENWEATHERMAP_KEY = "6eec0ad9454412f89280b2b7e203bd3c";
var GOOGLEMAP_KEY = "AIzaSyBpUFTvhDRKsh6F0hyZcRqPJ16xcjgtINQ";

function DOM(id, val) {
    byId(id).innerHTML = val;
}

function loaded() {
    byId('loader').style.display = "none";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.write("Geolocation is not supported by this browser.");
    }

    function showError(error) {
        switch (error.code) {
        case error.PERMISSION_DENIED:
            byId('panel').innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            byId('panel').innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            byId('panel').innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            byId('panel').innerHTML = "An unknown error occurred."
            break;
        }
    }
}

function showPosition(position) {

    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;


    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + OPENWEATHERMAP_KEY, function (data) {
        $.each(data, function (k, v) {});
        city = data.name;
        DOM('city', city);
        country = data.sys.country;
        DOM('country', ", " + country);
        toHTML("metric");
    });

    var latlon = latitude + "," + longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?&markers=size:mid%7Ccolor:red%7Clabel:You%7C" + latitude + "," + longitude + "&scale=2&center=" + latlon + "&zoom=18&size=450x450&sensor=false&key=" + GOOGLEMAP_KEY;
    document.getElementById("maps").innerHTML = "<img class='mapholder' src='" + img_url + "'>";
}
getLocation();



function toHTML(units) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=" + units + "&APPID=" + OPENWEATHERMAP_KEY, function (data) {
        var items = [];
        $.each(data, function (key, val) {});
        city = byId('city').innerHTML.toLowerCase();
        country = byId('country').innerHTML.toLowerCase();
        mainContext = data.weather[0].main;
        DOM('main', mainContext);
        secondContext = data.weather[0].description;
        DOM('second', secondContext);
        temperature = data.main.temp;
        humidity = data.main.humidity;
        DOM('humid', humidity + "%");
        clouds = data.clouds.all;
        DOM('clouds', clouds + "%");
        wind = data.wind.speed;
        DOM("city", city);
        pressure = data.main.pressure + ' hPa';
        DOM("pressure", pressure);
        icon = "url(http://openweathermap.org/img/w/04d.png)";
        id = data.weather[0].id;
        if (units == 'metric') {
            DOM("wind", Math.round(wind * 3.6) + " Km/h");
            DOM('temp', temperature + " °C")

        } else {
            DOM('temp', temperature + " °F")

            DOM("wind", wind + " Miles/h");

        }

    });
    loaded();
}


function active(button) {
    if (button.id == "f") {
        byId('f').className = "active";
        byId('c').className = "";

    } else {
        byId('f').className = "";
        byId('c').className = "active";
    }
}
