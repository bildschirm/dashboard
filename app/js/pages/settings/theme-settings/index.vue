<template>
	<main class="dashboard-page p-5 md:p-12">
		<div class="max-w-4xl">
			<div class="lg:grid lg:grid-cols-3 lg:gap-6">
				<div class="lg:col-span-1">
					<div class="px-4 sm:px-0">
						<h3
							class="text-lg leading-6 text-primary-100 font-semibold"
						>
							Theme Settings
						</h3>
						<p class="mt-1 text-sm text-primary-400">
							Customize Mission Control and change the theme
						</p>
					</div>
				</div>
				<div class="mt-5 lg:mt-0 lg:col-span-2">
					<Label label="Theme" name="theme" class="mb-4">
						<SelectInput
							name="theme"
							:value="theme"
							@input="selectTheme"
							required
						>
							<option 
								v-for="theme in themeList"
								:key="theme"
								:value="theme"
							>
								{{ theme }}
							</option>
						</SelectInput>
					</Label>
				</div>
			</div>
		</div>
	</main>
</template>
<script type="text/javascript">
import Label from '@components/form/Label';
import SelectInput from '@components/form/SelectInput';

import themeList from '@/static/themes.json'

export default {
	methods: {
	},
	computed: {
		theme() {
			return this.$store.state.theme;
		},
		themeList() {
			return Object.keys(themeList);
		}
	},
	methods: {
		async selectTheme(theme) {
			try {
				await this.$sync.action('theme', 'choose', { theme });
			} catch (e) {
				console.error(e);
				this.$notify({
					type: 'error',
					title: 'Changing Theme',
					message: e.message,
				});
			}
		},
	},
	components: {
		Label,
		SelectInput
	},
};
</script>
