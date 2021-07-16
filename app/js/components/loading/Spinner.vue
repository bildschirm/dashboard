<template>
	<section class="flex justify-center items-center relative">
		<spinner-icon class="fill-current animate-spin" :class="iconClass" />
	</section>
</template>

<script>
import spinnerIcon from '../icons/spinner-icon';

export default {
	name: 'Spinner',
	props: {
		iconClass: {
			type: String,
			default: '',
		},
	},
	components: {
		spinnerIcon,
	},
};
</script>
