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
{"name":"vsu_step_number","type":"int"},{"name":"order_details_shared","type":"int"},{"name":"user_type","type":"string"},{"name":"gclsrc","type":"string"},{"name":"vsu_step_name","type":"string"},{"name":"fulfillment_method","type":"string"},{"name":"campaign_id","type":"string"},{"name":"password_action_type","type":"string"},{"name":"nav_level","type":"string"},{"name":"nav_item_selected","type":"int"},{"name":"page_name","type":"string"},{"name":"login_status","type":"string"},{"name":"affiliation","type":"string"},{"name":"delivery_fee","type":"decimal"},{"name":"checkout_step_number","type":"int"},{"name":"nav_type","type":"string"},{"name":"firebase_conversion","type":"int"},{"name":"debug_mode","type":"int"},{"name":"unique_search_term","type":"int"},{"name":"page_type","type":"string"},{"name":"autofill_search_category","type":"string"},{"name":"remember_me_selected","type":"string"},{"name":"page_breadcrumb","type":"string"},{"name":"tipping_amount","type":"decimal"},{"name":"order_discount","type":"decimal"},{"name":"recommended_term","type":"decimal"},{"name":"tipping_percentage","type":"decimal"},{"name":"search_result_count","type":"int"},{"name":"step_number","type":"int"},{"name":"step_name","type":"string"},{"name":"filter_category","type":"string"},{"name":"filter_action","type":"string"},{"name":"sort_selected","type":"string"},{"name":"filter_selected","type":"string"},{"name":"category_hierarchy1","type":"string"},{"name":"category_hierarchy3","type":"string"},{"name":"category_hierarchy2","type":"string"},{"name":"dw_id","type":"int"},{"name":"event_location","type":"string"},{"name":"category_hierarchy4","type":"string"},{"name":"customer_id","type":"string"},{"name":"is_email_subscriber","type":"string"},{"name":"vsu_registration_type","type":"string"},{"name":"error_message","type":"string"},{"name":"list_name","type":"string"},{"name":"filter_value","type":"int"},{"name":"marketing_tactic","type":"string"},{"name":"source_platform","type":"string"},{"name":"event___cplocation","type":"string"},{"name":"personalization_value","type":"string"},{"name":"monetate_id","type":"string"},{"name":"monetate_status","type":"string"},{"name":"creative_format","type":"string"},{"name":"gad_source","type":"string"},{"name":"gad_campaignid","type":"string"},{"name":"nav_menu_type","type":"string"},{"name":"nav_menu_level","type":"string"},{"name":"nav_click_text","type":"string"},{"name":"cc_value","type":"string"},{"name":"product_review_quantity","type":"int"},{"name":"product_review_score","type":"decimal"}

],

  // user properties
  // example:
  // CUSTOM_USER_PROPERTIES_ARRAY: [
  //    { name: "lifetime_value",   type: "decimal" }
  // ],
CUSTOM_USER_PROPERTIES_ARRAY: [
 {"name":"dw_id","type":"int"},{"name":"vsu_employee_level","type":"string"},{"name":"vsu_professional_level","type":"string"},{"name":"vsu_employee_type","type":"string"},{"name":"user_id","type":"string"},{"name":"vsu_professional_type","type":"string"},{"name":"login_status","type":"string"},{"name":"user_type","type":"string"},{"name":"is_email_subscriber","type":"string"},{"name":"customer_id","type":"string"},{"name":"account_type","type":"string"},{"name":"child_account","type":"string"},{"name":"date_of_last_purchase","type":"int"},{"name":"communication_pref","type":"string"},{"name":"account_owner","type":"string"},{"name":"prevenue_28d","type":"string"},{"name":"salesforce_contact_id","type":"string"},{"name":"store_name","type":"string"},{"name":"user_segment","type":"string"},{"name":"store_id","type":"int"},{"name":"user_group","type":"string"}

],

 CUSTOM_ITEM_PARAMS_TO_EXCLUDE: [], // by default,  all custom arams are unnested except thse listed here
  // item custom dimensions and metrics
  // these will appear in `items.item_params_custom.*`
  // example:
  // CUSTOM_ITEM_PARAMS_ARRAY: [
  //    { name: "stock_status", type: "string" }
  // ]
  CUSTOM_ITEM_PARAMS_ARRAY: [
{"name":"dimension53","type":"string"},{"name":"item_badge_name","type":"string"},{"name":"dimension75","type":"string"},{"name":"dimension62","type":"string"},{"name":"dimension52","type":"string"},{"name":"dimension64","type":"string"},{"name":"dimension79","type":"int"},{"name":"dimension76","type":"string"},{"name":"dimension57","type":"string"},{"name":"item_variant_name","type":"string"},{"name":"item_fulfillment_method","type":"string"},{"name":"dimension59","type":"string"},{"name":"item_sub_brand","type":"string"},{"name":"dimension56","type":"string"},{"name":"dimension77","type":"string"},{"name":"item_coupon","type":"int"},{"name":"metric5","type":"int"},{"name":"metric3","type":"decimal"},{"name":"metric4","type":"decimal"},{"name":"item_badge_value","type":"string"},{"name":"item_possible_fulfillment_method","type":"string"},{"name":"item_cateogry","type":"string"},{"name":"brand","type":"string"},{"name":"image_url","type":"string"},{"name":"url","type":"string"},{"name":"promotion_name","type":"string"},{"name":"promotion_id","type":"string"},{"name":"creative_slot","type":"int"}

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
