<template>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div
				class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
			>
				<div class="shadow overflow-hidden rounded-md sm:rounded-lg">
					<table class="min-w-full divide-y divide-purple-900">
						<thead class="bg-purple-600 text-purple-200">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
								>
									Name
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell"
								>
									Role
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-purple-800 divide-y divide-purple-700">
							<tr v-for="user in users" :key="user.id">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="flex-shrink-0 h-10 w-10">
											<img
												class="h-10 w-10 rounded-full"
												:src="user.avatarUrl"
												alt="user avatar"
											/>
										</div>
										<div class="ml-4">
											<div
												class="text-sm font-semibold text-purple-200"
											>
												{{ user.displayName }}
											</div>
											<div
												class="text-sm font-mono text-purple-300"
											>
												@{{ user.username }}
												<span class="md:hidden">
													–
													<span
														class="px-2 text-xs inline-flex leading-5 font-semibold rounded-full"
														:class="
															roleBgColorClass(
																user.role
															)
														"
													>
														{{ user.role }}
													</span>
												</span>
											</div>
										</div>
									</div>
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap align-middle hidden md:table-cell"
								>
									<span
										class="px-2 text-xs inline-flex leading-5 font-semibold rounded-full "
										:class="roleBgColorClass(user.role)"
									>
										{{ user.role }}
									</span>
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold align-middle"
								>
									<nav class="flex items-center justify-end">
										<button
											:to="
												`/settings/users/${user.username}`
											"
											@click.prevent="editUser(user)"
											class="block text-purple-400 hover:text-purple-300 mr-5"
										>
											Edit
										</button>
										<button
											class="block font-semibold text-pink-600 hover:text-pink-500"
											@click.prevent="deleteUser(user)"
										>
											Delete
										</button>
									</nav>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * List of users
		 * @default []
		 * @type {Array<User>}
		 */
		users: {
			type: Array,
			default: [],
		},
	},
	methods: {
		roleBgColorClass(role) {
			switch (role) {
				case 'user':
					return 'bg-purple-600 text-purple-200';
				case 'admin':
					return 'bg-pink-600 text-pink-200';
				default:
				case 'guest':
					return 'bg-gray-400 text-gray-600';
			}
		},
		editUser(user) {
			this.$emit('edit', user);
		},
		deleteUser(user) {
			this.$emit('delete', user.username);
		},
	},
};
</script>
