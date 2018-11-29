'use strict'
require('dotenv/config');
module.exports = {
  NODE_ENV: '"production"',
  API_KEY: JSON.stringify(process.env.VUE_APP_KEY),
  OAUTH_KEY: JSON.stringify(process.env.VUE_APP_OAUTH),
  SEARCH: '"https://travel-planner-develop.herokuapp.com/search/"',
  TIME_REMAIN: '"https://travel-planner-develop.herokuapp.com/time-remain/"',
  SAVE_DATA: '"https://travel-planner-develop.herokuapp.com/savedata/"',
  PLACE_DURATION: '"https://travel-planner-develop.herokuapp.com/place/"',
  PLAN_DATA: '"https://travel-planner-develop.herokuapp.com/plan_data/"',
  USER_DATA: '"https://travel-planner-develop.herokuapp.com/user_data/"'
}
