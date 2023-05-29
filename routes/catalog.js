const express = require('express');
const router = express.Router();

// Require controller modules.
const console_controller = require("../controller/consoleController");
const game_controller = require("../controller/gameController");
const game_instance_controller = require("../controller/gameInstanceController");
const genre_controller = require("../controller/genreController");
const studio_controller = require("../controller/studioController");

// GAME ROUTES //

// Get catalog home page.
router.get("/", game_controller.index);

// GET request for creating a Game. 
router.get("/game/create", game_controller.game_create_get);

// POST request for creating a Game.
router.post("/game/create", game_controller.game_create_post);

// GET request for deleting a Game
router.get("/game/:id/delete", game_controller.game_delete_get);

// POST request for deletign a Game
router.post("/game/:id/delete", game_controller.game_delete_post);

// GET request for updating a Game
router.get("/game/:id/update", game_controller.game_update_get);

// Post request for updating a Game
router.post("/game/:id/update", game_controller.game_update_post);

// Get request for one Game
router.get("/game/:id", game_controller.game_detail);

// Get request for all Game items.
router.get("/games", game_controller.game_list);

module.exports = router;
