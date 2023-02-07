const express = require("express");
const ChatUserModel = require("../models/ChatUser");
const routes = express.Router();

// User Signup
routes.post("/signup", async (req, res) => {
	try {
		const submittedData = req.body;
		const newUser = new ChatUserModel(submittedData);
		const result = await newUser.save();
		res.status(201).send({id: result.id, ...result._doc});
	} catch (e) {
		console.log(e?.message);
		res.status(500).send(e?.message);
	}
});

module.exports = routes;
