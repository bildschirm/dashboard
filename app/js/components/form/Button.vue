<template>
	<button
		class="forms-button relative"
		:disabled="loading"
		v-bind="{ ...$props, ...$attrs }"
		v-on="$listeners"
		:type="type"
	>
		<Spinner
			v-if="loading"
			class="absolute inset-0 text-purple-400"
			icon-class="w-5"
		/>
		<div :class="{ 'opacity-0': loading }">
			<slot />
		</div>
	</button>
</template>
<script type="text/javascript">
import Spinner from '../loading/Spinner';

export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
		},
	},
	components: {
		Spinner,
	},
};
</script>
