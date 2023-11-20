const net = require('net');
const fs = require('fs');
const path = require('path');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on("data", (data) => {
    const fileName = data.toString().trim();
    console.log(`Request file ${fileName}`);

    const filePath = path.join(__dirname, "files", fileName);

    fs.readFile(filePath, (error, fileData) => {
      if (error) {
        console.log(`Error reading file ${error.message}`);
        socket.write("File not found");
      } else {
        socket.write(fileData);
      }
      socket.end;
    });
  });
  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});