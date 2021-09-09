// const express = require("express");
// const app = express();
const http = require('http')
const PORT = 3002;

const server = http.createServer(function(req,res) {

})

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));