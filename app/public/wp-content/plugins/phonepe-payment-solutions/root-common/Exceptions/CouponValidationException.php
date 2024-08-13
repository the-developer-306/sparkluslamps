<?php

class PPEC_CouponValidationException extends PPEC_ValidationException {
	protected $couponCode;
	protected $couponType;

	public function __construct($code, $couponCode, $couponType = "", $message = "") {
		parent::__construct($code, $message);
		$this->couponCode = $couponCode;
		$this->couponType = $couponType;
	}

	public function getCouponCode() {
		return $this->couponCode;
	}


	public function getCouponType() {
		return $this->couponType;
	}
}
