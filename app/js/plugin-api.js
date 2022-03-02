import V from '@vue';
import { invokeAction } from '@socket';
const Vue = V.Vue;

import { store } from './store';
import { router } from './router';

import chunkArray from 'lodash.chunk';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';
import topBarButtonSeperator from '@components/controls/top-bar-button-seperator.vue';

// Common
import Panel from '@components/common/Panel';
import PanelLabel from '@components/common/PanelLabel';
import InfoBlock from '@components/common/InfoBlock';

// Views
import DeviceSettings from '@components/views/homekit/DeviceSettings';

// Forms components
import Button from '@components/form/Button';
import Label from '@components/form/Label';
import TextInput from '@components/form/TextInput';
import CodeInput from '@components/form/CodeInput';
import SmartToggle from '@components/form/SmartToggle';
import ColorInput from '@components/form/ColorInput';

// Headless components
import ConnectionStatusProvider from '@components/headless/ConnectionStatusProvider';
import NavigationItemsProvider from '@components/headless/NavigationItemsProvider';
import PageProvider from '@components/headless/PageProvider';
import ServiceProvider from '@components/headless/ServiceProvider';
import UserProvider from '@components/headless/UserProvider';
import ClockProvider from '@components/headless/ClockProvider';

// Portals, -mx-5 -my-3
import SideContext from '@components/portals/SideContext';

import leftPad from '@helpers/left-pad';
import composeServiceComponent from '@helpers/compose-service-component';
import formatDistance from 'date-fns/formatDistance';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import debounce from '@helpers/debounce';
import debounceLeading from '@helpers/debounce-leading';

window.BILDSCHIRM = Object.freeze({
	Vue,
	build: process.env.NODE_ENV,
	utils: {
		leftPad,
		chunkArray,
		formatDistance,
		formatDistanceStrict,
		debounce,
		debounceLeading,
	},
	components: {
		common: {
			Panel,
			PanelLabel,
			InfoBlock,
		},
		form: {
			Button,
			Label,
			TextInput,
			CodeInput,
			SmartToggle,
			ColorInput,
		},
		headless: {
			ConnectionStatusProvider,
			NavigationItemsProvider,
			PageProvider,
			ServiceProvider,
			UserProvider,
			ClockProvider,
		},
		portals: {
			SideContext,
		},
		views: {
			users: {
				DeviceSettings,
			},
		},
		topBar: {
			portal: topBarActions,
			button: topBarButton,
			seperator: topBarButtonSeperator,
		},
		topBarActions,
		topBarButton,
		topBarButtonSeperator,
	},
	dashboard: {
		isDevBuild() {
			return process.env.NODE_ENV !== 'production';
		},
		setReady(ready) {
			store.commit('setAppReady', ready);
		},
		initComponents() {
			window.BILDSCHIRM_PAGES.map((page) => ({
				path: page.url,
				component: Vue.component(page.componentName),
				meta: {
					title: page.title,
					icon: page.icon,
					menu: page.menu,
					exact: page.menuExact,
				},
			})).forEach(() => console.log(router));
		},
		component(name, vueComponent) {
			let props = {};

			if (vueComponent.props) {
				for (const prop of Object.keys(vueComponent.props)) {
					let data = {
						name: prop,
						default: vueComponent.props[prop].default
					};
					switch (vueComponent.props[prop].type) {
						case String:
							data.type = 'string';
							break;

						case Number:
							data.type = 'number';
							break;

						case Array:
							data.type = 'array';
							break;

						case Object:
							data.type = 'object';
							break;

						default:
							continue;
					}

					props[prop] = data;
				}
			}

			store.commit('setComponentPropType', { props, componentType: name })

			Vue.component(name, vueComponent);
		},
		consumeService(serviceName, component) {
			return composeServiceComponent(serviceName, component);
		},
		invokeAction,
	},
});
