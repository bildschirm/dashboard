<template>
	<main class="dashboard-page p-5 md:p-12 h-full">
		<grid-layout
			v-if="dashboards.ready && currentLayout"
			:layout="currentLayout"
			:responsive-layouts="localLayouts"
			:col-num="12"
			:row-height="30"
			:is-draggable="!!uneditedLayouts /* Unedited layouts present means we are editing */"
			:is-resizable="!!uneditedLayouts"
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
				:key="item.i">
				<component 
					v-bind:is="item.component"
					:class="{'pointer-events-none': !!uneditedLayouts}">
				</component>
			</grid-item>
		</grid-layout>

		<top-bar-actions>
			<top-bar-button v-if="!uneditedLayouts" @click="startEditing">Edit Dashboard</top-bar-button>
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
		localLayouts: null,
		uneditedLayouts: null,
		breakpoint: 'lg'
	}),
	methods: {
		startEditing() {
			this.localLayouts = this.syncLayouts;
			this.uneditedLayouts = { ...this.localLayouts };
		},
		cancelEdit() {
			this.localLayouts = { ...this.uneditedLayouts };
			this.uneditedLayouts = null;
		},
		async finishEdit() {
			try {
				await this.$invokeAction('update', {
					main: this.localLayouts
				});

				this.uneditedLayouts = null;
			} catch (e) {
				alert(e.message);
			}
		},
	    async resetDefaults() {
	    	try {
				await this.$invokeAction('reset');
				
				this.uneditedLayouts = null;
			} catch (e) {
				alert(e.message);
			}
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
		// localLayouts() {
		// 	return this.editedLayouts || this.syncLayouts;
		// },
		currentLayout() {
			return this.localLayouts[this.breakpoint];
		},
		breakpoints() {
			return { lg: 1200, md: 996, sm: 670, xs: 536, xxs: 0 };
		}
	},
	watch: {
		syncLayouts() {
			// refresh?
			this.localLayouts = this.syncLayouts;
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
