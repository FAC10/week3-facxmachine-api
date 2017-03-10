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

## Using The Movie Database API
1. We request popular movies of a given genre using the relevant genre ID
2. The API returns an array of movie objects, which include the IDs for each movie
3. We make another request to the API for each movie, using the ID to ask for trailers
4. Finally we build an array of movie objects containing the title and YouTube key for the trailer

 

