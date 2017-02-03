$(document).ready(function () {

  // var myFirebase = firebase.database();

  var sonApi = 'https://api.spotify.com/v1/tracks/?ids=5YNG7h28lGXNzdx7L9zrUP,3oFwFUxhOgem0hPpFsor1n,0wIEGEWdswpwOnpM3nuwkC,3b2J8pXcrlrGMY4q7zsBtI';
  var rumbaApi = 'https://api.spotify.com/v1/tracks/?ids=4F03szV3H55QIiP94TXrsT,6NJZNTuXQjWiDCptV0ASze,1KIimqBpVLFcS5Yc7DSQg9,47lSbhOlKE8fJJ2jc6HqRQ';
  var salsaApi = 'https://api.spotify.com/v1/tracks/?ids=3Pacy6CMa8HPNVfeA3wkPQ,3N3oba9mXWFD4NOnZFK46Q,0neyZWsvpfpyVutNtRjj8g,3zpPox6fuNguDVxRjSoBaJ,0ndv7r0b5KlDj3ZAmzpGQZ';

  function parseResults(result){
    var all_tracks = []; //this is a placeholder for what we want to return
    console.log('this is the tracks array',all_tracks)
    result.forEach(function(row){
      var onetrack = {
        title : row.name,
        artist : row.artists[0].name,
        album : row.album.name,
        link : row.preview_url,
        image : row.album.images[2].url
      };
      all_tracks.push(onetrack); //we want to push the object in to the all tracks array
    });

    return all_tracks;
  };

  //template for displaying tracks in modal
  function addTracksToPage(tracks) {
      var source = $('#tracks-template').html();
      var htmlbuilder = Handlebars.compile(source);
      var tracksDataObj = {
        rows: tracks
      };
      var htmlBlock = htmlbuilder(tracksDataObj);

      $('section#loadplaylists').append(htmlBlock);
  };

//reset contents on modal so the tracks don't get added 
//on top of the ones that were already there
  $("#myModal").on("hidden.bs.modal", function(){
    $("#loadplaylists").html("");
});


  $('#sonBtn').on('click', function(event) {
    event.preventDefault(); 
    console.log('playlist 1', event)

    $("#myModal").modal('show');
    //start with the son cubano tracks
    $.get(sonApi, function(response) {
      //console.log('this is son', response) 

      var results = response.tracks;

      var music = parseResults(results);
      console.log(music);
      addTracksToPage(music);    

    });

  });

  $('#timbaBtn').on('click', function(event) {
    event.preventDefault(); 
    //console.log('playlist 2', event)

    $("#myModal").modal('show');
    $.get(salsaApi, function(response) {
      // console.log('this is salsa', response) 

      var results = response.tracks;

      var music = parseResults(results);
      //console.log(music);
      addTracksToPage(music);

    });


  });

  $('#rumbaBtn').on('click', function(event) {
    event.preventDefault(); 
    // console.log('playlist 3', event)
    $("#myModal").modal('show');
    $.get(rumbaApi, function(response) {
      //console.log('this is rumba', response); 

      var results = response.tracks;

      var music = parseResults(results);
      //console.log(music);
      addTracksToPage(music);

    });

  });

});//document ready







