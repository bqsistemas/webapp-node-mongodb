import express from 'express'
import fs from 'fs'
import * as fsPromises from 'fs/promises';
import createDebug  from 'debug'
const debug = createDebug('app:routes:clothing')

const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(async function(req, res) {

    try{
      const rawData = await getClothingData(datafile)
      debug('Returning clothing data')
      res.send(rawData)
    }catch{
      res.status(500).send(err)
    }finally{
      debug('Finish get clothes')
    }
    /* getClothingData(datafile)
      .then((data) => {
        debug('Returning clothing data')
        res.send(data)
      })
      .catch((err) => res.status(500).send(err))
      .finally(() => debug('Finish get clothes')) */

      debug('Doing more work')
  });

async function getClothingData(datafile) {

  let rawData = await fsPromises.readFile(datafile, 'utf8')
  let clothingData = JSON.parse(rawData)
  debug(clothingData)

  return clothingData

  /* let clothingPromise = fsPromises.readFile(datafile, 'utf8')
    .then(data => JSON.parse(data))

  console.log(clothingPromise)

  return clothingPromise */

  /* return new Promise((resolve, reject) => {
    fs.readFile(datafile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        let clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  }) */
}  

export default router
