// Headless components
import ConnectionStatusProvider from '@components/headless/ConnectionStatusProvider';
import NavigationItemsProvider from '@components/headless/NavigationItemsProvider';
import PageProvider from '@components/headless/PageProvider';
import ServiceProvider from '@components/headless/ServiceProvider';
import UserProvider from '@components/headless/UserProvider';
import ClockProvider from '@components/headless/ClockProvider';

// Common components
import Panel from '@components/common/Panel';
import PanelLabel from '@components/common/PanelLabel';
import InfoBlock from '@components/common/InfoBlock';

// Form components
import Label from '@components/form/Label';
import TextInput from '@components/form/TextInput';
import CodeInput from '@components/form/CodeInput';
import ColorInput from '@components/form/ColorInput';
import Button from '@components/form/Button';
import SmartToggle from '@components/form/SmartToggle';
import TopBarButton from '@components/controls/top-bar-button.vue';
import TopBarButtonSeperator from '@components/controls/top-bar-button-seperator.vue';

// Portal components
import SideContext from '@components/portals/SideContext';
import TopBarActions from '@components/portals/top-bar-actions.vue';

// Pre-made view components
// Views: HomeKit
import DeviceSettings from '@components/views/homekit/DeviceSettings';

// Views: User management
import UserList from '@components/views/users/UserList';
import CreateUserForm from '@components/views/users/CreateUserForm';
import UserSettings from '@components/views/users/UserSettings';
import UserProfileForm from '@components/views/users/UserProfileForm';
import ChangePasswordForm from '@components/views/users/ChangePasswordForm';

/**
 * Headless components don't render any UI on their own, but they provide the functionality
 * for you to build your own UI using them.
 *
 * For example, at the core of Bildschirm's UI is the `ServiceProvider`, 
 * which takes a service's name and handles sync, actions, state updates etc.
 *
 * @type {CoreAPI.Components.Headless}
 * @example
 * 	<ServiceProvider service="telemetry" v-slot="{ ready, uptime, invokeAction }">
 * 		<InfoBlock label="Uptime">
 * 			<Spinner v-if="!ready" />
 * 			<template v-else>
 * 				{{ uptime }}
 * 			</template>
 * 		</InfoBlock> 
 * 	</ServiceProvider>
 */
export const headless = {
	ConnectionStatusProvider,
	NavigationItemsProvider,
	PageProvider,
	ServiceProvider,
	UserProvider,
	ClockProvider,
};

/**
 * Common components include the basic building blocks for the UI, like panels or basic info blocks.
 * 
 * @type {CoreAPI.Components.Common}
 */
export const common = {
	Panel,
	PanelLabel,
	InfoBlock
};

/**
 * Form components include buttons and all sorts of inputs (text, code, color etc.)
 * 
 * @type {CoreAPI.Components.Form}
 */
export const form = {
	Label,

	TextInput,
	CodeInput,
	ColorInput,

	Button,
	SmartToggle,
	TopBarButton,
	TopBarButtonSeperator
};

/**
 * Portals are magic components that render it's slot contents somewhere else on the page.
 *
 * This lets you add buttons to the top menu bar and create context "windows" directly from your
 * Vue component lifecycle, so your component's state or methods can be used in these as well.
 *
 * This also has the advantage, that if your component is unmounted / destroyed (removed from render tree)
 * the rendered portal contents will also disappear, without having to manage anything in a Vuex store.
 * 
 * @type {CoreAPI.Components.Portals}
 */
export const portals = {
	SideContext,
	TopBarActions
};

/**
 * Views are pre-created and self-contained components for basic features,
 * you won't have to recreate functionality for every boring page (settings, user management etc.) yourself.
 *
 * They don't use custom css (or if they do, it is straight CSS inside the component, no tailwind)
 * and are made up from all the other core components.
 * That means, that if you simply style the core components, these views will adapt to your new look.
 *
 * TODO: These views will probably get quite large. We should find a way that these can be dynamically loaded in for plugins.
 * 		 They should still be available statically in custom frontends, however they shouldn't be available to plugins by default,
 * 		 and maybe fetched at runtime or during bundling?.
 * 
 * @type {CoreAPI.Components.Views}
 */
export const views = {
	homekit: {
		DeviceSettings
	},
	users: {
		UserList,
		CreateUserForm,
		UserSettings,

		UserProfileForm, // Profile meta (name, avatar etc)
		ChangePasswordForm,
	}
};