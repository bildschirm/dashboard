<template>
	<article class="flex flex-wrap gap-32">
		<section
			v-for="componentType in componentTypes"
			:key="componentType"
			class="w-full flex flex-col relative"
		>
			<header
				class="flex flex-col w-full mb-5 bg-primary-900 border border-primary-700 rounded-lg px-3 py-2 gap-4"
			>
				<section class="flex items-center justify-between">
					<div class="block">
						<h3 class="font-semibold">{{ componentType }}</h3>
						<h4 class="text-primary-400">Used 0 times</h4>
					</div>
					<Button class="shadow" @click="addComponent(componentType, componentProps[componentType])"
						>Add +</Button
					>
				</section>

				<ComponentPropEditor v-model="componentProps[componentType]" :prop-types="componentPropTypes[componentType]" />
<!-- 
				<CodeInput
					v-model="componentProps[componentType]"
					class="min-h-5"
				/> -->
			</header>

			<component
				:is="componentType"
				v-bind="componentProps[componentType]"
				class="user-events-none overflow-x-visible w-full"
			></component>
		</section>

		<section class="bg-primary-500 rounded-md shadow"></section>
	</article>
</template>
<script type="text/javascript">
import Button from '@components/form/Button';
import CodeInput from '@components/form/CodeInput';
import ComponentPropEditor from './ComponentPropEditor';

export default {
	data: (vm) => ({
		componentProps:
			Object.keys(window.BILDSCHIRM_COMPONENTS_DICT).reduce(
				(props, componentType) => {
					const propTypes = vm.$store.state.componentPropTypes[componentType];
					let defaultProps = {};

					if (!propTypes) {
						props[componentType] = {};
						return props;
					}

					for (const propName of Object.keys(propTypes)) {
						defaultProps[propName] = propTypes[propName].default 
							? propTypes[propName].default()
							: null;
					}

					props[componentType] = defaultProps;
					return props;
				},
				{}
			),
	}),
	computed: {
		componentTypes() {
			return Object.keys(window.BILDSCHIRM_COMPONENTS_DICT);
		},
		componentPropTypes() {
			return this.$store.state.componentPropTypes;
		},
	},
	methods: {
		addComponent(componentType, props) {
			this.$emit('add', { componentType, props });
		},
	},
	components: {
		Button,
		CodeInput,
		ComponentPropEditor
	},
};
</script>
