'use strict'
require('dotenv/config');
module.exports = {
  NODE_ENV: '"production"',
  API_KEY: JSON.stringify(process.env.VUE_APP_KEY),
  OAUTH_KEY: JSON.stringify(process.env.VUE_APP_OAUTH)
}
