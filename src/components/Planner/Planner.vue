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
                        <v-flex xs2><h4>Start Time</h4></v-flex>
                            <v-flex xs1>
                                <v-combobox
                                    v-model="selectStartTimeHour"
                                    :items="hourList"
                                    :disabled = this.disabled
                                ></v-combobox>
                            </v-flex>
                            <v-flex xs1>
                                <h3>:</h3>
                            </v-flex>
                            <v-flex xs1>
                                <v-combobox
                                    v-model="selectStartTimeMin"
                                    :items="minList"
                                    :disabled = this.disabled
                                ></v-combobox>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center justify-center row class="pb-6">
                        <v-flex xs2><h4>End Time </h4></v-flex>
                            <v-flex xs1>
                                <v-combobox
                                    v-model="selectEndTimeHour"
                                    :items="hourList"
                                    :disabled = this.disabled
                                ></v-combobox>
                            </v-flex>
                            <v-flex xs1>
                                <h3>:</h3>
                            </v-flex>
                            <v-flex xs1>
                                <v-combobox
                                    v-model="selectEndTimeMin"
                                    :items="minList"
                                    :disabled = this.disabled
                                ></v-combobox>
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
        //auto-complete
        autocompleteModel: 'Some Default Location...',
        vueGoogleAutocompleteLink: 'https://github.com/olefirenko/vue-google-autocomplete',
        autocomplete: '',
        address: {},
        clearable: true,
        enableGeolocation: false,

        //data of place
        list: [],
        addressName : '',
        placeData: '0',
        placeList: [],

        //time data
        selectStartTimeHour: '00',
        selectStartTimeMin: '00',

        selectEndTimeHour: '00',
        selectEndTimeMin: '00',

        hourList: [
          '00', '01', '02', '03', '04',
          '05', '06', '07', '08', '09',
          '10', '11', '12', '13', '14',
          '15', '16', '17', '18', '19',
          '20', '21', '22', '23'],
        minList: [
          '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
          '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
          '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
          '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
          '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
          '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
        
        timePicker: '',
        totalTime : '',
        spendtime: '',
        numSpendtime: '',
        totalmin: '',
        totalhour: '',
        disabled: false,
        numStartHour:'',
        numStartMin:'',


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
            var addressObj= JSON.parse(addressStringify);
            this.addressName = addressObj['name'];
            // edok name tong nee
            console.log(this.addressName);
        },
        

        async addPlace() {

            // set time table
            this.setStartTime = this.selectStartTimeHour + ":" + this.selectStartTimeMin;
            // collect first place list
            this.placeList.push({ placeName: this.addressName });

            /** Show real total minute */
            let minDigit = function (totalmin) {
             if(totalmin < 10) return '0' + totalmin;
             else return totalmin;
            }

            let tenMin = function (totalmin) {
             if (totalmin.length == 1) return totalmin + '0';
             else return totalmin;
            }

            /** seperate hour and minute */
            let splitTimeTable = function (totalTime) {
             var splitTime  = totalTime.split('.');
             return { hour: splitTime[0], min:splitTime[1] };
            }

            let plusTime = function (startHour,startMin,endHour,endMin) {
              var min = 0;
              var hour = 0;
              if((startMin+endMin) > 60){
                  min = (startMin + endMin) -60;
                  hour = startHour + endHour + 1;
              }else{
                  min = (startMin + endMin);
                  hour = startHour + endHour;
              }
             return { hour: minDigit(hour), min: minDigit(min) };
          };

            /** Compute time table */
            let timeTable = function (selectEndTimeHour,selectEndTimeMin,selectStartTimeHour,selectStartTimeMin) {
                var totalhour = 0;
                var totalmin = 0;
                if (selectEndTimeHour === '00' && selectEndTimeMin === '00') {
                 selectEndTimeHour = '24';
                 selectEndTimeMin = '00';
                }
                if (selectStartTimeHour === '00' && selectStartTimeMin == '00') {
                 selectStartTimeHour = '24';
                 selectEndTimeMin = '00';
                }
                if (selectEndTimeHour > selectStartTimeHour && selectEndTimeMin >= selectStartTimeMin || selectEndTimeHour == selectStartTimeHour && selectEndTimeMin > selectStartTimeMin ) {
                 totalhour = parseInt(selectEndTimeHour, 10) - parseInt(selectStartTimeHour, 10);
                 totalmin = parseInt(selectEndTimeMin, 10) - parseInt(selectStartTimeMin, 10);
                }
                else if (selectEndTimeHour > selectStartTimeHour && selectEndTimeMin < selectStartTimeMin) {
                 totalhour = (parseInt(selectEndTimeHour, 10) - 1) - (parseInt(selectStartTimeHour, 10));
                 totalmin = (parseInt(selectEndTimeMin, 10) + 60) - (parseInt(selectStartTimeMin, 10));
                }
                else if (selectEndTimeHour === '00' && selectEndTimeMin > selectStartTimeMin) {
                 totalhour = 24 - parseInt(selectStartTimeHour, 10);
                 totalmin = parseInt(selectEndTimeMin, 10) - parseInt(selectStartTimeMin, 10);
                }
                else if (selectEndTimeHour === '00' && selectEndTimeMin <= selectStartTimeMin) {
                 totalhour = 24 - parseInt(selectStartTimeHour, 10);
                 totalmin = (parseInt(selectEndTimeMin, 10) + 60) - parseInt(selectStartTimeMin, 10);
                }
                else if (selectStartTimeHour > selectEndTimeHour && selectStartTimeMin >= selectEndTimeMin || selectStartTimeHour == selectEndTimeHour && selectStartTimeMin > selectEndTimeMin) {
                 totalhour = parseInt(selectStartTimeHour, 10) - parseInt(selectEndTimeHour, 10);
                 totalmin = parseInt(selectStartTimeMin, 10) - parseInt(selectEndTimeMin, 10);
                }
                else if (selectStartTimeHour > selectEndTimeHour && selectStartTimeMin < selectEndTimeMin) {
                 totalhour = (parseInt(selectStartTimeHour, 10) - 1) - parseInt(selectEndTimeHour, 10);
                 totalmin = (parseInt(selectStartTimeMin, 10) + 60) - parseInt(selectEndTimeMin, 10);
                }
             else {
                 return { totalhour: '24', totalmin: '00' };
                }
             return { totalhour: totalhour, totalmin: minDigit(totalmin) };
            };

         let splitTimeDuration = function (placeData) {
             var splitDuration = placeData.split(' ');
                if (splitDuration[1] === 'hour' || splitDuration[1] === 'hours' && splitDuration[3] === 'mins' || splitDuration[3] === 'min') {
                 return { hour: parseInt(splitDuration[0],10), min: parseInt(splitDuration[2],10) };
                } else if (splitDuration[1] === 'hour' || splitDuration[1] === 'hours') {
                 return { hour: parseInt(splitDuration[0],10), min: 0 };
                } else if (splitDuration[1] === 'mins' || splitDuration[1] === 'min') {
                 return { hour: 0, min: parseInt(splitDuration[0],10) };
                }
          return { hour: 0, min: 0 };
        };


         if (this.list.length >= 1) {

          let placeOrigin = this.placeList.length - 2;
          let placeDestination = this.placeList.length - 1;
                
              try {
                 let bodyPlace = {
                  place: this.placeList[placeDestination].placeName,
                  origin: this.placeList[placeOrigin].placeName,
                };

                 let placeResponse = await axios.post('https://travel-planner-develop.herokuapp.com/place/', bodyPlace);
                 this.placeData = placeResponse.data;

                 console.log(placeResponse.data);
              } catch (error) {
                 console.log(error);
              }
                // plus time table
          let num = plusTime(parseInt(this.numStartHour, 10), parseInt(this.numStartMin, 10), splitTimeDuration(this.placeData).hour, splitTimeDuration(this.placeData).min);
          let num1 = plusTime(parseInt(num.hour, 10), parseInt(num.min, 10), parseInt(this.numSpendtime, 10), 0);
          this.numStartHour = num1.hour;
          this.numStartMin = num1.min;
          this.numSpendtime = this.spendtime;
          this.timePicker = this.numStartHour + ':' + this.numStartMin;

          this.list.push({ divider: true, inset: true },
                    { duration: this.placeData },
                    { divider: true, inset: true }, {
                      avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
                      time: this.timePicker,
                      name: this.addressName,
                      spendtime: this.spendtime,
                      completed: false,
                    });
        }else {
          this.numStartHour = this.selectStartTimeHour;
          this.numStartMin = this.selectStartTimeMin;
          this.numSpendtime = this.spendtime;

          this.totalTime = timeTable(this.selectEndTimeHour, this.selectEndTimeMin, this.selectStartTimeHour, this.selectStartTimeMin).totalhour + "." + timeTable(this.selectEndTimeHour, this.selectEndTimeMin, this.selectStartTimeHour, this.selectStartTimeMin).totalmin;
          this.list.push ({
               avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
               time: this.setStartTime,
               name: this.addressName,
               spendtime: this.spendtime,
               completed: false });
          this.disabled = true;
        }

          let size = this.list.length - 1;
          try {
           let bodyTime = {
              spendtime: this.list[size].spendtime,
              remaining: this.totalTime,
              road: this.placeData,
            };
           let timeResponse = await axios.post('https://travel-planner-develop.herokuapp.com/time-remain/', bodyTime);
           this.totalTime = timeResponse.data;
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

