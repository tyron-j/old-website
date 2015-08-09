// location

module.exports = {
	isLocalHost: process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST)
};