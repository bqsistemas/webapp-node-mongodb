function doAsyncWork(resolve, reject) {
    // perform async calls
    if(success){
        resolve(data)
    }else{
        reject(reason)
    }
}

let myPromise = new Promise(doAsyncWork)

let mySecondPromise = new Promise((resolve, reject) => {
    if(success){
        resolve(data)
    }else{
        reject(reason)
    }
})

myPromise
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log('All done!'))