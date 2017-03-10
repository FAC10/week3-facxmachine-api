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
    getMoviesByGenre(event.target[0].value, controller);
}

attachListener(getElement('searchForm'), 'submit', handleSubmit);


function getTrailers(movieObj, callback) {
    var movieArray = movieObj.results.slice(0, 5).map(function(movie) {
        return {
            title: movie.title,
            id: movie.id
        };
    });
    var results = [];
    movieArray.forEach(function(object, i) {
        var url = 'https://api.themoviedb.org/3/movie/' + object.id + '/videos?api_key=' + tmdbKey;
        fetch(url, function(response) {
            var movie = {
                title: movieArray[i].title,
                key: response.results[0].key
            };
            results.push(movie);
            if (movieArray.length === results.length) {
                callback(results);
            }
        })
    })
}

function getMoviesByGenre(genreID, cb) {
    var baseURL = 'https://api.themoviedb.org/3/discover/movie?language=en-GB&sort_by=popularity.desc&api_key=' + tmdbKey;
    var url = baseURL + '&with_genres=' + genreID;
    fetch(url, function(movieObj) {
        getTrailers(movieObj, cb)
    });
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


//UPDATE DOM MODULE ====================

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

function compileData(nytRes, tmdbRes, index) {
    var dataObj = {
      index: index,
      title: nytRes.results[0].display_title,
      summary: nytRes.results[0].summary_short,
      link: nytRes.results[0].link.url,
      url: 'https://www.youtube.com/embed/' + tmdbRes.key,
    }
    // console.log(dataObj);

    renderToDOM(dataObj,index);
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


function controller(results) {
    results.forEach(function(result, index) {
        var constructedURL = buildURL(result.title);
        fetch(constructedURL, function(nytRes) {
          compileData(nytRes, result, index)
        });
    });
}
