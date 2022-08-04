const pool = require('./config');
const schemas = require('./dbSchema');

const connectionPromise = new Promise(async (resolve, reject)=>{
    try {
        const connection = await pool(); 
        connection.connect(async err => {
            if(err) {
                reject(err);
                return;
            };
        
            try {
                await createTable(connection, schemas.CREATE_TODO_TABLE);
                resolve(connection);
            } catch (error) {
                reject(error);
            }
        });
    } catch (error) {
        reject(err);
    }
    
});

const createTable = (connection, tableSchema) => {
    return new Promise((resolve, reject)=>{
        connection.query(tableSchema, (err, result)=>{
            if(err) {
                reject(err);
                return;
            };
            console.log('table(s) created');
            resolve();
         });
    });
}

module.exports = connectionPromise;