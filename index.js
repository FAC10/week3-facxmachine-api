/**
 * selects a DOM element
 * @param  {string} id [id of an element in the DOM]
 * @return {node}    [a DOM node]
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Append a given element to the DOM
 *
 * @param {html element} element the element
 * @param {html element} parent an already existent DOM element
 */
function appendToDom(element, parent) {
    parent.appendChild(element);
}

/**
 * Take a string and create an html element
 *
 * @param {html} element html element
 * @returns {the element} html element
 */
function createOurElement(element, elClass, href, src) {
    var htmlElement = document.createElement(element);
    if (elClass) {
        htmlElement.className = elClass;
    }
    if (href) {
        htmlElement.href = href;
    }
    if (src) {
        htmlElement.src = src;
    }
    return htmlElement;
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
 * Make an API call to the URL and pass the response to the callback
 * @param  {string}   url      [The correct URL for the desired API]
 * @param  {Function} callback [A function that deals with the response object]
 * @return {null}              [No return value as the callback deals with this]
 **/
function fetch(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var responseObject = JSON.parse(request.responseText);
            callback(responseObject, callback);
        }
    }
    request.open('GET', url, true);
    request.send();
}

function buildURL(movieTitle) {
    movieTitle = encodeURI(movieTitle);
    var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + '&api-key=';
    return baseURL + nytimesKey;
}

/**
 * Gets the values we need from the form's submit event
 * @param  {object} event [The submit object returned when the event fires]
 * @return {array}       [An array of the input values]
 */
function handleSubmit(event) {
    event.preventDefault();
    getMoviesByGenre(event.target[0].value, getReviews);
}

attachListener(getElement('searchForm'), 'submit', handleSubmit);

/**
 * Queries The Movie Database and then passes an object of movies to getTrailers
 * @param  {string}   genreID [The ID relating to the genre selected in the form]
 * @param  {Function} cb      [A callback - in this case getTrailers]
 * @return {null}             [No return value]
 */
function getMoviesByGenre(genreID, cb) {
    var baseURL = 'https://api.themoviedb.org/3/discover/movie?language=en-GB&sort_by=popularity.desc&api_key=' + tmdbKey;
    var url = baseURL + '&with_genres=' + genreID;
    fetch(url, function(movieObj) {
        getTrailers(movieObj, cb)
    });
}

/**
 * Queries The Movie Database with movie names to get YouTube trailer keys back
 * @param  {object}   movieObj [The return object of movies from the first fetch]
 * @param  {Function} callback [A callback - in this case getReviews]
 * @return {null}              [No return value]
 */
function getTrailers(movieObj, callback) {
    // Get only the first 5 results
    var movieArray = movieObj.results.slice(0, 5).map(function(movie) {
        // Create an object with only the properties we're interested in
        return {
            title: movie.title,
            id: movie.id
        };
    });
    // Parallel requests function
    var results = [];
    movieArray.forEach(function(object, i) {
        var url = 'https://api.themoviedb.org/3/movie/' + object.id + '/videos?api_key=' + tmdbKey;
        fetch(url, function(response) {
            var movie = {
                title: movieArray[i].title,
                key: response.results[0].key
            };
            results.push(movie);
            // Wait until we have all the fetches back before calling callback
            if (movieArray.length === results.length) {
                callback(results);
            }
        })
    })
}

// This is the callback passed to the first requests above
/**
 * Makes a call to the NYT API for each of the 5 movie objects passed in
 * @param  {object} results [An object with the movie title and YouTube key]
 * @return {null}         [No return value]
 */
function getReviews(results) {
    results.forEach(function(result, index) {
        var constructedURL = buildURL(result.title);
        fetch(constructedURL, function(nytRes) {
          compileData(nytRes, result, index)
        });
    });
}


/**
 * Combines the two objects of response data into one nice clean object
 * @param  {object} nytRes  [The object of info from the NYT API response]
 * @param  {object} tmdbRes [The object of movie titles and YouTube keys]
 * @param  {number} index   [The index of each fetch call within the forEach]
 * @return {null}           [No return value]
 */
function compileData(nytRes, tmdbRes, index) {
    var dataObj = {
      index: index,
      title: nytRes.results[0].display_title,
      summary: nytRes.results[0].summary_short,
      link: nytRes.results[0].link.url,
      url: 'https://www.youtube.com/embed/' + tmdbRes.key,
    }
    renderToDOM(dataObj,index);
}

/**
 * Takes the object from compileData and renders it all to the DOM
 * @param  {object} dataObj [The final object of data we need to put into the DOM]
 * @param  {number} index   [The index of the particular API call within the ForEach above]
 * @return {null}         [No return value :(]
 */
function renderToDOM(dataObj,index) {
  var article = getElement('article' + index);
    article.innerHTML = '';
  var movieVideo = createOurElement('iframe', 'result_video', null, dataObj.url);
  var movieBody = createOurElement('div', 'result_body');
  var movieTitle = createOurElement('h2', 'result_title');
    appendToDom(movieTitle, movieBody);
    movieTitle.textContent = dataObj.title;
  var movieSummary = createOurElement('p', 'result_review');
    appendToDom(movieSummary, movieBody);
    movieSummary.innerHTML = dataObj.summary;
  var movieLink = createOurElement('a', 'result_link', dataObj.link);
    appendToDom(movieLink, movieBody);
    movieLink.textContent = 'Link to review';
  appendToDom(movieVideo, article);
  appendToDom(movieBody, article);
}
