# week3-facxmachine-api
FACX Machine's awesome-tastic api project

##Using the YouTube API
1. We used the YouTube api by first identifying the endpoint which is `https://www.googleapis.com/youtube/v3/search?`
2. We then specified the `&q=OUR_QUERY` and `&videoDuration=short`, our `order=relevance` to ensure only relevant responses were returned
3. Our final query string was `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=the+help+trailer&type=video&videoDuration=short&key={YOUR_API_KEY}`
