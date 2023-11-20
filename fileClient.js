const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
  console.log('Connected to server');

  rl.question('Enter file name to request:', (filename) => {
    client.write(filename);
  });
});

client.on('data', (data) => {
  const response = data.toString(). trim();
  if (response === 'File not found') {
    console.log('File not found on the server');
  } else {
    console.log('Received file data:', response);
  }

  client.end();
});

client.on('close', () => {
  console.log('Connection closed');
  rl.close();
});