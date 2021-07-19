<template>
	<form>
		<button
			class="block w-full flex gap-5 items-center mb-10"
			@click.prevent="toggleOn"
		>
			<InfoBlock :label="device.type" class="text-left flex-1">
				{{ device.name }}
			</InfoBlock>
			<figure class="w-8 transition" :style="iconColorStyle">
				<DynamicIcon :icon="device.icon" />
			</figure>
		</button>

		<ColorInput v-if="supports.color" v-model="color" class="mb-10" />

		<div
			v-for="characteristic in device.characteristics"
			:key="characteristic.uuid"
			class="flex"
		>
			<InfoBlock class="mb-3 w-32" :label="characteristic.type">
				{{ characteristic.value }}
			</InfoBlock>
			<div class="flex-1 flex items-center justify-end">
				<input
					v-if="characteristic.format === 'bool'"
					type="checkbox"
					class="focus:ring-red-500 h-4 w-4 text-red-600 border-purple-300 rounded"
					:name="characteristic.uuid"
					:checked="!!characteristic.value"
					@input="
						onCharacteristicValueChanged(
							characteristic,
							$event.target.checked
						)
					"
				/>
				<input
					v-if="
						characteristic.format === 'int' ||
							characteristic.format === 'float'
					"
					class="w-full max-w-sm"
					type="range"
					:name="characteristic.uuid"
					:value="characteristic.value"
					:max="characteristic.maxValue"
					:min="characteristic.minValue"
					:step="characteristic.minStep"
					@input="
						onCharacteristicValueChanged(
							characteristic,
							parseInt($event.target.value)
						)
					"
				/>
			</div>
		</div>
		<InfoBlock label="Unique ID" class="mb-3 truncate max-w-sm">
			{{ device.uniqueId }}
		</InfoBlock>
		<InfoBlock label="IID" class="mb-3">
			{{ device.iid }}
		</InfoBlock>
	</form>
</template>

<script>
// {"uniqueId":  "4c11c0d80eb1e6e9a373bc1c9fce779522a753e9361a47cf303d8eb109efff00" ,
// "iid":  8 ,
// "name":  "LED Strip" ,
// "type":  "Lightbulb" ,
// "characteristics":  [
// {
// "aid":  13 ,
// "iid":  10 ,
// "uuid":  "00000025-0000-1000-8000-0026BB765291" ,
// "type":  "On" ,
// "serviceType":  "Lightbulb" ,
// "serviceName":  "LED Strip" ,
// "description":  "On" ,
// "value":  1 ,
// "format":  "bool" ,
// "perms":  [
// "ev" ,
// "pr" ,
// "pw"
// ] ,
// "canRead":  true ,
// "canWrite":  true ,
// "ev":  true
// } ,
// {
// "aid":  13 ,
// "iid":  11 ,
// "uuid":  "00000008-0000-1000-8000-0026BB765291" ,
// "type":  "Brightness" ,
// "serviceType":  "Lightbulb" ,
// "serviceName":  "LED Strip" ,
// "description":  "Brightness" ,
// "value":  50 ,
// "format":  "int" ,
// "perms":  [
// "ev" ,
// "pr" ,
// "pw"
// ] ,
// "unit":  "percentage" ,
// "maxValue":  100 ,
// "minValue":  0 ,
// "minStep":  1 ,
// "canRead":  true ,
// "canWrite":  true ,
// "ev":  true
// } ,
// {
// "aid":  13 ,
// "iid":  12 ,
// "uuid":  "00000013-0000-1000-8000-0026BB765291" ,
// "type":  "Hue" ,
// "serviceType":  "Lightbulb" ,
// "serviceName":  "LED Strip" ,
// "description":  "Hue" ,
// "value":  127 ,
// "format":  "float" ,
// "perms":  [
// "ev" ,
// "pr" ,
// "pw"
// ] ,
// "unit":  "arcdegrees" ,
// "maxValue":  360 ,
// "minValue":  0 ,
// "minStep":  1 ,
// "canRead":  true ,
// "canWrite":  true ,
// "ev":  true
// } ,
// {
// "aid":  13 ,
// "iid":  13 ,
// "uuid":  "0000002F-0000-1000-8000-0026BB765291" ,
// "type":  "Saturation" ,
// "serviceType":  "Lightbulb" ,
// "serviceName":  "LED Strip" ,
// "description":  "Saturation" ,
// "value":  100 ,
// "format":  "float" ,
// "perms":  [
// "ev" ,
// "pr" ,
// "pw"
// ] ,
// "unit":  "percentage" ,
// "maxValue":  100 ,
// "minValue":  0 ,
// "minStep":  1 ,
// "canRead":  true ,
// "canWrite":  true ,
// "ev":  true
// }
// ] ,
// "values":  {
// "On":  1 ,
// "Brightness":  50 ,
// "Hue":  127 ,
// "Saturation":  100
// }
// }
import ColorInput from '@components/form/ColorInput';
import InfoBlock from '@components/common/InfoBlock';
import DynamicIcon from '@components/icons/DynamicIcon';

import debounceLeading from '@helpers/debounce-leading';

function hslToHex(h, s, l) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHSL(H) {
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length == 4) {
		r = '0x' + H[1] + H[1];
		g = '0x' + H[2] + H[2];
		b = '0x' + H[3] + H[3];
	} else if (H.length == 7) {
		r = '0x' + H[1] + H[2];
		g = '0x' + H[3] + H[4];
		b = '0x' + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return [h, s, l];
}

export default {
	components: {
		ColorInput,
		InfoBlock,
		DynamicIcon,
	},
	template: `

		`,
	props: {
		device: {
			type: Object,
			required: true,
		},
	},
	data: (vm) => ({
		color: hslToHex(
			vm.device.values.Hue,
			vm.device.values.Saturation,
			vm.device.values.Brightness
		),
	}),
	computed: {
		hexColor() {
			const [h, s, l] = [
				this.device.values.Hue,
				this.device.values.Saturation,
				this.device.values.Brightness,
			];

			return hslToHex(h, s, l);
		},
		supports() {
			return {
				color:
					this.device.values.Hue !== undefined &&
					this.device.values.Saturation !== undefined &&
					this.device.values.Brightness !== undefined,
			};
		},
		iconColorStyle() {
			const grayscale = !this.device.values.On ? 'grayscale(0%)' : '';
			const dropShadow = `drop-shadow(0px 1px 15px ${this.device.color}) drop-shadow(0px 1px 1000px ${this.device.color})`;

			return `color: ${this.device.color}; filter: ${
				true ? dropShadow : ''
			} ${grayscale}; opacity: ${this.device.values.On ? '1' : '0.4'};`;
		},
	},
	methods: {
		toggleOn() {
			this.$emit('invoke', 'interact', {
				uniqueId: this.device.uniqueId,
				changes: {
					On: !this.device.values.On,
				},
			});
		},
		interact: debounceLeading(function(
			device,
			characteristic,
			value,
			$emit
		) {
			$emit('invoke', 'interact', {
				uniqueId: device.uniqueId,
				changes: {
					[characteristic.type]: value,
				},
			});
		}),
		onCharacteristicValueChanged(characteristic, value) {
			this.interact.call(
				this,
				this.device,
				characteristic,
				value,
				this.$emit.bind(this)
			);
		},
	},
	watch: {
		device() {
			this.color = this.hexColor;
		},
		color() {
			const [h, s, l] = hexToHSL(this.color);
			this.$emit('invoke', 'interact', {
				uniqueId: this.device.uniqueId,
				changes: {
					Hue: h,
					Saturation: s,
					Brightness: l,
				},
			});
		},
	},
};
</script>

<style></style>
