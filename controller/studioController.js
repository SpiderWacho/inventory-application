const Studio = require("../models/studio");
const asyncHandler = require("express-async-handler");

// Display list of all Studios.
exports.studio_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Studio list");
  });

  // Display detail page for a specific Studio.
exports.studio_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Studio detail: ${req.params.id}`);
});

// Display studio create form on GET.
exports.studio_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Studio create GET");
});

// Handle studio create on POST.
exports.studio_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Studio create POST");
});

// Display studio delete form on GET.
exports.studio_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Studio delete GET");
});

// Handle studio delete on POST.
exports.studio_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Studio delete POST");
});

// Display studio update form on GET.
exports.studio_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: studio update GET");
});

// Handle studio update on POST.
exports.studio_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: studio update POST");
});

