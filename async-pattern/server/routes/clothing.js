import express from 'express'
import fs from 'fs'
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {

    getClothingData()
      .then((data) => {
        console.log('Returning clothing data')
        res.send(data)
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('Doing more work'))
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
