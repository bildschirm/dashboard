<template>
	<div class="flex space-x-8">
		<!-- <Panel v-if="false">
			<div class="flex space-x-2 mb-5">
				<Label label="Hex" name="hex">
					<TextInput name="hex" placeholder="Hex" v-model="hex" />
				</Label>
			</div>

			<h2 class="font-semibold text-purple-100 mb-2">RGB</h2>
			<div class="flex space-x-2 mb-5">
				<Label label="R (0-255)" name="r">
					<TextInput
						name="r"
						placeholder="Red"
						type="number"
						min="0"
						max="255"
						step="1"
						v-model="rgb.r"
					/>
				</Label>

				<Label label="G (0-255)" name="r">
					<TextInput
						name="g"
						placeholder="Green"
						type="number"
						min="0"
						max="255"
						step="1"
						v-model="rgb.g"
					/>
				</Label>

				<Label label="B (0-255)" name="b">
					<TextInput
						name="b"
						placeholder="Blue"
						type="number"
						min="0"
						max="255"
						step="1"
						v-model="rgb.b"
					/>
				</Label>
			</div>

			<h2 class="font-semibold text-purple-100 mb-2">HSL</h2>
			<div class="flex space-x-2">
				<Label label="H (0-360)" name="h">
					<TextInput
						name="h"
						placeholder="Hue"
						type="number"
						min="0"
						max="360"
						step="1"
						v-model="hsl.h"
					/>
				</Label>

				<Label label="S (0-100)" name="s">
					<TextInput
						name="s"
						placeholder="Saturation"
						type="number"
						min="0"
						max="100"
						step="1"
						v-model="hsl.s"
					/>
				</Label>

				<Label label="L (0-100)" name="l">
					<TextInput
						name="l"
						placeholder="Brightness"
						type="number"
						min="0"
						max="100"
						step="1"
						v-model="hsl.l"
					/>
				</Label>
			</div>
		</Panel> -->
		<div
			ref="picker"
			class="m-auto opacity-70 hover:opacity-100 transition px-8 py-4"
		></div>
	</div>
</template>

<script>
import iro from '@jaames/iro';

import Panel from '@components/common/Panel';
import TextInput from '@components/form/TextInput';
import Label from '@components/form/Label';

export default {
	components: {
		Panel,
		TextInput,
		Label,
	},
	props: {
		value: {
			type: String,
			default: '#fff',
		},
	},
	data: () => ({
		hex: '',
		rgb: {
			r: 0,
			g: 0,
			b: 0,
		},
		hsl: {
			h: 0,
			s: 0,
			l: 0,
		},
	}),
	mounted() {
		this.colorPicker = new iro.ColorPicker(this.$refs.picker, {
			// Set the size of the color picker
			width: 200,
			// Set the initial color to pure red
			color: this.value,
		});

		this.colorPicker.on('color:change', (color) => {
			// log the current color as a HEX string
			this.$emit('input', color.hexString);
		});

		this.recompute();
	},
	beforeUnmount() {},
	methods: {
		onBlur(e) {
			e.target.reportValidity();
		},

		recompute() {
			const hsl = this.colorPicker.color.hsl;
			const rgb = this.colorPicker.color.rgb;

			this.hex = this.colorPicker.color.hexString;
			this.hsl = {
				h: String(hsl.h),
				s: String(hsl.s),
				l: String(hsl.l),
			};
			this.rgb = {
				r: String(rgb.r),
				g: String(rgb.g),
				b: String(rgb.b),
			};
		},
	},
	watch: {
		value(newValue) {
			if (this.colorPicker.color) {
				this.colorPicker.color.hexString = newValue;
				this.recompute();
			}
		},
	},
};
</script>

<style></style>
