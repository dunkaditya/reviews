const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db.js');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.json({ extended: false }));
app.set('view engine', 'hbs');

app.get('/api/reviews', async (req, res) => {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list
  const reviews = await Review.find({}).exec();
  let data = reviews.map(r => {
    return {name: r.name, semester: r.semester, year: r.year, review: r.review};
  });
  if(req.query.hasOwnProperty("semester")){
    data = data.filter(function (el) {
        return el['semester'] === req.query.semester;
    });
  }
  if(req.query.hasOwnProperty("year")){
    data = data.filter(function (el) {
        return el['year'] === req.query.year;
    });
  }
  res.json(data);
});

app.post('/api/reviews', async (req, res) => {
  // TODO: create new review... if save succeeds, send back JSON
  // representation of saved object
  const name = req.body.name;
  const semester = req.body.semester;
  const year = req.body.year;
  const review = req.body.review;

  const newReview = await (new Review({
    name: name,
    semester: semester,
    year: year,
    review: review
  })).save()
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});
