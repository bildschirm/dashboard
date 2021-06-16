<template>
	<form class="shadow sm:rounded-2xl sm:overflow-hidden" @submit.prevent="save">
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
							class="forms-input-text"
							placeholder="Display Name"
							v-model="editedUser.displayName"
							:disabled="loading"
							required
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
							class="forms-input-text"
							placeholder="Username"
							v-model="editedUser.username"
							:disabled="loading"
							required
						/>
				</div>

				<div class="col-span-3 lg:col-span-2">
					<label
						for="avatarUrl"
						class="block text-sm font-medium text-purple-300 mb-2"
					>
						Avatar URL
					</label>
					<div class="flex gap-3">
						<input
							type="url"
							name="avatarUrl"
							id="avatarUrl"
							class="forms-input-text"
							v-model="editedUser.avatarUrl"
							autocomplete="photo"
							:disabled="loading"
						/>
						<div class="flex-shrink-0 w-10 h-10 bg-purple-800 rounded-full overflow-hidden">
							<img :src="editedUser.avatarUrl">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="px-4 py-3 bg-purple-800 text-right sm:px-6"
		>
			<form-button
				type="submit"
				:loading="loading"
			>
				Save
			</form-button>
		</div>
	</form>
</template>
<script type="text/javascript">
	import formButton from '@forms/button';

	export default {
		props: {
			user: {
				type: Object,
				required: true
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		data: (props) => ({
			editedUser: props.user
		}),
		watch: {
			user() {
				this.editedUser = this.user;
			}
		},
		methods: {
			save() {
				this.$emit('save', this.editedUser);
			}
		},
		components: {
			formButton
		}
	};
</script>