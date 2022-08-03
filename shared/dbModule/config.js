const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'databas-instance-1.cj6ubj9dyv6k.us-east-1.rds.amazonaws.com',
  database: 'todo_db',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;