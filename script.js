$(document).ready(function () {

    // Input Group
    let headerDiv = $("<div>");
    let formGroupDiv = $("<div>");
    let inputDiv = $("<input>");
    let searchBtn = $("<button>");

    headerDiv.addClass("form-group searchDiv");
    headerDiv.text("Six Feet or Further: Seattle");

    formGroupDiv.addClass("row-fluid searchDiv");

    inputDiv.addClass("form-control");
    inputDiv.attr("id", "foodType");
    inputDiv.attr("placeholder", "Type of Food...");

    searchBtn.addClass("btn");
    searchBtn.attr("id", "search-button");
    searchBtn.text("Search");

    $("body").append(headerDiv);
    $(".form-group").append(formGroupDiv);
    $(".row-fluid").append(inputDiv);
    $(".form-group").append(searchBtn);

    //Click fades Input Group out
    $("#search-button").on("click", function () {
         $(".searchDiv").fadeOut();
        $("#foodType").fadeOut();
    })
    // Same click fades Card contents in
    $("#search-button").on("click", function () {
        let cuisineValue = $("#foodType").val().trim();
        // $(".card").fadeIn();
        searchRestaurant(cuisineValue);
        displayFoodOptions(cuisineValue);
    });

   

    function searchRestaurant(cuisine) {

        let APIKey = "34e52954cf804b1932d1e06de180b698";

        // URL to query the database
        let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" + cuisine + "&count=100&sort=rating&order=desc&apikey=" + APIKey;
        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // for loop cycles through Card creation below
            for (let i = 0; i <= 3; i++) {
                // Card
                let colm = $("<div>");
                colm.addClass("card card-" + [i]);
                $("#testCard").append(colm);

                let restDiv = $("<h3>");
                restDiv.text(response.restaurants[i].restaurant.name)
                $(".card-" + [i]).append(restDiv);

                let addP = $("<p>");
                addP.text(response.restaurants[i].restaurant.location.address);
                $(".card-" + [i]).append(addP);

                let rateP = $("<p>");
                rateP.text("Restaurant Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
                $(".card-" + [i]).append(rateP);

                let priceCompP = $("<p>");
                priceCompP.text("Price Comparison: " + response.restaurants[i].restaurant.price_range);
                $(".card-" + [i]).append(priceCompP)
                
            }
});
            function displayFoodOptions(foodChoice){           
            let i = 0;
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&q=${foodChoice}&from=0&sizes=5`,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tasty.p.rapidapi.com",
                    "x-rapidapi-key": "6b993b882bmsha7daac7eff39d3cp1825fcjsn0ba77ad0c74a"
                }
            }
            $.ajax(settings).then(function (response) {
                console.log(response);
                console.log(response.results[i].name);
                let foods = response.results;

                $.each(foods, function (index, food) {
                    let foodTitle = $("<button>").text(food.name);
                    $(".display-food").append(foodTitle).attr("href",);

                    foodTitle.on("click", function () {
                        $(".display-food").empty();
                        let foodDiv = $("<div>").addClass("card");
                        let foodImage = $("<img>").attr("src", food.thumbnail_url).width("150px").height("150px");
                        let recipeArr = food.instructions;
                        foodDiv.append(foodImage);
                        let instructionsDiv = $("<div>").addClass("container");

                        for (let i = 0; i <= 3; i++) {
                            let foodRecipe = $("<li>").text(recipeArr[i].display_text);
                            console.log(recipeArr[i].display_text);
                            instructionsDiv.append(foodRecipe);
                        }
                        foodDiv.append(instructionsDiv);
                        $(".display-food").append(foodDiv);
                    })
                })
            });
            }
        
        });
    }
