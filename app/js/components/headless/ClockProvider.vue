<script>
// v-slot="{active, toggle}"
export default {
	computed: {
		now() {
			return this.$store.state.now;
		},
	},
	render() {
		return this.$scopedSlots.default({ now: this.now });
	},
};
</script>

<style></style>
