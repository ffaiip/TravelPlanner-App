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
                                <v-time-picker v-model="time" :landscape="landscape"></v-time-picker>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="mb-6">
                            <v-flex xs4 offset-xs3 offset-md2 offset-lg2>
                                <v-text-field
                                name="place"
                                label="Place"
                                id="place"
                                v-model="place"
                                required></v-text-field>
                            </v-flex>
                            <v-flex xs2 offset-xs3 offset-md2 offset-lg2>
                                <v-text-field
                                name="duration"
                                label="Duration"
                                id="duration"
                                v-model="duration"
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
                <v-data-table
                    :headers="headers"
                    :items="list"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.time }}</td>
                        <td class="text-xs2">{{ props.item.name }}</td>
                        <td class="text-xs2">{{ props.item.timeDuration }}</td>
                    </template>
                    <template slot="no-data">

                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';  
export default {
    data () {
      return {
        place: '',
        duration: '',
        headers: [
          {
            text: 'Time',
            align: 'left',
            value: 'time',
          },
          { text: 'Places', value: 'name', },
          { text: 'Duration', value: 'timeDuration', },
        ],
        list: [
          
        ],
      }
    },
    computed:{
        formIsValid () {
            return this.time !== '' &&
            this.place !== '' &&
            this.duration != ''
        },
    },
    methods: {
        async addPlace() {
            this.list.push({
                time: this.time,
                name: this.place,
                timeDuration: this.duration,
                completed: false,
            })
            this.timeDuration = ''

            try {
                let body = {
                    place: this.list[this.list.length - 1].name,
                };
                let response = await axios.post('http://localhost:8000/search/', body);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

