const Studio = require("../models/studio");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Studios.
exports.studio_list = asyncHandler(async (req, res, next) => {
    const list_studios = await Studio.find()
    .sort([["name", "ascending"]])
    .catch((err) => {return next(err)})
      // Succesful, so render
      res.render('studio_list', {
        title: 'Studio List',
        studio_list: list_studios,
      });
});

  // Display detail page for a specific Studio.
exports.studio_detail = asyncHandler(async (req, res, next) => {
  const studio = await Studio.findById(req.params.id).catch(err => {next(err)});
  const gamesByStudio = await Game.find({studio: req.params.id}, "title").catch(err => {next(err)});

  res.render('studio_detail', {
              title: `Studio: ${studio.name}`,
              studio_games: gamesByStudio,
              studio: studio,
  })
});

// Display studio create form on GET.
exports.studio_create_get = (req, res, next) => {
    res.render("studio_form", {title: "Create Studio"});
};

// Handle studio create on POST.
exports.studio_create_post = [
  // Validate and sanitize fields.
  body("name")
  .trim()
  .isLength({min: 1})
  .escape()
  .withMessage("Name must be specified."),
  body("founder.*","At least one founder specified").trim().isLength({min :1}).escape(),
  body("creation_year")
  .trim()
  .isInt({min: 1950, max: 2030})
  .escape(),
  body("nationality", "Nationality must be specified")
  .trim()
  .isLength({min: 1})
  .escape(),
// Process request after validation and sanitization.

asyncHandler(async (req, res, next) => {
  // EXtract the validation errors from a request.
  const errors = validationResult(req);

  // FIXME:  Multiple founders error.

  // Create Studio object with escaped and trimmed data.
  const studio = new Studio({
    name: req.body.name,
    founder: req.body.founder,
    creation_year: req.body.creation_year,
    nationality: req.body.nationality,
  });

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    res.render("studio_form", {
      title: "Create Studio",
      studio: studio,
      errors: errors.array(),
    });
    return;
  } else {
    // Data form is valid.

    // Save author.
    await studio.save();
    // Redirect to new studio record.
    res.redirect(studio.url)
  }
})
  

]

// Display studio delete form on GET.
exports.studio_delete_get = asyncHandler(async (req, res, next) => {
  const studio = await Studio.findById(req.params.id);
  const gamesByStudio = await Game.find({studio: req.params.id});

  if (studio === null) {
    // The game don't exist
    res.redirect("/catalog/studios")
  }
  res.render("studio_delete", {
              title: 'Delete a studio',
              studio: studio,
              game_list: gamesByStudio,
  });
});

// Handle studio delete on POST.
exports.studio_delete_post = asyncHandler(async (req, res, next) => {
  const studio = await Studio.findById(req.params.id);
  const gamesByStudio = await Game.find({studio: req.params.id});

  if (gamesByStudio.length > 0) {
    // There are games associated dont allow delete.
    res.render("studio_delete", {
      title: 'Delete a studio',
      studio: studio,
      game_list: gamesByStudio,
    });
    return;
  } else {
    await Studio.findByIdAndRemove(req.body.studioid)
    res.redirect("/catalog/studios");
  }
});

// Display studio update form on GET.
exports.studio_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: studio update GET");
});

// Handle studio update on POST.
exports.studio_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: studio update POST");
});

