const EventEmitter = require("events")

let myEventEmitter = new EventEmitter()

myEventEmitter.on('wroteCode', (language) => {
    console.log(`Somebody wrote some code! ${language}`)
})
myEventEmitter.on('wroteCode', (language) => {
    console.log(`Busy building Node apps! ${language}`)
})

myEventEmitter.emit('wroteCode', 'English')

// Somebody wrote some code!
// Busy building Node apps!