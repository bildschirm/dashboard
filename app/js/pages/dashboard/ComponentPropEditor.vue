<template>
	<form @submit="onSubmit">
		<template v-for="(prop, name) in propTypes">
			<Label :label="name">
				<TextInput :value="value[name]" @input="onInput(name, $event)" />
			</Label>
		</template>
		<div v-if="Object.keys(propTypes).length === 0" class="w-full text-lg text-primary-600 font-semibold text-center px-5 py-3">
			No props to edit
		</div>
	</form>
</template>
<script type="text/javascript">
import Label from '@components/form/Label';
import TextInput from '@components/form/TextInput';
import CodeInput from '@components/form/CodeInput';

export default {
	components: {
		Label,
		TextInput,
		CodeInput
	}, 
	props: {
		propTypes: {
			type: Object,
			default: () => {}
		},
		value: { // props
			type: Object,
			default: () => ({ 'service': 'lol' })
		}
	},
	methods: {
		onInput(name, value) {
			const props = {
				...this.value,
				[name]: value
			};

			this.$emit('input', props);
		},
		onSubmit(event) {
			event.preventDefault();

			this.$emit('submit', event);
		}
	},
	watch: {
		value: {
			deep: true,
			handler(newValue) {
				// this.propValues = newValue;
			}
		},
	}
};
</script>