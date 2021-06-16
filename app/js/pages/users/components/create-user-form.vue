<template>
	<form class="max-w-4xl shadow sm:rounded-2xl sm:overflow-hidden" @submit.prevent="create">
		<div class="px-4 py-5 bg-purple-900 space-y-8 sm:p-6">
			<div class="grid grid-cols-3 gap-6">
				<div class="col-span-3 lg:col-span-2">
					<label
						for="name"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Display Name
					</label>
					<input
							type="text"
							name="name"
							id="name"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Display Name"
							v-model="user.displayName"
							required
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="username"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Username
					</label>
					<input
							type="text"
							name="username"
							id="username"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Username"
							v-model="user.username"
							required
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="avatarUrl"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Avatar URL
					</label>
					<div class="flex gap-3">
						<input
							type="url"
							name="avatarUrl"
							id="avatarUrl"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							v-model="user.avatarUrl"
							autocomplete="photo"
						/>
						<div class="flex-shrink-0 w-10 h-10 bg-purple-800 rounded-full overflow-hidden">
							<img :src="user.avatarUrl">
						</div>
					</div>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="password"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Role
					</label>
					<select class="forms-select" v-model="user.role">
						<option value="guest">Guest</option>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="password"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						New password
					</label>
					<input
							type="password"
							name="new_password"
							id="new-password"
							autocomplete="new-password"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Enter your new password"
							v-model="user.password"
							required
						/>
				</div>
				<div class="col-span-3 lg:col-span-2">
					<label
						for="password"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Repeat new password
					</label>
					<input
							type="password"
							name="new_password_repeat"
							id="new-password-repeat"
							autocomplete="new-password"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							:class="{ 'focus:border-green-500': user.password === user.repeatPassword && user.password !== '' }"
							placeholder="Repeat your new password"
							v-model="user.repeatPassword"
							required
						/>
				</div>
			</div>
		</div>

		<div
			class="px-4 py-3 bg-purple-800 text-right sm:px-6"
		>
			<button
				type="submit"
				class="forms-button"
			>
				Create user
			</button>
		</div>
	</form>
</template>
<script type="text/javascript">
	export default {
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		methods: {
			create() {
				if (this.user.password !== '' && this.user.password !== this.user.repeatPassword) {
					return this.$notify({
						type: 'error',
						title: 'Passwords don\'t match'
					});
				}

				this.$emit('create', this.user);
			}
		}
	};
</script>