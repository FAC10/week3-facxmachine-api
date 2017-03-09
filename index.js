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


// Fetch Method
function fetch(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var responseObject = JSON.parse(request.responseText);
            callback(responseObject);
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
function renderSummaryAndLink(response) {
  var summary = response.results[0].summary_short;
  var link = response.results[0].link.url;
  var movieSummary = createElement('div','movie-summary');
  var movieLink = createElement('a',null,link);
  // movieLink.id = 'movie-link'
  // movieSummary.id = 'movie-summary'
  movieSummary.innerHTML = summary;
  movieLink.innerText = 'Link';
  // movieLink.href = link;
  appendToDom(movieSummary,document.body);
  appendToDom(movieLink,document.body)
}



//UPDATE DOM MODULE ====================

/**
 * Creates an iframe with a given src
 *
 * @param {a string} id The movie id
 */
// function createIframePlayer(id) {
//    var iframe = document.createElement('iframe');
//     iframe.src = 'https://www.youtube.com/embed/' + id
//     iframe.id = id;
//     return iframe
// }
/**
 * Renders the movie data to the dom
 *
 * @returns {null} null
 */

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
function createElement(element,id,href,src) {
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
fetch(constructedURL,renderSummaryAndLink)




var testFrame = createElement('iframe','test',null,'https://www.youtube.com/embed/' +'VrrnjYgDBEk' );
appendToDom(testFrame,document.body);
