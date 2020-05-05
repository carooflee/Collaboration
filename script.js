$("#searchBtn").on("click", function(event) {

    event.preventDefault();
    


    let startDate = $("#startDate").val();
    let chosenCity = $("#city").val();
    let chosenState = $("#state").val();

    // let uvIndex = (lat + lon)
    console.log(chosenCity);
    console.log(chosenState);
    
    // let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    // console.log(searchHistory);
    
    
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "," + chosenState + "&appid=db1d83160d3e50f7b11b341c82ba1b25"
    console.log(queryURL);
    // let queryURL =  "http://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&appid=db1d83160d3e50f7b11b341c82ba1b25"
    
    
      
    $.ajax({
        url: queryURL,
        method: "GET"})
      .then(function(response) {
        console.log(response);
        
        let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            
        // let iconCode = response.weather[0].icon;
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lat;
        // let queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" {appid}&lat={lat}&lon={lon}
        
        // let iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        $(".city").text(response.city.name);
        $(".temp").text("Temperature: " + Math.floor(tempF));
        $(".icon").text(response.list[0].weather.icon);
        $(".humidity").text("Humidity: " + response.list[0].main.humidity);
        $(".wind-speed").text("Wind Speed: " + response.list[0].wind.speed);

        let iconcode = a.response.list[0].weather.icon;
        let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png"
        $('#wicon').attr('src', iconurl);
     
       

        // let lat = response.city.coord.lat;
        // let lon = response.city.coord.lon;

        let tempOne = (response.list[1].main.temp - 273.15) * 1.80 + 32;
        $(".temperOne").text("Temperature: " + Math.floor(tempOne));
        $(".humidityOne").text("Humidity: " + response.list[1].main.humidity);
        $(".windOne").text("Wind Speed: " + response.list[1].wind.speed);
  
       
        let tempTwo = (response.list[2].main.temp - 273.15) * 1.80 + 32;
        $(".temperTwo").text("Temperature: " + Math.floor(tempTwo));
        $(".humidityTwo").text("Humidity: " + response.list[2].main.humidity);
        $(".windTwo").text("Wind Speed: " + response.list[2].wind.speed);


        let tempThree = (response.list[3].main.temp - 273.15) * 1.80 + 32;
        $(".temperThree").text("Temperature: " + Math.floor(tempThree));
        $(".humidityThree").text("Humidity: " + response.list[3].main.humidity);
        $(".windThree").text("Wind Speed: " + response.list[3].wind.speed);


        let tempFour = (response.list[4].main.temp - 273.15) * 1.80 + 32;
        $(".temperFour").text("Temperature: " + Math.floor(tempFour));
        $(".humidityFour").text("Humidity: " + response.list[4].main.humidity);
        $(".windFour").text("Wind Speed: " + response.list[4].wind.speed);


        let tempFive = (response.list[5].main.temp - 273.15) * 1.80 + 32;
        $(".temperFive").text("Temperature: " + Math.floor(tempFive));
        $(".humidityFive").text("Humidity: " + response.list[5].main.humidity);
        $(".windFive").text("Wind Speed: " + response.list[5].wind.speed);
         // console.log(response.name);

         
  // let icon1 = responseTwo.list[4].weather[0].icon;
  // let icon1url = "http://openweathermap.org/img/w/" + icon1 + ".png";

  // let icon2 = responseTwo.list[4].weather[0].icon;
  // let icon2url = "http://openweathermap.org/img/w/" + icon2 + ".png";

  // let icon3 = responseTwo.list[4].weather[0].icon;
  // let icon3url = "http://openweathermap.org/img/w/" + icon3 + ".png";

  // let icon4 = responseTwo.list[4].weather[0].icon;
  // let icon4url = "http://openweathermap.org/img/w/" + icon4 + ".png";

  // let icon5 = responseTwo.list[4].weather[0].icon;
  // let icon5url = "http://openweathermap.org/img/w/" + icon5 + ".png";
    
        // // console.log(response.weather[0].icon);
    
       
    
        // console.log(response.main.humidity);
    
        // console.log(response.wind.speed);
    
        //   let results = response.list;
        // console.log(results)


        // let temp = $(".temp");
        // temp.innerHTML = $(Math.round(weather.main.temp)) + "F";
        
        // let weather_el = $(".weather")
        // weather_el.innerText = weather.weather[0].main;


    
        // let lat = response.data.coord.lat;
        // let lon = response.data.coord.lon;
  })})

  // let temperature = $("#temp").text("Temperature: " + response.temp);
  // let windSpeed = $("#wind-speed").text("Wind Speed: " + response.wind.speed);
  // let humidity = $("#humidity").text("Humidity: " + response.humidity);
  // let UV = $(".UV");

//   function buildCardDiv(data) {
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         element.tempF;
//         buildCard(element);
//     }  
// }
// buildCardDiv();



