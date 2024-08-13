<?php
defined('ABSPATH') || exit;
?>
<div class="notice notice-error is-dismissible parcelpanel-message" id="pp-notice-plan-upgrade">
    <p>
        <?php
        _e(sprintf('[ParcelPanel] Howdy partner, there are only %1$d quota available in your account, upgrade to sync & track more orders. <a href="%2$s">Upgrade now.</a>', get_option(\ParcelPanel\OptionName\PLAN_QUOTA_REMAIN, -1), admin_url('admin.php?page=pp-account')), 'parcelpanel')  // phpcs:ignore
        ?>
    </p>
    <a href="<?php echo esc_url(
                    wp_nonce_url(
                        add_query_arg([
                            'pp-hide-notice' => 'notice_quota_remain',
                            '_expired_at'    => time() + 60,
                        ]),
                        'parcelpanel_hide_notices_nonce',
                        '_pp_notice_nonce'
                    )
                );
                ?>" class="notice-dismiss"><span class="screen-reader-text"><?php esc_html_e('Dismiss') ?></span></a>
</div>