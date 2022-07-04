// بسم الله الرحمن الرحيم
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users_model");
const config = require("../utils/config");
const authenticatedUser= async (username,password)=>{
	try {
		
		if (!username || !password)
		return response.status(400).json("missing login parameters");
	const user = await User.findOne({ username });
console.log('authenticated',user)
	const validPassword =
      user ? await bcrypt.compare(password, user.password):null
		return user && validPassword ? user :null
	} catch (error) {
		
	}
}
loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body;
	try {
		if (!username || !password)
		return response.status(400).json("missing login parameters");
	const user = await authenticatedUser(username,password)
	if (!user) return response.status(401).json("wrong login parameters");
	const user2Authenticate = {
		username: user.username,
		name:user.name,
		id: user._id,
	};
	const token =  jwt.sign(user2Authenticate, config.secretWord);
	return response.status(200).json({token,user:user2Authenticate});
	} catch (error) {
		console.log(error)
	}
});
module.exports = loginRouter;
