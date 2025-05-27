const express = require("express")
const cors = require("cors")

const server = express();
server.use(cors());
server.use(express.json());

const port = 3000;

app.listen(port, ()=>{
    console.log('server is up on port ${port}')
})