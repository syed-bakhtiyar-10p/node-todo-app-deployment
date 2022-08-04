const Pool = require('pg').Pool;
const awsSecret = require('../secrets/aws-secrets');

const pool = () => {
  return new Promise(async (resolve, reject) => {
      try{
        const creds = await awsSecret();
        resolve(new Pool({
            user: creds.username,
            host: creds.host,
            database: creds.dbname,
            password: creds.password,
            port: creds.port,
            connectionTimeoutMillis: 5000,
          })
        );
      } catch(e) {
        reject(e);
      }
  });
};

module.exports = pool;