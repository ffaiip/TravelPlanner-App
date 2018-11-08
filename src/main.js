import Vue from 'vue';
import App from './App';
import router from './router/index';

import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyBENVTYtp6UnlTVs8gmLomS1NNlJqK7-ww', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
});

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
  router,
  render: h => h(App),
});

