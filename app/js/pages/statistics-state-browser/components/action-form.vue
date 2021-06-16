<template>
	<form 
		class="flex flex-wrap w-full" 
		@submit.prevent="invokeAction"
	>
		<select 
			class="w-full mb-5 forms-select"
			placeholder="Service"
			v-model="serviceSelection"
			required
		>
			<option value="" disabled selected>Select a service</option>
			<option 
				v-for="name in services"
				:key="name"
			>
				{{ name }}
			</option>
		</select>
		<input 
			class="w-full forms-input-text mb-5" 
			type="text" 
			name="service" 
			v-model="actionInput" 
			required
			placeholder="Action (e.g. for homebridge: 'interact')" 
		/>
		<json-editor 
			class="w-full mb-6 min-h-24 font-mono rounded-lg border-2 border-transparent focus-within:border-purple-500"
			v-model="dataInput"
		/>
		<button class="w-full forms-button" type="submit">Invoke Action</button>
	</form>
</template>
<script type="text/javascript">
import CodeFlask from 'codeflask';

import jsonEditor from './json-editor';

const defaultDataInput = `{
  "some_data": null
}`;

export default {
	props: {
		services: {
			type: Array,
			default: []
		}
	},
	data: () => ({
		actionInput: '',
		dataInput: defaultDataInput,
		serviceSelection: ''
	}),

	methods: {
		invokeAction() {
			try {
				this.$emit('invoke', this.serviceSelection, this.actionInput, JSON.parse(this.dataInput));
			} catch (e) {
				alert(e.message);
			}	
		}
	},

	components: {
		jsonEditor
	}
};
</script>
