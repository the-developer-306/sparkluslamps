<?php
defined( 'ABSPATH' ) || exit;

$url_dismiss = wp_nonce_url( @add_query_arg( [ 'pp-hide-notice' => 'remove_pp_branding_notice', '_expired_at' => 9999999999 ] ), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce' );
?>
<div class="notice notice-success notice-alt is-dismissible parcelpanel-message" id="pp-notice-remove_pp_branding">
  <h3 style="font-size:14px"><?php esc_html_e( '😘 Remove ParcelPanel branding for Free', 'parcelpanel' ) ?></h3>
  <p><?php esc_html_e( 'Contact support to remove the branding (worth $49/month) from your tracking page.', 'parcelpanel' ) ?></p>
  <button class="btn btn-contact-us"><?php esc_html_e( 'Contact us', 'parcelpanel' ) ?></button>
  <a href="<?php echo esc_url( $url_dismiss ) ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e( 'Dismiss this notice.', 'parcelpanel' ) ?></span></a>
</div>
<script>
  ($ => {
    const $pp_notice = $('#pp-notice-remove_pp_branding')
    $pp_notice.on('click', '.btn-contact-us', function () {
      window.PPLiveChat('showNewMessage', 'Hi support, I would like to remove ParcelPanel branding.')
    })
  })(jQuery)
</script>
