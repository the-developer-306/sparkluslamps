<?php
defined( 'ABSPATH' ) || exit;

$url_dismiss = wp_nonce_url( @add_query_arg( [ 'pp-hide-notice' => 'question_banner_notice', '_expired_at' => 9999999999 ] ), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce' );
?>
<div class="notice notice-success notice-alt parcelpanel-message is-dismissible pp-text-container" id="pp-notice-question">
  <h3><?php esc_html_e( 'We value your opinion - Requirements Feedback Research 🙌', 'parcelpanel' ) ?></h3>
  <p><?php esc_html_e( 'ParcelPanel Order Tracking for WooCommerce invites you to participate in user research (within 8 questions) to gain more value. Thanks in advance!! 🤩', 'parcelpanel' ) ?></p>
  <a class="btn btn-free-upgrade"  href="https://forms.gle/8hjE3o2oRgwegg3fA" style="text-decoration: none;display: block;width: 114px;" target="_blank"><?php esc_html_e( 'Take the survey →', 'parcelpanel' ) ?></a>
  <a href="<?php echo esc_url( $url_dismiss ) ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e( 'Dismiss this notice.', 'parcelpanel' ) ?></span></a>
</div>
<script>
  ($ => {
    const $pp_notice = $('#pp-notice-question'),$notice_dismiss = $pp_notice.children('.notice-dismiss')
    $pp_notice.on('click', '.btn-free-upgrade', function () {
      $.get($notice_dismiss.attr('href'))
      $pp_notice.remove()
    })
  })(jQuery)
</script>
