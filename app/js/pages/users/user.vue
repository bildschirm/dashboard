<template>
	<main class="dashboard-page p-5 md:p-12">
		<loading v-if="!user" class="w-full text-purple-600" icon-class="w-16" />
		<user-settings v-else  :user="user" />
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import userSettings from '@pages/settings/components/user-settings';

import topBarActions from "@components/portals/top-bar-actions.vue";
import topBarButton from "@components/controls/top-bar-button.vue";

export default {
	data: (vm) => ({
		user: null,
		loading: true
	}),
	mounted() {
		this.fetchUsers();
	},
	computed: {
		username() {
			return this.$route.params.username || 'me';
		}
	},
	methods: {
		async fetchUsers() {
			try {
				this.loading = true;
				this.user = await users.find(this.username);
			} catch (e) {
				console.error('error during fetch user', e);

				this.$notify({
					type: 'error',
					title: 'Could not load user information',
					text: e.message
				});
			}

			this.loading = false;
		}
	},
	components: {
		userSettings,
		topBarActions,
		topBarButton,
	}
};
</script>
