// import app from './app';

// app.listen(process.env.PORT || 3001, () => console.log('Server on'));



import app from './app';
const https = require("https");
import {readFileSync} from "fs"
import {join} from "path"
var privateKey = readFileSync(join(__dirname, "key.pem"));
var certificate = readFileSync(join(__dirname, "cert.pem"));
https
  .createServer({
    key: privateKey,
    cert: certificate,
  },app)
  .listen(3001, ()=>{
    console.log('server is runing at port 3001')
  });