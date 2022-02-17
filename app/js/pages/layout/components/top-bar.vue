<template>
	<header class="w-full flex flex-col">
		<section
			class="flex items-center justify-between w-full h-10"
			data-tauri-drag-region
		>
			<div class="flex items-center h-full px-3">
				<button
					class="w-5 mr-5 text-purple-500 flex-shrink-0"
					@click="toggleSidebar"
				>
					<bars-icon></bars-icon>
				</button>

				<PageProvider v-slot="{ meta }">
					<h1
						class="text-purple-100 font-semibold text-sm cursor-default mr-5 transition flex-shrink-0"
					>
						{{ meta.title }}
						<span
							class="text-purple-300 transition-all inline-block transform"
							:class="{
								'-translate-x-8 opacity-0 w-0 ml-0': !meta.subtitle,
								'ml-2': !!meta.subtitle,
							}"
						>
							{{ makeSubtitle(meta.subtitle) }}
						</span>
					</h1>
				</PageProvider>

				<div class="overflow-x-scroll hidden md:block">
					<portal-target
						name="top-bar-actions"
						class="flex items-center h-full max-w-none"
					/>
				</div>
			</div>
			<div class="flex text-purple-300 flex-shrink-0">
				<ConnectionStatusProvider v-slot="{ status }">
					<ConnectionIndicator :status="status" />
				</ConnectionStatusProvider>
			</div>
		</section>
		<section
			class="w-full overflow-x-scroll sm:pl-10 md:hidden"
			v-if="showSubmenu"
		>
			<portal-target
				name="top-bar-actions-bottom"
				class="flex flex-grow items-center max-w-none"
			></portal-target>
		</section>
	</header>
</template>
<style lang="scss" scoped>
.top-bar-button-group {
	@apply flex items-center justify-center text-xs font-semibold text-purple-400 hover:text-purple-300 hover:bg-purple-800 transition-colors h-full px-3 cursor-pointer;

	&.is-link {
	}
}
</style>
<script type="text/javascript">
import ConnectionIndicator from './ConnectionIndicator';
import barsIcon from '@components/icons/bars-icon';

import PageProvider from '@components/headless/PageProvider';
import ConnectionStatusProvider from '@components/headless/ConnectionStatusProvider';

export default {
	components: {
		ConnectionIndicator,
		barsIcon,
		PageProvider,
		ConnectionStatusProvider,
	},
	props: {
		showSubmenu: {
			type: Boolean,
			default: () => true
		}
	},
	methods: {
		toggleSidebar() {
			this.$emit('toggle-sidebar');
		},

		makeSubtitle(subtitle) {
			if (typeof subtitle === 'function') {
				return subtitle.call(this) || '';
			} else {
				return subtitle;
			}
		},
	},
};
</script>
