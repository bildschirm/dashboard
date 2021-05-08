<template>
	<main class="dashboard-page p-5 md:p-12">
		<div class="max-w-4xl">
			<div class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg leading-6 text-purple-100 font-semibold">
							User Management
						</h3>
						<p class="mt-1 text-sm text-purple-400">
							Create, update and delete users from Mission Control.
						</p>
					</div>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<profile-form v-model="editedUser" @save="save" />
				</div>
			</div>
		</div>

		<top-bar-actions>
			<top-bar-button @click.prevent="save">Save Changes</top-bar-button>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import profileForm from './components/profile-form';

import topBarActions from "@components/portals/top-bar-actions.vue";
import topBarButton from "@components/controls/top-bar-button.vue";

export default {
	data: (vm) => ({
		editedUser: vm.$store.state.user
	}),
	methods: {
		async save() {
			try {
				await users.update(this.editedUser);
			} catch (e) {
				alert(e.message);
				console.error(e);
			}

			console.log('wat');
		},
	},
	computed: {
		serverLayout() {
			return this.$mcState("layout", []);
		},
		layout() {
			return this.editLayout || this.serverLayout;
		},
		user() {
			return this.$store.state.user;
		}
	},
	watch: {
		user() {
			this.editedUser = this.user;
		}
	},
	components: {
		profileForm,
		topBarActions,
		topBarButton,
	}
};
</script>
