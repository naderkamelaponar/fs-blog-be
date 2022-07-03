module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		jest: "true",
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		indent: ["error", "tab"],
		
		quotes: ["error", "double"],
		semi: ["error", "always"],"no-console": 0,
	},
};
