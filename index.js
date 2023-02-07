const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const chatUserRoutes = require("./routes/chatUserRoutes");
const DB_CONNECT_STRING = 'mongodb+srv://101276573:1234_5678_abc@cluster0.wed75fp.mongodb.net/comp3133?retryWrites=true&w=majority';

const app = express();
app.use(express.json());

mongoose.connect(DB_CONNECT_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(success => {
	console.log('Successfully connected to MongoDB')
}).catch(err => {
	console.log('Error connecting MongoDB')
});

app.use(chatUserRoutes);

app.listen(8080, () => { console.log('Server is running at localhost:8080...') });
