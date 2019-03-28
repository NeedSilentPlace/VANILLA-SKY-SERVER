const dgram = require('dgram');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const ws = require('ws');
const io = require('socket.io')(http);
const wait = require('waait');
const commandDelays = require('./commandDelays');
const websocket = new ws.Server({ port: 8080 });
const drone = dgram.createSocket('udp4');
const droneState = dgram.createSocket('udp4');
const droneVideo = dgram.createSocket('udp4');
const HOST = '192.168.10.1';
const COMMAND_PORT = 8889;
const STATE_PORT = 8890;
const VIDEO_PORT = 11111;

drone.bind(COMMAND_PORT);
droneState.bind(STATE_PORT);
droneVideo.bind(VIDEO_PORT);
drone.send('command', 0, 7, COMMAND_PORT, HOST, (err) => console.log(err));
drone.send('streamon', 0, 8, COMMAND_PORT, HOST, (err) => console.log(err));

websocket.on('connection', function connection(websocket) {
  console.log('web socket is connected!');
  websocket.on('error', (err) => {
    console.log('websocket error', err);
  });
  websocket.on('close', (message) => {
    console.log('web socket is closed', message);
  });
});

io.on('connection', socket => {
  socket.on('command', command => {
    if(Array.isArray(command)) {
      console.log(command);
      combo(command);
    } else {
      console.log('not combo', command);
      drone.send(command, 0, command.length, COMMAND_PORT, HOST, (err) => console.log(err));
    }
  });
  socket.emit('status', 'connected');
});

http.listen(8000, () => {
  console.log('socket io server up!');
});

let videoBuffer = [];
let counter = 0;

droneVideo.on('error', (err) => {
  console.log('drone video error', err);
  video.close();
});

droneVideo.on('message', (message) => {
  let buffer = Buffer.from(message);
  if(buffer.indexOf(Buffer.from([0, 0, 0, 1])) !== -1) {
    counter++;
    if(counter === 3) {
      let temp = Buffer.concat(videoBuffer);
      counter = 0;
      websocket.clients.forEach(client => {
        if(client.readyState === ws.OPEN) {
          try {
            client.send(temp);
          } catch(err) {
            console.log('websocket fail to send', err);
          }
        }
      });
      videoBuffer.length = 0;
    }
    videoBuffer.push(buffer);
  } else {
    videoBuffer.push(buffer);
  }
});

let currentBattery = 101;

droneState.on('message', (message) => {
  const batteryMessage = message.toString().split(';')[15];
  const batteryString = batteryMessage.split(':')[1];
  const battery = parseInt(batteryString);
  if(battery !== currentBattery) {
    currentBattery = battery;
    io.sockets.emit('battery', currentBattery);
  }
});

async function combo(commands) {
  for(let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const delay = commandDelays[command];
    drone.send(command, 0, command.length, COMMAND_PORT, HOST, (err) => console.log(err));
    await wait(delay);
  }
}
