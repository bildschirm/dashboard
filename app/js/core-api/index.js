import * as helpers from './helpers';
import * as components from './components';

const globalPublicAPI = {
	/**
	 * Common helpers always available to mission-control plugins.
	 *
	 * In order to minimize the code that plugins will need to include/bundle,
	 * we provide a bunch of helpers up front that are just bundled once.
	 *
	 * @type {CoreAPI.Helpers}
	 * @see {CoreAPI.Helpers}
	 * @example
	 * 	const { helpers } = MISSION_CONTROL;
	 * 	const text = helpers.formatDistance(dateAWeekAgo, new Date());
	 * 	// text => 'a week'
	 */
	helpers,

	/**
	 * Utils are deprecated, use `api.helpers` instead
	 *
	 * @see {CoreAPI.Helpers}
	 * @type {CoreAPI.Helpers}
	 * @deprecated
	 */
	utils: helpers, // TODO: remove this

	/**
	 * Components that plugins can use to create their UI's that adapt to the current frontend.
	 * Mission Control theme developers should customize these components, so that plugin UIs
	 * will look cool in your theme as well.
	 *
	 * @type {CoreAPI.Components}
	 * @example
	 * 	const { components: { form: { Label, TextInput, Button } } } = MISSION_CONTROL;
	 * 	
	 * 	const MyComponent = {
	 * 		template: `
	 * 			<form>
	 * 				<Label label="Name">
	 * 					<TextInput ... />
	 * 			  	</Label>
	 * 			   	<Button type="submit">Submit</Button>
	 * 			</form>
	 * 		`,
	 * 		components: {
	 * 			Label,
	 * 			TextInput,
	 * 			Button
	 * 		}
	 * 	};
	 */
	components
};

// We set the window.MISSION_CONTROL global in order for plugins to be able to access the API.
// Since plugins are added to the Vue frontend at runtime, 
// they don't have access to import or require to include things from this bundle.

if (window.MISSION_CONTROL) {
	console.error('Mission Control Core API has already been initialized. window.MISSION_CONTROL already exists.');
} else {
	window.MISSION_CONTROL = Object.freeze(globalPublicAPI);
}

export default globalPublicAPI;