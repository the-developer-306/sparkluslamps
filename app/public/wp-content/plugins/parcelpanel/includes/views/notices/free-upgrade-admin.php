<?php
defined( 'ABSPATH' ) || exit;

$url_dismiss = wp_nonce_url( @add_query_arg( [ 'pp-hide-notice' => 'free_upgrade_notice', '_expired_at' => 9999999999 ] ), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce' );
?>
<div class="notice notice-success notice-alt parcelpanel-message is-dismissible pp-text-container" id="pp-notice-free_upgrade">
  <h3><?php esc_html_e( 'Special offer - Contact us to Free upgrade 😘', 'parcelpanel' ) ?></h3>
  <p><?php esc_html_e( 'We\'ve so far provided service to over 120,000 Shopify & WooCommerce stores. This is our way of giving back (20 → Unlimited free quota) 🙏', 'parcelpanel' ) ?></p>
  <button class="btn btn-free-upgrade"><?php esc_html_e( 'Free upgrade', 'parcelpanel' ) ?></button>
  <a href="<?php echo esc_url( $url_dismiss ) ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e( 'Dismiss this notice.', 'parcelpanel' ) ?></span></a>
</div>
<script>
  ($ => {
    const $notice_feedback = $('#pp-notice-free_upgrade')
    $notice_feedback.on('click', '.btn-free-upgrade', function () {
      window.PPLiveChat('showNewMessage', 'Hi support, I would like to free upgrade to the Unlimited plan.')
    })
  })(jQuery)
</script>
