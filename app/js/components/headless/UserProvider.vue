<script>
// v-slot="{active, toggle}"
export default {
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	render() {
		return this.$scopedSlots.default({ user: this.user });
	},
};
</script>

<style></style>
