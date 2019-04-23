const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect();

const name = process.argv[2];
console.log('Searching...')



function getData (name) {

  client.query('SELECT * FROM famous_people WHERE first_name = $1::text', [name], (err, res) => {
    const numOfPeople = res.rows.length
    console.log(`Found ${numOfPeople} person(s) by the name '${name}'`)
    res.rows.forEach((e, i) => {
      console.log(`- ${i + 1} ${e.first_name} ${e.last_name}, born ${e.birthdate}`);
    })
    client.end();
  })
}

getData(name)
