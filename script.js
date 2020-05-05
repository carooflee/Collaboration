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

    $(".container").append(headerDiv);
    $(".form-group").append(formGroupDiv);
    $(".row-fluid").append(inputDiv);
    $(".form-group").append(searchBtn);

    //Click fades Input Group out
    $("#search-button").on("click", function () {
        $(".searchDiv").fadeOut();
    })
    // Same click fades Card contents in
    $("#search-button").on("click", function () {
        let cuisineValue = $("#foodType").val().trim();
        // $(".card").fadeIn();
        searchRestaurant(cuisineValue);
    });

    function searchRestaurant(cuisine) {

        let APIKey = "34e52954cf804b1932d1e06de180b698";

        // URL to query the database
        let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" + cuisine + "&count=100&sort=rating&order=desc&apikey=" + APIKey;
        // $.ajax({
        //     url: queryURL2,
        //     method: "GET"
        // }).then(function (response2) {

        // Plug recipe APIKey here
        // let queryURL = "";

        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //Restaurant Section
            let restHead = $("<h3>");
            restHead.text("Restaurants:")
            $("#restaurant-row").append(restHead);

            // for loop cycles through Card creation below
            for (let i = 0; i < 5; i++) {

                let colm = $("<div>");
                let restDiv = $("<h4>");
                let addP = $("<p>");
                let rateP = $("<p>");
                let priceCompP = $("<p>");


                colm.addClass("card col s3 blue-grey darken-1 outercard-custom");
                colm.attr("id", "card-" + [i])
                restDiv.addClass("flow-text card-content innercard-custom");
                restDiv.text(response.restaurants[i].restaurant.name)
                addP.addClass("flow-text card-content white-text innercard-custom");
                addP.text(response.restaurants[i].restaurant.location.address);
                rateP.addClass("flow-text card-content white-text innercard-custom");
                rateP.text("Restaurant Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
                priceCompP.addClass("flow-text card-content white-text innercard-custom");
                priceCompP.text("Price Comparison: " + response.restaurants[i].restaurant.price_range);

                // Append column to Row and append contents to Card
                $("#restaurant-row").append(colm);
                $("#card-" + [i]).append(restDiv);
                $("#card-" + [i]).append(addP);
                $("#card-" + [i]).append(rateP);
                $("#card-" + [i]).append(priceCompP);

            };
        });
    // });
    };
});