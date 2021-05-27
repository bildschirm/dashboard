import camelCase from 'lodash/camelCase';
import Vue from 'vue';

export default function composeServiceComponent(serviceName, component) {
	const serviceNameCamelCase = camelCase(serviceName);

	const syncServiceKey = `$mc_service_${serviceNameCamelCase}`;
	const serviceStateKey = `${serviceNameCamelCase}`;

	const mixin = {
		data: () => ({
			[serviceStateKey]: {
				ready: false,
				state: null
			}
		}),
		created() {
			const service = this.$sync.service(serviceName, state => {
				this.$set(this, serviceStateKey, {
					ready: true,
					state
				});
			});
			
			Object.defineProperty(this, syncServiceKey, { value: service, writable: false });
		},
		destroyed() {
			this[syncServiceKey].unsubscribe();
		},
		methods: {
			async $invokeAction(name, data = {}) {
				return await this[syncServiceKey].action(name, data);
			},

			$stateWithDefault(defaultState = {}) {
				return this[serviceStateKey].ready
					? this[serviceStateKey].state
					: defaultState;
			}
		},
	};

	return {
		...component,
		mixins: [
			...(component.mixins || []),
			mixin
		]
	};
}