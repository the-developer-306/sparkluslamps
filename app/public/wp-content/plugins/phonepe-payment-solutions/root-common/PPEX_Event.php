<?php
if (!class_exists('PPEX_Event')) {
	class PPEX_Event {
		private $flow_type;
		private $event_type;
		private $grouping_key;
		private $eligibility;
		private $merchant_id;
		private $platform;
		private $merchant_transaction_id;
		private $method;
		private $transaction_id;
		private $cart_id;
		private $amount_in_paisa;
		private $code;
		private $intent_url;
		private $state;
		private $plugin_version;
		private $message;
		private $platform_version;
		private $user_operating_system;
		private $network;
		private $payment_request_supported;
		private $can_make_payment;
		private $plugin_enabled;
		private $has_enrolled_instrument;
		private $constraints;
		private $retries;
		private $environment_data;
		private $elapsed_time;
		private $timestamp;

		private $is_coupon_enabled;
		private $coupons_count;
		private $coupon_code;
		private $coupon_discount;
		private $event_state;
		private $coupon_type;
		private $api_version;


		public function set_flow_type($flow_type) {
			$this->flow_type = $flow_type;

			return $this;
		}

		public function set_event_type($event_type) {
			$this->event_type = $event_type;

			return $this;
		}

		public function set_grouping_key($grouping_key) {
			$this->grouping_key = $grouping_key;

			return $this;
		}

		public function set_eligibility($eligibility) {
			$this->eligibility = $eligibility;

			return $this;
		}

		public function set_merchant_id($merchant_id) {
			$this->merchant_id = $merchant_id;

			return $this;
		}

		public function set_platform($platform) {
			$this->platform = $platform;

			return $this;
		}

		public function set_merchant_transaction_id($merchant_transaction_id) {
			$this->merchant_transaction_id = $merchant_transaction_id;

			return $this;
		}

		public function set_method($method) {
			$this->method = $method;

			return $this;
		}

		function set_transaction_id($transaction_id) {
			$this->transaction_id = $transaction_id;

			return $this;
		}

		function set_cart_id($cart_id) {
			$this->cart_id = $cart_id;

			return $this;
		}

		function set_amount_in_paisa($amount_in_paisa) {
			$this->amount_in_paisa = $amount_in_paisa;

			return $this;
		}

		function set_code($code) {
			$this->code = $code;

			return $this;
		}

		function set_intent_url($intent_url) {
			$this->intent_url = $intent_url;

			return $this;
		}

		function set_state($state) {
			$this->state = $state;

			return $this;
		}

		function set_plugin_version($plugin_version) {
			$this->plugin_version = $plugin_version;

			return $this;
		}

		function set_message($message) {
			$this->message = $message;

			return $this;
		}

		function set_platform_version($platform_version) {
			$this->platform_version = $platform_version;

			return $this;
		}

		function set_user_operating_system($user_operating_system) {
			$this->user_operating_system = $user_operating_system;

			return $this;
		}

		function set_network($network) {
			$this->network = $network;

			return $this;
		}

		function set_payment_request_supported($payment_request_supported) {
			$this->payment_request_supported = $payment_request_supported;

			return $this;
		}

		function set_can_make_payment($can_make_payment) {
			$this->can_make_payment = $can_make_payment;

			return $this;
		}

		function set_plugin_enabled($plugin_enabled) {
			$this->plugin_enabled = $plugin_enabled;

			return $this;
		}

		function set_has_enrolled_instrument($has_enrolled_instrument) {
			$this->has_enrolled_instrument = $has_enrolled_instrument;

			return $this;
		}

		function set_constraints($constraints) {
			$this->constraints = $constraints;

			return $this;
		}

		function set_retries($retries) {
			$this->retries = $retries;

			return $this;
		}

		function set_environment_data($environment_data) {
			$this->environment_data = $environment_data;

			return $this;
		}

		function set_elapsed_time($elapsed_time) {
			$this->elapsed_time = $elapsed_time;

			return $this;
		}

		function set_timestamp($timestamp) {
			$this->timestamp = $timestamp;

			return $this;
		}

		function set_is_coupon_enabled($is_coupon_enabled) {
			$this->is_coupon_enabled = $is_coupon_enabled;

			return $this;
		}

		function set_coupons_count($coupons_count) {
			$this->coupons_count = $coupons_count;

			return $this;
		}

		function set_coupon_code($coupon_code) {
			$this->coupon_code = $coupon_code;

			return $this;
		}

		function set_coupon_discount($coupon_discount) {
			$this->coupon_discount = $coupon_discount;

			return $this;
		}

		function set_event_state($event_state) {
			$this->event_state = $event_state;

			return $this;
		}

		function set_coupon_type($coupon_type) {
			$this->coupon_type = $coupon_type;

			return $this;
		}

		function set_api_version($api_version) {
			$this->api_version = $api_version;

			return $this;
		}

		public function get_flow_type() {
			return $this->flow_type;
		}

		public function get_merchant_transaction_id() {
			return $this->merchant_transaction_id;
		}

		public function get_transaction_id() {
			return $this->transaction_id;
		}

		public function get_event_type() {
			return $this->event_type;
		}

		public function get_grouping_key() {
			return $this->grouping_key;
		}

		public function get_eligibility() {
			return $this->eligibility;
		}

		public function get_merchant_id() {
			return $this->merchant_id;
		}

		public function get_platform() {
			return $this->platform;
		}

		public function get_method() {
			return $this->method;
		}

		public function get_amount_in_paisa() {
			return $this->amount_in_paisa;
		}

		public function get_code() {
			return $this->code;
		}

		public function get_intent_url() {
			return $this->intent_url;
		}

		public function get_state() {
			return $this->state;
		}

		public function get_plugin_version() {
			return $this->plugin_version;
		}

		public function get_message() {
			return $this->message;
		}

		public function get_platform_version() {
			return $this->platform_version;
		}

		public function get_user_operating_system() {
			return $this->user_operating_system;
		}

		public function get_network() {
			return $this->network;
		}

		public function get_payment_request_supported() {
			return $this->payment_request_supported;
		}

		public function get_can_make_payment() {
			return $this->can_make_payment;
		}

		public function get_plugin_enabled() {
			return $this->plugin_enabled;
		}

		public function get_has_enrolled_instrument() {
			return $this->has_enrolled_instrument;
		}

		public function get_constraints() {
			return $this->constraints;
		}

		public function get_retries() {
			return $this->retries;
		}

		public function get_environment_data() {
			return $this->environment_data;
		}

		public function get_elapsed_time() {
			return $this->elapsed_time;
		}

		public function get_timestamp() {
			return $this->timestamp;
		}

		public function get_is_coupon_enabled() {
			return $this->is_coupon_enabled;
		}

		public function get_coupons_count() {
			return $this->coupons_count;
		}

		public function get_coupon_code() {
			return $this->coupon_code;
		}

		public function get_coupon_discount() {
			return $this->coupon_discount;
		}

		public function get_event_state() {
			return $this->event_state;
		}

		public function get_coupon_type() {
			return $this->coupon_type;
		}

		public function get_api_version() {
			return $this->api_version;
		}

		/**
		 * Transforms object into array and returns it
		 *
		 * @return  self
		 */

		public function to_array() {
			return [
				'flowType' => $this->flow_type,
				'eventType' => $this->event_type,
				'groupingKey' => $this->grouping_key,
				'eligibility' => $this->eligibility,
				'platform' => $this->platform,
				'merchantId' => $this->merchant_id,
				'merchantTransactionId' => $this->merchant_transaction_id,
				'transactionId' => $this->transaction_id,
				'cartId' => $this->cart_id,
				'method' => $this->method,
				'amount' => $this->amount_in_paisa,
				'intentUrl' => $this->intent_url,
				'code' => $this->code,
				'state' => $this->state,
				'message' => $this->message,
				'pluginVersion' => $this->plugin_version,
				'platformVersion' => $this->platform_version,
				'network' => $this->network,
				'userOperatingSystem' => $this->user_operating_system,
				'paymentRequestSupported' => $this->payment_request_supported,
				'pluginEnabled' => $this->plugin_enabled,
				'canMakePayment' => $this->can_make_payment,
				'hasEnrolledInstrument' => $this->has_enrolled_instrument,
				'retries' => $this->retries,
				'constraints' => $this->constraints,
				'elapsedTime' => $this->elapsed_time,
				'timestamp' => $this->timestamp,
				'isCouponEnabled' => $this->is_coupon_enabled,
				'couponsCount' => $this->coupons_count,
				'couponCode' => $this->coupon_code,
				'couponDiscount' => $this->coupon_discount,
				'eventState' => $this->event_state,
				'couponType' => $this->coupon_type,
				'apiVersion' => $this->api_version,
			];
		}

		/**
		 * Transforms array into object and returns it
		 *
		 * @return  self
		 */
		public function from_array($array) {
			$this->set_flow_type(isset($array['flowType']) ? $array['flowType'] : null);
			$this->set_event_type(isset($array['eventType']) ? $array['eventType'] : null);
			$this->set_grouping_key(isset($array['groupingKey']) ? $array['groupingKey'] : null);
			$this->set_eligibility(isset($array['eligibility']) ? $array['eligibility'] : null);
			$this->set_merchant_id(isset($array['merchantId']) ? $array['merchantId'] : null);
			$this->set_platform(isset($array['platform']) ? $array['platform'] : null);
			$this->set_merchant_transaction_id(isset($array['merchantTransactionId']) ? $array['merchantTransactionId'] : null);
			$this->set_method(isset($array['method']) ? $array['method'] : null);
			$this->set_transaction_id(isset($array['transactionId']) ? $array['transactionId'] : null);
			$this->set_cart_id(isset($array['cartId']) ? $array['cartId'] : null);
			$this->set_amount_in_paisa(isset($array['amount']) ? $array['amount'] : null);
			$this->set_code(isset($array['code']) ? $array['code'] : null);
			$this->set_intent_url(isset($array['intent_url']) ? $array['intent_url'] : null);
			$this->set_state(isset($array['state']) ? $array['state'] : null);
			$this->set_plugin_version(isset($array['pluginVersion']) ? $array['pluginVersion'] : null);
			$this->set_message(isset($array['message']) ? $array['message'] : null);
			$this->set_platform_version(isset($array['platformVersion']) ? $array['platformVersion'] : null);
			$this->set_user_operating_system(isset($array['userOperatingSystem']) ? $array['userOperatingSystem'] : null);
			$this->set_network(isset($array['network']) ? $array['network'] : null);
			$this->set_payment_request_supported(isset($array['paymentRequestSupported']) ? $array['paymentRequestSupported'] : null);
			$this->set_can_make_payment(isset($array['canMakePayment']) ? $array['canMakePayment'] : null);
			$this->set_plugin_enabled(isset($array['pluginEnabled']) ? $array['pluginEnabled'] : null);
			$this->set_has_enrolled_instrument(isset($array['hasEnrolledInstrument']) ? $array['hasEnrolledInstrument'] : null);
			$this->set_constraints(isset($array['constraints']) ? $array['constraints'] : null);
			$this->set_retries(isset($array['retries']) ? $array['retries'] : null);
			$this->set_environment_data(isset($array['environmentData']) ? $array['environmentData'] : null);
			$this->set_elapsed_time(isset($array['elapsedTime']) ? $array['elapsedTime'] : null);
			$this->set_timestamp(isset($array['timestamp']) ? $array['timestamp'] : null);
			$this->set_is_coupon_enabled(isset($array['isCouponEnabled']) ? $array['isCouponEnabled'] : null);
			$this->set_coupons_count(isset($array['couponCount']) ? $array['couponCount'] : null);
			$this->set_coupon_code(isset($array['couponCode']) ? $array['couponCode'] : null);
			$this->set_coupon_discount(isset($array['couponDiscount']) ? $array['couponDiscount'] : null);
			$this->set_event_state(isset($array['eventState']) ? $array['eventState'] : null);
			$this->set_coupon_type(isset($array['couponType']) ? $array['couponType'] : null);
			$this->set_api_version(isset($array['apiVersion']) ? $array['apiVersion'] : null);

			return $this;
		}
	}
}
