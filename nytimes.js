// Fetch Method
function fetch(url,callback) {
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
    console.log(baseURL + nytimesKey);
  return baseURL + nytimesKey;
}

var constructedURL = buildURL('the matrix');

function getSummaryAndLink(response) {
    console.log(response);
 var summary = response.results[0].summary_short;   
 var link = response.results[0].link.url;   
    console.log(summary);
    console.log(link);
}

fetch(constructedURL, getSummaryAndLink);
