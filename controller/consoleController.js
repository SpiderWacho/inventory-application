const Console = require("../models/console");
const Game = require("../models/game");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all consoles.
exports.console_list = asyncHandler(async (req, res, next) => {
    const console_list = await Console.find({}).sort([["name", "ascending"]]).catch(err => next(err));

    res.render("console_list", {
                title: 'Console List',
              console_list: console_list})
  });

  // Display detail page for a specific console.
exports.console_detail = asyncHandler(async (req, res, next) => {
  const consol = await Console.findById(req.params.id).catch(err => {next(err)});
  const gamesByConsole = await Game.find({console: req.params.id}).catch(err => {next(err)});

  res.render("console_detail", {
              console: consol,
              game_list: gamesByConsole,
  });
});

// Display console create form on GET.
exports.console_create_get = (req, res, next) => {
  res.render("console_form", {
              title: "Create a console"
  })
};

// Handle console create on POST.
exports.console_create_post = [
  body("name", "Name must not be empty")
  .trim()
  .isLength({min: 3})
  .escape(),
  body("manufacturer", "Manufacturer must not be empty")
  .optional ({ checkFalsy: true})
  .trim()
  .isLength({min: 3})
  .escape(),
  body("release_year")
  .optional ({ checkFalsy: true})
  .isInt({min: 1930, max: 2030}),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a console object with escaped and trimmed data.
    const console = new Console({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      release_year: req.body.release_year,
    })
    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with saitized values and error messages.
      res.render("console_form", {
                  title: "Create a console",
                  errors: errors.array(),
                  console: console,
      });
      return
    } else {
      // Data form is valid.
      await console.save();
      res.redirect(console.url);
    }
  })];

// Display console delete form on GET.
exports.console_delete_get = asyncHandler(async (req, res, next) => {
  const console = await Console.findById(req.params.id);
  const gamesByConsole = await Game.find({console: req.params.id});

  if (console === null) {
    // Console don't exist.
    res.redirect('/catalog/consoles')
  }

  res.render('console_delete', {
              title: 'Delete console',
              console: console,
              game_list: gamesByConsole});
});

// Handle console delete on POST.
exports.console_delete_post = asyncHandler(async (req, res, next) => {
  const console = await Console.findById(req.params.id);
  const gamesByConsole = await Game.find({console: req.params.id});

  if (gamesByConsole.length > 0) {
    // There are associated games, dont allow delete.
    res.render('console_delete', {
      title: 'Delete console',
      console: console,
      game_list: gamesByConsole});
    return
  } else {
    await Console.findByIdAndRemove(req.body.consoleid);
    res.redirect('/catalog/consoles');
  }
});

// Display console update form on GET.
exports.console_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console update GET");
});

// Handle console update on POST.
exports.console_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console update POST");
});

