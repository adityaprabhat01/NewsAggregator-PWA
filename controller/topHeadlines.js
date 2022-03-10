const fetch = require("node-fetch");

const headlines_template = (req, res) => {
  console.log("sent")
  res.render('index')
}

const topHeadlines = (req, res) => {
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=add814b0c6064962826dc0a66259776e";
  fetch(url)
    .then((res) => res.json())
    .then((body) => {
      if (body.status != "ok") {
        res.send("Unable to fetch Top Headlines");
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
        res.send({
          sources,
          titles,
          descriptions,
          urls,
          urlToImages,
        });
      }
    })
    .catch(() => {
      console.log('Could not fetch')
      res.send('Could not fetch')
      //res.status(404).render("fallback", {});
    });
};

module.exports = { topHeadlines, headlines_template };
