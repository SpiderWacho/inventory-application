const Genre = require("../models/genre");
const Game = require("../models/game")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all genres.
exports.genre_list = asyncHandler(async (req, res, next) => {
    const genres = await Genre.find({}).catch(err => {next(err)});

    res.render("genre_list", {
                title: 'All genres',
                genre_list: genres,
    })
  });

  // Display detail page for a specific genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).catch(err => {next(err)});
    const gamesByGenre = await Game.find({genre: req.params.id}).catch(err => {next(err)});

    res.render('genre_detail', {
                title: `Genre Detail ${genre.name}`,
                genre: genre,
                gamesByGenre: gamesByGenre,
    })
});

// Display genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', {
              title: 'Create a Genre',
  })
};

// Handle genre create on POST.
exports.genre_create_post = [
  body("name", "Name must not be empty")
  .trim()
  .isLength({min: 3})
  .escape(),

  //Handle sanitized data
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error mesages.
      res.render("genre_form", {
        title: "Create genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await Genre.findOne({ name: req.body.name}).exec();
      if (genreExists) {
      // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url);
      } else {
          await genre.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect(genre.url);
      }
    }
  })
];

// Display genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  const gamesByGenre = await Game.find({genre: req.params.id});

  if (genre === null) {
    // Genre dont exist
    res.redirect("/catalog/genres");
  }
  res.render("genre_delete", {
              title: 'Delete genre',
              genre: genre,
              game_list: gamesByGenre, 
  })
});

// Handle genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  const gamesByGenre = await Game.find({genre: req.params.id});
  
  if (gamesByGenre > 0) {
    // Genre has associated games, first delete the games.
    res.render("genre_delete", {
      title: 'Delete genre',
      genre: genre,
      game_list: gamesByGenre, 
    });
    return;
  } else {  
      await Genre.findByIdAndRemove(req.body.genreid);
      res.redirect('/catalog/genres');
    }

});

// Display genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre update GET");
});

// Handle genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre update POST");
});

