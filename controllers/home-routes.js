const express = require('express');
const sequelize = require('../config/connection');
const { Movie } = require('../models');

const router = express.Router();


// router.get("/", async (req, res) => {
//     try {
//         const movieData = await Movie.findAll();
    
//         const students = movieData.map((student) =>
//           student.get({ plain: true })
//         );
    
//         res.json(students);
//       } catch (error) {
//         res.status(500).send(error.message);
//       }
// });


router.get('/', (req, res) => {
    Movie.findAll({
        attributes: {
                   include : ['id', 'movie_name', 'movie_poster', 'movie_genre', 'movie_time', 'movie_plot', 'movie_director', 'movie_actors', 'movie_year'],
                },
            
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('login', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;