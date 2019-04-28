export default {
	missionControlUrl:
		process.env.NODE_ENV === 'production'
			? 'http://home.mateffy.test:3000'
			: 'http://home.mateffy.test:3000',
	socketUrl:
		process.env.NODE_ENV === 'production'
			? 'http://home.mateffy.test:3000'
			: 'http://home.mateffy.test:3000'
};
