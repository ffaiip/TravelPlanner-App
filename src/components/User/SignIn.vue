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
                @success="onSignInSuccessGoogle"
                @error="onSignInErrorGoogle"
                @click="signIn">
                Sign in with Google account
              </g-signin-button>
            </v-flex>
            <v-flex>
              <fb-signin-button
                :params="fbSignInParams"
                @success="onSignInSuccessFB"
                @error="onSignInErrorFB">
                Sign in with Facebook
              </fb-signin-button>
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
      },
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  methods: {
    signIn () {
      alert('sign in')
    },
    onSignInSuccessGoogle (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
    },
    onSignInErrorGoogle (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    onSignInSuccess (response) {
      FB.api('/me', dude => {
        console.log(`Good to see you, ${dude.name}.`)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
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
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>