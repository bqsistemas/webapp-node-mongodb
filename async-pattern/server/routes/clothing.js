import express from 'express'
import fs from 'fs'
import createDebug  from 'debug'
const debug = createDebug('app:routes:clothing')

const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {

    getClothingData()
      .then((data) => {
        debug('Returning clothing data')
        res.send(data)
      })
      .catch((err) => res.status(500).send(err))
      .finally(() => debug('Finish get clothes'))

      debug('Doing more work')
  });

function getClothingData() {
  return new Promise((resolve, reject) => {
    fs.readFile(datafile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        let clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  })
}  

export default router
