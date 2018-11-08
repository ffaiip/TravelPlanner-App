<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          src="https://www.eaglecreek.com/sites/default/files/blog/10-great-travel-gifts-under-35-1509554666.jpg"
          aspect-ratio="2.75"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">Sign in</h1>
          </div>
        </v-card-title>
        <v-layout row>
          <v-flex xs1 offset-xs3 offset-md2 offset-lg2>
            <v-card-media
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
              aspect-ratio="1"
              height="50px"
              width="50px"
              ></v-card-media>
          </v-flex>
          <v-flex xs1 offset-xs3 offset-md2 offset-lg2>
            <v-card-media
                src="https://i0.wp.com/www.inferencelab.com/wp-content/uploads/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png?fit=1125%2C417"
                height="50px"
                width="150px"
              ></v-card-media>
          </v-flex>
        </v-layout>
        <v-card-actions >
          <v-layout row>
            <v-flex>
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
                @click="signIn">
                Sign in with Google account
              </g-signin-button>
            </v-flex>
            <v-flex>
              <v-btn 
              class="primary"
              @click="signIn"
              >Sign in with Github account</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '464916650517-c62c52q1j7jhvbuksr8a16i48d62au4t.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    signIn () {
      alert('sign in')
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>