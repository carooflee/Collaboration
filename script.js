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
    });

    // Same click fades Card contents in
    $("#search-button").on("click", function () {
        let cuisineValue = $("#foodType").val().trim();

        searchRestaurant(cuisineValue);
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

        //AJAX call to then call data gathered by Recipe AJAX call to async full call of all data
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                $("#row-1").text("Restaurants!")
                $("#row-2").text("Recipes!")

                // for loop cycles through Card creation below
                for (let i = 0; i < 4; i++) {
                    // Card
                    let colm = $("<div>");
                    colm.addClass("card resrow-" + [i]);
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
                    // Card
                    let colm2 = $("<div>");
                    colm2.addClass("card recrow-" + [i]);
                    $("#recRow").append(colm2);

                    let restDiv = $("<h3>");
                    restDiv.text(response2.results[i].name)
                    $(".recrow-" + [i]).append(restDiv);

                    let addP = $("<p>");
                    addP.text("Click Here for Recipe!");
                    $(".recrow-" + [i]).append(addP);

                };
            });
        });
    };
});