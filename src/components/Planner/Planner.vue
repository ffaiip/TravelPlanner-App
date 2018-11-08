<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h1 class="primary--text">My planner</h1>
                    </v-card-title>
                    <v-card-media
                                src="https://wp-assets.dotproperty-kh.com/wp-content/uploads/sites/14/2016/10/28150318/Fotolia_116473721_Subscription_Monthly_M.jpg"
                                height="400px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text">22 Oct 2018</div>
                    </v-card-text>
                    <v-form>
                        <v-layout align-center justify-center row class="pb-6">
                            <v-flex xs4>
                                <v-time-picker v-model="time"></v-time-picker>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="mb-6">

                            <v-flex xs4 offset-xs2 offset-md2 offset-lg2>
                                <vuetify-google-autocomplete
                                id="address"
                                append-icon="search"
                                ref="address"
                                :clearable="clearable"
                                :country="country"
                                :disabled=false
                                :enable-="enableGeolocation"
                                label="Search Place"
                                prepend-icon="place"
                                required=true
                                types="establishment"
                                onfocus="value = ''" 
                                v-on:placechanged="getAddressData"
                                v-on:no-results-found="noResultsFound"
                                ></vuetify-google-autocomplete>
                                
                            </v-flex>
                            <v-flex xs2 offset-xs3 offset-md2 offset-lg2>
                                <v-text-field
                                name="spendtime"
                                label="Spend time"
                                id="spendtime"
                                v-model="spendtime"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                        class="primary"
                        :disabled="!formIsValid"
                        @click="addPlace"
                        >Add place</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-list two-line>
                        <template v-for="(item, index) in list">
                            <v-divider
                                v-if="item.divider"
                                :inset="item.inset"
                                :key="index"
                            ></v-divider>
                            <v-list-tile
                                v-else-if="item.duration"
                                :key="item.duration"
                                avatar
                            >   
                                <v-layout justify-center>
                                    <v-list-action>
                                        <v-icon>directions_car</v-icon>
                                    </v-list-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>: {{ item.duration }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-layout>
                                
                            </v-list-tile>
                            <v-list-tile
                                v-else
                                :key="item.name"
                                avatar
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                                    <v-list-tile-sub-title>Spend time: {{ item.spendtime }} hours</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>Time: {{ item.time }}</v-list-tile-action-text>
                                </v-list-tile-action>
                
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div>Time remaining: {{ this.totalTime }}</div>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';  
export default {

    data () {
      return {

        autocompleteModel: 'Some Default Location...',
        vueGoogleAutocompleteLink: 'https://github.com/olefirenko/vue-google-autocomplete',
        autocomplete: '',
        spendtime: '',
        address: {},
        clearable: true,
        enableGeolocation: false,
        list: [],
        totalTime : '24',

        addressName : '',
        placeData: '0',
        placeList: [],
      }
    },
    
    computed:{
        formIsValid () {
            return this.addressName != '' &&
            this.spendtime != ''
        },

        outputJsData() {
            return `
                ${JSON.stringify(this.address)}
            `;
        },

        outputJsCallback() {
            return `methods: {
                ${this.callbackFunction}: function (addressData, placeResultData) {
                this.address = addressData;
                }
            }`;
        },

        outputJs() {
            return `${this.outputJsData},
            ${this.outputJsCallback}`;
        },
    },

    methods: {


        /**
        * Callback method when the location is found.
        *
        * @param {Object} addressData Data of the found location
        */
        getAddressData(addressData) {
            this.address = addressData;
            var addressStringify = JSON.stringify(this.address);
            var addressObj= JSON.parse(addressStringify)
            this.addressName = addressObj['name']
            // edok name tong nee
            console.log(this.addressName);
        },

        async addPlace() {

            this.placeList.push({placeName: this.addressName});
            console.log(this.placeList);

            if(this.list.length >= 1){

            let placeOrigin = this.placeList.length-2;
            let placeDestination = this.placeList.length-1;
                
            try{
                let bodyPlace = {
                place: this.placeList[placeDestination].placeName,
                origin: this.placeList[placeOrigin].placeName,
                };
                console.log(this.addressName);

                let placeResponse = await axios.post('https://travel-planner-develop.herokuapp.com/place/', bodyPlace);
                this.placeData = placeResponse.data;

                console.log(placeResponse.data);
            } catch (error){
                console.log(error);
            }

            this.list.push({ divider: true, inset: true },
                {duration: this.placeData},
                { divider: true, inset: true },{
                    avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
                time: this.time,
                name: this.addressName,
                spendtime: this.spendtime,
                completed: false,
            }) 

            }
            else{

            this.list.push({
                avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
                time: this.time,
                name: this.addressName,
                spendtime: this.spendtime,
                completed: false,
            }) 

            }

            let size = this.list.length - 1;

            //Time remaining !!
            try {
                let bodyTime = {
                    spendtime: this.list[size].spendtime,
                    remaining: this.totalTime,
                    road: this.placeData,
                };
                let timeResponse = await axios.post('https://travel-planner-develop.herokuapp.com/time-remain/', bodyTime);
                this.totalTime = timeResponse.data;

            // dont forget condition if totalTime < 0, (warnning)
                
                console.log(timeResponse.data);
            } catch (error) {
                console.log(error);
            }

            this.addressName = '';
            this.address = '';
            this.spendtime = '';
            
        },
       
    },
}
</script>

