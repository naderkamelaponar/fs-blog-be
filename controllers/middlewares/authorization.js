// بسم الله الرحمن الرحيم
const jwt = require("jsonwebtoken");
const config= require("../../utils/config");
const authorize = (req,res,next)=>{
	
	try {
		const authHead =req.get("authorization");
		if (authHead){
			const token = authHead ? authHead.split(" ")[1]:"";
			const decode =  jwt.verify(token,config.secretWord);
			if (decode) next();
			else return( res.status(401).json({message:"unauthorized user"}));
		}else{
			return( res.status(401).json({message:"unauthorized user"}));
		}
	} catch (error) {
		return( res.status(401).json({message:"unauthorized user"}));
	}
};

module.exports = authorize;