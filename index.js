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

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);


var player;
var videoId;

/**
 * [onYouTubeIframeAPIReady this function creates an iFrame and Youtube player after the API code downloads ]
 * @return it doesn't return anything but creates a global object
 **/

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player',{
        height: '300',
        width: '600',
        videoId: videoId,
        events:{
            'onReady':onPlayerReady,
            'onStateChange':onPlayerStateChange
        }
    });
}

/**
 * [onPlayerReady the API will call this function when the video is ready
 * @param  {[type]} event - an event object
 * @return {[type]} it plays the video
 */
function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
/**
 * [onPlayerStateChange  the API calls this function when the player state changes, the function indicates that when playing a video, status = 1. The video will play for six seconds and it'll stop.
 * @param  {[type]} event - an event object
 * @return {[type]}
 */
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !done) {
       setTimeout(stopVideo, 6000);
        done = true;
    }
}

/**
 * [stopVideo a function that stops the video
 * @return {[type]} [description]
 */
function stopVideo() {
    player.stopVideo();
}














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

/**
 * [buildURL a function that outputs the right API URL given the query string
 * @param  {[string]} videoQuery - the thing the user is searching for
 * @return {[string]}            the constructedURL
 */
function buildURL (videoQuery){
  var baseURL = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&q=' + videoQuery + '&type=video&key=';
  videoQuery = encodeURI(videoQuery);
  //Need to take out this API key!!!!!!!!!!!!!:
  var APIkey = 'AIzaSyC7nC_V0Udrr0v115_SYmCsPounM-_RsIg'
  return baseURL + APIkey;
}

var constructedURL = buildURL('spice girls');

/**
 * [getVideoIds a function that pulls the ID property off the response object for the desired subject
 * @param  {[object]} response parsed JSON object
 * @return
 */
function getVideoIds(response) {
    videoId = response.items[0].id.videoId;
}

fetch(constructedURL, getVideoIds);
