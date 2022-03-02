<template>
	<main class="dashboard-page px-10 pt-10 bg-black">
		<iframe class="w-full h-full" :src="url"></iframe>
	</main>
</template>
<script type="text/javascript">
import config from '@config';

export default {
	name: 'shell-page',
	computed: {
		url() {
			return config.bildschirmUrl + '/ssh/host';
		}
	}
};
</script>
