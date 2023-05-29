const Game = require("../models/game");
const GameInstance = require("../models/gameInstance");
const Genre = require("../models/genre")
const Studio = require("../models/studio")
const Console = require("../models/console")

const asyncHandler = require("express-async-handler");
const gameInstance = require("../models/gameInstance");

exports.index = asyncHandler(async (req, res, next) => {
    const [games, gameNumber, gameInstanceNumber, genreNumber, studioNumber, consoleNumber] = await Promise.all([
        Game.find({}).exec(),
        Game.countDocuments({}).exec(),
        GameInstance.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
        Studio.countDocuments({}).exec(),
        Console.countDocuments({}).exec(),
        
    ])
    res.render("index", {title: "Index",
                games: games,
            gameNumber: gameNumber,
            gameInstanceNumber: gameInstanceNumber,
            genreNumber: genreNumber,
            studioNumber: studioNumber,
            consoleNumber: consoleNumber,})
  });

// Display list of all games.
exports.game_list = asyncHandler(async (req, res, next) => {
    const gameList = await Game.find({}).exec();

    let game_count = [];

    for (let i = 0; i < gameList.length; i++) {
      let actualGame = await GameInstance.find({game : gameList[i].id});
      game_count.push(actualGame.length)
    }

    res.render("game_list", {
      title: "Game List",
      game_list: gameList,
      game_count: game_count, 
    })
  });

  // Display detail page for a specific game.
exports.game_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: game detail: ${req.params.id}`);
});

// Display game create form on GET.
exports.game_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game create GET");
});

// Handle game create on POST.
exports.game_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game create POST");
});

// Display game delete form on GET.
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game delete GET");
});

// Handle game delete on POST.
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game delete POST");
});

// Display game update form on GET.
exports.game_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game update GET");
});

// Handle game update on POST.
exports.game_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: game update POST");
});

