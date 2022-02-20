<template>
	<main class="h-full">
		<grid-layout
			v-if="currentLayout"
			:layout="currentLayout"
			:responsive-layouts="layouts"
			:col-num="12"
			:row-height="30"
			:is-draggable="
				!!layoutsBackup /* Unedited layouts present means we are editing */
			"
			:is-resizable="!!layoutsBackup"
			:is-mirrored="false"
			:vertical-compact="true"
			:margin="[10, 10]"
			:use-css-transforms="true"
			:responsive="true"
			:breakpoints="breakpoints"
			@breakpoint-changed="onBreakpointChanged"
			:class="`dashboard-breakpoint-${breakpoint}`"
		>
			<grid-item
				v-for="item in currentLayout"
				class="p-2"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				:key="item.i"
			>
				<component
					:is="item.component"
					v-bind="componentProps[item.i] || {}"
					:class="{ 'pointer-events-none': !!layoutsBackup }"
				>
				</component>
			</grid-item>
		</grid-layout>

		<SideContext
			v-if="showComponentManager"
			@close="showComponentManager = false"
		>
			<template v-slot:title> Manage Components </template>

			<ComponentManager
				@add="addComponent"
				:active-components="currentLayout"
			/>
		</SideContext>

		<top-bar-actions>
			<top-bar-button v-if="!layoutsBackup" @click="startEditing"
				>Edit Dashboard</top-bar-button
			>
			<template v-else>
				<top-bar-button @click="finishEdit"
					>Save Changes</top-bar-button
				>
				<top-bar-button @click="cancelEdit" secondary
					>Cancel</top-bar-button
				>
				<top-bar-button @click="resetDefaults" secondary
					>Reset</top-bar-button
				>
				<top-bar-button secondary
					>Breakpoint: {{ breakpoint }}</top-bar-button
				>

				<top-bar-button
					@click="showComponentManager = !showComponentManager"
				>
					<strong class="font-bold">Add/Remove Components</strong>
				</top-bar-button>
			</template>
		</top-bar-actions>
	</main>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

import SideContext from '@components/portals/SideContext';
import topBarActions from '@components/portals/top-bar-actions';
import topBarButton from '@components/controls/top-bar-button';

import ComponentManager from './ComponentManager';

export default {
	props: {
		layouts: {
			type: Object,
			required: true,
		},
		componentProps: {
			type: Object,
			default: () => ({}),
		},
		invokeAction: {
			type: Function,
		},
	},
	data: (vm) => ({
		showComponentManager: false,
		localLayouts: vm.layouts,
		layoutsBackup: null,
		breakpoint: 'lg',
	}),
	methods: {
		startEditing() {
			this.localLayouts = this.layouts;
			this.layoutsBackup = { ...this.localLayouts };
		},
		cancelEdit() {
			this.localLayouts = { ...this.layoutsBackup };
			this.layoutsBackup = null;
		},
		async finishEdit() {
			try {
				await this.invokeAction('update', {
					main: this.localLayouts,
				});

				this.layoutsBackup = null;
			} catch (e) {
				this.$notify({
					title: 'Could not save layout',
					text: e.message,
					type: 'error',
				});
			}
		},
		async resetDefaults() {
			try {
				await this.invokeAction('reset');

				this.layoutsBackup = null;
			} catch (e) {
				this.$notify({
					title: 'Could not reset layout',
					text: e.message,
					type: 'error',
				});
			}
		},
		onBreakpointChanged(breakpoint) {
			this.breakpoint = breakpoint;
		},

		addComponent({ componentType }) {
			const componentId = `${componentId}-${Math.floor(
				Math.random() * 100000
			)}`;
			Object.keys(this.localLayouts).forEach((breakpoint) => {
				const minY = this.localLayouts[breakpoint].reduce(
					(minY, component) => {
						const localMinY = component.y + component.h;

						return minY < localMinY ? localMinY : minY;
					},
					0
				);

				this.localLayouts[breakpoint].push({
					x: 0,
					y: minY,
					w: 6,
					h: 9,
					i: componentId,
					component: componentType,
					moved: false,
				});
			});
		},
	},
	computed: {
		breakpoints() {
			return { lg: 1200, md: 996, sm: 670, xs: 536, xxs: 0 };
		},
		currentLayout() {
			return this.localLayouts[this.breakpoint];
		},
	},
	watch: {
		layouts() {
			this.localLayouts = this.layouts;

			if (this.layoutsBackup) {
				this.layoutsBackup = { ...this.layouts };
			}
		},
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem,
		topBarActions,
		topBarButton,
		SideContext,
		ComponentManager,
	},
};
</script>
<style type="scss">
.vue-grid-item.cssTransforms {
	will-change: transform;
}
</style>
