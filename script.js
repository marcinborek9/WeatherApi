function get_response(search_string){
	let http = new XMLHttpRequest();
<<<<<<< HEAD
	let request = "https://api.apixu.com/v1/forecast.json?key=4b5f72202fe346238ae191957180501&q=" + encodeURIComponent(search_string) + "&days=7";
=======
	let request = "https://api.apixu.com/v1/current.json?key=4b5f72202fe346238ae191957180501&q=" + encodeURIComponent(search_string);
>>>>>>> e3deec325c81103f51c27b47cb8e96586c473954
	http.open("GET", request, false);
	http.send();
  return JSON.parse(http.response);
}
document.getElementById('allDaysResults').style.display = 'none';

var infoWindow;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 52.259, lng: 21.020}
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your location.');
      infoWindow.open(map);
      map.setCenter(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function searchByTerm() {
  let input = document.getElementById('address');
  let object = get_response(input.value);

  document.getElementById('search-results__location-info').innerHTML = 
  '<h3>' + object['location']['country'] + ' / ' + object['location']['name'] +'</h3>'
  + '<p>' + '<label>' + 'Last update: ' +' </label>' + object['current']['last_updated'] + '</p>'
  + '<p>' + '<label>' + 'Localtime: ' +' </label>' + object['location']['localtime'] + '</p>'
  + '<p>' + '<label>' + 'Region: ' +' </label>' + object['location']['region'] + '</p>';

  document.getElementById('search-results__current-first').innerHTML = 
  '<h3>' + 'Weather info' + '</h3>'
  + '<p>' + '<label>' + 'Feels like temperature as celcius: ' +' </label>' + object['current']['feelslike_c'] + ' <img src="icons/celsius.png">'+'</p>' 
  + '<p>' + '<label>' + 'Feels like temperature as fahrenheit: ' +' </label>' + object['current']['feelslike_f'] + ' <img src="icons/fahrenheit.png">'+ '</p>'
  + '<p>' + '<label>' + 'Wind speed in kph: ' +' </label>' + object['current']['wind_kph'] + '</p>'
  + '<p>' + '<label>' + 'Wind speed in mph: ' +' </label>' + object['current']['wind_mph'] + '</p>';
  
  document.getElementById('search-results__current-second').innerHTML = 
  '<h3>' + 'weather details' + '</h3>'
  + '<p>' + '<label>' + 'Wind direction in degrees: ' +' </label>' + object['current']['wind_degree'] + '</p>'
  + '<p>' + '<label>' + 'Wind direction as 16 point compass: ' +' </label>' + object['current']['wind_dir'] + '</p>'
  + '<p>' + '<label>' + 'Pressure in millibars: ' +' </label>' + object['current']['pressure_in'] + '</p>'
  + '<p>' + '<label>' + 'Pressure in inches: ' +' </label>' + object['current']['pressure_mb'] + '</p>';

  for (var i = 1; i < object['forecast']['forecastday'].length; i++) {
    console.log(object['forecast']['forecastday'][i])
    document.getElementById('search-results__forecast').innerHTML += 
    '<div class=' + '"search-results__forecast-allDays">' 
    + '<h3>' + object['forecast']['forecastday'][i]['date'] + '</h3>'
    + '<p>' + '<label>' + 'Min. temp. in :' + ' </label>' + object['forecast']['forecastday'][i]['day']['mintemp_c'] + ' <img src="icons/celsius.png">' + '</p>'
    + '<p>' + '<label>' + 'Max. temp. in :' + ' </label>' + object['forecast']['forecastday'][i]['day']['maxtemp_c'] + ' <img src="icons/celsius.png">' + '</p>'
    + '<p>' + '<label>' + 'Min. temp. in :' + ' </label>' + object['forecast']['forecastday'][i]['day']['mintemp_f'] + ' <img src="icons/fahrenheit.png">' + '</p>'
    + '<p>' + '<label>' + 'Max. temp. in :' + ' </label>' + object['forecast']['forecastday'][i]['day']['maxtemp_f'] + ' <img src="icons/fahrenheit.png">' + '</p>'
    + '</div>';
  }
}
document.querySelector('#submit').addEventListener('click', function() {
  searchByTerm()
  document.getElementById('showDays').style.display = 'inline-block';
});


document.querySelector('#showDays').addEventListener('click', function() {
  document.getElementById('allDaysResults').style.display = 'block';
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

