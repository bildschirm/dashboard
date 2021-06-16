<template>
	<main class="dashboard-page p-5 md:p-12">
		<loading v-if="loading" class="w-full text-purple-600" icon-class="w-16" />
		<create-user-form v-else :user="user" @create="createUser" />
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import createUserForm from './components/create-user-form';

import topBarActions from "@components/portals/top-bar-actions.vue";
import topBarButton from "@components/controls/top-bar-button.vue";

const defaultUser = {
	username: '',
	displayName: '',
	role: 'user',
	avatarUrl: '',
	password: '',
	repeatPassword: ''
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
					avatarUrl: user.avatarUrl !== ''
						? user.avatarUrl
						: null,
					repeatPassword: undefined
				});
				
				this.user = { ...defaultUser };

				this.$notify({
					type: 'success',
					title: `User ${user.username} created`
				});
			} catch (e) {
				console.error('error during create user', e.message);

				this.$notify({
					type: 'error',
					title: 'Could not create user',
					text: e.message
				});
			}

			this.loading = false;
		}
	},
	components: {
		createUserForm,
		topBarActions,
		topBarButton,
	}
};
</script>
