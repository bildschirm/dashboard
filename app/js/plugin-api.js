import V from "@vue";
import { invokeAction } from '@socket';
const Vue = V.Vue;

import store from './store';
import { router } from './router';

import chunkArray from 'lodash.chunk';

import leftPad from "@helpers/left-pad";
import composeServiceComponent from '@helpers/compose-service-component';

import switchControl from '@components/controls/switch.vue';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';
import topBarButtonSeperator from '@components/controls/top-bar-button-seperator.vue';
import formsButton from '@components/forms/button.vue';

window.MISSION_CONTROL = Object.freeze({
    build: process.env.NODE_ENV,
    utils: {
        leftPad,
        chunkArray
    },
    components: {
        forms: {
            button: formsButton
        },
        topBar: {
            portal: topBarActions,
            button: topBarButton,
            seperator: topBarButtonSeperator
        },
        switch: switchControl,
        topBarActions,
        topBarButton,
        topBarButtonSeperator
    },
    dashboard: {
        isDevBuild() {
            return process.env.NODE_ENV !== 'production';
        },
        setReady(ready) {
            store.commit('setAppReady', ready);
        },
        initComponents() {
            window.MISSION_CONTROL_PAGES
                .map(page => ({
                    path: page.url,
                    component: Vue.component(page.componentName),
                    meta: {
                        title: page.title,
                        icon: page.icon,
                        menu: page.menu,
                        exact: page.menuExact
                    }
                }))
                .forEach(() => console.log(router));
        },
        component(name, vueComponent) {
            Vue.component(name, vueComponent);
        },
        consumeService(serviceName, component) {
            return composeServiceComponent(serviceName, component);
        },
        invokeAction
    }
});