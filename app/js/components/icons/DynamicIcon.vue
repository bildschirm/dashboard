<template>
	<component v-if="icon" :is="`${icon}-icon`" />
</template>

<script>
import homeIcon from '@components/icons/home-icon';
import heartIcon from '@components/icons/heart-icon';
import lampDeskIcon from '@components/icons/lamp-desk-icon';
import kiwiBirdIcon from '@components/icons/kiwi-bird-icon';
import bedIcon from '@components/icons/bed-icon';
import lightSwitchOffIcon from '@components/icons/light-switch-off-icon';
import lightSwitchOnIcon from '@components/icons/light-switch-on-icon';
import flamingoIcon from '@components/icons/flamingo-icon';
import rainbowIcon from '@components/icons/rainbow-icon';

export default {
	props: {
		icon: {
			type: String,
		},
	},
	components: {
		homeIcon,
		heartIcon,
		lampDeskIcon,
		kiwiBirdIcon,
		bedIcon,
		lightSwitchOffIcon,
		lightSwitchOnIcon,
		flamingoIcon,
		rainbowIcon,
	},
};
</script>

<style></style>
