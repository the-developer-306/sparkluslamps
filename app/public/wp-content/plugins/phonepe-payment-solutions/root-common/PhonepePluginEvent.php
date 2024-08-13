<?php

if (!class_exists('PPEC_PhonepePluginEvent')) {
	class PPEC_PhonepePluginEvent {
		public $flowType;
		public $groupingKey;
		public $eventType;
		public $eligibility;
		public $platform;
		public $merchantId;
		public $merchantTransactionId;
		public $transactionId;
		public $method;
		public $amount;
		public $intentUrl;
		public $code;
		public $state;
		public $message;
		public $pluginVersion;
		public $platformVersion;
		public $network;
		public $userOperatingSystem;
		public $paymentRequestSupported;
		public $pluginEnabled;
		public $canMakePayment;
		public $hasEnrolledInstrument;
		public $retries;
		public $constraints;
		public $elapsedTime;
		public $timestamp;

		// Express buy Coupons fields
		public $isCouponEnabled;
		public $couponsCount;
		public $couponCode;
		public $couponDiscount;
		public $eventState;
		public $couponType;

		public function __construct() {
		}

		/**
		 * Set the value of flowType
		 *
		 * @return  self
		 */
		public function set_flowType($flowType) {
			$this->flowType = $flowType;

			return $this;
		}

		/**
		 * Set the value of groupingKey
		 *
		 * @return  self
		 */
		public function set_groupingKey($groupingKey) {
			$this->groupingKey = $groupingKey;

			return $this;
		}

		/**
		 * Set the value of eventType
		 *
		 * @return  self
		 */
		public function set_eventType($eventType) {
			$this->eventType = $eventType;

			return $this;
		}

		/**
		 * Set the value of eligibility
		 *
		 * @return  self
		 */
		public function set_eligibility($eligibility) {
			$this->eligibility = $eligibility;

			return $this;
		}

		/**
		 * Set the value of platform
		 *
		 * @return  self
		 */
		public function set_platform($platform) {
			$this->platform = $platform;

			return $this;
		}

		/**
		 * Set the value of merchantId
		 *
		 * @return  self
		 */
		public function set_merchantId($merchantId) {
			$this->merchantId = $merchantId;

			return $this;
		}

		/**
		 * Set the value of merchantTransactionId
		 *
		 * @return  self
		 */
		public function set_merchantTransactionId($merchantTransactionId) {
			$this->merchantTransactionId = $merchantTransactionId;

			return $this;
		}

		/**
		 * Set the value of transactionId
		 *
		 * @return  self
		 */
		public function set_transactionId($transactionId) {
			$this->transactionId = $transactionId;

			return $this;
		}

		/**
		 * Set the value of method
		 *
		 * @return  self
		 */
		public function set_method($method) {
			$this->method = $method;

			return $this;
		}

		/**
		 * Set the value of amount
		 *
		 * @return  self
		 */
		public function set_amount($amount) {
			$this->amount = $amount;

			return $this;
		}

		/**
		 * Set the value of intentUrl
		 *
		 * @return  self
		 */
		public function set_intentUrl($intentUrl) {
			$this->intentUrl = $intentUrl;

			return $this;
		}

		/**
		 * Set the value of code
		 *
		 * @return  self
		 */
		public function set_code($code) {
			$this->code = $code;

			return $this;
		}

		/**
		 * Set the value of state
		 *
		 * @return  self
		 */
		public function set_state($state) {
			$this->state = $state;

			return $this;
		}

		/**
		 * Set the value of message
		 *
		 * @return  self
		 */
		public function set_message($message) {
			$this->message = $message;

			return $this;
		}

		/**
		 * Set the value of pluginVersion
		 *
		 * @return  self
		 */
		public function set_pluginVersion($pluginVersion) {
			$this->pluginVersion = $pluginVersion;

			return $this;
		}

		/**
		 * Set the value of platformVersion
		 *
		 * @return  self
		 */
		public function set_platformVersion($platformVersion) {
			$this->platformVersion = $platformVersion;

			return $this;
		}

		/**
		 * Set the value of network
		 *
		 * @return  self
		 */
		public function set_network($network) {
			$this->network = $network;

			return $this;
		}

		/**
		 * Set the value of userOperatingSystem
		 *
		 * @return  self
		 */
		public function set_userOperatingSystem($userOperatingSystem) {
			$this->userOperatingSystem = $userOperatingSystem;

			return $this;
		}

		/**
		 * Set the value of paymentRequestSupported
		 *
		 * @return  self
		 */
		public function set_paymentRequestSupported($paymentRequestSupported) {
			$this->paymentRequestSupported = $paymentRequestSupported;

			return $this;
		}

		/**
		 * Set the value of pluginEnabled
		 *
		 * @return  self
		 */
		public function set_pluginEnabled($pluginEnabled) {
			$this->pluginEnabled = $pluginEnabled;

			return $this;
		}

		/**
		 * Set the value of canMakePayment
		 *
		 * @return  self
		 */
		public function set_canMakePayment($canMakePayment) {
			$this->canMakePayment = $canMakePayment;

			return $this;
		}

		/**
		 * Set the value of hasEnrolledInstrument
		 *
		 * @return  self
		 */
		public function set_hasEnrolledInstrument($hasEnrolledInstrument) {
			$this->hasEnrolledInstrument = $hasEnrolledInstrument;

			return $this;
		}

		/**
		 * Set the value of retries
		 *
		 * @return  self
		 */
		public function set_retries($retries) {
			$this->retries = $retries;

			return $this;
		}

		/**
		 * Set the value of constraints
		 *
		 * @return  self
		 */
		public function set_constraints($constraints) {
			$this->constraints = $constraints;

			return $this;
		}

		/**
		 * Set the value of elapsedTime
		 *
		 * @return  self
		 */
		public function set_elapsedTime($elapsedTime) {
			$this->elapsedTime = $elapsedTime;

			return $this;
		}

		/**
		 * Set the value of timestamp
		 *
		 * @return  self
		 */
		public function set_timestamp($timestamp) {
			$this->timestamp = $timestamp;

			return $this;
		}

		/**
		 * Set the value of isCouponEnabled
		 *
		 * @return  self
		 */
		public function set_isCouponEnabled($isCouponEnabled) {
			$this->isCouponEnabled = $isCouponEnabled;

			return $this;
		}

		/**
		 * Set the value of couponsCount
		 *
		 * @return  self
		 */
		public function set_couponsCount($couponsCount) {
			$this->couponsCount = $couponsCount;

			return $this;
		}

		/**
		 * Set the value of couponCode
		 *
		 * @return  self
		 */
		public function set_couponCode($couponCode) {
			$this->couponCode = $couponCode;

			return $this;
		}

		/**
		 * Set the value of couponDiscount
		 *
		 * @return  self
		 */
		public function set_couponDiscount($couponDiscount) {
			$this->couponDiscount = $couponDiscount;

			return $this;
		}

		/**
		 * Set the value of eventState
		 *
		 * @return  self
		 */
		public function set_eventState($eventState) {
			$this->eventState = $eventState;

			return $this;
		}

		/**
		 * Set the value of couponType
		 *
		 * @return  self
		 */
		public function set_couponType($couponType) {
			$this->couponType = $couponType;

			return $this;
		}

		/**
		 * Transforms object into array and returns it
		 *
		 * @return  self
		 */
		public function to_array() {
			return (array)$this;
		}
	}
}
