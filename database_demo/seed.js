// Bring in our our postgres client
const { client, createPuppy } = require("./index");
// Bring in our puppies data
const { puppies } = require("./seedData");
// In this file what I want to do is loop over the puppies file and c
// create rows with the fake data
// I also want to create the table for our db

// I want to create a function called reBuildDB
// And this is going to async because our db operation is async
const reBuildDB = async () => {
  try {
    // first thing I want to do is connect to our db
    // this opens a connection to our server
    client.connect();
    // Drop the puppies table if it already exists
    // The way we write SQL within databases is
    // use backtics to make it multiline
    await client.query(`
        DROP TABLE IF EXISTS puppies;
    `);

    // create puppies table
    await client.query(`
     CREATE TABLE puppies(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isCute" BOOLEAN DEFAULT true,
        age INT
     )
    `);

    // Next thing we want to do is loop over
    // puppies and insert a puppy for each item
    // I want to write the function that inserts the individual
    // puppy inside of my index.js file  because I may want to use this elsewhere
    // such as my post end point for my server

    // first test with one puppy
    // const firstPuppy = puppies[0];
    // createPuppy(firstPuppy);

    // Rememeber our createPuppy is going to return an array of promises a puppy object
    // what we want to do is return an array of resolved promises for each row we have in our db
    // Anyone rememeber what we did or learned in Art Collector
    const insertedPuppies = await Promise.all(
      puppies.map((puppy) => createPuppy(puppy))
    );
    console.log("insertedPuppies", insertedPuppies);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

reBuildDB();
