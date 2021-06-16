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
	async find(username) {
		const json = await request(`${usersUrl}/${username}`);

		if (json.error) {
			console.error('USERS API GET /users/' + username, json.error);
			throw new Error(json.error.message);
		}

		return json.user;
	},
	async create(user) {
		const json = await request(`${usersUrl}`, {
			method: 'POST',
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
	},
	async delete(username) {
		const json = await request(`${usersUrl}/${username}`, {
			method: 'DELETE'
		});

		if (json.error) {
			console.error('USERS API DELETE /users/:username', json.error);
			throw new Error(json.error.message);
		}
	},
	async update(username, user) {
		const json = await request(`${usersUrl}/${username}`, {
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
	},
	async updatePassword(username, password) {
		const json = await request(`${usersUrl}/${username}/change-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				password
			})
		});

		if (json.error) {
			console.error('USERS API PATCH /users/:username/update-password', json.error);
			throw new Error(json.error.message);
		}
	}
};