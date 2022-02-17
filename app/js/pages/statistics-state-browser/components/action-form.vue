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
		<label class="forms-label" for="service">
			Action
		</label>
		<input 
			class="w-full forms-input-text mb-5" 
			type="text" 
			name="service" 
			id="service"
			v-model="actionInput" 
			required
			placeholder="Action (e.g. for homebridge: 'interact')" 
		/>
		<label class="forms-label" for="data-editor">
			Payload (JSON)
		</label>
		<json-editor 
			class="w-full mb-8 min-h-24 h-40 font-mono rounded-lg bg-purple-700 border-2 border-purple-700 hover:border-purple-500 overflow-hidden focus-within:border-purple-500 px-2 py-1"
			name="data-editor"
			v-model="dataInput"
		/>
		<button class="w-full forms-button" type="submit">Invoke Action</button>
	</form>
</template>
<script type="text/javascript">
import CodeFlask from 'codeflask';

import jsonEditor from './json-editor';

const defaultDataInput = `{
  
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
