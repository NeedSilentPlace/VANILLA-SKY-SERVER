const dgram = require('dgram');
const app = require('express')();

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

const droneStream = dgram.createSocket('udp4');
droneStream.bind(11111);

drone.on('message', message => {
  console.log(message);
});

droneStream.on('message', message => {
  console.log(message.toString());
});

drone.send('command', 0, 7, PORT, HOST, handleError);
drone.send('streamon', 0, 8, PORT, HOST, handleError);

function handleError(err) {
  if(err) {
    console.log('Error');
    console.log(err);
  }
}
