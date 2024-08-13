<?php

class PPEC_PhonepeException extends Exception {
    public function __construct($code, $message) {
        $this->code = $code;
        $this->message = $message;
    }
}
