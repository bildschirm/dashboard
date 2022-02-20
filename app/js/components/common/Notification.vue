<template>
	<div
		class="mission-control-notification"
		:class="item.type"
		@click="$emit('close')"
	>
		<div class="flex-1">
			<div class="flex gap-2 font-semibold text-sm text-primary-300 items-center" :class="{ 'rounded-b': !!item.text }">
				<span class="text-red-400 font-mono" :class="`notificaion-text-${item.type}`">{{ item.type.toUpperCase() }}</span>
				<span>{{ item.title }}</span>
			</div>
			<p
				class="text-base mt-2 font-semibold"
				v-if="item.text"
				v-html="item.text"
			/>
		</div>

		<div
			class="w-6 h-6 flex-shrink-0 opacity-40 flex items-center justify-center"
		>
			<svg
				v-if="item.type === 'error' || item.type === 'warn'"
				aria-hidden="true"
				focusable="false"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
					class=""
				></path>
			</svg>
			<svg
				v-else-if="item.type === 'info'"
				aria-hidden="true"
				focusable="false"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 192 512"
				class="h-5"
			>
				<path
					fill="currentColor"
					d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"
					class=""
				></path>
			</svg>
			<svg
				v-else-if="item.type === 'success'"
				aria-hidden="true"
				focusable="false"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
					class=""
				></path>
			</svg>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>
<style lang="scss">
.vue-notification-wrapper {
	overflow: initial;
}

.mission-control-notification {
	@apply flex gap-4 rounded-lg bg-opacity-95 cursor-pointer shadow-xl rounded-t px-4 py-3 bg-primary-700 text-primary-100 border border-primary-600;

	.notificaion-text-success {
		@apply text-green-500;
	}

	.notificaion-text-warn {
		@apply text-yellow-500;
	}

	.notificaion-text-error {
		@apply text-pink-500;
	}

	.notificaion-text-info {
		@apply text-primary-500;
	}
}
</style>
