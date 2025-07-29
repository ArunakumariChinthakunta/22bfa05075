const http = require("http");
const { connectDB } = require("./db");
const { handleRequest } = require("./router");
require("dotenv").config();

const PORT = process.env.PORT || 5000;


connectDB();


const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
