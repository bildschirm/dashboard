<template>
	<main class="dashboard-page p-5 md:p-14">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<router-link class="settings-button" to="/settings/account">
				<div class="text">
					<h3 class="title">Account Settings</h3>
					<p class="description">
						Manage your profile and change your password
					</p>
				</div>
				<account-icon class="icon h-14" />
			</router-link>

			<router-link class="settings-button" to="/settings/users">
				<div class="text">
					<h3 class="title">User Management</h3>
					<p class="description">
						Create, edit and delete other Mission Control accounts
					</p>
				</div>
				<users-icon class="icon" />
			</router-link>

			<router-link class="settings-button" to="/settings/theme">
				<div class="text">
					<h3 class="title">Theme Settings</h3>
					<p class="description">
						Customize Mission Control and change the theme
					</p>
				</div>
				<users-icon class="icon" />
			</router-link>
		</div>
	</main>
</template>
<script type="text/javascript">
import UserSettings from '@components/views/users/UserSettings';

import accountIcon from '@components/icons/account-icon.vue';
import usersIcon from '@components/icons/users-icon.vue';
import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

export default {
	computed: {
		user() {
			return { ...this.$store.state.user };
		},
	},
	components: {
		UserSettings,
		accountIcon,
		usersIcon,
		topBarActions,
		topBarButton,
	},
};
</script>
<style lang="scss">
@import '../../../css/forms';

.settings-button {
	@extend .forms-button;
	@apply text-left flex items-center gap-6 px-8 py-5 md:py-8;

	.icon {
		@apply w-14 text-primary-400;
	}

	.text {
		@apply flex-1;

		.title {
			@apply text-xl mb-1;
		}

		.description {
			@apply text-primary-300;
		}
	}
}
</style>
