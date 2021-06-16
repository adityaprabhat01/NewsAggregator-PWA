const request = require('request')

const topHeadlines = (callback) => {

    const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=add814b0c6064962826dc0a66259776e'
    
    request( { url, json: true }, (error , response , body) => {

        if (error) {
            return callback("No Internet Connection", undefined)
        } else if (body.status != 'ok') {
            return callback("Unable to fetch news data")
        } else {
            sources = []
            titles = []
            descriptions = []
            urls = []
            urlToImages = []
    
            for (var i=0;i<body.articles.length;i+=1) {
                sources[i] = body.articles[i].source.name
                titles[i] = body.articles[i].title
                descriptions[i] = body.articles[i].description
                urls[i] = body.articles[i].url
                urlToImages[i] = body.articles[i].urlToImage
            }

            callback(undefined, {
                source: sources,
                title: titles,
                description: descriptions,
                url: urls,
                urlToImage: urlToImages
            })
        }
    })
}

module.exports = topHeadlines