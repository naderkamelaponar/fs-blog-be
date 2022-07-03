// بسم الله الرحمن الرحيم
const usersRouter = require("express").Router();
const User = require("../models/users_model");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const authorize = require("./middlewares/authorization");
const getUsers = async (id = "") => {
	const fields = { author: 1, url: 1, title: 1, likes: 1 };
	const users =
      id !== ""
      	? await User.findById({ _id: id }).populate("blogs", fields)
      	: await User.find({}).populate("blogs", fields);
	return users ? users : null;
};
usersRouter.get("/", async (_, response) => {
	try {
		const users = await getUsers();
		if (users) return response.json(users);
		else
			return response
				.status(404)
				.json({ message: "No users found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});

usersRouter.post("/", async (request, response) => {
	const user = new User(request.body);
	console.log(config.saltRounds);
	if (!user.name || !user.username || !user.password)
		return response
			.status(400)
			.json({ message: "missing user paramaters" });
	const checkUser = await User.findOne({ username: user.username });
	if (checkUser)
		return response
			.status(400)
			.json({ message: "username already exists" });
	const hashPassword = await bcrypt.hash(
		user.password,
		Number(config.saltRounds)
	);
	user.password = hashPassword;
	try {
		const res = await user.save();
		if (res) return response.status(201).json(res);
	} catch (error) {
		return response.status(500).json({ message: "Opss !" });
	}
});
usersRouter.get("/:id", async (request, response) => {
	const id = request.params.id;
	const user = await getUsers(id);
	try {
		if (user) return response.json(user);
		else
			return response
				.status(404)
				.json({ message: "No users found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
usersRouter.delete("/:id",authorize, async (request, response) => {
	const id = request.params.id;
	try {
		const res = await User.findByIdAndDelete(id);
		if (res) return response.status(204).json(id);
		else
			return response
				.status(404)
				.json({ message: "No blog found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
usersRouter.put("/:id", authorize,async (request, response) => {
	const id = request.params.id;
	const user = request.body;
	try {
		const res = await User.findByIdAndUpdate(id, user);
		if (res) return response.status(202).json(res);
		else
			return response
				.status(404)
				.json({ message: "No blog found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
module.exports = usersRouter;
