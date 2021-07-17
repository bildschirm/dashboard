<template>
	<Provider>
		<slot v-if="ready" v-bind="slotProps"></slot>
	</Provider>
</template>
<script>
import camelCase from 'lodash/camelCase';

import Provider from './Provider';

// v-slot="{active, toggle}"
export default {
	components: {
		Provider,
	},
	props: {
		service: {
			type: String,
			required: true,
		},
	},
	data: (vm) => ({
		ready: false,
		state: null,
	}),
	created() {
		this.$client = this.$sync.service(this.service, (state) => {
			this.ready = true;
			this.state = state;
		});
	},
	destroyed() {
		this.$client.unsubscribe();
	},
	methods: {
		/**
		 * @async
		 */
		$invokeAction(name, data = {}) {
			return this.$client.action(name, data);
		},

		$stateWithDefault(defaultState = {}) {
			return this.$client.ready ? this.$state : defaultState;
		},
	},
	computed: {
		slotProps() {
			return {
				...this.state,
				invokeAction: this.$invokeAction.bind(this),
			};
		},
	},
};
</script>

<style></style>
