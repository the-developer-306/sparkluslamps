<?php
defined('ABSPATH') || exit;

$url_dismiss = wp_nonce_url(@add_query_arg(['pp-hide-notice' => 'nps_banner_notice', '_expired_at' => 9999999999]), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce');
?>
<div class="notice notice-success notice-alt parcelpanel-message is-dismissible pp-text-container" id="pp-notice-nps">
    <h3><?php esc_html_e('A Quick Word on your ParcelPanel Experience (Only 2 questions ) 🌻', 'parcelpanel') ?></h3>
    <p>
        <?php
        // translators: %1$s is html span %2$s is html span.
        echo sprintf(esc_html__('We value your opinion! It is highly appreciated if you could take %1$s10 seconds%2$s to rate your experience with us by participating in our brief Net Promoter Score (NPS) survey.', 'parcelpanel'), '<span style="font-weight: 500;">', '</span>')
        ?>
    </p>
    <a class="btn btn-free-upgrade" href="https://forms.gle/KrbMrns53SDVTNnW6" style="text-decoration: none;display: block;width: 114px;" target="_blank"><?php esc_html_e('Take the survey →', 'parcelpanel') ?></a>
    <a href="<?php echo esc_url($url_dismiss) ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e('Dismiss this notice.', 'parcelpanel') ?></span></a>
</div>
<script>
    ($ => {
        const $pp_notice = $('#pp-notice-nps'),
            $notice_dismiss = $pp_notice.children('.notice-dismiss')
        $pp_notice.on('click', '.btn-free-upgrade', function() {
            $.get($notice_dismiss.attr('href'))
            $pp_notice.remove()
        })
    })(jQuery)
</script>