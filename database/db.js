const knex = require('knex');
const knexConfigs = require('./knexfile');  
const correctKnexConfig = knexConfigs[process.env.MODE];
// console.log(knex);
// console.log(knexConfigs);
// console.log(correctKnexConfig);

const db = knex(correctKnexConfig);
// console.log(db);
// console.log(db.client);

module.exports = db;