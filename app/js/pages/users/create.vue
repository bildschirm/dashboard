<template>
	<main class="dashboard-page p-5 md:p-12">
		<loading
			v-if="loading"
			class="w-full text-primary-600"
			icon-class="w-16"
		/>
		<CreateUserForm :user="user" />
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import CreateUserForm from '@components/views/users/CreateUserForm';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

const defaultUser = {
	username: '',
	displayName: '',
	role: 'user',
	avatarUrl: '',
	password: '',
	repeatPassword: '',
};

export default {
	data: (vm) => ({
		loading: false,
		user: { ...defaultUser },
	}),
	methods: {
		async createUser(user) {
			try {
				this.loading = true;
				await users.create({
					...user,
					avatarUrl: user.avatarUrl !== '' ? user.avatarUrl : null,
					repeatPassword: undefined,
				});

				this.user = { ...defaultUser };

				this.$notify({
					type: 'success',
					title: `User ${user.username} created`,
				});
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
	components: {
		CreateUserForm,
		topBarActions,
		topBarButton,
	},
};
</script>
