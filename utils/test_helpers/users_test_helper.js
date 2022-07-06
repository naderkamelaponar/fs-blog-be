// بسم الله الرحمن الرحيم
const User = require("../../models/users_model");
const initUsers = [
	{
		name:"big boss",
		username:"bigboss",password:"secret"
	},
	{
		name:"small boss",
		username:"smallboss",password:"password"
	},
];
const allUsers = async () => {
	const users = await User.find({});
	return users;
};
const idNotExist = async () => {
	const newUser = new User(initUsers[0]);
	await newUser.save();
	await newUser.remove();
	return newUser.id;
};
module.exports = {
	initUsers,
	idNotExist,
	allUsers,
};
