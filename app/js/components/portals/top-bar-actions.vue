<template>
	<div>
		<portal to="top-bar-actions">
			<slot></slot>
		</portal>

		<portal to="top-bar-actions-bottom" class="">
			<slot></slot>
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