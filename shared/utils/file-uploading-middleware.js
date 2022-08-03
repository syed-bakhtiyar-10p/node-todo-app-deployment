const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

module.exports = (upload) => {
  // const authMiddleware = require('./authentication-middleware');
  const errorMiddleware = require('./error-middleware');
  router.post('/file', async (req, res, next)=>{
    try{
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              return res.status(500).json(err)
          } else if (err) {
              return res.status(500).json(err)
          }
          return res.status(200).send(req.file)
        });
    }catch(e){
        res.status(500);
        return next('internal server error');
    }
  }, errorMiddleware.errorMiddleware);

  router.get('/file', async (req, res, next)=>{
    try{
        res.sendFile(`${path.resolve('./')}/${req.query.path}`);
    }catch(e){
        res.status(500);
        return next('internal server error');
    }
  }, errorMiddleware.errorMiddleware);

  return router;
}
