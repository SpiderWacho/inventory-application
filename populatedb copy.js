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
    await createGames();
    await createStudios();
    await createGameInstances();
    await createConsoles();
    await createGenres();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function genreCreate(name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres.push(genre);
    console.log(`Added genre: ${name}`);
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
    gamedetail = {
      title: title,
      studio: studio,
      release_year: release_year,
      console: console,
      genre: genre,
    };
    if (genre != false) bookdetail.genre = genre;
  
    const game = new Game(gamedetail);
    await game.save();
    games.push(game);
    console.log(`Added game: ${title}`);
  }
  
  async function gameInstanceCreate(game, status, due_back) {
    gameinstancedetail = {
      game: game,
    };
    if (due_back != false) gameinstancedetail.due_back = due_back;
    if (status != false) gameinstancedetail.status = status;
  
    const gameinstance = new gameInstance(gameinstancedetail);
    await gameinstance.save();
    gameinstances.push(gameinstance);
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
  
  async function createStudios() {
    console.log("Adding studios");
    await Promise.all([
      studioCreate("Arkane", "Raphaël Colantonio", "1999", "France"),
      studioCreate("Eic Games", "Tim Sweeney", "1991", "USA"),
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
        authors[0],
        [genres[0]]
      ),
      bookCreate(
        "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
        "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
        "9788401352836",
        authors[0],
        [genres[0]]
      ),
      bookCreate(
        "The Slow Regard of Silent Things (Kingkiller Chronicle)",
        "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
        "9780756411336",
        authors[0],
        [genres[0]]
      ),
      bookCreate(
        "Apes and Angels",
        "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
        "9780765379528",
        authors[1],
        [genres[1]]
      ),
      bookCreate(
        "Death Wave",
        "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
        "9780765379504",
        authors[1],
        [genres[1]]
      ),
      bookCreate(
        "Test Book 1",
        "Summary of test book 1",
        "ISBN111111",
        authors[4],
        [genres[0], genres[1]]
      ),
      bookCreate(
        "Test Book 2",
        "Summary of test book 2",
        "ISBN222222",
        authors[4],
        false
      ),
    ]);
  }
  
  async function createBookInstances() {
    console.log("Adding authors");
    await Promise.all([
      bookInstanceCreate(books[0], "London Gollancz, 2014.", false, "Available"),
      bookInstanceCreate(books[1], " Gollancz, 2011.", false, "Loaned"),
      bookInstanceCreate(books[2], " Gollancz, 2015.", false, false),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Maintenance"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Loaned"
      ),
      bookInstanceCreate(books[0], "Imprint XXX2", false, false),
      bookInstanceCreate(books[1], "Imprint XXX3", false, false),
    ]);
  }