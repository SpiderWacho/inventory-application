const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {type: String, required: true, maxLength: 50},
    studio: {type: Schema.Types.ObjectId, ref: "Studio", required: true},
    release_year: {type: Number, required: true, min: 1900, max: 2030},
    console: [{type: Schema.Types.ObjectId, ref: "Console", required: true}],
    genre: [{type: Schema.Types.ObjectId, ref: "Genre", required: true}],
    img: {data: Buffer, contentType: String},
})

// Virtual for game's URL
GameSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/game/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Game", GameSchema);