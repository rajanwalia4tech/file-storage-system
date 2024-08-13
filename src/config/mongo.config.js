const mongoose = require("mongoose");
console.log("mongodb url ",process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser : true,
	useUnifiedTopology : true,
	maxPoolSize: 50, // Set the max number of connections in the pool
	socketTimeoutMS: 2 * 60 * 1000, // Close sockets after 2 minutes of inactivity
	connectTimeoutMS : 30 * 1000
})
.then(() => console.log('MongoDB connected'))
.catch(err => { 
    console.error("Error while connecting with MongoDB",err.message)
});