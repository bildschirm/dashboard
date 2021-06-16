<template>
	<aside>
		<notifications 
			class="m-3 mt-12" 
			position="top right"
			classes="mission-control-notification"
			width="400"
		>
			<template slot="body" slot-scope="{ item, close }">
				<div class="vue-notification-template mission-control-notification" :class="item.type" @click="close">
					<div class="flex-1">
						<div class="notification-title">{{ item.title }}</div>
						<p 
							class="notification-content" 
							v-if="item.text"
							v-html="item.text"
						/>
					</div>
					<div class="w-6 h-6 flex-shrink-0 opacity-40 flex items-center justify-center">
						<svg
							v-if="item.type === 'error' || item.type === 'warn'"
							aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" class=""></path>
						</svg>
						<svg 
							v-else-if="item.type === 'info'"
							aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="h-5">
							<path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z" class=""></path>
						</svg>
						<svg 
							v-else-if="item.type === 'success'"
							aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
							<path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" class=""></path>
						</svg>
					</div>
				</div>
			</template>
		</notifications>
	</aside>
</template>
<script type="text/javascript">
import composeServiceComponent from '@helpers/compose-service-component';

export default composeServiceComponent('notifications', {
	data: () => ({
		presentedNotifications: []
	}),
	computed: {
		notificationsState() {
			// State returns null if the service isn't ready.
			// We use this fact that if the old state is just 'null'
			// we don't display the notifications that already exist
			// on intitial state.
			return this.$state
				? this.$state[this.$user.username] || {}
				: null;
		}
	},
	watch: {
		notificationsState(newNotifications, oldNotifications) {
			// If new or old notifications are null, don't show any notifications,
			// we come from "unready" state
			if (newNotifications && oldNotifications) {
				for (const notification of Object.values(newNotifications)) {
					// If we don't know about the notification yet,
					// we display it
					if (!oldNotifications[notification.id]) {
						this.$notify({
							// group: notification.id,
							title: notification.title,
							text: notification.body,
							type: notification.type,
							duration: 3500
						});
					}
				}

				for (const notification of Object.values(oldNotifications)) {
					// If old notification doesn't exist in the new ones
					// it was removed. So we clear out the presentedNotifications array thing
					if (!newNotifications[notification.id]) {
						// Remove it from UI
						this.$notify({
							group: notification.id,
							clean: true
						});
					}
				}
			}
		}
	}
});
</script>
<style lang="scss">
	.vue-notification-wrapper {
		@apply mb-2;
	}

	.mission-control-notification {
		@apply flex gap-4 rounded-lg px-5 py-3 bg-purple-500 text-purple-100 bg-opacity-95 cursor-pointer shadow-lg;

		.notification-title {
			@apply font-semibold;
		}

		.notification-content {
			@apply text-sm mt-2;	
		}

		&.success {
			@apply bg-green-400 text-green-900 bg-opacity-95 shadow-lg;
		}

		&.warn {
			@apply bg-yellow-400 text-yellow-900 bg-opacity-95 shadow-lg;
		}

		&.error {
			@apply bg-pink-400 text-pink-900 bg-opacity-95 shadow-lg;
		}

		&.info {
			@apply bg-purple-600 text-purple-200 bg-opacity-95 shadow-lg;
		}
	}
</style>