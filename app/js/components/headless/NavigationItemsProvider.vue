<script>
import { routes } from '@/router';

// v-slot:default="{active, toggle}"
export default {
	computed: {
		navigationItems() {
			return routes
				.filter((route) => !!route.meta.menu)
				.map((route) => ({
					label: route.meta.menuLabel || route.meta.title,
					icon: route.meta.icon,
					order: route.meta.menu,
					to: route.path,
					exact: route.meta.exact || false,
					iconOptions: route.meta.iconOptions || {},
				}))
				.sort((a, b) => a.order - b.order);
		},
	},
	render() {
		return this.$scopedSlots.default({ items: this.navigationItems });
	},
};
</script>

<style></style>
