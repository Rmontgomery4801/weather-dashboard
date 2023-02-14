// buttons
$('#searchBtn').on('click',async function(event) {
  event.preventDefault();
  var cityEl = document.getElementById("cityInput");
  let citySrc = $('#cityInput').val();

  if (citySrc === "") {
      return;
  } else {
      cities.push(citySrc);
      cityEl.value = "";
  }
  document.getElementById("cityName").innerHTML = citySrc;

  // weather api
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySrc + '&units=imperial&appid=2e7c64cef5d0e55ff606bdb08310a14f')
      .then(response => response.json())
      .then(data => {
          // for loops use api data to collect and print desired variables

          for (i=0; i<6; i++) {
              document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
          }
          
          for(i=0; i<6; i++) {
              document.getElementById("temp" + (i+1)).innerHTML = "Temp: " + data.list[i].main.temp.toFixed(0) + "°F";
          }

          for(i=0; i<6; i++) {
              document.getElementById("wind" + (i+1)).innerHTML = "Wind: " + data.list[i].wind.speed + " mph";
          }

          for(i=0; i<6; i++) {
              document.getElementById("humidity" + (i+1)).innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
          }
      })

  storeCities();
  renderLocal();
})

// clears search history on page and in localstorage
$('#clearBtn').on('click', function() {
  localStorage.clear();
  location.reload();
});


// localstorage
// array for searched cities
var cities = [];

// store searches in localstorage
function storeCities() {
  // set key in localstorage and city array
  localStorage.setItem("cities", JSON.stringify(cities));
}

// render items in localstorage as paragraph elements
function renderLocal() {
  var cityList = document.getElementById("prevSearch");  
  // clear list each input to prevent duplicates
  cityList.innerHTML = "";

  // create new element for each entry
  for (var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var newCity = document.createElement("p");
      newCity.textContent = city;
      $("newCity").on('click', function() {
          $('#searchBtn');
      })

      cityList.appendChild(newCity);
  }
}

// loads localstorage on page load
function init() {
  // gets stored cities from localstorage
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // update array with new entry
  if (storedCities !== null) {
      cities = storedCities;
  }
  renderLocal();
}



// calls funtion to run on page load
init();