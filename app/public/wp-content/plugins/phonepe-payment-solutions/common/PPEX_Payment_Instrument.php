<?php

/**
 * PPEX_Payment_Instrument
 */
if(!class_exists('PPEX_Payment_Instrument')){
class PPEX_Payment_Instrument {
    private $type;

    function __construct($type) {
        $this->type = $type;
    }

    public function to_json() {
        return array(
            "type" => $this->type
        );
    }
}
}
