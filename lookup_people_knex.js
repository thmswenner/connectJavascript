const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});



const name = process.argv[2];
console.log('Searching...')




function getData (name) {
knex('famous_people').where('first_name', '=', name)
  .asCallback((err, rows) => {
    const numOfPeople = rows.length
    console.log(`Found ${numOfPeople} person(s) by the name '${name}'`)
    rows.forEach((e, i) => {
      console.log(`- ${i + 1} ${e.first_name} ${e.last_name}, born ${e.birthdate}`);
    })
    knex.destroy()
  })
}

getData(name)


