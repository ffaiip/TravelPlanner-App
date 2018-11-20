import Vue from 'vue';

import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import GSignInButton from 'vue-google-signin-button';
import FBSignInButton from 'vue-facebook-signin-button';
import GAuth from 'vue-google-oauth2';
import Vuex from 'vuex';

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
  VCombobox,
  VAlert,

} from 'vuetify';
import { store } from './store';
import router from './router/index';
import App from './App';


Vue.use(GAuth, { clientId: '464916650517-c62c52q1j7jhvbuksr8a16i48d62au4t.apps.googleusercontent.com', scope: 'profile email https://www.googleapis.com/auth/plus.login' });

Vue.use(FBSignInButton);

Vue.use(GSignInButton);

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyBENVTYtp6UnlTVs8gmLomS1NNlJqK7-ww', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
});

Vue.use(Vuex);

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
    VCombobox,
    VAlert,
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
  store,
  render: h => h(App),
});
