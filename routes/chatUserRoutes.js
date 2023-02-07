const express = require("express");
const ChatUserModel = require("../models/ChatUser");
const bcrypt = require("bcrypt");
const routes = express.Router();

// User Signup
routes.post("/signup", async (req, res) => {
	try {
		const submittedData = req.body;
		const newUser = new ChatUserModel(submittedData);
		const result = await newUser.save();
		res.status(201).send({id: result.id, ...result._doc});
	} catch (e) {
		res.status(500).send(e);
	}
});

// User Login
routes.post("/login", async (req, res) => {
	try {
		const submittedData = req.body;
		const result = await ChatUserModel.findOne({ userName: submittedData.userName });
		if (!result) {
			res.status(401).send({ message: "No matching username found" });
		}
		
		const isPasswordMatched = await bcrypt.compare(submittedData.password, result.password);
		if (!isPasswordMatched) {
			res.status(401).send({ message: "Invalid password" });
		} else {
			res.status(201).send({ message: "success", ...result._doc });
		}
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = routes;
