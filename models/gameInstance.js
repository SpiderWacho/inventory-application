const mongoose = require('mongoose');
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
    game: {type: Schema.Types.ObjectId, ref: "Game", required: true},
    status: {type: String, maxLength: 50, required: true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved", "Scratched"],
        default: "Maintenance"},
    due_back: {type: Date, default: Date.now},
})

// Virtual for game's URL
GameInstanceSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/game_instance/${this._id}`;
  });

// Virtual for game dueback formatted
GameInstanceSchema.virtual("due_back_formatted").get(function () {
    // We don't use an arrow function as we'll need the this object
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
  });

// Export model
module.exports = mongoose.model("GameInstance", GameInstanceSchema);