<template>
	<form class="max-w-4xl" @submit.prevent="create">
		<h3 class="text-lg leading-6 text-purple-100 font-semibold mb-1">
			Create a new user
		</h3>
		<p class="mb-10 text-sm text-purple-300 font-semibold">
			Mission control users can manage and interact with the system.
		</p>

		<Label label="Username" name="username" class="mb-4">
			<TextInput
				type="text"
				name="username"
				placeholder="Username"
				v-model="user.username"
				required
			/>
		</Label>

		<Label label="Display Name" name="name" class="mb-4">
			<TextInput
				type="text"
				name="name"
				placeholder="Display Name"
				v-model="user.displayName"
				required
			/>
		</Label>

		<Label label="Avatar URL" name="avatarUrl" class="mb-4">
			<AvatarUrlInput
				type="text"
				name="avatarUrl"
				placeholder="Avatar URL"
				v-model="user.avatarUrl"
				required
			/>
		</Label>

		<Label label="Role" name="role" class="mb-4">
			<SelectInput
				name="role"
				placeholder="Role"
				v-model="user.role"
				required
			>
				<option value="guest">Guest</option>
				<option value="user">User</option>
				<option value="admin">Admin</option>
			</SelectInput>
		</Label>

		<Label label="Password" name="new_password" class="mb-4">
			<TextInput
				type="password"
				name="new_password"
				autocomplete="new-password"
				placeholder="Enter your new password"
				v-model="user.password"
				required
			/>
		</Label>

		<Label label="Repeat password" name="new_password_repeat" class="mb-8">
			<TextInput
				type="password"
				name="new_password_repeat"
				autocomplete="new-password"
				:class="{
					'focus:border-green-500':
						user.password === user.repeatPassword &&
						user.password !== '',
				}"
				placeholder="Repeat your password"
				v-model="user.repeatPassword"
				required
			/>
		</Label>

		<div class="flex justify-end">
			<Button type="submit" class="forms-button">
				Create user
			</Button>
		</div>
	</form>
</template>
<script type="text/javascript">
import { users } from '@api';

import Button from '@components/form/Button';
import Label from '@components/form/Label';
import TextInput from '@components/form/TextInput';
import AvatarUrlInput from '@components/form/AvatarUrlInput';
import SelectInput from '@components/form/SelectInput';

export default {
	components: { Button, Label, TextInput, AvatarUrlInput, SelectInput },
	data: () => ({
		user: {
			username: '',
			displayName: '',
			avatarUrl: '',
			role: 'guest',
			password: '',
			repeatPassword: '',
		},
	}),
	methods: {
		async create() {
			try {
				if (
					this.user.password !== '' &&
					this.user.password !== this.user.repeatPassword
				) {
					return this.$notify({
						type: 'error',
						title: "Passwords don't match",
					});
				}

				this.loading = true;
				await users.create({
					...this.user,
					avatarUrl:
						this.user.avatarUrl !== '' ? this.user.avatarUrl : null,
					repeatPassword: undefined,
				});

				this.$notify({
					type: 'success',
					title: `User ${this.user.username} created`,
				});

				this.user = {};
			} catch (e) {
				console.error('error during create user', e.message);

				this.$notify({
					type: 'error',
					title: 'Could not create user',
					text: e.message,
				});
			}

			this.loading = false;
		},
	},
};
</script>
