const express = require('express')
const path = require("path");

if(!process.env.NODE_ENV || !["dev", "stg", "prod"].includes(process.env.NODE_ENV)){
  console.error("Please specify NODE_ENV to either dev, stg, prod");
  process.exit(1);
}else{
  const envPath = path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`);
  require('dotenv').config({ path: envPath}); // load env variables
}

require("./config/mongo.config");
const app = express()
const port = process.env.PORT;

const router = require("./api/routes");
app.use("/api",router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})