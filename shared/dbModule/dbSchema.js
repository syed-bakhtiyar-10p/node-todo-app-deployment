const TABLES = require('./tables-name');

const CREATE_TODO_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLES.TODO_TABLE}
                           (
                                id SERIAL PRIMARY KEY,
                                content TEXT,
                                timestamp timestamp DEFAULT CURRENT_TIMESTAMP
                           )`;

module.exports = {
     CREATE_TODO_TABLE
}
