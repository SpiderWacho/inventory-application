const GameInstance = require("../models/gameInstance");
const asyncHandler = require("express-async-handler");

// Display list of all gameInstances.
exports.gameInstance_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: gameInstance list");
  });

  // Display detail page for a specific gameInstance.
exports.gameInstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: gameInstance detail: ${req.params.id}`);
});

// Display gameInstance create form on GET.
exports.gameInstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance create GET");
});

// Handle gameInstance create on POST.
exports.gameInstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance create POST");
});

// Display gameInstance delete form on GET.
exports.gameInstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance delete GET");
});

// Handle gameInstance delete on POST.
exports.gameInstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance delete POST");
});

// Display gameInstance update form on GET.
exports.gameInstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance update GET");
});

// Handle gameInstance update on POST.
exports.gameInstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: gameInstance update POST");
});

