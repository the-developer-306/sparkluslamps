<?php
if (!defined('ABSPATH')) exit;

interface TrackingMore_API_Handler
{

	public function get_content_type();

	public function parse_body($data);

	public function generate_response($data);

}
