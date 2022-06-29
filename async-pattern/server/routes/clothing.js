import express from 'express'
import fs from 'fs'
import * as fsPromises from 'fs/promises';
import createDebug  from 'debug'
const debug = createDebug('app:routes:clothing')

const datafile = 'server/data/clothing.json';
const router = express.Router();

export default (monitor) => {
  let dataMonitor = monitor

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
    }) 
    .post(async function(req, res) {
      try {

        let data = await getClothingData(datafile);
        let nextID = getNextAvailableID(data);

        let newClothingItem = {
            clothingID: nextID,
            itemName: req.body.itemName,
            price: req.body.price
        };

        data.push(newClothingItem);

        await saveClothingData(data);

        dataMonitor.emit('dataAdded', newClothingItem.itemName)

        debug('Returning new item to browser!')

        res.status(201).send(newClothingItem);
      }
      catch (error) {
        res.status(500).send(error);
      }

    })

  async function getClothingData(datafile) {

    let rawData = await fsPromises.readFile(datafile, 'utf8')
    let clothingData = JSON.parse(rawData)
    // debug(clothingData)

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

  function getNextAvailableID(allClothingData) {
    
    let maxID = 0;

    allClothingData.forEach(function(element, index, array) {
      if(element.clothingID > maxID) {
          maxID = element.clothingID;
      }
    });
    return ++maxID;
  }

  function saveClothingData(data) {
    return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
  }

  return router
}
