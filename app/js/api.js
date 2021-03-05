import V from "@vue";
const Vue = V.Vue;

import leftPad from "@helpers/left-pad";
import switchControl from '@components/controls/switch.vue';

window.MISSION_CONTROL = {
    utils: {
        leftPad
    },
    components: {
        switch: switchControl
    },
    dashboard: {
        component(name, vueComponent) {
            Vue.component(name, vueComponent);
        }
    }
}