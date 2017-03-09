/**
 * selects a DOM element
 * @param  {string} id [id of an element in the DOM]
 * @return {node}    [a DOM node]
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * adds an event listener to a DOM element
 * @param  {node}   element   [element to attach event listener to]
 * @param  {string}   eventType [type of event]
 * @param  {Function} cb        [a function to be run when the event listener is triggered]
 * @return {null}             [null]
 */
function attachListener(element, eventType, cb) {
  element.addEventListener(eventType, cb)
}

/**
 * Gets the values we need from the form's submit event
 * @param  {object} event [The submit object returned when the event fires]
 * @return {array}       [An array of the input values]
 */
function handleSubmit(event) {
  event.preventDefault();
  // We need to get an array to map over
  return (
    [...event.target]
      .map(function(input) {
        return (input.value);
      })
      // Removes the useless final element (the empty value of the submit)
      .slice(0, -1)
  )
}

function getMoviesByGenre(id) {
  var baseURL = 'https://api.themoviedb.org/3/discover/movie?language=en-GB&sort_by=popularity.desc&api_key=' + tmdbKey;
  var url = baseURL + '&with_genres=' + id;
  fetch(url, getTrailers);
}

function getTrailers(movieObj) {
  var idArray = movieObj.results.slice(0, 5).map(function(movie) {
      return movie.id;
    });
  var results = [];
  idArray.forEach(function(id) {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + tmdbKey;
    fetch(url, function(response) {
      results.push(response.results[0].key);
      if (results.length === idArray.length) {
        console.log(results);
      }
    })
  })
}

getMoviesByGenre('35');

/**
 * Make an API call to the URL and pass the response to the callback
 * @param  {string}   url      [The correct URL for the desired API]
 * @param  {Function} callback [A function that deals with the response object]
 * @return {null}              [No return value as the callback deals with this]
 **/
function fetch(url, obj, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var responseObject = JSON.parse(request.responseText);
            callback(responseObject, obj);
        }
    }
    request.open('GET',url,true);
    request.send();
}

function buildURL (movieTitle){
  movieTitle = encodeURI(movieTitle);
  var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + '&api-key=';
  return baseURL + nytimesKey;
}

var constructedURL = buildURL('the matrix');

// var storedObject = {};
/**
 * Gets a summary from NYtimes review api
 *
 * @param {Object} response The data from NYTreview api
 */
function getSummaryAndLink(response, obj) {
    console.log(response);
obj.summary = response.results[0].summary_short;
obj.link = response.results[0].link.url;
console.log(obj, 1);
return obj;
}

// fetch(constructedURL, {}, getSummaryAndLink);


//UPDATE DOM MODULE ====================

/**
 * Creates an iframe with a given src
 *
 * @param {a string} id The movie id
 */
function createIframePlayer(id) {
   var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + id
    iframe.id = 'video'
    document.body.appendChild(iframe)
}

function renderMovieReview() {
  var storedObject = {};
  fetch(constructedURL, storedObject, getSummaryAndLink);
  console.log(storedObject, 'hi');
}

renderMovieReview();
