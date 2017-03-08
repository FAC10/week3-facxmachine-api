var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player',{
        height: '300',
        width: '600',
        videoId: 'M71c1UVf-VE',
        events:{
            'onReady':onPlayerReady,
            'onStateChange':onPlayerStateChange
        }
    
    });
    console.log(player);

}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !done) {
       setTimeout(stopVideo, 6000); 
        done = true;
    }
}

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

function getVideoIds(response) {
        
}
