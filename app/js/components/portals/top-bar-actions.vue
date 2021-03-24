<template>
	<portal to="top-bar-actions">
		<slot v-if="active"></slot>
	</portal>
</template>
<script type="text/javascript">
	export default {
		data: () => ({
			active: true
		}),
		activated() {
			this.active = true;
		},
		deactivated() {
			this.active = false;
		}
	}
</script>