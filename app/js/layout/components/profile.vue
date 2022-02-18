<template>
	<footer
		class="w-full px-5 py-3 font-semibold"
	>
		<section class="flex justify-between w-full mb-3 cursor-default text-primary-200">
			<h2><span class="text-primary-400">Welcome back,</span><br>{{ user.displayName }}</h2>
			<img class="w-12 h-12 rounded-full" :src="user.avatarUrl">
		</section>
		<section class="flex justify-between w-full text-sm text-primary-400">
			<router-link
				class="link"
				to="/settings"
			>
				Settings
			</router-link>
			<form action="/logout" method="POST">
				<button
					class="link"
					type="submit"
				>
					Logout
				</button>
			</form>
		</section>
	</footer>
</template>
<style lang="scss">
	.link {
		@apply hover:text-primary-300 font-semibold;
	}
</style>
<script type="text/javascript">
import signOutIcon from '@components/icons/sign-out-icon';

export default {
	components: {
		signOutIcon
	},
	props: ['user']
};
</script>
