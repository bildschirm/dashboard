<script>
// v-slot="{active, toggle}"
export default {
	computed: {
		meta() {
			return (
				this.$route.meta || {
					title: 'Bildschirm',
					subtitle: '',
				}
			);
		},
	},
	render() {
		return this.$scopedSlots.default({ meta: this.meta });
	},
};
</script>

<style></style>
