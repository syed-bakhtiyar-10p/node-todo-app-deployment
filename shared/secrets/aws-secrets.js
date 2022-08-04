const AWS = require('aws-sdk');

module.exports = () => {
  require('dotenv').config();
  const region = "us-east-1";
  const secretName = "dev/app/todo";

  AWS.config.update({
    maxRetries: 3,
    httpOptions: {timeout: 30000, connectTimeout: 5000},
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })

  const client = new AWS.SecretsManager({
    region
  });
  

  return new Promise((resolve, reject) => {

    client.getSecretValue({SecretId: secretName}, function(err, data) {
      if (err) {
          reject(err);
      } else {
          // Decrypts secret using the associated KMS key.
          // Depending on whether the secret is a string or binary, one of these fields will be populated.
          if ('SecretString' in data) {
              const secret = JSON.parse(data.SecretString);
              resolve(secret)
          }
      }
      
      // Your code goes here. 
    });
  });
};
