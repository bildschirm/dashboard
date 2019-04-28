<template>
	<button
		class="overflow-hidden h-24 mr-5 flex text-main-lightest bg-main rounded p-3 text-left content-between flex-wrap justify-end relative cursor-pointer"
		@mousedown="onMouseDown"
		@mousemove="onMouseMove"
		@mouseup="onMouseUp"
		@mouseout="cleanupMouseEvents"
	>
		<div
			class="z-0 absolute pin-b pin-t pin-l pin-r bg-main-light pointer-events-none"
			:style="bgStyle"
		></div>
		<span class="z-10 w-full pointer-events-none"><slot></slot></span>
	</button>
</template>

<script type="text/javascript">
export default {
	data: () => ({
		value: 0.5,
		trackingMouse: false,
		enableSlide: false
	}),
	computed: {
		bgStyle() {
			return {
				willChange: 'transform',
				transform: `translateY(${(1 - this.value) * 100}%)`,
				opacity: this.enableSlide ? 0.6 : 0.3,
				transition: 'opacity 200ms ease'
			};
		}
	},
	methods: {
		setValue(value) {
			this.value = Math.min(1, Math.max(0, value));
		},
		onMouseDown(e) {
			this.trackingMouse = true;
			this.enableSlide = false;
			this.slideTimeout = setTimeout(() => {
				this.enableSlide = true;

				if (this.cachedValue) this.setValue(this.cachedValue);
			}, 250);

			const rect = e.target.getBoundingClientRect();
			const y = e.clientY - rect.top;

			this.cachedValue = (rect.height - y) / rect.height;
		},
		onMouseMove(e) {
			if (!this.enableSlide) return;

			this.cachedValue = null;

			const rect = e.target.getBoundingClientRect();
			const y = e.clientY - rect.top;

			this.setValue((rect.height - y) / rect.height);
		},
		onMouseUp(e) {
			// Click event
			if (!this.enableSlide) {
				console.log('clicl');
			}

			this.cleanupMouseEvents();
		},
		cleanupMouseEvents() {
			clearTimeout(this.slideTimeout);
			this.trackingMouse = false;
			this.enableSlide = false;
			this.cachedValue = null;
		}
	}
};
</script>
