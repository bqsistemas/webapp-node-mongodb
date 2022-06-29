import path from 'path';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

if(isMainThread) {
  console.log('Starting the main thread.');

  const worker = new Worker(path.resolve('threads.js'), {
    workerData: {
      outputPrefix: 'Received message',
      timeToWaste: 500
    }
  });

  worker.on('message', (msg) => {
    console.log(`Worker: ${msg}`);
  });

  worker.postMessage('Done with my work.');

  console.log('Still in the main thread.');
} else {

  parentPort.on('message', (msg) => {
    console.log(`${workerData.outputPrefix}: ${msg}`);
  });

  parentPort.postMessage('Getting started');
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage('In the middle');
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage('All done');
}

function wasteTime(delay) {
  const end = Date.now() + delay;
  while (Date.now() < end) { }
}
