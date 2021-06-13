<template>
	<div class="flex gap-6">
		<section class="w-2/3">
			<h2
				class="forms-label mb-3"
			>
				Subscribe to services to inspect their state
			</h2>
			<form 
				class="flex w-full mb-5" 
				@submit.prevent="subscribe"
			>
				<input 
					class="forms-input-text flex-1 rounded-r-none" 
					type="text" 
					name="service" 
					v-model="serviceInput" 
					required
					placeholder="Service name (e.g. telemetry)" 
				/>
				<button type="submit" class="forms-button border-l border-purple-800 rounded-l-none">Subscribe</button>
			</form>

			<div class="w-full">
				<article 
					v-for="(state, serviceName) in states"
					:key="serviceName"
					class="dashboard-box mb-3" 
				>
					<div class="mb-2 text-purple-200 text-sm font-mono font-semibold flex items-center justify-between">
						<span>{{ serviceName }}</span>
						<button class="forms-button-text" @click="unsubscribe(serviceName)">Unsubscribe</button>
					</div>
					<!-- <state-browser 
						:state="state"
					/>	 -->
					<vue-json-pretty class="text-purple-200 leading-relaxed" :data="state" :deep="1" />
				</article>
			</div>
		</section>
		<section class="w-full sm:w-1/3 flex-shrink-0">
			<h2
				class="forms-label mb-3"
			>
				Invoke actions to debug their changes
			</h2>
			<action-form 
				:services="serviceNames"
				@invoke="invokeAction"
			/>
		</section>
	</div>
</template>
<script type="text/javascript">
import actionForm from './action-form';

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const selectDefault = '';

export default {
	data: () => ({
		serviceInput: '',
		states: {},
		actionCache: {}
	}),
	created() {
		this.serviceClients = {};
	},
	destroy() {
		for (const service of this.serviceClients) {
			service.unsubscribe();
		}

		// Make sure all client references get destroyed
		this.serviceClients = {};
	},
	methods: {
		subscribe() {
			try {
				const serviceName = this.serviceInput;

				this.serviceClients[serviceName] = this.$sync.service(
					serviceName, 
					state => {
						this.$set(this.states, serviceName, state);
					},
					error => {
						alert(error.message);
					}
				);

				this.serviceInput = '';
			} catch (e) {
				alert(e.message);
			}
		},
		async unsubscribe(serviceName) {
			if (!(serviceName in this.serviceClients)) {
				return;
			}

			await this.serviceClients[serviceName].unsubscribe();
			delete this.serviceClients[serviceName];
			this.$delete(this.states, serviceName);
		},
		async invokeAction(service, action, data) {
			try {
				console.info(service, action, data);
				const response = await this.serviceClients[service].action(action, data);
			} catch (e) {
				alert(e.message);
			}
		}
	},
	computed: {
		serviceNames() {
			return Object.keys(this.states);
		}
	},
	components: {
		VueJsonPretty,
		actionForm
	}
};
</script>
<style lang="scss">
	// Hovering over lines shouldn't have a background
	.vjs-tree__node:hover {
		@apply bg-transparent;
	}

	// JSON object Expander
	.vjs-tree__brackets:hover {
		@apply text-purple-500;
	}

	.vjs-tree__node .vjs-tree__indent.has-line {
		@apply border-purple-500;
	}

	.vjs-value__number {
		@apply text-pink-400;
	}
</style>
