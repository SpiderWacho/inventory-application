const Console = require("../models/console");
const asyncHandler = require("express-async-handler");

// Display list of all consoles.
exports.console_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: console list");
  });

  // Display detail page for a specific console.
exports.console_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: console detail: ${req.params.id}`);
});

// Display console create form on GET.
exports.console_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console create GET");
});

// Handle console create on POST.
exports.console_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console create POST");
});

// Display console delete form on GET.
exports.console_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console delete GET");
});

// Handle console delete on POST.
exports.console_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console delete POST");
});

// Display console update form on GET.
exports.console_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console update GET");
});

// Handle console update on POST.
exports.console_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: console update POST");
});

