  /*
  This file is part of "GMP Clearview" package.
  Copyright (C)  2025 Infotrust 
  Alina Zilbergerts, Trish Dothkar,
  -- */
  
// do not remove this line
const { helpers } = require("../core/helpers");
const lowerSQL = helpers.lowerSQL;

/*
    ga4dataform runs the core model with SQL that can be tweaked with
    configuration settings in this file.

    Below, you will find a sample config file that you can tweak to
    your likings.

    See the documentation for all details.

    There are more configuration settings than in this sample file.
    See core/config.js for all config parameters
*/

// config object should be a valid javascript object


const customConfig = {
  // on a new or full build, this start date will be picked

  GA4_START_DATE: "2024-10-01",

  // custom definitions
  // a very complete list of all recommended and standard event parameters is
  // included in the `event_params` column.
  // If you have custom definitions, add them here and they will appear in 
  // the `events_params_custom` column.

  // all custom_ arrays should be in the form:
  // 
  // { name: "paramname", type: "TYPE", renameTo: "outputcolumnname" }
  //
  // "paramname" will be extracted from the data (event param / user property / item custom dim / url parameter)
  // TYPE will be the column type.
  // - "int" -> look for int_value, store as INT
  // - "string" -> look for all values, store as STRING
  // - "decimal" -> look for all numerical values, store as FLOAT
  // options:
  // - "renameTo" -> name the output column to this name. Default: "paramname" will be used
  // cleaningMethod: lowerSQL -> transform the output (of strings) to lower case

  CUSTOM_EVENT_PARAMS_TO_EXCLUDE: ['batch_event_index','batch_ordering_id','batch_page_id'], // by default,  all custom arams are unnested except thse listed here
  // event dimensions and metrics
  // example:
  // CUSTOM_EVENT_PARAMS_ARRAY: [
  //    { name: "event_value", type: "decimal" },
  //    { name: "event_value", type: "string", renameTo: "event_value_string" }
  // ],
  CUSTOM_EVENT_PARAMS_ARRAY: [
  // example set: this will populate 5 fields in the `event_params_custom` column in the `ga4_events` table
  // known limitation: the output column names must be valid. use letters and underscores to be safe 
    {  type: "string",  name: "application_status" },
    {  type: "string",  name: "monetate_id" },
    {  type: "string",  name: "order_discount" },
    {  type: "string",  name: "personalization_value" },
    {  type: "string",  name: "fulfillment_method" },
    {  type: "string",  name: "monetate_status" },
    {  type: "string",  name: "coupon" },
    {  type: "string",  name: "page_type" },
    {  type: "string",  name: "checkout_type" },
    {  type: "string",  name: "communication_type" },
    {  type: "string",  name: "group_type" },
    {  type: "string",  name: "interaction_type" },
    {  type: "string",  name: "search_type" },
    {  type: "string",  name: "video_current_type" },
    {  type: "string",  name: "nav_type" },
    {  type: "string",  name: "payment_type" }
],

  // user properties
  // example:
  // CUSTOM_USER_PROPERTIES_ARRAY: [
  //    { name: "lifetime_value",   type: "decimal" }
  // ],
CUSTOM_USER_PROPERTIES_ARRAY: [
    {  type: "string",  name: "customer_id" },   
    {  type: "string", name: "login_status" },
    {  type: "string",  name: "email_subscriber" },
    {  type: "string",  name: "text_subscriber" },
    {  type: "string",  name: "remember_me_selected" },
    {  type: "string",  name: "join_rewards" },
    {  type: "string",  name: "reward_card_type" }
],

 CUSTOM_ITEM_PARAMS_TO_EXCLUDE: [], // by default,  all custom arams are unnested except thse listed here
  // item custom dimensions and metrics
  // these will appear in `items.item_params_custom.*`
  // example:
  // CUSTOM_ITEM_PARAMS_ARRAY: [
  //    { name: "stock_status", type: "string" }
  // ]
  CUSTOM_ITEM_PARAMS_ARRAY: [
    {  type: "string",  name: "item_badge_name" },   
    {  type: "string", name: "item_color" },
    {  type: "string",  name: "item_coupon" },
    {  type: "string",  name: "item_free_from" },
    {  type: "string",  name: "item_free_gift" },
    {  type: "string",  name: "item_fulfillment_method" },
    {  type: "string",  name: "item_hair_color_type" },
    {  type: "string",  name: "item_in_wishlist" },
    {  type: "string",  name: "item_possible_fulfillment_method" },
    {  type: "string",  name: "item_protection_plan" },
    {  type: "string",  name: "item_review_quantity" },
    {  type: "string",  name: "item_review_score" },
    {  type: "string",  name: "item_sub_brand" },
    {  type: "string",  name: "item_variant_name" }
  ],

  // URL parameters to extract to own column
  // (note: all standard utm params are already extracted to `url_params`)
  // custom url params will appear in `url_params_custom`
  // (this does NOT support the "type" key: only strings are supported)

  // Examples based on internal search engine params:
  //   CUSTOM_URL_PARAMS_ARRAY: [
  //      { name: "q", cleaningMethod: lowerSQL },
  //      { name: "s", cleaningMethod: lowerSQL },
  //      { name: "search",cleaningMethod: lowerSQL }
  //   ],
  CUSTOM_URL_PARAMS_ARRAY: [],

  // filters
  // array: list the event names you want to exclude from the events table 
  EVENTS_TO_EXCLUDE: [],
  // arrays: list the hostnames you want to exclude (or include) from the events table
  // for including/excluding NULL values, use the empty string ( "" )
  HOSTNAME_EXCLUDE: [],
  HOSTNAME_INCLUDE_ONLY: [],


// Key events to include as metrics. up to 5
  KEY_EVENTS_ARRAY: ["view_item","add_to_cart","view_cart","begin_checkout","purchase","login","vsu_complete"],


  // Set this to true to enable "Organic AI" (and possible other future channels that
  // are not compatible with GA4)
  EXTRA_CHANNEL_GROUPS: true,

  // attribution
  // if a visitors lands on your site without a source, we look back to
  // find a previous session of this user with a source. How many days?
  LAST_NON_DIRECT_LOOKBACK_DAYS: 90,

  // by default, we leave duplicate transaction_ids alone, but you can deduplicate here
  // note: setting this to true will still keep all transactions with NULL transaction_id
  TRANSACTIONS_DEDUPE: true,

  // we keep a running count for transactions, based on an identifier. Defaults to "user_pseudo_id"
  // if you have an other one, you can change it here (e.g. "user_id" - make sure it's a valid column)
  TRANSACTION_TOTALS_UID: 'user_pseudo_id',

  // assertions and quality checks can be toggled on (true) or off (false) here
  // quality checks can be toggled off by changing to false

  // assertions
  // id uniqueness checks
  ASSERTIONS_EVENT_ID_UNIQUENESS: false,
  ASSERTIONS_SESSION_ID_UNIQUENESS: false,

  // check for session durations and events look valid?
  ASSERTIONS_SESSION_DURATION_VALIDITY: false,
  ASSERTIONS_SESSIONS_VALIDITY: false, 
  // check GA4 tables: are they on time?
  ASSERTIONS_TABLES_TIMELINESS: false,
  // check for a transaction IDs on a purchase?
  ASSERTIONS_TRANSACTION_ID_COMPLETENESS: false,
  // check for cookies on all hits? (note: cookieless pings will trigger a fail)
  ASSERTIONS_USER_PSEUDO_ID_COMPLETENESS: false,
  // check aginst data that we pull for API directly fro GA4 UI
  ASSERTIONS_API_DATA_CHECK: true

}



module.exports = {
    customConfig
};
