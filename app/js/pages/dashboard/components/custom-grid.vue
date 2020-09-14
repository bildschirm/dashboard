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

import basicHeader from './basic-header';
import links from './links';

var testLayout = [
	    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
	    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
	    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
	    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
	    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
	    {"x":10,"y":0,"w":2,"h":3,"i":"5"},
	    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
	    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
	    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
	    {"x":6,"y":3,"w":2,"h":4,"i":"9"},
	    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
	    {"x":10,"y":4,"w":2,"h":4,"i":"11"},
	    {"x":0,"y":10,"w":2,"h":5,"i":"12"},
	    {"x":2,"y":10,"w":2,"h":5,"i":"13"},
	    {"x":4,"y":8,"w":2,"h":4,"i":"14"},
	    {"x":6,"y":8,"w":2,"h":4,"i":"15"},
	    {"x":8,"y":10,"w":2,"h":5,"i":"16"},
	    {"x":10,"y":4,"w":2,"h":2,"i":"17"},
	    {"x":0,"y":9,"w":2,"h":3,"i":"18"},
	    {"x":2,"y":6,"w":2,"h":2,"i":"19"}
	];

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
		GridItem: VueGridLayout.GridItem,
		basicHeader,
		links
	}
};
</script>
