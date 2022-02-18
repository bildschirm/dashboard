<template>
	<article class="flex flex-wrap gap-10">
		<section
			v-for="componentId in componentIds"
			:key="componentId"

			class="w-full flex flex-wrap relative "
		>
			<header class="flex w-full mb-5 items-center justify-between">
				<div class="block">
					<h3 class="font-semibold">{{ componentId }}</h3>
					<h4 class="text-primary-400">Used 0 times</h4>
				</div>
				<Button class="shadow" @click="addComponent(componentId)">Add +</Button>
			</header>

			<component :is="componentId" class="user-events-none overflow-x-hidden"></component>			
		</section>

		<section class="bg-primary-500 rounded-md shadow">
			
		</section>
	</article>
</template>
<script type="text/javascript">
import Button from '@components/form/Button';

export default {
	computed: {
		componentIds() {
			return Object.keys(window.MISSION_CONTROL_COMPONENTS_DICT);
		}
	},
	methods: {
		addComponent(componentId) {
			this.$emit('add', { componentId });
		}
	},
	components: {
		Button
	}
};
</script>