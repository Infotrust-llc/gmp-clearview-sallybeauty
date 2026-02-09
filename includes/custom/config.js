/*
	This file is part of "GA4 Dataform Package".
	Copyright (C) 2023-2024 Superform Labs <support@ga4dataform.com>
	Artem Korneev, Jules Stuifbergen,
	Johan van de Werken, Krisztián Korpa,
	Simon Breton

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, version 3 of the License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License in the LICENSE.txt file for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
// {"name":"application_status","type":"string"},
// {"name":"action_type","type":"string"},
// {"name":"affiliation","type":"string"},
// {"name":"autofill_search_category","type":"string"},
// {"name":"brand_selected","type":"string"},
// {"name":"category","type":"string"},
// {"name":"category_hierarchy1","type":"string"},
// {"name":"category_hierarchy2","type":"string"},
// {"name":"category_hierarchy3","type":"string"},
// {"name":"category_hierarchy4","type":"string"},
// {"name":"change_type","type":"string"},
// {"name":"checkout_step_number","type":"string"},{"name":"checkout_type","type":"string"},{"name":"colorview_experience","type":"string"},{"name":"communication_type","type":"string"},{"name":"coupon","type":"string"},{"name":"cta_name","type":"string"},{"name":"currency","type":"string"},{"name":"date_booked","type":"string"},{"name":"delivery_fee","type":"string"},{"name":"error_id","type":"string"},{"name":"error_message","type":"string"},{"name":"event_location","type":"string"},{"name":"experiment_name","type":"string"},{"name":"filter_action","type":"string"},{"name":"filter_category","type":"string"},{"name":"filter_selected","type":"string"},{"name":"filter_value","type":"string"},{"name":"form_name","type":"string"},{"name":"fulfillment_method","type":"string"},{"name":"group_type","type":"string"},{"name":"interaction_type","type":"string"},{"name":"link_classes","type":"string"},{"name":"link_domain","type":"string"},{"name":"link_id","type":"string"},{"name":"link_name","type":"string"},{"name":"list_name","type":"string"},{"name":"menu_level","type":"string"},{"name":"menu_select_category","type":"string"},{"name":"method","type":"string"},{"name":"monetate_id","type":"string"},{"name":"monetate_status","type":"string"},{"name":"nav_type","type":"string"},{"name":"nav_item_selected","type":"string"},{"name":"nav_level","type":"string"},{"name":"order_discount","type":"string"},{"name":"outbound","type":"string"},{"name":"page_breadcrumb","type":"string"},{"name":"page_name","type":"string"},{"name":"page_type","type":"string"},{"name":"payment_provider","type":"string"},{"name":"payment_type","type":"string"},{"name":"personalization_value","type":"string"},{"name":"points_earned","type":"string"},{"name":"product_answer_quantity","type":"string"},{"name":"product_question_quantity","type":"string"},{"name":"product_review_quantity","type":"string"},{"name":"product_review_score","type":"string"},{"name":"promotion_name","type":"string"},{"name":"promotion_text","type":"string"},{"name":"question_1","type":"string"},{"name":"question_2","type":"string"},{"name":"question_3","type":"string"},{"name":"question_4","type":"string"},{"name":"question_5","type":"string"},{"name":"recommended_term","type":"string"},{"name":"redeemed_gift_card_ammount","type":"string"},{"name":"search_result_count","type":"string"},{"name":"search_term","type":"string"},{"name":"search_type","type":"string"},{"name":"shipping","type":"string"},{"name":"shipping_method","type":"string"},{"name":"shipping_tier","type":"string"},{"name":"sort_type_selected","type":"string"},{"name":"star_rating","type":"string"},{"name":"sub_dropdown_selection","type":"string"},{"name":"sub_value","type":"string"},{"name":"subcategory","type":"string"},{"name":"subcategory_selection","type":"string"},{"name":"talkativeAction","type":"string"},{"name":"tax","type":"string"},{"name":"time_booked","type":"string"},{"name":"tipping_amount","type":"string"},{"name":"tipping_percentage","type":"string"},{"name":"transaction_id","type":"string"},{"name":"transaction_total","type":"string"},{"name":"use_shipping_address","type":"string"},{"name":"user_id","type":"string"},{"name":"value","type":"string"},{"name":"variant","type":"string"},{"name":"video_current_type","type":"string"},{"name":"video_duration","type":"string"},{"name":"video_percent","type":"string"},{"name":"video_provider","type":"string"},{"name":"video_title","type":"string"},{"name":"video_url","type":"string"},{"name":"visible","type":"string"},{"name":"vsu_registration_type","type":"string"},{"name":"vsu_step_name","type":"string"},{"name":"vsu_step_number","type":"string"}
     {
        "name": "application_status",
        "type": "STRING"
      },
      {
        "name": "monetate_id",
        "type": "STRING"
      },
      {
        "name": "order_discount",
        "type": "STRING"
      },
      {
        "name": "personalization_value",
        "type": "STRING"
      },
      {
        "name": "fulfillment_method",
        "type": "STRING"
      },
      {
        "name": "monetate_status",
        "type": "STRING"
      },
      {
        "name": "coupon",
        "type": "STRING"
      },
      {
        "name": "page_type",
        "type": "STRING"
      },
      {
        "name": "checkout_type",
        "type": "STRING"
      },
      {
        "name": "communication_type",
        "type": "STRING"
      },
      {
        "name": "group_type",
        "type": "STRING"
      },
      {
        "name": "interaction_type",
        "type": "STRING"
      },
      {
        "name": "search_type",
        "type": "STRING"
      },
      {
        "name": "video_current_type",
        "type": "STRING"
      },
      {
        "name": "nav_type",
        "type": "STRING"
      },
      {
        "name": "payment_type",
        "type": "STRING"
      },
      {
        "name": "action_type",
        "type": "STRING"
      },
      {
        "name": "affiliation",
        "type": "STRING"
      },
      {
        "name": "autofill_search_category",
        "type": "STRING"
      },
      {
        "name": "brand_selected",
        "type": "STRING"
      },
      {
        "name": "category",
        "type": "STRING"
      },
      {
        "name": "category_hierarchy1",
        "type": "STRING"
      },
      {
        "name": "category_hierarchy2",
        "type": "STRING"
      },
      {
        "name": "category_hierarchy3",
        "type": "STRING"
      },
      {
        "name": "category_hierarchy4",
        "type": "STRING"
      },
      {
        "name": "change_type",
        "type": "STRING"
      },
      {
        "name": "checkout_step_number",
        "type": "STRING"
      },
      {
        "name": "colorview_experience",
        "type": "STRING"
      },
      {
        "name": "cta_name",
        "type": "STRING"
      },
      {
        "name": "currency",
        "type": "STRING"
      },
      {
        "name": "date_booked",
        "type": "STRING"
      },
      {
        "name": "delivery_fee",
        "type": "STRING"
      },
      {
        "name": "error_id",
        "type": "STRING"
      },
      {
        "name": "error_message",
        "type": "STRING"
      },
      {
        "name": "event_location",
        "type": "STRING"
      },
      {
        "name": "experiment_name",
        "type": "STRING"
      },
      {
        "name": "filter_action",
        "type": "STRING"
      },
      {
        "name": "filter_category",
        "type": "STRING"
      },
      {
        "name": "filter_selected",
        "type": "STRING"
      },
      {
        "name": "filter_value",
        "type": "STRING"
      },
      {
        "name": "form_name",
        "type": "STRING"
      },
      {
        "name": "link_classes",
        "type": "STRING"
      },
      {
        "name": "link_domain",
        "type": "STRING"
      },
      {
        "name": "link_id",
        "type": "STRING"
      },
      {
        "name": "link_name",
        "type": "STRING"
      },
      {
        "name": "list_name",
        "type": "STRING"
      },
      {
        "name": "menu_level",
        "type": "STRING"
      },
      {
        "name": "menu_select_category",
        "type": "STRING"
      },
      {
        "name": "method",
        "type": "STRING"
      },
      {
        "name": "nav_item_selected",
        "type": "STRING"
      },
      {
        "name": "nav_level",
        "type": "STRING"
      },
      {
        "name": "outbound",
        "type": "STRING"
      },
      {
        "name": "page_breadcrumb",
        "type": "STRING"
      },
      {
        "name": "page_name",
        "type": "STRING"
      },
      {
        "name": "payment_provider",
        "type": "STRING"
      },
      {
        "name": "points_earned",
        "type": "STRING"
      },
      {
        "name": "product_answer_quantity",
        "type": "STRING"
      },
      {
        "name": "product_question_quantity",
        "type": "STRING"
      },
      {
        "name": "product_review_quantity",
        "type": "STRING"
      },
      {
        "name": "product_review_score",
        "type": "STRING"
      },
      {
        "name": "promotion_name",
        "type": "STRING"
      },
      {
        "name": "promotion_text",
        "type": "STRING"
      },
      {
        "name": "question_1",
        "type": "STRING"
      },
      {
        "name": "question_2",
        "type": "STRING"
      },
      {
        "name": "question_3",
        "type": "STRING"
      },
      {
        "name": "question_4",
        "type": "STRING"
      },
      {
        "name": "question_5",
        "type": "STRING"
      },
      {
        "name": "recommended_term",
        "type": "STRING"
      },
      {
        "name": "redeemed_gift_card_ammount",
        "type": "STRING"
      },
      {
        "name": "search_result_count",
        "type": "STRING"
      },
      {
        "name": "search_term",
        "type": "STRING"
      },
      {
        "name": "shipping",
        "type": "STRING"
      },
      {
        "name": "shipping_method",
        "type": "STRING"
      },
      {
        "name": "shipping_tier",
        "type": "STRING"
      },
      {
        "name": "sort_type_selected",
        "type": "STRING"
      },
      {
        "name": "star_rating",
        "type": "STRING"
      },
      {
        "name": "sub_dropdown_selection",
        "type": "STRING"
      },
      {
        "name": "sub_value",
        "type": "STRING"
      },
      {
        "name": "subcategory",
        "type": "STRING"
      },
      {
        "name": "subcategory_selection",
        "type": "STRING"
      },
      {
        "name": "talkativeAction",
        "type": "STRING"
      },
      {
        "name": "tax",
        "type": "STRING"
      },
      {
        "name": "time_booked",
        "type": "STRING"
      },
      {
        "name": "tipping_amount",
        "type": "STRING"
      },
      {
        "name": "tipping_percentage",
        "type": "STRING"
      },
      {
        "name": "transaction_id",
        "type": "STRING"
      },
      {
        "name": "transaction_total",
        "type": "STRING"
      },
      {
        "name": "use_shipping_address",
        "type": "STRING"
      },
      {
        "name": "user_id",
        "type": "STRING"
      },
      {
        "name": "value",
        "type": "STRING"
      },
      {
        "name": "variant",
        "type": "STRING"
      },
      {
        "name": "video_duration",
        "type": "STRING"
      },
      {
        "name": "video_percent",
        "type": "STRING"
      },
      {
        "name": "video_provider",
        "type": "STRING"
      },
      {
        "name": "video_title",
        "type": "STRING"
      },
      {
        "name": "video_url",
        "type": "STRING"
      },
      {
        "name": "visible",
        "type": "STRING"
      },
      {
        "name": "vsu_registration_type",
        "type": "STRING"
      },
      {
        "name": "vsu_step_name",
        "type": "STRING"
      },
      {
        "name": "vsu_step_number",
        "type": "STRING"
      }
    
],

  // user properties
  // example:
  // CUSTOM_USER_PROPERTIES_ARRAY: [
  //    { name: "lifetime_value",   type: "decimal" }
  // ],
CUSTOM_USER_PROPERTIES_ARRAY: [
// {"name":"application_status","type":"string"},
// {"name":"customer_id","type":"string"},
// {"name":"email_subscriber","type":"string"},
// {"name":"join_rewards","type":"string"},
// {"name":"login_status","type":"string"},
// {"name":"loyalty_id","type":"string"},
// {"name":"remember_me_selected","type":"string"},
// {"name":"rewards_availability","type":"string"},
// {"name":"rewards_status","type":"string"},
// {"name":"rewards_points","type":"string"},
// {"name":"reward_card_type","type":"string"},
// {"name":"salesforce_contact_id","type":"string"},
// {"name":"signed_in_with_user_id","type":"string"},
// {"name":"store_id","type":"string"},
// {"name":"store_name","type":"string"},
// {"name":"text_subscriber","type":"string"},
// {"name":"user_group","type":"string"},
// {"name":"user_segment","type":"string"}
 {
        "name": "customer_id",
        "type": "STRING"
      },
      {
        "name": "login_status",
        "type": "STRING"
      },
      {
        "name": "email_subscriber",
        "type": "STRING"
      },
      {
        "name": "text_subscriber",
        "type": "STRING"
      },
      {
        "name": "remember_me_selected",
        "type": "STRING"
      },
      {
        "name": "join_rewards",
        "type": "STRING"
      },
      {
        "name": "reward_card_type",
        "type": "STRING"
      },
      {
        "name": "application_status",
        "type": "STRING"
      },
      {
        "name": "loyalty_id",
        "type": "STRING"
      },
      {
        "name": "rewards_availability",
        "type": "STRING"
      },
      {
        "name": "rewards_status",
        "type": "STRING"
      },
      {
        "name": "rewards_points",
        "type": "STRING"
      },
      {
        "name": "salesforce_contact_id",
        "type": "STRING"
      },
      {
        "name": "signed_in_with_user_id",
        "type": "STRING"
      },
      {
        "name": "store_id",
        "type": "STRING"
      },
      {
        "name": "store_name",
        "type": "STRING"
      },
      {
        "name": "user_group",
        "type": "STRING"
      },
      {
        "name": "user_segment",
        "type": "STRING"
      }
],

 CUSTOM_ITEM_PARAMS_TO_EXCLUDE: [], // by default,  all custom arams are unnested except thse listed here
  // item custom dimensions and metrics
  // these will appear in `items.item_params_custom.*`
  // example:
  // CUSTOM_ITEM_PARAMS_ARRAY: [
  //    { name: "stock_status", type: "string" }
  // ]
  CUSTOM_ITEM_PARAMS_ARRAY: [
// {"name":"discount","type":"string"},{"name":"index","type":"string"},{"name":"item_badge_name","type":"string"},{"name":"item_brand","type":"string"},{"name":"item_bundle","type":"string"},{"name":"item_category","type":"string"},{"name":"item_category2","type":"string"},{"name":"item_category3","type":"string"},{"name":"item_category4","type":"string"},{"name":"item_color","type":"string"},{"name":"item_color_selection","type":"string"},{"name":"item_coupon","type":"string"},{"name":"item_free_from","type":"string"},{"name":"item_free_gift","type":"string"},{"name":"item_fulfillment_method","type":"string"},{"name":"item_gift_card","type":"string"},{"name":"item_hair_color_type","type":"string"},{"name":"item_id","type":"string"},{"name":"item_in_wishlist","type":"string"},{"name":"item_list_id","type":"string"},{"name":"item_list_name","type":"string"},{"name":"item_name","type":"string"},{"name":"item_out_of_scope","type":"string"},{"name":"item_oos","type":"string"},{"name":"item_possible_fulfillment_method","type":"string"},{"name":"item_protection_plan","type":"string"},{"name":"item_promo","type":"string"},{"name":"item_refinement_color","type":"string"},{"name":"item_review_count","type":"string"},{"name":"item_review_quantity","type":"string"},{"name":"item_review_score","type":"string"},{"name":"item_sku","type":"string"},{"name":"item_sub_brand","type":"string"},{"name":"item_variant","type":"string"},{"name":"item_variant_name","type":"string"},{"name":"price","type":"string"},{"name":"quantity","type":"string"}
   {
        "name": "item_badge_name",
        "type": "STRING"
      },
      {
        "name": "item_color",
        "type": "STRING"
      },
      {
        "name": "item_coupon",
        "type": "STRING"
      },
      {
        "name": "item_free_from",
        "type": "STRING"
      },
      {
        "name": "item_free_gift",
        "type": "STRING"
      },
      {
        "name": "item_fulfillment_method",
        "type": "STRING"
      },
      {
        "name": "item_hair_color_type",
        "type": "STRING"
      },
      {
        "name": "item_in_wishlist",
        "type": "STRING"
      },
      {
        "name": "item_possible_fulfillment_method",
        "type": "STRING"
      },
      {
        "name": "item_protection_plan",
        "type": "STRING"
      },
      {
        "name": "item_review_quantity",
        "type": "STRING"
      },
      {
        "name": "item_review_score",
        "type": "STRING"
      },
      {
        "name": "item_sub_brand",
        "type": "STRING"
      },
      {
        "name": "item_variant_name",
        "type": "STRING"
      },
      {
        "name": "discount",
        "type": "STRING"
      },
      {
        "name": "index",
        "type": "STRING"
      },
      {
        "name": "item_brand",
        "type": "STRING"
      },
      {
        "name": "item_bundle",
        "type": "STRING"
      },
      {
        "name": "item_category",
        "type": "STRING"
      },
      {
        "name": "item_category2",
        "type": "STRING"
      },
      {
        "name": "item_category3",
        "type": "STRING"
      },
      {
        "name": "item_category4",
        "type": "STRING"
      },
      {
        "name": "item_color_selection",
        "type": "STRING"
      },
      {
        "name": "item_gift_card",
        "type": "STRING"
      },
      {
        "name": "item_id",
        "type": "STRING"
      },
      {
        "name": "item_list_id",
        "type": "STRING"
      },
      {
        "name": "item_list_name",
        "type": "STRING"
      },
      {
        "name": "item_name",
        "type": "STRING"
      },
      {
        "name": "item_out_of_scope",
        "type": "STRING"
      },
      {
        "name": "item_oos",
        "type": "STRING"
      },
      {
        "name": "item_promo",
        "type": "STRING"
      },
      {
        "name": "item_refinement_color",
        "type": "STRING"
      },
      {
        "name": "item_review_count",
        "type": "STRING"
      },
      {
        "name": "item_sku",
        "type": "STRING"
      },
      {
        "name": "item_variant",
        "type": "STRING"
      },
      {
        "name": "price",
        "type": "STRING"
      },
      {
        "name": "quantity",
        "type": "STRING"
      }
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
