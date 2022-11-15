const { Client } = require("pg");
// create a new client that is connected to postgres database l
// create a new instance for your class client that takes in a parameter which is the url of our database
// when we install postgres its automattically runs port 5423
const client = new Client("postgres://localhost:5432/puppy_pals");

// create puppy after table has been created
const createPuppy = async (puppy) => {
  // you could also destructure in the parameter
  const { name, email, age } = puppy;
  // This time I am going to use a variable because I want the result we get back
  // Ask them what do they think I should put in as values
  // You may think we will use string interporlation, but we
  // don't want to put variable names in a query - because this is how you will get
  // sql injection attacks
  // you never want to insert javascript variables with a string
  // google it for them  to see
  const { rows } = await client.query(
    `
    INSERT INTO puppies(name, email, age) VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING 
    RETURNING *;
    `,
    [name, email, age]
  );
  //   console.log("result", result);
  console.log("puppy", rows[0]);
  // You could also destructure rows: [puppy]
  return rows[0];
};

module.exports = {
  client,
  createPuppy,
};

// The next thing I want to do is create some kind of seed file
// What seeding is setting up some default data for development
//remember how when we worked with puppyBowl and Stranger's
//Things we had some kind of data
