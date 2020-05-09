$(document).ready(function () {

    // Prompt user upon entry
    let entryValue = localStorage.getItem("cuisineEntry")
    let previousValue = localStorage.getItem("previousCuisine")

    //If local storage = something show "Back Again" message:  We're happy to have you back again!  How did you enjoy your (last local storage entry)?  Did you end up cooking something up or venturing out to a restaurant?
    if (entryValue === "true") {

        // "Back Again" pop up



        let overlayDiv = $("<div>");
        overlayDiv.addClass("col s12 m6 overlay-1");
        $("body").append(overlayDiv);

        let popDiv = $("<div>");
        popDiv.addClass("card blue-grey darken-1 card-over-1");
        $(".overlay-1").append(popDiv);

        let cardoverDiv = $("<div>");
        cardoverDiv.addClass("card-content white-text pop-content");
        cardoverDiv.text("We're happy to have you back again!  How did you enjoy your " + previousValue + " food?  Did you end up cooking something up or venturing out to a restaurant?")
        $(".card-over-1").append(cardoverDiv);
        
        let cardAction = $("<div>");
        cardAction.addClass("card-action");
        $(".card-over-1").append(cardAction);

        let popA1 = $("<a>");

        popA1.addClass("col s12");
        popA1.text("I Cooked!");
        popA1.attr("id", "popup-1");
        $(".card-action").append(popA1);

        let popA2 = $("<a>");
        popA2.addClass("col s12");
        popA2.text("I Grabbed Something!");

        popA2.attr("id", "popup-2");
        $(".card-action").append(popA2);

    } else {

        // "First Time" pop up

        let overlayDiv = $("<div>");
        overlayDiv.addClass("col s12 m6 overlay-1");
        $("body").append(overlayDiv);

        let popDiv = $("<div>");
        popDiv.addClass("card blue-grey darken-1 card-over-1");
        $(".overlay-1").append(popDiv);

        let cardoverDiv = $("<div>");
        cardoverDiv.addClass("card-content white-text pop-content");
        cardoverDiv.text("Hungry?  We're here to help! Since this is your first time visiting our site, simply type in what you are craving (i.e. Italian), click search and let us do the rest!")
        $(".card-over-1").append(cardoverDiv);
        
        let cardAction = $("<div>");
        cardAction.addClass("card-action");
        $(".card-over-1").append(cardAction);

        let popA3 = $("<a>");
        popA3.text("Click to start!");
        popA3.attr("id", "popup-start");
        $(".card-action").append(popA3);

    }


    // Adds 0 value to localStorage

    $("#popup-start").on("click", function () {
        $(".overlay-1").hide();
        localStorage.setItem("restaurant", 0)
        localStorage.setItem("recipe", 0)
    });
    // Metrics:  Adds to either Restaurant Count or Recipe Count
    $("#popup-1").on("click", function () {
        $(".overlay-1").hide();
        let addRestaurant = parseInt(localStorage.getItem("restaurant"));
        let addedRes = addRestaurant + 1;
        localStorage.setItem("restaurant", addedRes);
    });
    $("#popup-2").on("click", function () {
        $(".overlay-1").hide();
        let addRecipe = parseInt(localStorage.getItem("recipe"));
        let addedRec = addRecipe + 1;
        localStorage.setItem("recipe", addedRec);
    });


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
        $(".searchDiv").hide();

    });

    // Same click fades Card contents in
    $("#search-button").on("click", function () {
        let cuisineValue = $("#foodType").val().trim();
        localStorage.setItem("cuisineEntry", true);
        localStorage.setItem("previousCuisine", cuisineValue)
        searchRestaurant(cuisineValue);
    });

    // Segue between search and results(This helps with aesthetic due to timing delay with two AJAX calls)
    $(".hungry").text("Are you ready to eat?").hide();

    $("#search-button").on("click", function () {
        $(".hungry").fadeIn("slow");
    });

    function searchRestaurant(cuisine) {

        // API Restaurants Zomato.com
        let APIKey = "34e52954cf804b1932d1e06de180b698";
        let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" + cuisine + "&count=100&sort=rating&order=desc&apikey=" + APIKey;
        // API Recipes Tasty via rapidapi.com
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&q=" + cuisine + "&from=0&sizes=5",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tasty.p.rapidapi.com",
                "x-rapidapi-key": "6b993b882bmsha7daac7eff39d3cp1825fcjsn0ba77ad0c74a"
            }
        }

        // AJAX call to first call Recipes JSON data
        $.ajax(settings).then(function (response2) {


            $(".hungry").fadeOut();
            //AJAX call to then call data gathered by Recipe AJAX call to async full call of all data
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                $("#row-1").text("Restaurants!").addClass("header");
                $("#row-2").text("Recipes!").addClass("header");

                // for loop cycles through Card creation below
                for (let i = 0; i < 4; i++) {
                  
                    // Restaurant Cards

         

                    let colm = $("<div>");
                    colm.addClass("card card-custom resrow-" + [i]);
                    $("#restRow").append(colm);

                    let restDiv = $("<h3>");
                    restDiv.text(response.restaurants[i].restaurant.name)
                    $(".resrow-" + [i]).append(restDiv);

                    let addP = $("<p>");
                    addP.text(response.restaurants[i].restaurant.location.address);
                    $(".resrow-" + [i]).append(addP);

                    let rateP = $("<p>");
                    rateP.text("Restaurant Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
                    $(".resrow-" + [i]).append(rateP);

                    let priceCompP = $("<p>");
                    priceCompP.text("Price Comparison: " + response.restaurants[i].restaurant.price_range);
                    $(".resrow-" + [i]).append(priceCompP);
                };

                for (let i = 0; i < 4; i++) {

                    // Recipe Cards

                    let food = response2.results;
                    let colm2 = $("<div>");
                    colm2.addClass("card card-custom recrow-" + [i]);
                    $("#recRow").append(colm2);

                    let restDiv = $("<h3>");
                    restDiv.text(response2.results[i].name)
                    $(".recrow-" + [i]).append(restDiv);


                    let addRecA = $("<a>");
                    addRecA.text("Click Here for Recipe!")
                    $(".recrow-" + [i]).append(addRecA);
                    // From A tag above on click empty body and show Recipe list from user's selection
                    addRecA.on("click", function () {

                        $("body").empty();
                        let foodDiv = $("<div>").addClass("card recipe");
                        let foodImage = $("<img>").attr("src", food[i].thumbnail_url).width("150px").height("150px");
                        let recipeArr = food[i].instructions;
                        foodDiv.append(foodImage);
                        let instructionsDiv = $("<div>").addClass("container");
                        for (let i = 0; i < recipeArr.length; i++) {
                            let foodRecipe = $("<li>").text(recipeArr[i].display_text);
                            instructionsDiv.append(foodRecipe);
                        }
                        foodDiv.append(instructionsDiv);

                    $("body").append(foodDiv);
                    

                })};
            });
        });
    };

});
