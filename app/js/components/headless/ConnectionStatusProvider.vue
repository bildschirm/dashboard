<script>
// v-slot="{active, toggle}"
export default {
	computed: {
		status() {
			return this.$store.state.connectionStatus;
		},

		firstConnectConfirmed() {
			return this.$store.state.firstConnectConfirmed;
		},
	},
	render() {
		return this.$scopedSlots.default({
			firstConnectConfirmed: this.firstConnectConfirmed,
			status: this.status, // connecting, connected, disconnected
		});
	},
};
</script>

<style></style>
