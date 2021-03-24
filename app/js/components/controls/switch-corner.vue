<template>
	<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="fill-current " :class="classes">
		<defs>
		  	<linearGradient :id="`linear-${rotation}-${randomId}`" :x1="gradientDirections.x1" :y1="gradientDirections.y1" :x2="gradientDirections.x2" :y2="gradientDirections.y2">
		  		<stop :offset="gradientDirections.offset1" :stop-color="startColor"/>
		  		<stop :offset="gradientDirections.offset2" :stop-color="endColor"/>
		  	</linearGradient>
		</defs>
		<g fill-rule="evenodd">
			<path d="M0,48 L1.0013123e-15,37.1763354 C-5.81791281e-16,24.2493137 1.34597136,19.5616632 3.8734242,14.8357373 C6.40087705,10.1098114 10.1098114,6.40087705 14.8357373,3.8734242 C19.5616632,1.34597136 24.2493137,8.72686921e-16 37.1763354,-1.50196845e-15 L48,-9.86076132e-31 L48,48 L-7.10542736e-15,48 Z" fill-rule="nonzero" :fill="`url(#linear-${rotation}-${randomId})`"></path>
		</g>
	</svg>
</template>
<script type="text/javascript">
	export default {
		props: ['rotation', 'active', 'start-color', 'end-color'],
		data: () => ({
			randomId: Math.round(Math.random() * 999999)
		}),
		computed: {
			classes() {
				let rotation = 'rotate-0';

				switch(this.rotation) {
					case '90':
						rotation = 'rotate-90';
						break;
					case '180':
						rotation = 'rotate-180';
						break;
					case '270':
						rotation = 'rotate-270';
						break;
				}

				return {
					[`transform ${rotation}`]: true
				};
			},
			gradientDirections() {
				switch (this.rotation) {
					case '90':
						return {
							x1: '0%',
							y1: '0%',
							x2: '100%',
							y2: '0%',
							offset1: '0%',
							offset2: '100%'
						};
					case '180':
						return {
							x1: '0%',
							y1: '100%',
							x2: '0%',
							y2: '0%',
							offset1: '0%',
							offset2: '100%'
						};
					case '270':
						return {
							x1: '100%',
							y1: '0%',
							x2: '0%',
							y2: '0%',
							offset1: '0%',
							offset2: '100%'
						};
					case '0':
						return {
							x1: '0%',
							y1: '0%',
							x2: '0%',
							y2: '100%',
							offset1: '0%',
							offset2: '100%'
						};
					default:
						return {
							x1: '0%',
							y1: '0%',
							x2: '0%',
							y2: '100%',
							offset1: '0%',
							offset2: '100%'
						};
				}
			}
		}
	};
</script>