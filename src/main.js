import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VTextField,
  VCard,
  VCarousel,
  VDatePicker,
  VTimePicker,
  VMenu,
  VDataTable,
  VTimeline,
  VAutocomplete,
  VDivider,
} from 'vuetify';

import Vue from 'vue';
import App from './App';
import Vuex from 'vuex'
import router from './router/index';
import { store } from './store/index'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyBENVTYtp6UnlTVs8gmLomS1NNlJqK7-ww', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
});

Vue.use(Vuex)

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VTextField,
    VCard,
    VCarousel,
    VDatePicker,
    VTimePicker,
    VMenu,
    VDataTable,
    VTimeline,
    VAutocomplete,
    VDivider,
  },
  theme: {
    primary: '#FFAB00',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#81D4FA',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
