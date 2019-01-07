const fs = require("fs");
const RSS = require("rss");
const express = require("express");
const app = express();

const folder = process.env.RSS_FOLDER;

app.get("/", function(req, res) {
  let feed = new RSS();
  fs.readdirSync(folder).map(file =>
    feed.item({
      title: file,
      url: "http://" + req.hostname + ":3000/torrents/" + file
    })
  );
  const xml = feed.xml();
  res.type("text/xml");
  res.send(xml);
});

app.use("/torrents", express.static(folder));

app.listen(3000);
