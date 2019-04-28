<template>
	<button
		:class="{
			[`group overflow-hidden w-32 h-32 mr-5 flex text-main-lightest bg-main rounded text-left flex-wrap justify-end relative cursor-pointer color-switch`]: true
		}"
		@mousedown="onMouseDown"
		@mousemove="onMouseMove"
		@mouseup="onMouseUp"
		@mouseout="cleanupMouseEvents"
	>
		<!-- Color Mode -->
		<color-selector
			v-if="mode === 'color'"
			ref="colorSelector"
			v-model="color"
		>
			Color
		</color-selector>

		<!-- Brightness Mode -->
		<value-slider
			v-if="mode === 'brightness'"
			ref="brightnessSlider"
			v-model="brightness"
		>
			Brightness
		</value-slider>

		<section
			class="z-10 w-full flex justify-between p-3 pointer-events-none"
		>
			<span>Light</span>
			<div
				class="w-full flex flex-wrap text-xs justify-between text-right"
			>
				<span class="w-full"
					>{{ Math.round(brightness * 100) }}%<br
				/></span>
				<span class="w-full">{{ colorName }}</span>
			</div>
		</section>

		<!-- Mode Selector -->
		<section
			class="flex w-full h-1/2 px-3 pb-3 self-end"
			v-if="mode === 'none'"
		>
			<button
				class="w-1/2 hover:bg-main-light opacity-0 group-hover:opacity-25 rounded"
				@click="setMode('color')"
			>
				<picker-icon
					class="fill-current w-5 text-main-darkest"
				></picker-icon>
			</button>
			<button
				class="w-1/2 hover:bg-main-light opacity-0 group-hover:opacity-25 rounded"
				@click="setMode('brightness')"
			>
				<light-on-icon
					class="fill-current w-6 text-main-darkest"
				></light-on-icon>
			</button>
		</section>
	</button>
</template>

<script type="text/javascript">
import lightOnIcon from '@components/icons/light-on-icon';
import pickerIcon from '@components/icons/picker-icon';
import colorSelector from '@components/controls/color-selector';
import valueSlider from '@components/controls/value-slider';
import convert from 'color-convert';

export default {
	components: {
		lightOnIcon,
		pickerIcon,
		colorSelector,
		valueSlider
	},
	data: () => ({
		color: { r: 255, g: 255, b: 255 },
		brightness: 0.5,
		mode: 'none',
		trackingMouse: false,
		enableSlide: false
	}),
	computed: {
		colorName() {
			return convert.rgb.keyword(
				this.color.r,
				this.color.g,
				this.color.b
			);
		}
	},
	methods: {
		setMode(mode) {
			this.mode = mode;
		},
		onMouseDown(e) {
			if (this.$refs.brightnessSlider) {
				this.$refs.brightnessSlider.onMouseDown(e);
			}

			if (this.$refs.colorSelector) {
				this.$refs.colorSelector.onMouseDown(e);
			}
		},
		onMouseMove(e) {
			if (this.$refs.brightnessSlider) {
				this.$refs.brightnessSlider.onMouseMove(e);
			}

			if (this.$refs.colorSelector) {
				this.$refs.colorSelector.onMouseMove(e);
			}
		},
		onMouseUp(e) {
			if (this.$refs.brightnessSlider) {
				this.$refs.brightnessSlider.onMouseUp(e);
			}

			if (this.$refs.colorSelector) {
				this.$refs.colorSelector.onMouseUp(e);
			}

			this.cleanupMouseEvents();
		},
		cleanupMouseEvents() {
			if (this.$refs.brightnessSlider) {
				this.$refs.brightnessSlider.cleanupMouseEvents();
			}

			if (this.$refs.colorSelector) {
				this.$refs.colorSelector.cleanupMouseEvents();
			}

			this.setMode('none');
		}
	}
};
</script>
