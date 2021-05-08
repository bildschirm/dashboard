const usersUrl = '/users';

async function request(url, options) {
	const res = await fetch(url, options);

	return await res.json();
}

export const users = {
	async all() {
		const json = await request(usersUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});

		if (json.error) {
			console.error('USERS API GET /users', json.error);
			throw new Error(json.error.message);
		}

		return json;
	},
	async update(user) {
		const json = await request(`${usersUrl}/${user.username}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				user
			})
		});

		if (json.error) {
			console.error('USERS API PATCH /users/:username', json.error);
			throw new Error(json.error.message);
		}
	}
};