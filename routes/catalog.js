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

// STUDIO ROUTES //

// GET request for creating a Studio.
router.get("/studio/create", studio_controller.studio_create_get);

// POST request for creating a Studio.
router.post("/studio/create", studio_controller.studio_create_post);

// GET request for delete a Studio.
router.get("/studio/:id/delete", studio_controller.studio_delete_get);

// POST request for delete a Studio.
router.post("/studio/:id/delete", studio_controller.studio_delete_post);

// GET request for updating a Studio.
router.get("/studio/:id/update", studio_controller.studio_update_get);

// POST request for updating a Studio.
router.post("/studio/:id/update", studio_controller.studio_update_post);

// GET request for one Studio
router.get("/studio/:id", studio_controller.studio_detail);

// GET request for a list of all Studios.
router.get("/studios", studio_controller.studio_list);

// GENRE ROUTES //

// GET request for creating a Genre.
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating a Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request for delete a Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request for delete a Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request for updating a Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request for updating a Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for a list of all Genres.
router.get("/genres", genre_controller.genre_list);

// CONSOLE ROUTES //

// GET request for creating a Console.
router.get("/console/create", console_controller.console_create_get);

// POST request for creating a console.
router.post("/console/create", console_controller.console_create_post);

// GET request for delete a console.
router.get("/console/:id/delete", console_controller.console_delete_get);

// POST request for delete a console.
router.post("/console/:id/delete", console_controller.console_delete_post);

// GET request for updating a console.
router.get("/console/:id/update", console_controller.console_update_get);

// POST request for updating a console.
router.post("/console/:id/update", console_controller.console_update_post);

// GET request for one console
router.get("/console/:id", console_controller.console_detail);

// GET request for a list of all consoles.
router.get("/consoles", console_controller.console_list);

// GAME INSTANCES ROUTES //

// GET request for creating a Game Instance.
router.get("/game_instance/create", game_instance_controller.gameInstance_create_get);

// POST request for creating a gameinstance.
router.post("/game_instance/create", game_instance_controller.gameInstance_create_post);

// GET request for delete a gameinstance.
router.get("/game_instance/:id/delete", game_instance_controller.gameInstance_delete_get);

// POST request for delete a gameinstance.
router.post("/game_instance/:id/delete", game_instance_controller.gameInstance_delete_post);

// GET request for updating a gameinstance.
router.get("/game_instance/:id/update", game_instance_controller.gameInstance_update_get);

// POST request for updating a gameinstance.
router.post("/game_instance/:id/update", game_instance_controller.gameInstance_update_post);

// GET request for one gameinstance
router.get("/game_instance/:id", game_instance_controller.gameInstance_detail);

// GET request for a list of all gameinstances.
router.get("/game_instances", game_instance_controller.gameInstance_list);


module.exports = router;
