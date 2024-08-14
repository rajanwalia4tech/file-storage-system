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
const rateLimit = require("express-rate-limit");

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { success : false, message: "Too many requests from this IP, please try again after 5 minutes" },
  headers: true, 
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = require("./api/routes");
app.use("/api",router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})