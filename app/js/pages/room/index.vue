<template>
	<main class="dashboard-page p-5 md:p-12 h-full">
		<room-layout />
	</main>
</template>
<script type="text/javascript">
import { invokeAction } from '@socket';

import roomLayout from './room-layout.vue';

export default {
	components: {
		roomLayout
	}
};
</script>
