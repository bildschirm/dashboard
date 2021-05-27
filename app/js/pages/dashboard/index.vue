<template>
	<main class="dashboard-page p-5 md:p-12 h-full">
		<grid-layout
			:layout.sync="layout"
			:col-num="12"
			:row-height="30"
			:is-draggable="editLayout !== null"
			:is-resizable="editLayout !== null"
			:is-mirrored="false"
			:vertical-compact="true"
			:margin="[10, 10]"
			:use-css-transforms="true"

		>
			<grid-item 
				v-for="item in layout"
				class="p-2"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				:key="item.i">
				<component 
					v-bind:is="item.component"
					:class="{'pointer-events-none': editLayout !== null}">
				</component>
			</grid-item>
		</grid-layout>

		<top-bar-actions>
			<top-bar-button v-if="editLayout === null" @click="startEditing">Edit Dashboard</top-bar-button>
			<template v-else>
        		<top-bar-button @click="finishEdit">Save Changes</top-bar-button>
				<top-bar-button @click="cancelEdit" secondary>Cancel</top-bar-button>
				<top-bar-button @click="resetDefaults" secondary>Reset</top-bar-button>
			</template>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import VueGridLayout from 'vue-grid-layout';
import { invokeAction } from '@socket';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

import composeServiceComponent from '@helpers/compose-service-component';

export default composeServiceComponent('telemetry', composeServiceComponent('dashboards', {
	data: () => ({
		editLayout: null
	}),
	methods: {
		startEditing() {
			this.editLayout = this.serverLayout;
		},
		cancelEdit() {
			this.editLayout = null;
		},
		finishEdit() {
			this.$invokeAction('update', {
				layout: this.editLayout
			});
			this.editLayout = null;
		},
	    resetDefaults() {
			this.$invokeAction('reset');
			this.cancelEdit();
	    }
	},
	computed: {
		serverLayout() {
			return this.dashboards.ready
				? this.dashboards.state.layout
				: [];
		},
		layout() {
			return this.editLayout || this.serverLayout;
		}
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem,
		topBarActions,
		topBarButton
	}
}));
</script>
