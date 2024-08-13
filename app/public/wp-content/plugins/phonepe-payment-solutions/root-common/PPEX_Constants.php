<?php

/**
 * PPEX_Constants
 */
if (!class_exists('PPEX_Constants')) {
	class PPEX_Constants {
		const STAGE                                 = "STAGE";
		const UAT                                   = "UAT";
		const PRODUCTION                            = "PRODUCTION";

		const PPBASE_URL_PROD                       = "https://api.phonepe.com/apis/hermes";
		const PPBASE_URL_STAGE                      = "https://api-testing.phonepe.com/apis/hermes";
		const PPBASE_URL_UAT                        = "https://api-preprod.phonepe.com/apis/pg-sandbox";


		const PPBASE_URL_PROD_EVENTS                 = "https://api.phonepe.com/apis/tyche";
		const PPBASE_URL_STAGE_EVENTS                = "https://api-testing.phonepe.com/apis/hermes";
		const PPBASE_URL_UAT_EVENTS                  = "https://api-preprod.phonepe.com/apis/tyche";

		//const PPBASE_URL_STAGE                      = "http://hermes.nixy.stg-drove.phonepe.nb6";


		const STAGE_SCRIPT                          = "https://mercury-stg.phonepe.com/web/bundle/checkout.js";
		const PROD_SCRIPT                           = "https://mercury.phonepe.com/web/bundle/checkout.js";
		const UAT_SCRIPT                            = "https://mercury-stg.phonepe.com/web/bundle/checkout.js";

		const APPINTENT_PROD_SCRIPT            = "https://mercury.phonepe.com/web/bundle/expressbuy.js";
		const APPINTENT_UAT_SCRIPT             = "https://mercury-stg.phonepe.com/web/bundle/expressbuy.js";
		const APPINTENT_STAGE_SCRIPT           = "https://mercury-stg.phonepe.com/web/bundle/expressbuy.js";

		const MERCHANT_SUPPORT_EMAIL_ID              = "merchant-pgsupport@phonepe.com";

		const SUCCESS                               = "PAYMENT_SUCCESS";
		const PENDING                                = "PAYMENT_PENDING";
		const SERVER_ERROR                          = "INTERNAL_SERVER_ERROR";
		const TXN_NOT_FOUND                          = "TRANSACTION_NOT_FOUND";
		const DECLINED                              = "PAYMENT_DECLINED";
		const FAILED                                = "PAYMENT_FAILED";
		const ERROR                                  = "PAYMENT_ERROR";

		const ORDER_UPDATE_SUCCESS                  = "ORDER_UPDATE_SUCCESS";
		const ORDER_UPDATE_FAILED                    = "ORDER_UPDATE_FAILED";
		const SAVE_USER_ADDRESS_SUCCESS              = "SAVE_USER_ADDRESS_SUCCESS";
		const SAVE_USER_ADDRESS_FAILED              = "SAVE_USER_ADDRESS_FAILED";
		const ORDER_INIT_FAILED                     = "ORDER_INIT_FAILED";

		const MAX_RETRY_COUNT                        = 5;
		const CONNECT_TIMEOUT_IN_SECONDS            = 10;
		const TIMEOUT_IN_SECONDS                    = 10;

		const PAY_BUTTON_CLICKED_ON_MERCHANT_CHECKOUT   = "PAY_BUTTON_CLICKED_ON_MERCHANT_CHECKOUT";
		const PAYMENT_REQUEST_TRIGGERED_FROM_PLUGIN     = "PAYMENT_REQUEST_TRIGGERED_FROM_PLUGIN";
		const PAYMENT_RESPONSE_RECEIVED_AT_PLUGIN       = "PAYMENT_RESPONSE_RECEIVED_AT_PLUGIN";
		const PLUGIN_HAS_LAUNCHED_PAY_PAGE              = "PLUGIN_HAS_LAUNCHED_PAY_PAGE";
		const PLUGIN_STATUS_CHECK                        = "PLUGIN_STATUS_CHECK";
		const PLUGIN_HAS_GIVEN_CONTROL_BACK_TO_MERCHANT = "PLUGIN_HAS_GIVEN_CONTROL_BACK_TO_MERCHANT";
		const CALLBACK_RECIEVED_AT_PLUGIN                = "CALLBACK_RECIEVED_AT_PLUGIN";

		const PHONEPE_CHECKOUT_FAILURE                  = "PHONEPE_CHECKOUT_FAILURE";
		const ORDER_INIT                                = "ORDER_INIT";
		const ORDER_UPDATE                              = "ORDER_UPDATE";
		const SAVE_USER_ADDRESS                          = "SAVE_USER_ADDRESS";
		const COD_ORDER_PLACED                          = "COD_ORDER_PLACED";
		const CHANGES_SAVED_AND_PLUGIN_ACTIVATED        = "CHANGES_SAVED_AND_PLUGIN_ACTIVATED";

		const PAYPAGE_NOT_RENDERED                      = "PAYPAGE_NOT_RENDERED";
		const PAY_BUTTON_CLICKED_ON_PLUGIN_BOTTOM_SHEET   = "PAY_BUTTON_CLICKED_ON_PLUGIN_BOTTOM_SHEET";
		const PAYMENT_RESPONSE_RECEIVED_AT_PLUGIN_BOTTOM_SHEET       = "PAYMENT_RESPONSE_RECEIVED_AT_PLUGIN_BOTTOM_SHEET";
		const CALLBACK_RECEIVED_AT_PLUGIN_BOTTOM_SHEET              = "CALLBACK_RECEIVED_AT_PLUGIN_BOTTOM_SHEET";
	}
}
