const connection = require('./config');
const schemas = require('./dbSchema');

const connectionPromise = new Promise((resolve, reject)=>{
    connection.connect(async err => {
        if(err) {
            reject(err);
            return;
        };
    
        try {
            await createTable(schemas.CREATE_TODO_TABLE);
            resolve(connection);
        } catch (error) {
            reject(error);
        }
    });
});

const createTable = (tableSchema) => {
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