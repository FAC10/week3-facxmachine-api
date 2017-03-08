# week3-facxmachine-api
FACX Machine's awesome-tastic api project

Our **User Stories**

Architecture
===
![Picture of our architecture](./assets/architecture-small.jpg)


##Using the YouTube API
1. We used the YouTube api by first identifying the endpoint which is `https://www.googleapis.com/youtube/v3/search?`
2. We then specified the `&q=OUR_QUERY` and `&videoDuration=short`, our `order=relevance` to ensure only relevant responses were returned
3. Our final query string was `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=the+help+trailer&type=video&videoDuration=short&key={YOUR_API_KEY}`

##Using the Movie DB API
1. We make a request to this API searching for an actor which returns an object with the actor's id `discover/person/?q={THE_ACTOR}` .
2. We then make a second call `/discover/movie?with_genres={YOUR GENRES}&sort_by=vote_average.desc` to get all the movies of a certain genre the actor was in using the actor's id.

 

