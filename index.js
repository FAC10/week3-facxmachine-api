// Ignore the global variables, they should probably be defined in a function
var apiKey = 'b412ada3278f30e284f60a334e6ae7ff';
var query1 = encodeURI('&query=brad pitt');
var query2 = encodeURI('&query=edward norton');
var searchQueries = [query1, query2];
var baseurl = 'https://api.themoviedb.org/3/search/person?api_key=';
var url = baseurl + apiKey;

/**
 * Make an API call to the URL and pass the response to the callback
 * @param  {string}   url      [The correct URL for the desired API]
 * @param  {Function} callback [A function that deals with the response object]
 * @return {null}              [No return value as the callback deals with this]
 **/
function makeRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseObject = JSON.parse(xhr.responseText);
      callback(responseObject);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

/**
 * Gets the IDs of the actors for further querying of The Movie Database
 * @param  {array}    actorArr [An array of two strings for each actors name]
 * @param  {Function} cb     [A function that takes the IDs for further queries]
 * @return {[type]}          [description]
 **/
function actorsToMovies(actorArr) {
  var IDs = [];
  actorArr.forEach(function(actorQuery) {
    makeRequest(url + actorQuery, function(response) {
      IDs.push(response.results[0].id);
      if (IDs.length === actorArr.length) {
        var newURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=b412ada3278f30e284f60a334e6ae7ff&with_people=' + IDs.join(',');
        makeRequest(newURL, function(response) {
          console.log(response);
        })
      }
    })
  })
}

/**
 * Takes
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */


actorsToMovies(searchQueries);
