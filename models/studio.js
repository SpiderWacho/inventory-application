const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudioSchema = new Schema({
    name: {type: String, required: true, maxLength: 50},
    founders: [{type: String, maxLength: 50, required: true}],
    creation_year: {type: Number, required: true, min: 1900, max: 2030},
    nationality: {type: String, maxLength: 50, required: true},
})

// Virtual for game's URL
StudioSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/studio/${this._id}`;
  });

// Virtual for game's URL
StudioSchema.virtual("allFounders").get(function () {
    // We don't use an arrow function as we'll need the this object
    let allFounders = founders.join(", ");
    return allFounders;
});

// Export model
module.exports = mongoose.model("Studio", StudioSchema);