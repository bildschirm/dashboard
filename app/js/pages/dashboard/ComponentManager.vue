<template>
	<article class="flex flex-wrap gap-10">
		<section
			v-for="componentType in componentTypes"
			:key="componentType"
			class="w-full flex flex-wrap relative "
		>
			<header
				class="flex flex-col w-full mb-5 bg-primary-700 border border-primary-600 rounded-lg px-3 py-2"
			>
				<section class="flex items-center justify-between">
					<div class="block">
						<h3 class="font-semibold">{{ componentType }}</h3>
						<h4 class="text-primary-400">Used 0 times</h4>
					</div>
					<Button class="shadow" @click="addComponent(componentType)"
						>Add +</Button
					>
				</section>

				<CodeInput
					v-model="componentProps[componentType]"
					class="min-h-5"
				/>
			</header>

			<div>
				<component
					:is="componentType"
					v-bind="JSON.parse(componentProps[componentType]) || {}"
					class="user-events-none overflow-x-hidden "
				></component>
			</div>
		</section>

		<section class="bg-primary-500 rounded-md shadow"></section>
	</article>
</template>
<script type="text/javascript">
import Button from '@components/form/Button';
import CodeInput from '@components/form/CodeInput';

export default {
	data: (vm) => ({
		componentProps:
			Object.keys(window.MISSION_CONTROL_COMPONENTS_DICT).reduce(
				(props, componentType) => {
					props[componentType] = '{  }';
					return props;
				},
				{}
			) || {},
	}),
	computed: {
		componentTypes() {
			return Object.keys(window.MISSION_CONTROL_COMPONENTS_DICT);
		},
	},
	methods: {
		addComponent(componentType) {
			this.$emit('add', { componentType });
		},
	},
	components: {
		Button,
		CodeInput,
	},
};
</script>
