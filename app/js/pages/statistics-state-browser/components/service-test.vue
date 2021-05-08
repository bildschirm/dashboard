<template>
	<section class="">
		<h2>Service Test</h2>
		<form>
			<div>
				
			</div>
			<input type="text" name="service">


		</form>
	</section>
</template>
<script type="text/javascript">

export default {
	props: ['state'],
	computed: {
		services() {
			return ['core', 'user', 'users'];
		}
	},
	components: {
		'state-browser-node': stateBrowserNode
	}
};
</script>
