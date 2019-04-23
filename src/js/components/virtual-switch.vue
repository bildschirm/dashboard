<template>
	<button :class="{ switch: true, active: active }" @click="click">
		<span class="title"><slot></slot></span>
		<figure class="icon" v-if="icon">
			<icon :type="icon"></icon>
		</figure>
	</button>
</template>
<script type="text/javascript">
export default {
	props: ['icon', 'active'],
	methods: {
		click(e) {
			this.$emit('click', e);
		}
	}
};
</script>
