function getWeather(lat, lon) {
      var apikey = "adbf7a5641d4e0a71b928d138a4b6bed";
      var weatherurl =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + lon + "";
      var tempClick;
      weatherurl = weatherurl + "&appid=" + apikey;
      console.log(weatherurl);
      $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: weatherurl,
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR + ":" + textStatus + ":" + errorThrown);
        },
        success: function(r) {
          console.log(r);
          if (typeof r === "string") {
            r = JSON.parse(r);
          }
          //Temperature in fahrenheit
          currentHumidity = r.main.humidity;
          currentTemp = 9 / 5 * (parseInt(r.main.temp) - 273) + 32;
          currentMaxTemp = 9 / 5 * (parseInt(r.main.temp_max) - 273) + 32;
          currentMinTemp = 9 / 5 * (parseInt(r.main.temp_min) - 273) + 32;
          currentName = r.name;
          windSpeed = r.wind.speed;
          weatherType = r.weather[0].description;
          weatherIcon = r.weather[0].icon;
    
          console.log(
            currentHumidity,
            currentTemp,
            currentMaxTemp,
            currentMinTemp,
            currentName,
            windSpeed,
            weatherType,
            weatherIcon
          );
    
          //Temperature in celsius
          celsiusCurrentTemp = parseInt(r.main.temp) - 273;
          celsiusMaxTemp = parseInt(r.main.temp_max) - 273;
          celsiusMinTemp = parseInt(r.main.temp_min) - 273;
          windSpeed = r.wind.speed;
          weatherType = r.weather[0].description;
          weatherIcon = r.weather[0].icon;
    
          console.log(
            currentHumidity,
            celsiusCurrentTemp,
            celsiusMaxTemp,
            celsiusMinTemp,
            currentName,
            windSpeed,
            weatherType,
            weatherIcon
          );
    
          $("#place").html(currentName);
          $("#temp").html(currentTemp + "&#8457;");
          var iconSource =
            "http://openweathermap.org/img/w/" + weatherIcon + ".png";
          $("#temp").prepend('<img src="' + iconSource + '">');
          $("#humidity").html(currentHumidity);
          windSpeed = (2.237 * windSpeed).toFixed(1);
          $("#windSpeed").html(windSpeed + "mph");
    
          $("#weatherType").html(weatherType);
    
          $("#temp").click(function() {
            if (tempClick === false) {
              $("#temp").html(currentTemp + "&#8457;");
              $("#temp").prepend('<img src="' + iconSource + '">');
              tempClick = true;
            } else {
              $("#temp").html(celsiusCurrentTemp + "&#8451;");
              $("#temp").prepend('<img src="' + iconSource + '">');
              tempClick = false;
            }
          });
          if (currentTemp > 80) {
          } else if (currentTemp > 70) {
            $("body").css("background-image", url("images/background.jpg"));
          }
        }
      });
}

 $(document).ready(function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $("#data").html(
            "latitude: " +
              position.coords.latitude +
              "<br>longitude: " +
              position.coords.longitude
          );
          getWeather(position.coords.latitude, position.coords.longitude);
        });
      } else {
        // update ui that the permission wasn't given for location. So display some default location
      }
});