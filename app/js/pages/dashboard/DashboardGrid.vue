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
				<div v-if="!!layoutsBackup" class="absolute right-0 top-0 flex gap-2 justify-end items-end">
					<button 
						class="text-xs font-mono px-1 border border-primary-300 bg-primary-400 text-primary-900 rounded shadow-md"
						@click="editingComponent = { id: item.i, type: item.component }"
					>
						Edit
					</button>
					<button 
						class="text-xs font-mono px-1 bg-red-800 border border-red-700 bg-primary-800 text-red-400 rounded  shadow-md"
						@click="deleteComponent(item.i)"
					>
						Delete
					</button>
				</div>
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

		<SideContext
			v-if="editingComponent"
			@close="editingComponent = null"
		>
			<template v-slot:title> Edit Component </template>

			<ComponentPropEditor :value="componentProps[editingComponent.id]" @input="onComponentPropEdit" :prop-types="componentPropTypes[editingComponent.type]" @submit="editingComponent = null"/>
		</SideContext>

		<top-bar-actions>
			<top-bar-button v-if="!layoutsBackup" @click="startEditing"
				>Edit Dashboard</top-bar-button
			>
			<template v-else>
				<top-bar-button @click="finishEdit"
					>Save Changes</top-bar-button
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
import ComponentPropEditor from './ComponentPropEditor';

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
		editingComponent: null,
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
		async finishEdit(finish = true) {
			try {
				await this.invokeAction('update', {
					main: this.localLayouts,
				});

				if (finish)
					this.layoutsBackup = null;
			} catch (e) {
				this.$notify({
					title: 'Saving changes',
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
					title: 'Resetting layout',
					text: e.message,
					type: 'error',
				});
			}
		},
		onBreakpointChanged(breakpoint) {
			this.breakpoint = breakpoint;
		},

		async addComponent({ componentType, props }) {
			try {
				await this.invokeAction('add-component', {
					type: componentType,
					props
				});

				this.showComponentManager = false;
			} catch (e) {
				this.$notify({
					title: 'Addding component',
					text: e.message,
					type: 'error',
				});
			}
		},

		async deleteComponent(componentId) {
			try {
				await this.invokeAction('delete-component', {
					id: componentId
				});
			} catch (e) {
				this.$notify({
					title: 'Deleting component',
					text: e.message,
					type: 'error',
				});
			}
		},

		async editComponentProps(componentId, props) {
			try {
				await this.invokeAction('edit-component-props', {
					id: componentId,
					props
				});
			} catch (e) {
				this.$notify({
					title: 'Editing component',
					text: e.message,
					type: 'error',
				});
			}
		},

		onComponentPropEdit(value) {
			this.editComponentProps(this.editingComponent.id, value);
		}
	},
	computed: {
		breakpoints() {
			return { lg: 1200, md: 996, sm: 670, xs: 536, xxs: 0 };
		},
		currentLayout() {
			return this.localLayouts[this.breakpoint];
		},
		componentPropTypes() {
			return this.$store.state.componentPropTypes;
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
		ComponentPropEditor
	},
};
</script>
<style type="scss">
.vue-grid-item.cssTransforms {
	will-change: transform;
}
</style>
