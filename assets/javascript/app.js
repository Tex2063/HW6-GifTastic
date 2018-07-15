$(document).ready(function () {

    //grabbing the click
    $('button').on('click', function () {
        var animal = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {


                console.log(response)

                var results = response.data;

                //loop for the array that pulls the results
                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div/>');

                    var p = $('<p/>');

                    p.text(results[i].rating);

                    var animalImage = $('<img/>');
                    // adding class to image
                    animalImage.addClass('anImg')
                    // adding the source to the img                     
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    // adding attribute still source 
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    // adding attribute animated source
                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                        .attr('data-state', 'still');

                    animalDiv.append(p);

                    animalDiv.append(animalImage);
                    // putting the image in front of the previous results
                    animalDiv.prependTo($('#gifs'));
                }
                //when image is clicked do the following
                $('.anImg').on('click', function () {

                    var state = $(this).attr('data-state');
                    console.log(this);
                    // if the result is still - reanimate it
                    if (state == 'still') {

                        $(this).attr('src', $(this).data('animate'));

                        $(this).attr('data-state', 'animate');

                    } else {
                        //  make it still                           
                        $(this).attr('src', $(this).data('still'));

                        $(this).attr('data-state', 'still');
                    }
                });
            });
    });

    var animals = [''];


    //adds the buttons 

    // handles event when clicked
    $('#theButton').on('click', function () {
        var animalButton = $("#gif-input").val();

        //adds new search
        var newButton = $("<button/>").addClass("btn btn-info animal").attr('data-name', animalButton).html(animalButton).css({ 'margin': '5px' });

        //creates new button
        $("#animalsbuttons").append(newButton);
        console.log("Work");

        //query to the giphy api with the animal button and api key
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(animalButton);

        //ajax to go get the giphy results
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {

                // waiting for the results
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div/>');

                    var p = $('<p/>');

                    p.text(results[i].rating);

                    var animalImage = $('<img/>');

                    animalImage.addClass('anImg')

                    animalImage.attr('src', results[i].images.fixed_height_still.url);

                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)

                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                        .attr('data-state', 'still');

                    animalDiv.append(p);

                    animalDiv.append(animalImage);

                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function () {

                    // setting the result ti still or animate
                    var state = $(this).attr('data-state');
                    console.log(this);

                    if (state == 'still') {

                        $(this).attr('src', $(this).data('animate'));

                        $(this).attr('data-state', 'animate');

                    } else {

                        $(this).attr('src', $(this).data('still'));

                        $(this).attr('data-state', 'still');
                    }
                });
            });

        $("#gif-input").val("");
        return false;
    })

});