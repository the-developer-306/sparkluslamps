<?php

class PPEC_RedundantCallbackException extends PPEC_ValidationException {
	public function __construct($code = 'REDUNDANT_CALLBACK') {
		parent::__construct($code);
	}
}
