const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { socialblade } = require("socialblade-com-api");

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/get-30-days-data", (req, res) => {
  const source = req.query.source;
  const username = req.query.username;
  get30DaysData(source, username)
    .then((data) => {
      res.json(data.table);
    })
    .catch((err) => {
        res.json(err);
    });
});

async function get30DaysData(source, username) {
  try {
    return await socialblade(source, username);
  } catch (err) {
    return err;
  }
}

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
