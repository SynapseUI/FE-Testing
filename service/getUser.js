export const getUser = async () => {
	try {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
		const responseUserInfo = await response.json();
		return responseUserInfo;
	} catch (err) {
		console.log(err);
	}
};

export const users = {
	getUser
};