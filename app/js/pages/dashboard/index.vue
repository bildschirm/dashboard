<template>
	<main class="dashboard-page p-5 md:p-12 h-full">
		<grid-layout
			v-if="dashboards.ready && currentLayout"
			:layout.sync="currentLayout"
			:responsive-layouts="responsiveLayouts"
			:col-num="12"
			:row-height="30"
			:is-draggable="editedLayouts !== null"
			:is-resizable="editedLayouts !== null"
			:is-mirrored="false"
			:vertical-compact="true"
			:margin="[10, 10]"
			:use-css-transforms="true"
			:responsive="true"
			:breakpoints="breakpoints"
			@breakpoint-changed="onBreakpointChanged"
		>
			<grid-item 
				v-for="item in currentLayout"
				class="p-2"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				:key="item.i">
				<component 
					v-bind:is="item.component"
					:class="{'pointer-events-none': editedLayouts !== null}">
				</component>
			</grid-item>
		</grid-layout>

		<top-bar-actions>
			<top-bar-button v-if="editedLayouts === null" @click="startEditing">Edit Dashboard</top-bar-button>
			<template v-else>
        		<top-bar-button @click="finishEdit">Save Changes</top-bar-button>
				<top-bar-button @click="cancelEdit" secondary>Cancel</top-bar-button>
				<top-bar-button @click="resetDefaults" secondary>Reset</top-bar-button>
				<top-bar-button secondary>Breakpoint: {{ breakpoint }}</top-bar-button>
			</template>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import VueGridLayout from 'vue-grid-layout';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

import composeServiceComponent from '@helpers/compose-service-component';

export default composeServiceComponent('dashboards', {
	data: () => ({
		editedLayouts: null,
		breakpoint: 'lg'
	}),
	methods: {
		startEditing() {
			this.editedLayouts = this.syncLayouts;
		},
		cancelEdit() {
			this.editedLayouts = null;
		},
		finishEdit() {
			this.$invokeAction('update', {
				main: this.editedLayouts
			});
			this.editedLayouts = null;
		},
	    resetDefaults() {
			this.$invokeAction('reset');
			this.cancelEdit();
	    },
	    onBreakpointChanged(breakpoint) {
	    	this.breakpoint = breakpoint;
	    }
	},
	computed: {
		syncLayouts() {
			return this.dashboards.ready
				? this.dashboards.state.main
				: null ;
		},
		responsiveLayouts() {
			return this.editedLayouts || this.syncLayouts;
		},
		currentLayout() {
			return this.responsiveLayouts
				? this.responsiveLayouts[this.breakpoint]
				: null;
		},
		breakpoints() {
			return { lg: 1200, md: 996, sm: 670, xs: 536, xxs: 0 };
		}
	},
	watch: {
		responsiveLayouts() {
			// refresh?
		}
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem,
		topBarActions,
		topBarButton
	}
});
</script>
