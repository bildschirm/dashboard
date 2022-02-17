<template>
	<aside class="z-30">
		<notifications
			class="m-3 mt-12"
			position="top right"
			classes="mission-control-notification"
			width="400"
			:duration="-1"
		>
			<template slot="body" slot-scope="{ item, close }">
				<Notification :item="item" @close="close" />
			</template>
		</notifications>
	</aside>
</template>
<script type="text/javascript">
import Notification from '@components/common/Notification';

export default {
	props: {
		remoteNotifications: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		presentedNotifications: [],
	}),
	mounted() {
		
	},
	watch: {
		remoteNotifications(newNotifications, oldNotifications) {
			console.log('aa', newNotifications, oldNotifications);
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
							duration: 3500,
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
							clean: true,
						});
					}
				}
			}
		},
	},
	components: {
		Notification,
	},
};
</script>
<style lang="scss">
.vue-notification-wrapper {
	@apply mb-2;
}
</style>
