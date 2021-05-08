<template>
	<main class="dashboard-page p-5 md:p-12">
		<div class="max-w-4xl">
			<div class="lg:grid lg:grid-cols-3 lg:gap-6">
				<div class="lg:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg leading-6 text-purple-100 font-semibold">
							User Management
						</h3>
						<p class="mt-1 text-sm text-purple-400">
							Create, update and delete users from Mission Control.
						</p>
					</div>
				</div>
				<div class="mt-5 lg:mt-0 lg:col-span-2">
					<section v-if="error" class="font-semibold text-purple-400 text-center">
						{{ error }}
					</section>
					<section v-if="loading" class="w-full flex justify-center items-center">
						<spinner-icon 
							class="text-purple-600 fill-current w-16 animate-spin mb-10"
						/>
					</section>
					<section v-else>
						<user-list :users="users" />
					</section>
				</div>
			</div>
		</div>

		<top-bar-actions>
			<top-bar-button router-link="/users/create">Create new User</top-bar-button>
			<top-bar-button router-link="/users/create">Create new User</top-bar-button>
			<top-bar-button router-link="/users/create">Create new User</top-bar-button>
			<top-bar-button router-link="/users/create">Create new User</top-bar-button>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import userList from './components/user-list';

import spinnerIcon from '@components/icons/spinner-icon';
import topBarActions from "@components/portals/top-bar-actions.vue";
import topBarButton from "@components/controls/top-bar-button.vue";

export default {
	data: (vm) => ({
		users: [],
		loading: true,
		error: null
	}),
	mounted() {
		this.fetchUsers();
	},
	methods: {
		async fetchUsers() {
			try {
				this.error = null;
				this.loading = true;
				this.users = await users.all();
			} catch (e) {
				console.error('error during fetch users.all', e);

				this.error = e.message;
			}

			this.loading = false;
		},
		async save() {
			try {
				this.error = null;
				this.loading = true;
				await users.update(this.editedUser);
				this.loading = false;

				this.fetchUsers();
			} catch (e) {
				console.error(e);

				this.loading = false;
				this.error = e.message;
			}
		},

		async deleteUser(user) {
			try {
				this.error = null;
				this.loading = true;
				await users.delete(user);
				this.loading = false;
				
				this.fetchUsers();
			} catch (e) {
				console.error(e);

				this.loading = false;
				this.error = e.message;
			}
		}
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
		spinnerIcon,
		userList,
		topBarActions,
		topBarButton,
	}
};
</script>
