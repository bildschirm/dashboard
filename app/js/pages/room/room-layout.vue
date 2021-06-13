<style type="text/css">
	:root {
		--rgb-color-a: rgba(54, 232, 136, 0.5);
		--rgb-color-b: rgba(48, 233, 144, 0.3);
	}

	.shadow-green, .shadow-rgb {
		/* Rectangle */

		box-shadow: 0px 0px 10px 2px var(--rgb-color-a), inset 0px 4px 50px 25px var(--rgb-color-a);
	}

	.shadow-pink {
		box-shadow: 0px 0px 10px 2px rgb(255, 0, 96), inset 0px 4px 50px 25px rgba(255, 0, 96, 0.3);
	}
</style>
<style lang="scss">
	.scale-button {
		@apply transform transition duration-75 active:scale-95;
	}

	.vibe-button {
        @extend .scale-button;
		@apply text-purple-400 font-semibold text-xs absolute top-0 left-0 px-8 py-10 hover:opacity-50 opacity-75;

		&.active {
			@apply opacity-100;
			text-shadow: 0px 0px 40px rgb(255, 255, 255), 0px 0px 20px rgb(255, 255, 255);
		}
	}
</style>
<template>
	<div class="h-full flex justify-center items-center">
        <!-- {{ homekitState }} -->
		<section class="relative max-w-lg w-full filter">
            <div class="dashboard-box-heading mb-3 ">Lights</div>
            <div class="dashboard-box w-full relative">
            	<div class="w-full flex flex-col justify-start px-8 py-8">
            		<button 
            			class="block absolute inset-0 w-full transition cursor-pointer border-3 hover:border-green-400 border-green-600 rounded-lg shadow-green"
            			@click="toggleSwitch('4c11c0d80eb1e6e9a373bc1c9fce779522a753e9361a47cf303d8eb109efff00')"
            			@contextmenu.prevent="selectDevice('4c11c0d80eb1e6e9a373bc1c9fce779522a753e9361a47cf303d8eb109efff00')"
            		></button>
            		<button 
            			class="absolute top-0 left-0 px-5" 
            			style="margin-left: 16%;height: 19%;margin-top: 20.5%;width: 2%;"
            			@click="toggleSwitch('f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd')"
            		>
            			<div class="w-full h-full shadow-pink"></div>
            		</button>
            		<button 
            			class="absolute top-0 left-0 py-5" 
            			style="margin-left: 60.5%;width: 20%;margin-top: 80%;height: 2%;"
            			@click="toggleSwitch('f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd')"
            		>
            			<div class="w-full h-full shadow-pink"></div>
            		</button>
            		<bg-svg class="select-none pointer-events-none w-full relative h-1/3 " />
            		<button 
            			class="vibe-button"
            			style="margin-left: 57.5%;margin-top: 55%;" 
            			:class="{ 'active': vibes.sleep }"
            			@click="toggleVibe('sleep')"
            		>
            			SLEEP
            		</button>
            		<button 
            			class="vibe-button"
            			style="margin-left: 27.5%;margin-top: 17%;"
            			:class="{ 'active': vibes.work }"
            			@click="toggleVibe('work')"
            		>
            			WORK
            		</button>
            		<button 
            			class="vibe-button"
            			style="margin-left: 53%;margin-top: 20%;"
            			:class="{ 'active': vibes.chill }"
            			@click="toggleVibe('chill')"
            		>
            			CHILL
            		</button>
            		<button 
            			class="vibe-button" 
            			style="margin-left: 27.5%;margin-top: 52%;"
            			:class="{ 'active': vibes.living }"
            			@click="toggleVibe('living')"
            		>
            			LIVING
            		</button>
            		<button 
            			class="absolute top-0 left-0 py-5" 
            			style="margin-left: 10.5%;width: 20%;margin-top: 47%;height: 2%;"
            			@click="toggleSwitch('f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd')"
            		>
            			<flamingo />
            		</button>
            		<!-- <div class="absolute inset-0">
            			<img class="absolute top-0 left-0 w-full pointer-events-none" :src="mainLightSvgUrl" />
            		</div> -->
            	</div>
        	</div>
        </section>

        <section 
        	v-if="selectedService"
        	class="absolute inset-0 flex justify-center items-center" 
        >
        	<!-- <div class="absolute inset-0 bg-purple-600 filter blur-lg opacity-50"></div> -->
        	<div class="max-w-sm w-full text-purple-100">
        		<h2 class="font-semibold text-2xl mb-3">{{ selectedService.name }}</h2>
	        	<button 
	        		class="px-4 py-2 rounded shadow w-full font-semibold hover:opacity-100 scale-button mb-5"
	        		:class="{
	        			'bg-purple-300 text-purple-700 opacity-80': selectedService.values.On,
	        			'bg-purple-700 text-purple-400 opacity-70': !selectedService.values.On
	        		}"
	        	>
	        		Turn {{ selectedService.values.On ? 'off' : 'on' }}
	        	</button>

	        	<section v-if="selectedService.type === 'Lightbulb'">
	        		<input type="color" name="color" @input="updateLightbulbColor">	
	        	</section>
        	</div>
        </section>

	</div>
</template>
<script type="text/javascript">

import bgSvg from './svg.vue';
import flamingo from './flamingo.vue';
import mainLight from './main-light.svg';
import composeServiceComponent from '@helpers/compose-service-component';

export default composeServiceComponent('homebridge', {
	data: () => ({
		selectedDeviceID: '' //|| 'f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd'
	}),
	methods: {
		toggleVibe(vibe) {
			invokeAction('HOMEKIT:VIBE', {
				vibe
			});
		},
		async toggleSwitch(uniqueId) {
            try {
                const device = this.homekitState.devices[uniqueId];
                
                if (!device) {
                    throw new Error('Unknown HomeKit device ' + uniqueId);
                }

                await this.$invokeAction('interact', {
                    uniqueId,
                    changes: {
                        On: !device.values.On
                    }
                });
            } catch (e) {
                alert(e.message);
            }
		},
		selectDevice(device) {
			if (this.selectedDeviceID === device) {
				this.selectedDeviceID = null;
			} else {
				this.selectedDeviceID = device;
			}
		},
		updateLightbulbColor(e) {
			alert(e.target.value);
		}
	},
	computed: {
		selectedService() {
			return this.homekitState.devices[this.selectedDeviceID] || null;
		},
		homekitState() {
            return this.$stateWithDefault({
                status: 'connecting',
                devices: {
                    // f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd: {
                    //     uniqueId: 'f8d4fc1b2e018073cd2a4f6302320aada86e3f3238799542c04e5ab3cc47cecd',
                    //     name: 'LED Strip',
                    //     type: 'Lightbulb',
                    //     values: {
                    //         On: true
                    //     }
                    // }
                }
            });
        },
        devices() {
            return Object.values(this.homekitState.devices);
        },
		vibes() {
			return {
				living: true,
				chill: false,
				work: false,
				sleep: false
			};
		},
		
		mainLightSvgUrl: () => `/assets/${mainLight}`
	},
	components: {
		bgSvg,
		flamingo,
		mainLight
	}
});
</script>
