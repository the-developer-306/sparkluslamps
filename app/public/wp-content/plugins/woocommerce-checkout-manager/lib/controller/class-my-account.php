<?php

namespace QuadLayers\WOOCCM\Controller;

use QuadLayers\WOOCCM\Plugin as Plugin;

/**
 * Checkout Class
 */
class My_Account {

	protected static $_instance;

	public function __construct() {
		add_action( 'show_user_profile', array( $this, 'show_files_in_user_profile' ) );

		add_action( 'wp_ajax_wooccm_customer_attachment_update', array( $this, 'ajax_delete_attachment' ) );
		add_action( 'wp_ajax_nopriv_wooccm_customer_attachment_update', array( $this, 'ajax_delete_attachment' ) );

		add_action(
			'woocommerce_after_edit_address_form_billing',
			function() {
				$this->add_upload_files( 'billing' );}
		);
		add_action(
			'woocommerce_after_edit_address_form_shipping',
			function() {
				$this->add_upload_files( 'shipping' ); }
		);
	}

	public function ajax_delete_attachment() {
		if ( ! empty( $_REQUEST ) && check_admin_referer( 'wooccm_upload', 'nonce' ) ) {

			$array1 = explode( ',', sanitize_text_field( isset( $_REQUEST['all_attachments_ids'] ) ? wp_unslash( $_REQUEST['all_attachments_ids'] ) : '' ) );
			$array2 = explode( ',', sanitize_text_field( isset( $_REQUEST['delete_attachments_ids'] ) ? wp_unslash( $_REQUEST['delete_attachments_ids'] ) : '' ) );

			if ( empty( $array1 ) || empty( $array2 ) ) {
				wp_send_json_error( esc_html__( 'No attachment selected.', 'woocommerce-checkout-manager' ) );
			}

			$attachment_ids = array_diff( $array1, $array2 );
			if ( ! empty( $attachment_ids ) ) {

				$user_id = get_current_user_id();

				$customer_meta = get_user_meta( $user_id );
				foreach ( $customer_meta as $key => $value ) {
					if ( strpos( $key, 'wooccm' ) !== false ) {
						if ( in_array( $value[0], $attachment_ids, true ) ) {
							wp_delete_attachment( $value[0] );
						}
					}
				}
				wp_send_json_success( 'Deleted successfully.', 'woocommerce-checkout-manager' );
			}
		}
	}

	public function add_upload_files( $page ) {
		if ( get_option( 'wooccm_order_upload_files', 'no' ) === 'yes' ) {
			$user_id = get_current_user_id();

			$fields = array();
			if ( 'billing' === $page ) {
				$fields = Plugin::instance()->billing->get_fields();
			} elseif ( 'shipping' === $page ) {
				$fields = Plugin::instance()->shipping->get_fields();
			}

			$attachments = array();
			foreach ( $fields as $field_id => $field ) {
				if ( 'file' === $field['type'] ) {
					$user_meta = get_user_meta( $user_id, $field['key'], true );
					if ( ! empty( $user_meta ) ) {
						$attachments[ $field['key'] ] = array(
							'field_label'   => $field['label'],
							'attachment_id' => $user_meta,
						);
					}
				}
			}

			wc_get_template(
				'templates/my-account/form-edit-address-images.php',
				array(
					'user_id'     => $user_id,
					'attachments' => $attachments,
				),
				'',
				WOOCCM_PLUGIN_DIR
			);
		}
	}

	public function show_files_in_user_profile() {
		if ( get_option( 'wooccm_order_upload_files', 'no' ) === 'yes' ) {
			$user_id = get_current_user_id();

			$fields = array_merge( Plugin::instance()->billing->get_fields(), Plugin::instance()->shipping->get_fields() );

			$attachments = array();
			foreach ( $fields as $field_id => $field ) {
				if ( 'file' === $field['type'] ) {
					$user_meta = get_user_meta( $user_id, $field['key'], true );
					if ( ! empty( $user_meta ) ) {
						$attachments[ $field['key'] ] = array(
							'field_label'   => $field['label'],
							'attachment_id' => $user_meta,
						);
					}
				}
			}

			wc_get_template(
				'lib/view/backend/admin-menu/user-files.php',
				array(
					'user_id'     => $user_id,
					'attachments' => $attachments,
				),
				'',
				WOOCCM_PLUGIN_DIR
			);
		}
	}

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
