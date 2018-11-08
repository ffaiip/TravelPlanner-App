<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-form>
            <v-layout row class="mb-6">
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
              @click="addPlace"
              >Add place</v-btn>
          </v-card-actions>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-divider
                v-if="item.divider"
                :inset="item.inset"
                :key="index"
              ></v-divider>

              <v-list-tile
                v-else
                :key="item.title"
                avatar
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.spendtime"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        spendtime: '',
        items: [],
      }
    },

    methods: {
      addPlace () {
        this.items.push({
          avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
          title: 'Brunch this weekend?',
          spendtime: this.spendtime,
          completed: false,
        },
        { divider: true, inset: true },),
        this.spendtime = ''
      },
    },
  }
</script>