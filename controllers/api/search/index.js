const express = require("express");
var request = require("request");
const { Movie } = require("../../../models");

const router = express.Router();

router.post('/', function(req, res) {

    var movie = {};
    var movieId = req.body.movieID;
    var queryURL = "http://omdbapi.com/?apikey=c2fcfbb6&t="+movieId
    request(queryURL, function(err, response, body) {
        body = JSON.parse(body);
        movie = {
            movie_name: body.Title,
            movie_poster: body.Poster,
            movie_genre: body.Genre,
            movie_time: body.Runtime,
            movie_plot: body.Plot,
            movie_director: body.Director,
            movie_actors: body.Actors,
            movie_year: body.Year,
            movie_ratingImdb: body.Ratings[0].Value,
            movie_ratingRotten: body.Ratings[1].Value,
        }

        Movie.findOrCreate({ where: movie })

        });
        res.send(Movie.findAll())
    });
    




router.get("/", async (req, res) => {
    try {
      const studentsData = await Movie.findAll();
  
      const students = studentsData.map((student) =>
        student.get({ plain: true })
      );
  
      res.json(students);
    } catch (error) {
      res.status(500).send(error.message);
    }
});



module.exports = router;