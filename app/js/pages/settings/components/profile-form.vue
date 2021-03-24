<template>
	<div class="shadow sm:rounded-2xl sm:overflow-hidden">
		<div class="px-4 py-5 bg-purple-900 space-y-8 sm:p-6">
			<div class="grid grid-cols-3 gap-6">
				<div class="col-span-3 lg:col-span-2">
					<label
						for="name"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Display Name
					</label>
					<input
							type="text"
							name="name"
							id="name"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Display Name"
							v-model="editedUser.displayName"
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="username"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Username
					</label>
					<input
							type="text"
							name="username"
							id="username"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Username"
							v-model="editedUser.username"
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="password"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Password
					</label>
					<input
							type="password"
							name="password"
							id="password"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							placeholder="Leave empty to keep current password"
							v-model="editedUser.password"
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="avatarUrl"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Avatar URL
					</label>
					<input
							type="url"
							name="avatarUrl"
							id="avatarUrl"
							class="text-sm outline-none bg-purple-800 w-full rounded-lg border-2 border-transparent hover:shadow-lg focus:shadow-lg focus:border-purple-500 px-4 py-2 text-purple-200 placeholder-purple-400 font-semibold"
							v-model="editedUser.avatarUrl"
						/>
				</div>
			</div>

			<!-- <div>
				<label
					class="block text-sm font-medium text-purple-300"
				>
					Photo
				</label>
				<div class="mt-1 flex items-center">
					<span
						class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
					>
						<svg
							class="h-full w-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					</span>
					<button
						type="button"
						class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-purple-300 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Change
					</button>
				</div>
			</div>

			<div>
				<label
					class="block text-sm font-medium text-purple-300"
				>
					Cover photo
				</label>
				<div
					class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
				>
					<div class="space-y-1 text-center">
						<svg
							class="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<div
							class="flex text-sm text-gray-600"
						>
							<label
								for="file-upload"
								class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
							>
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									class="sr-only"
								/>
							</label>
							<p class="pl-1">
								or drag and drop
							</p>
						</div>
						<p class="text-xs text-gray-500">
							PNG, JPG, GIF up to 10MB
						</p>
					</div>
				</div>
			</div>  -->
		</div>

		<div
			class="px-4 py-3 bg-purple-800 text-right sm:px-6"
		>
			<button
				type="submit"
				class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Save
			</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['value'],
		data: (props) => ({
			editedUser: props.value
		}),
		watch: {
			user() {
				this.editedUser = this.user;
			},
			editedUser() {
				this.$emit('input', this.editedUser);
			}
		}
	};
</script>