const GameInstance = require("../models/gameInstance");
const Game = require("../models/game");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all gameInstances.
exports.gameInstance_list = asyncHandler(async (req, res, next) => {
    const gameInstances = await GameInstance.find({}).populate("game").catch(err => next(err));
    
    res.render("game_instance_list", {
      title: 'Game Instances List',
      game_instances : gameInstances,
    }
    )
  });

  // Display detail page for a specific gameInstance.
exports.gameInstance_detail = asyncHandler(async (req, res, next) => {
  const gameInstance = await GameInstance.findById(req.params.id).populate("game").catch(err => next(err));

  const otherInstances = await GameInstance.find({game: gameInstance.game});

  res.render('game_instance_detail', {
              title: "Game Instances List",
              game_instance: gameInstance,
              other_instances : otherInstances,
  })
});

// Display gameInstance create form on GET.
exports.gameInstance_create_get = asyncHandler(async (req, res, next) => {
  const games = await Game.find({}).catch(err => next(err));

  res.render('game_instance_form', {
              title: "Create a Game Instance",
              games: games,
  })
});

// Handle gameInstance create on POST.
exports.gameInstance_create_post = [
  body("game", "A game must be selected")
  .trim()
  .isLength({min: 3})
  .escape(),
  body("status", "A status must be selected")
  .trim()
  .isLength({ min: 3})
  .escape(),
  body("due_back")
  .optional(),

  asyncHandler(async (req, res, next) => {
    errors = validationResult(req);

    const game_instance = new GameInstance({
      game: req.body.game,
      status: req.body.status,
      due_back: req.body.due_back,
    })

    if (!errors.isEmpty()) {
      // There are errors, render again with game instance data
      const games = await Game.find({}).catch(err => next(err));
      res.render('game_instance_form',
                  {title: "Create a Game Instance",
                    games: games,
                    game_instance: game_instance,
                    errors: erros,
                  });
                return;
    } else {
      // Succesful
      await game_instance.save();
      res.redirect(game_instance.url);
    }
  }),
];

// Display gameInstance delete form on GET.
exports.gameInstance_delete_get = asyncHandler(async (req, res, next) => {
  const game_instance = await GameInstance.findById(req.params.id)
  .populate("game")
  .catch(err => next(err));

  if (game_instance === null) {
    // Game Instance not found,
    res.redirect('/catalog/game_instance_list')
  }
  res.render("game_instance_delete", {
              title: 'Delete a Game Instance',
              game_instance: game_instance,
  })
});

// Handle gameInstance delete on POST.
exports.gameInstance_delete_post = asyncHandler(async (req, res, next) => {
  await GameInstance.findByIdAndRemove(req.body.game_instanceid);
  res.redirect("/catalog/game_instances")
});

// Display gameInstance update form on GET.
exports.gameInstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance update GET");
});

// Handle gameInstance update on POST.
exports.gameInstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance update POST");
});

