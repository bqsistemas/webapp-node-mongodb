async function getData() {
    let rawData = await MethodThatReturnsPromise()

    return JSON.parse(rawData)
}

getData()
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log('All done!'))

// or

await getData()