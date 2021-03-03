<template>
	<section class="">
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
			<grid-item v-for="item in layout"
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
		<div class="absolute pin-t pin-r bg-main-dark px-2 py-1 rounded text-xs m-5">
			<button class="text-main-light" v-if="editLayout === null" @click="startEditing">Edit Dashboard</button>
			<template v-else>
        <button @click="resetDefaults" class="text-main-light">Reset</button>
				<span class="text-main">|</span>
				<button @click="cancelEdit" class="text-main-light">Cancel</button>
				<span class="text-main">|</span>
				<button @click="finishEdit" class="text-main-light font-medium">Save Changes</button>
			</template>
		</div>
	</section>
</template>
<script type="text/javascript">
import VueGridLayout from 'vue-grid-layout';
import { callAction } from '@socket';

export default {
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
			callAction('LAYOUT:UPDATE', {
				layout: this.editLayout
			});
			this.editLayout = null;
		},
    resetDefaults() {
		  callAction('LAYOUT:RESET', {});
			this.cancelEdit();
    }
	},
	computed: {
		serverLayout() {
			return this.$mcState('layout', []);
		},
		layout() {
			return this.editLayout || this.serverLayout;
		}
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem
	}
};
</script>
