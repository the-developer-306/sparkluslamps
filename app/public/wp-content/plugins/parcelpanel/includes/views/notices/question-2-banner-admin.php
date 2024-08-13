<?php
defined('ABSPATH') || exit;

$url_dismiss = wp_nonce_url(@add_query_arg(['pp-hide-notice' => 'question_2_banner_notice', '_expired_at' => 9999999999]), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce');
?>
<div class="notice notice-success notice-alt parcelpanel-message is-dismissible pp-text-container" id="pp-notice-question-2">
  <h3><?php esc_html_e('Your opinion matters! Complete the survey for a 10% discount! 🙌', 'parcelpanel') ?></h3>
  <p><?php esc_html_e(' ParcelPanel Order Tracking for WooCommerce invites you to participate in our annual user survey (takes less than 1 minute) to help us enhance our services. Complete the survey for a 10% discount!! 🤩', 'parcelpanel') ?></p>
  <a class="btn btn-free-upgrade" href="https://forms.gle/ecR9FNTxsG7Qy38H6" style="text-decoration: none;display: block;width: 128px;" target="_blank"><?php esc_html_e('Get 10% discount →', 'parcelpanel') ?></a>
  <a href="<?php echo esc_url($url_dismiss) ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e('Dismiss this notice.', 'parcelpanel') ?></span></a>
</div>
<script>
  ($ => {
    const $pp_notice = $('#pp-notice-question-2'),
      $notice_dismiss = $pp_notice.children('.notice-dismiss')
    $pp_notice.on('click', '.btn-free-upgrade', function() {
      $.get($notice_dismiss.attr('href'))
      $pp_notice.remove()
    })
  })(jQuery)
</script>