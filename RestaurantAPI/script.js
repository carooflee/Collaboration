$(document).ready(function () {

    function searchRestaurant(cuisine) {

        let APIKey = "34e52954cf804b1932d1e06de180b698";

        // URL to query the database
        let queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" + cuisine + "&count=100&sort=rating&order=desc&apikey=" + APIKey;
        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let colm = $("<div>");
            $(".column").append(colm);

            let restDiv = $("<h3>");
            restDiv.text("Restaurant Name: " + response.restaurants[0].restaurant.name)
            $(".card").append(restDiv);
            
            let addP = $("<p>");
            addP.text("Address: " + response.restaurants[0].restaurant.location.address);
            $(".card").append(addP);
            
            let rateP = $("<p>");
            rateP.text("Restaurant Rating: " + response.restaurants[0].restaurant.user_rating.aggregate_rating);
            $(".card").append(rateP);
            
            let priceCompP = $("<p>");
            priceCompP.text("Price Comparison: " + response.restaurants[0].restaurant.price_range);
            $(".card").append(priceCompP);


        });
    }
    $("#search-button").on("click", function () {
        let cuisineValue = $("#test-cuisine-search").val().trim()

        searchRestaurant(cuisineValue);
    });

});