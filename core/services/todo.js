const TABLES = require("../../shared/dbModule/tables-name");

module.exports = (connection) => {
  const createTodo = (todoObject) => {
    const query = `INSERT INTO ${TABLES.TODO_TABLE} (content) VALUES ('${todoObject.message}')`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  };

  const getTodo = () => {
    const query = `SELECT id, content, timestamp FROM ${TABLES.TODO_TABLE} ORDER BY timestamp DESC`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.rows);
      });
    });
  };

  return { createTodo, getTodo };
};
