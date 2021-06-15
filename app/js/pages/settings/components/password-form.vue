<template>
	<form class="shadow sm:rounded-2xl sm:overflow-hidden" @submit.prevent="save">
		<div class="px-4 py-5 bg-purple-900 space-y-8 sm:p-6">
			<div class="grid grid-cols-3 gap-6">
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
							placeholder="Leave empty to keep current password"
							v-model="newPassword"
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
							placeholder="Leave empty to keep current password"
							v-model="repeatNewPassword"
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
				class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
			>
				Change Password
			</button>
		</div>
	</form>
</template>
<script type="text/javascript">
	export default {
		props: ['value'],
		data: (props) => ({
			newPassword: '',
			repeatNewPassword: ''
		}),
		methods: {
			save() {
				if (this.newPassword !== this.repeatNewPassword) {
					alert('The new passwords to not match');
					return;
				}
				
				this.$emit('update-password', this.newPassword);

				this.newPassword = '';
				this.repeatNewPassword = '';
			}
		}
	};
</script>