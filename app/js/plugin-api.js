import V from '@vue';
import { invokeAction } from '@socket';
const Vue = V.Vue;

import { store } from './store';
import { router } from './router';

import chunkArray from 'lodash.chunk';

import leftPad from '@helpers/left-pad';
import composeServiceComponent from '@helpers/compose-service-component';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';
import topBarButtonSeperator from '@components/controls/top-bar-button-seperator.vue';

// Common
import Panel from '@components/common/Panel';
import PanelLabel from '@components/common/PanelLabel';
import InfoBlock from '@components/common/InfoBlock';

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

// Portals
import SideContext from '@components/portals/SideContext';

import formatDistance from 'date-fns/formatDistance';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

window.MISSION_CONTROL = Object.freeze({
	build: process.env.NODE_ENV,
	utils: {
		leftPad,
		chunkArray,
		formatDistance,
		formatDistanceStrict,
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
			window.MISSION_CONTROL_PAGES.map((page) => ({
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
			Vue.component(name, vueComponent);
		},
		consumeService(serviceName, component) {
			return composeServiceComponent(serviceName, component);
		},
		invokeAction,
	},
});
