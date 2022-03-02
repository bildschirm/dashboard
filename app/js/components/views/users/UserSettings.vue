<template>
	<div class="max-w-4xl min-w-md">
		<div class=" mb-10">
			<div class="mb-6">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg leading-6 text-primary-100 font-semibold">
						Profile
					</h3>
					<p class="mt-1 text-sm text-primary-300 font-semibold">
						Your Bildschirm account
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<UserProfileForm
					:loading="profileFormLoading"
					:user="user"
					@save="save"
				/>
			</div>
		</div>
		<div class="">
			<div class="mb-6">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg leading-6 text-primary-100 font-semibold">
						Security
					</h3>
					<p class="mt-1 text-sm text-primary-300 font-semibold">
						Change your password
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<ChangePasswordForm
					ref="passwords"
					:loading="passwordFormLoading"
					@update-password="updatePassword"
				/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { users } from '@api';
import UserProfileForm from './UserProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		profileFormLoading: false,
		passwordFormLoading: false,
	}),
	computed: {
		username() {
			// If the edited user is our own we use 'me' instead,
			// as users may have permission update:own but not update:any user.
			return this.user.username === this.$store.state.user.username
				? 'me'
				: this.user.username;
		},
	},
	methods: {
		async save(user) {
			try {
				this.profileFormLoading = true;

				await users.update(this.username, user);

				this.$notify({
					title: 'Profile saved',
					type: 'success',
				});
			} catch (e) {
				console.error(e);
				this.$notify({
					title: 'Could not save profile',
					text: e.message,
					type: 'error',
				});
			}

			this.profileFormLoading = false;
		},
		async updatePassword(newPassword) {
			try {
				this.passwordFormLoading = true;
				await users.updatePassword(this.username, newPassword);

				this.$refs.passwords.reset();

				this.$notify({
					title: 'Password changed',
					type: 'success',
				});
			} catch (e) {
				console.error(e);
				this.$notify({
					title: 'Could not change password',
					text: e.message,
					type: 'error',
				});
			}

			this.passwordFormLoading = false;
		},
	},
	components: {
		UserProfileForm,
		ChangePasswordForm,
	},
};
</script>
