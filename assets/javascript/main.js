    // Array of dance moves 
    var danceMoves = ["Touchdown Dance","Moonwalk", "Running Man", "Cabbage Patch", "The Carlton"];

    //function to re-renders the HTML to display the appropriate content
    function displayDanceInfo() {

        var danceMoves = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + danceMoves + "&api_key=xFwLJee2rfnUnp9f3A5h9rKfVF6m795f&limit=10";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;
            $("#dance-view").empty();
            
        for (var i = 0; i < danceMoves.length; i++){
            danceMoves[i] = danceMoves[i].trim();
        
            // Creating a div to hold the dances
            var danceDiv = $("<div class='dance'>");


            // Retrieving the URL for the image
            var imgURL = response.data[i].images.original.url;

            // Creating an element to hold the image
            var danceImage = $("<img>").attr("src", imgURL);

            // Appending the image
            danceDiv.append(danceImage);

            // Putting dance moves above the previous dance moves
            $("#dance-view").prepend(danceDiv);
        }
        });

    }

    // Function for displaying  data
    function renderButtons() {

        // Deleting the dances prior to adding new ones
        $("#dance-view").empty();

        // Looping through the array of dances

        var i;
        for (i = 0; i < danceMoves.length; i++) {

            
            var a = $("<button>");

            a.addClass("dance-btn");
            
            a.attr("data-name", danceMoves[i]);
          
            a.text(danceMoves[i]);
          
            $("#buttons-view").append(a);
        }
    }

   
    $("#add-dance").on("click", function (event) {
        event.preventDefault();
       
        var jams = $("#dance-input").val().trim();

        // Adding dances from the textbox to our array
        danceMoves.push(jams);

       
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "dance-btn"
    $(document).on("click", ".dance-btn", displayDanceInfo);

   //display the buttons
    renderButtons();
//