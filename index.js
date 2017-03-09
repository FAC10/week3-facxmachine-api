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
  getMoviesByGenre(event.target[0].value, doSomething);
}

function getTrailers(movieObj, callback) {
  var idArray = movieObj.results.slice(0, 5).map(function(movie) {
      return movie.id;
    });
  var results = [];
  idArray.forEach(function(id) {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + tmdbKey;
    fetch(url, null, function(response) {
      results.push(response.results[0].key);
      if (results.length === idArray.length) {
        callback(results);
      }
    })
  })
}

function getMoviesByGenre(genreID, cb) {
  var baseURL = 'https://api.themoviedb.org/3/discover/movie?language=en-GB&sort_by=popularity.desc&api_key=' + tmdbKey;
  var url = baseURL + '&with_genres=' + genreID;
  fetch(url, null, function(movieObj) {
    getTrailers(movieObj, cb)
  });
}

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


//UPDATE DOM MODULE ====================

function renderSummaryAndLink(response) {
  var summary = response.results[0].summary_short;
  var link = response.results[0].link.url;
  var movieSummary = createOurElement('div','movie-summary');
  var movieLink = createOurElement('a',null,link);
  movieSummary.innerHTML = summary;
  movieLink.innerText = 'Link';
  appendToDom(movieSummary,document.body);
  appendToDom(movieLink,document.body)
}

/**
 * Append a given element to the DOM
 *
 * @param {html element} element the element
 * @param {html element} parent an already existent DOM element
 */
function appendToDom(element,parent) {
    parent.appendChild(element);
}

/**
 * Take a string and create an html element
 *
 * @param {html} element html element
 * @returns {the element} html element
 */
function createOurElement(element,id,href,src) {
    var htmlElement = document.createElement(element);
    if (id) {
        htmlElement.id = id;
    }
    if (href) {
        htmlElement.href = href;
    }
    if (src){
        htmlElement.src = src;
    }
    return htmlElement;
}

var testFrame = createOurElement('iframe','test',null,'https://www.youtube.com/embed/' +'VrrnjYgDBEk' );
appendToDom(testFrame,document.body);

function controller(){
  var constructedURL = buildURL('the matrix'); //Feed title here//
  fetch(constructedURL,renderSummaryAndLink);
}
