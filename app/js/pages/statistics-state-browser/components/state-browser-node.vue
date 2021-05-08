<template>
	<div class="">
		<template v-for="(value, key) in state">
			<details v-if="(typeof value === 'object' || Array.isArray(value)) && value !== null">
				<summary class="my-2 cursor-pointer">
					<span class="font-medium text-purple-200">{{ key }}</span>:
					<span class="text-xs text-purple-300">
						{{ Array.isArray(value) ? 'Array' : 'Object' }}
						({{ Object.keys(value).length }})
					</span>
				</summary>
				<state-browser-node
					class="pl-8"
					:state="value"
				></state-browser-node>
			</details>
			<div
				class="my-2 flex flex-nowrap"
				style="margin-left: 17px"
				v-else
			>
				<span class="flex">{{ key }}:</span>
				<span class="flex">
					<div class="flex">
						<span class="ml-2">{{
							typeof value === 'string' ? '"' : ''
						}}</span>
						<span
							:class="{
								[`border-b-2 ${getValueColor(value)}`]: true
							}"
							>{{ value }}</span
						>
						<span v-if="typeof value === 'string'">"</span>
					</div>
				</span>
			</div>
		</template>
	</div>
</template>
<script type="text/javascript">
import saveIcon from '@components/icons/save-icon';

export default {
	name: 'state-browser-node',
	props: ['state'],
	methods: {
		getValueColor(value) {
			return 'text-main-light border-main-darkest';
			switch (typeof value) {
				case 'string':
					return 'text-green-200 border-green-light';
				case 'object':
					return 'text-main-light border-main-light';
				case 'number':
				case 'boolean':
				default:
					return 'text-blue-light border-blue-light';
			}
		}
	},
	components: {
		'save-icon': saveIcon
	}
};
</script>
