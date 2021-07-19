<template>
	<main class="dashboard-page p-5 md:p-12">
		<div class="max-w-4xl">
			<div class="lg:grid lg:grid-cols-3 lg:gap-6">
				<div class="lg:col-span-1">
					<div class="px-4 sm:px-0">
						<h3
							class="text-lg leading-6 text-purple-100 font-semibold"
						>
							User Management
						</h3>
						<p class="mt-1 text-sm text-purple-400">
							Create, update and delete users from Mission
							Control.
						</p>
					</div>
				</div>
				<div class="mt-5 lg:mt-0 lg:col-span-2">
					<section
						v-if="loading"
						class="w-full flex justify-center items-center"
					>
						<Loading
							class="text-purple-600 fill-current w-16 animate-spin mb-10"
						/>
					</section>
					<section v-else>
						<UserList
							:users="users"
							@edit="onEditUser"
							@delete="deleteUser"
						/>
					</section>
				</div>
			</div>
		</div>

		<SideContext v-if="editingUser" @close="editingUser = null">
			<template v-slot:title>
				Edit User
				<span class="text-purple-300 ml-1">
					{{ editingUser.displayName }}
				</span>
			</template>
			<UserSettings :user="editingUser" class="p-5" />
		</SideContext>

		<SideContext v-if="creatingUser" @close="creatingUser = false">
			<template v-slot:title>
				Create User
				<span class="text-purple-300 ml-1">
					{{ creatingUser.displayName || 'No name' }}
				</span>
			</template>
			<CreateUserForm class="p-5" />
		</SideContext>

		<top-bar-actions>
			<top-bar-button @click="creatingUser = true"
				>Create new User</top-bar-button
			>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import { users } from '@api';

import Spinner from '@components/loading/Spinner';

import UserList from '@components/views/users/UserList';
import UserSettings from '@components/views/users/UserSettings';
import CreateUserForm from '@components/views/users/CreateUserForm';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

import SideContext from '@components/portals/SideContext';

export default {
	data: (vm) => ({
		users: [],
		editingUser: null,
		creatingUser: false,
		loading: true,
	}),
	mounted() {
		this.fetchUsers();
	},
	methods: {
		onEditUser(user) {
			this.editingUser = { ...user };
		},
		async createUser() {},
		async fetchUsers() {
			try {
				this.loading = true;
				this.users = await users.all();
			} catch (e) {
				console.error('error during fetch users.all', e);

				this.$notify({
					type: 'error',
					title: 'Could not load users',
					message: e.message,
				});
			}

			this.loading = false;
		},

		async deleteUser(username) {
			try {
				this.loading = true;

				await users.delete(username);

				this.loading = false;
				this.fetchUsers();

				this.$notify({
					type: 'success',
					title: `User ${username} deleted`,
				});
			} catch (e) {
				console.error(e);

				this.loading = false;
				this.$notify({
					type: 'error',
					title: 'Could not delete user',
					text: e.message,
				});
			}
		},
	},
	computed: {
		serverLayout() {
			return this.$mcState('layout', []);
		},
		layout() {
			return this.editLayout || this.serverLayout;
		},
		user() {
			return this.$store.state.user;
		},
	},
	watch: {
		user() {
			this.editedUser = this.user;
		},
	},
	components: {
		Spinner,
		UserList,
		UserSettings,
		topBarActions,
		topBarButton,
		SideContext,
		CreateUserForm,
	},
};
</script>
