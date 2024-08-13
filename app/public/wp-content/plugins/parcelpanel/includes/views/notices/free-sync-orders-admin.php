<?php
defined('ABSPATH') || exit;

$url_dismiss = wp_nonce_url(@add_query_arg(['pp-hide-notice' => 'free_sync_orders_notice', '_expired_at' => 9999999999]), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce');

$first_synced_at = intval(get_option(\ParcelPanel\OptionName\FIRST_SYNCED_AT, 0));
?>
<div class="notice notice-info notice-alt parcelpanel-message" id="pp-notice-free_sync_orders">
  <h3 style="font-size:14px"><?php esc_html_e('Even better - free sync & track your last-30-day orders 🎉', 'parcelpanel') ?></h3>
  <p><?php esc_html_e('This will help you know how ParcelPanel performs and provide your old customers a seamless order tracking experience.', 'parcelpanel') ?></p>
  <a href="<?php echo esc_url($url_dismiss) ?>" class="notice-dismiss" style="display:none"><span class="screen-reader-text"><?php esc_html_e('Dismiss this notice.', 'parcelpanel') ?></span></a>
  <div class="spinner-box" style="display:none"><span class="pp-spinner" /></div>
  <div class="badge-completed_on-box" style="display:none">
    <span id="pp-notice-free_sync_orders-badge-completed_on" class="pp-badge pp-badge-status-success"></span>
  </div>
</div>
<script>
  ($ => {
    const pp_check_first_sync_nonce = '<?php echo esc_js(wp_create_nonce('pp-check-first-sync')) ?>'
    const first_synced_at = <?php echo esc_js($first_synced_at) ?>;

    const $pp_notice = $('#pp-notice-free_sync_orders'),
      $notice_dismiss = $pp_notice.children('.notice-dismiss'),
      $spinner_box = $pp_notice.children('.spinner-box'),
      $badge_completed_on_box = $pp_notice.children('.badge-completed_on-box'),
      $badge_completed_on = $('#pp-notice-free_sync_orders-badge-completed_on')

    if (!first_synced_at || getTimestamp() < first_synced_at + 30) {
      // Hide close button
      $notice_dismiss.hide()
      // show loading icon
      $spinner_box.show()
      setTimeout(checkFirstSync, 3e3)
    } else {
      const completed_on = formatDateBadge(first_synced_at * 1000)
      // set Badge text
      $badge_completed_on.html(`Completed on ${ completed_on }`)
      // show Badge
      $badge_completed_on_box.show()
      // show close button
      $notice_dismiss.show()
      // hide loading icon
      $spinner_box.hide()
    }

    function checkFirstSync() {
      const data = {
        action: 'pp_check_first_sync',
        _ajax_nonce: pp_check_first_sync_nonce,
      }
      $.ajax({
        type: 'GET',
        url: ajaxurl,
        data: data,
        success: res => {
          if (!res.success) {
            return
          }

          const first_synced_at = res.data.first_synced_at

          if (!first_synced_at || getTimestamp() < first_synced_at + 30) {
            setTimeout(checkFirstSync, 2e3)
          } else {
            const completed_on = formatDateBadge(first_synced_at * 1000)
            // set Badge text
            $badge_completed_on.html(`Completed on ${ completed_on }`)
            // show Badge
            $badge_completed_on_box.show()
            // show close button
            $notice_dismiss.show()
            // hide loading icon
            $spinner_box.hide()
          }
        },
      })
    }

    function getTimestamp() {
      return Math.floor(new Date().getTime() / 1000)
    }

    function formatDateBadge(timestamp) {
      const month_abb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const _date = new Date(timestamp)

      const _month_format = month_abb[_date.getMonth()]

      const _day = _date.getDate()
      const _day_format = _day < 10 ? `0${ _day }` : _day

      return `${ _month_format } ${ _day_format }`
    }
  })(jQuery)
</script>