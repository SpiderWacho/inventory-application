#! /usr/bin/env node

console.log(
    'This script populates some test consoles, games, gemeinstances, genres and studios.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Console = require("./models/console");
  const Game = require("./models/game");
  const Studio = require("./models/studio");
  const GameInstance = require("./models/gameInstance");
  const Genre = require("./models/genre");
  
  const consoles = [];
  const games = [];
  const genres = [];
  const gameInstances = [];
  const studios = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createStudios();
    await createGames();
    await createConsoles();
    await createGenres();
    await createGameInstances();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function genreCreate(name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres.push(genre);
    console.log(`Added genre: ${name}`);
  }

  async function consoleCreate(name, manufacturer, release_year) {
    const consoleToAdd
     = new Console({ name: name});
    if (manufacturer != false) console.manufacturer = manufacturer;
    if (release_year != false) console.release_year = release_year;
    await consoleToAdd.save();
    consoles.push(consoleToAdd);
    console.log(`Added Console: ${name}`);
  }
  
  async function studioCreate(name, founders, creation_year, nationality) {
    studiodetail = {
      name: name,
      founders: founders,
      creation_year: creation_year,
      nationality: nationality,
    }

    const studio = new Studio(studiodetail);
  
    await studio.save();
    studios.push(studio);
    console.log(`Added Studio: ${name}`);
  }
  
  async function gameCreate(title, studio, release_year, console, genre) {
    const gamedetail = {
      title: title,
      studio: studio,
      release_year: release_year,
      console: console,
    };

    if (genre != false) gamedetail.genre = genre;
  
    const game = new Game(gamedetail);
    await game.save();
    games.push(game);

  }
  
  async function gameInstanceCreate(game, status, due_back) {
    const gameinstancedetail = {
      game: game,
    };
    if (due_back != false) gameinstancedetail.due_back = due_back;
    if (status != false) gameinstancedetail.status = status;
  
    const gameinstance = new GameInstance(gameinstancedetail);
    await gameinstance.save();
    gameInstances.push(gameinstance);
    console.log(`Added gameinstance of : ${game}`);
  }
  
  async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
      genreCreate("Fantasy"),
      genreCreate("Science Fiction"),
      genreCreate("RPG"),
      genreCreate("FPS"),
      genreCreate("MMO"),
    ]);
  }

  async function createConsoles() {
    console.log("Adding Consoles");
    await Promise.all([
      consoleCreate("PC", "", ),
      consoleCreate("Xbox 360", "Microsoft", 2005),
    ]);
  }


  
  async function createStudios() {
    console.log("Adding studios");
    await Promise.all([
      studioCreate("Arkane", "Raphaël Colantonio", "1999", "France"),
      studioCreate("Epic Games", "Tim Sweeney", "1991", "USA"),
      studioCreate("Team Cherry", ['Ari Gibson', 'William Pellen', 'Jack Vine'], "2017", "Australia"),
      studioCreate("ZA/UM", "Robert Kurvitz", "2016", "Europe"),
    ]);
  }
  
  async function createGames() {
    console.log("Adding Games");
    await Promise.all([
      gameCreate(
        "Hollow Knight",
       studios[2],
        2019,
        consoles[0],
        "Metroidvania"
      ),
    ]);
  }
  
  async function createGameInstances() {
    console.log("Adding Games");
    await Promise.all([
      gameInstanceCreate(games[0], "Available"),
      gameInstanceCreate(games[0], "Loaned"),
      gameInstanceCreate(games[1], "Damaged")
    ]);
  }