<template>
	<component 
		:is="tag"
		:href="link"
		:to="routerLink"
		class="top-bar-button"
		:class="dynamicClasses"
		@click="click">
		<span>
			<slot></slot>
		</span>
	</component>
</template>
<script type="text/javascript">
	export default {
		props: ['link', 'router-link'],
		methods: {
			click(e) {
				this.$emit('click', e);
			}
		},
		computed: {
			dynamicClasses() {
				return {
					'is-link': !!this.link
				};
			},
			tag() {
				if (this.link) {
					return 'a';
				} else if (this.routerLink) {
					return 'router-link';
				} else {
					return 'button';
				}
			}
		}
	};
</script>
<style lang="scss">
	.top-bar-button {
		@apply flex flex-shrink-0 items-center justify-center text-xs font-semibold text-primary-400 hover:text-primary-300 hover:bg-primary-800 transition-colors h-full px-3 cursor-pointer h-10;

		&.is-link {

		}
	}
</style>