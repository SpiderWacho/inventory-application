const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
    game: {type: Schema.Types.ObjectId, ref: "Game", required: true},
    status: {type: String, maxLength: 50, required: true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance"},
    due_back: {type: Date, default: Date.now},
})

// Virtual for game's URL
GameInstanceSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/gameInstance/${this._id}`;
  });

// Export model
module.exports = mongoose.model("GameInstance", GameInstanceSchema);