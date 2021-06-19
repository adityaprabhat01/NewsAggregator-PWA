const fetch = require("node-fetch");

const topHeadlines = (req, res) => {
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=add814b0c6064962826dc0a66259776e";
  fetch(url)
    .then((res) => res.json())
    .then((body) => {
      if (body.status != "ok") {
        res.send("Unable to fetch news data");
      } else {
        let sources = [];
        let titles = [];
        let descriptions = [];
        let urls = [];
        let urlToImages = [];

        for (var i = 0; i < body.articles.length; i += 1) {
          sources[i] = body.articles[i].source.name;
          titles[i] = body.articles[i].title;
          descriptions[i] = body.articles[i].description;
          urls[i] = body.articles[i].url;
          urlToImages[i] = body.articles[i].urlToImage;
        }

        res.render("index", {
          sources,
          titles,
          descriptions,
          urls,
          urlToImages,
        });
      }
    })
    .catch(() => {
      res.status(404).render("fallback", {});
    });
};

module.exports = { topHeadlines };
