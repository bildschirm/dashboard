<template>
	<portal to="side-context">
		<div
			class="fixed inset-0 mt-10 ml-10 md:ml-64 bg-gradient-to-r from-transparent to-purple-900  z-0 transform"
		>
			<div
				class="block absolute inset-0"
				@click.prevent="close"
				aria-hidden="true"
			>
				&nbsp;
			</div>
			<div
				class="shadow-xl max-w-xl transform  rounded-l-lg overflow-hidden fixed z-10 text-purple-200 font-medium  top-0 right-0 bg-purple-800 mt-2"
			>
				<div
					class="fixed top-0 left-0 right-0  bg-purple-600 bg-opacity-90 text-sm text-purple-100 font-semibold text-sm px-4 py-1 flex justify-between"
				>
					<span>
						{{ title }}
						<slot name="title"></slot>
					</span>
					<button
						v-if="closable"
						class="font-mono font-bold text-xs text-purple-400"
						@click.prevent="close"
					>
						>>>
					</button>
				</div>
				<div
					class="max-h-without-double-header overflow-y-scroll w-full h-full"
				>
					<div class="px-4 py-4 pt-12">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</portal>
</template>
<script>
/*
:class="{
					'translate-x-full opacity-0': closed,
					'translate-x-0 opacity-100': !closed,
				}"
*/
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		closable: {
			type: Boolean,
			default: true,
		},
	},
	data: () => ({
		closed: true,
	}),
	created() {
		requestAnimationFrame(() => {
			this.closed = false;
		});
	},
	methods: {
		close() {
			this.closed = true;

			setTimeout(() => {
				this.$emit('close');
			}, 75);
		},
	},
};
</script>
<style></style>
