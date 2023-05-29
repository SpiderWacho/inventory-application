const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    name: {type: String, required: true, maxLength: 50},
    manufacturer: {type: String, maxLength: 50},
    release_year: {type: Number, min: 1900, max: 2030},
})

// Virtual for game's URL
ConsoleSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/console/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Console", ConsoleSchema);