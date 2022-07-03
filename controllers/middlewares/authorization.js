// بسم الله الرحمن الرحيم
const jwt = require("jsonwebtoken");
const config= require("../../utils/config");
const authorize =async (req,res,next)=>{
	try {
		const authHead =req.get("authorization");
		if (authHead){
			const token = authHead ? authHead.split(" ")[1]:"";
			const decode = await jwt.verify(token,config.secretWord);
			if (decode) next();
			else return( res.status(401).json({"error":"unauthorized user"}));
		}else{
			return( res.status(401).json({"error":"unauthorized user"}));
		}
	} catch (error) {
		return( res.status(401).json({"error":"unauthorized user"}));
	}
};

module.exports = authorize;