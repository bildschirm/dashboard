<template>
	<form
		class="shadow sm:rounded-2xl sm:overflow-hidden"
		@submit.prevent="save"
	>
		<div class="px-4 py-5 bg-purple-900 space-y-8 sm:p-6">
			<div class="grid grid-cols-3 gap-6">
				<div class="col-span-3 lg:col-span-2">
					<label for="password" class="forms-label">
						New password
					</label>
					<input
						type="password"
						name="new_password"
						id="new-password"
						autocomplete="new-password"
						class="forms-input-text"
						placeholder="Enter your new password"
						v-model="newPassword"
						:disabled="loading"
						required
					/>
				</div>
				<div class="col-span-3 lg:col-span-2">
					<label for="password" class="forms-label">
						Repeat new password
					</label>
					<input
						type="password"
						name="new_password_repeat"
						id="new-password-repeat"
						autocomplete="new-password"
						class="forms-input-text"
						:class="{
							'focus:border-green-500':
								newPassword === repeatNewPassword &&
								newPassword !== '',
						}"
						placeholder="Repeat your new password"
						v-model="repeatNewPassword"
						:disabled="loading"
						required
					/>
				</div>
			</div>
		</div>

		<div class="px-4 py-3 bg-purple-700 text-right sm:px-6">
			<Button type="submit" :loading="loading" class="bg-purple-800">
				Change Password
			</Button>
		</div>
	</form>
</template>
<script type="text/javascript">
import Button from '@form/Button';

export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
	data: (props) => ({
		newPassword: '',
		repeatNewPassword: '',
	}),
	methods: {
		save() {
			if (this.newPassword !== this.repeatNewPassword) {
				this.$notify({
					title: 'Passwords do not match',
					type: 'error',
				});
				return;
			}

			this.$emit('update-password', this.newPassword);
		},
		reset() {
			this.newPassword = '';
			this.repeatNewPassword = '';
		},
	},
	components: {
		Button,
	},
};
</script>
