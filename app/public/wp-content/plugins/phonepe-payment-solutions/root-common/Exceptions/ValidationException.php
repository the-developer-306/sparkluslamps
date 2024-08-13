<?php

class PPEC_ValidationException extends PPEC_PhonepeException {
	public function __construct($code, $message = "") {
		parent::__construct($code, $message);
	}
}
