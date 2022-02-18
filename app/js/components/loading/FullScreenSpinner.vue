<template>
	<Spinner class="absolute inset-0 text-primary-400" icon-class="w-5" />
</template>

<script>
import Spinner from './Spinner';

export default {
	name: 'FullScreenSpinner',
	props: {
		iconClass: {
			type: String,
			default: '',
		},
	},
	components: {
		Spinner,
	},
};
</script>
