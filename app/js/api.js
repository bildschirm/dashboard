import V from "@vue";
const Vue = V.Vue;

import leftPad from "@helpers/left-pad";

window.MISSION_CONTROL = {
    utils: {
        leftPad
    },
    components: {
        switch: require('@components/controls/switch')
    },
    dashboard: {
        component(name, vueComponent) {
            Vue.component(name, vueComponent);
        }
    }
}