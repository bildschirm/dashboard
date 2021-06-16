<template>
	<div class="max-w-4xl">
		<div class="md:grid md:grid-cols-3 md:gap-6 mb-10">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg leading-6 text-purple-100 font-semibold">
						Profile
					</h3>
					<p class="mt-1 text-sm text-purple-400">
						Your Mission Control account
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<profile-form :loading="profileFormLoading" :user="user" @save="save" />
			</div>
		</div>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg leading-6 text-purple-100 font-semibold">
						Security
					</h3>
					<p class="mt-1 text-sm text-purple-400">
						Change your password
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<password-form ref="passwords" :loading="passwordFormLoading" @update-password="updatePassword" />
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { users } from '@api';
import passwordForm from './password-form';
import profileForm from './profile-form';

export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		profileFormLoading: false,
		passwordFormLoading: false
	}),
	computed: {
		username() {
			// If the edited user is our own we use 'me' instead,
			// as users may have permission update:own but not update:any user.
			return this.user.username === this.$store.state.user 
				? 'me' 
				: this.user.username;
		}
	},
	methods: {
		async save(user) {
			try {
				this.profileFormLoading = true;

				await users.update(this.username, user);

				this.$notify({
					title: 'Profile saved',
					type: 'success'
				});
			} catch (e) {
				console.error(e);
				this.$notify({
					title: 'Could not save profile',
					text: e.message,
					type: 'error'
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
					type: 'success'
				});
			} catch (e) {
				console.error(e);
				this.$notify({
					title: 'Could not change password',
					text: e.message,
					type: 'error'
				});
			}

			this.passwordFormLoading = false;
		}
	},
	components: {
		passwordForm,
		profileForm
	}
};
</script>