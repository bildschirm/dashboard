<template>
	<div>
		<portal to="tab-bar-actions">
			<slot v-if="active"></slot>
		</portal>

		<portal to="tab-bar-actions-bottom" class="">
			<slot v-if="active"></slot>
		</portal>
	</div>
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