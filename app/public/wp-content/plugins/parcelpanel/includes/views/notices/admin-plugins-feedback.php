<?php

defined('ABSPATH') || exit;

$screen = get_current_screen();

$url_dismiss = wp_nonce_url(@add_query_arg(['pp-hide-notice' => 'plugins_feedback_notice', '_expired_at' => 9999999999]), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce');
$current_user = wp_get_current_user();
?>
<script>
    const pp_feedback_confirm_nonce = "<?php echo esc_js(wp_create_nonce('pp-feedback-confirm')) ?>"
    const pp_is_show_dismiss_button = true
</script>
<style>
    .pp-rate {
        display: inline-flex;
        cursor: pointer;
        flex-flow: row-reverse
    }

    .pp-rate i {
        padding-right: 4px;
        font-style: normal;
        font-size: 24px;
        font-family: dashicons;
        transition: transform .2s ease
    }

    .pp-rate i::after {
        color: #ffcb67;
        content: "\f154";
        transition: color .4s ease
    }

    .pp-rate i:hover::after,
    .pp-rate i:hover~i::after {
        content: "\f155"
    }

    .pp-rate i:hover {
        transform: scale(1.2)
    }

    .parcelpanel-message {
        padding: 12px 48px 12px 12px
    }

    .parcelpanel-message h3 {
        margin: 0;
        font-size: 16px;
        line-height: 24px
    }

    .parcelpanel-message p {
        margin: 12px 0;
        padding: 0;
        font-size: 14px;
        line-height: 20px
    }
</style>
<div class="notice notice-info notice-alt is-dismissible parcelpanel-message" id="pp-notice-plugins_feedback">
    <h3><?php esc_html_e('We want to provide the best experience for you', 'parcelpanel') ?></h3>
    <p>
        <?php
        // translators: %1$s is url html %2$s is url html.
        echo sprintf(esc_html__('Hi there! Your feedback means a lot to us! Take a minute to share your experience with %1$sParcelPanel Order Tracking for WooCommerce%2$s will inspire us to keep going.', 'parcelpanel'), '<b>', '</b>') ?>
    </p>
    <div class="pp-rate"><i data-value="5"></i><i data-value="4"></i><i data-value="3"></i><i data-value="2"></i><i data-value="1"></i></div>
    <a href="<?php echo esc_url($url_dismiss) ?>" class="notice-dismiss" style="text-decoration:none"><span class="screen-reader-text"><?php esc_html_e('Dismiss this notice.', 'parcelpanel') ?></span></a>
</div>
<div id="pp-modal-feedback" class="components-modal__screen-overlay pp-modal" style="display:none">
    <div role="dialog" tabindex="-1" class="components-modal__frame">
        <div role="document" class="components-modal__content" style="display:flex; flex-direction: column;">
            <div class="components-modal__header">
                <div class="components-modal__header-heading-container">
                    <h1 class="components-modal__header-heading"><?php esc_html_e('Send your feedback', 'parcelpanel') ?></h1>
                </div>
                <button type="button" aria-label="Close dialog" class="components-button has-icon btn-close" style="position: unset; margin-right: -8px;">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path>
                    </svg>
                </button>
            </div>
            <div class="pp-modal-body">
                <p style="margin:0 0 4px"><?php esc_html_e('Please tell us more, we will try the best to get better', 'parcelpanel') ?></p>
                <textarea id="pp-modal-feedback__msg" placeholder="Edit your message here..." style="display:block;width:100%;border-radius:2px" rows=6></textarea>
                <p style="margin:8px 0 4px"><?php esc_html_e('Your contact email', 'parcelpanel') ?></p>
                <input id="pp-modal-feedback__email" type="text" placeholder="e.g. parcelpanel100@gmail.com" value="<?php echo esc_attr($current_user->user_email) ?>" class="components-placeholder__input" style="width:100%;margin:0;height:36px;border-radius:2px;">
            </div>
        </div>
        <div class="components-modal__footer">
            <button type="button" class="components-button pp-button is-secondary">
                <span><?php esc_html_e('Cancel', 'parcelpanel') ?></span></button>
            <button type="button" class="components-button pp-button is-primary">
                <span><?php esc_html_e('Send', 'parcelpanel') ?></span></button>
        </div>
    </div>
</div>
<script>
    ($ => {
        const $pp_notice = $('#pp-notice-plugins_feedback'),
            $notice_dismiss = $pp_notice.children('.notice-dismiss')
        const $feedback_msg = $('#pp-modal-feedback__msg')
        const $feedback_email = $('#pp-modal-feedback__email')
        const $modal = $('#pp-modal-feedback')
        let is_sending = false
        let selected_rating = 0
        $pp_notice
            .on('click', '.pp-rate i', function() {
                const rate = parseInt($(this).data('value'))
                if (5 === rate) {
                    const url = 'https://wordpress.org/support/plugin/parcelpanel/reviews/#new-post'
                    const a = $(`<a href="${url}" target="_blank"></a>`)
                    const d = a.get(0)
                    if (document.createEvent) {
                        const e = document.createEvent('MouseEvents')
                        e.initEvent('click', true, true)
                        d.dispatchEvent(e)
                        a.remove()
                    } else if (document.all) {
                        d.click()
                    }
                    handle_notice_dismiss()
                } else {
                    selected_rating = rate
                    $modal.show()
                }
            })

        $notice_dismiss
            .on('click', () => {
                handle_notice_dismiss()
                return false
            })

        $modal
            .on('click', '.is-primary', function() {
                send_feedback()
            })
            .on('click', '.is-secondary', function() {
                $modal.hide()
            })
            .on('click', '.btn-close', function() {
                $modal.hide()
            })

        function send_feedback() {
            if (is_sending) {
                return
            }
            is_sending = true

            let data = {
                action: 'pp_feedback_confirm',
                _ajax_nonce: pp_feedback_confirm_nonce,
                msg: $feedback_msg.val(),
                email: $feedback_email.val(),
                rating: selected_rating,
                type: 3,
            }

            $modal.find('.is-primary').addClass('is-busy').attr('disabled', 'disabled')

            $.ajax({
                url: ajaxurl,
                data: data,
                type: 'POST',
                complete() {
                    is_sending = false
                    $modal.find('.is-primary').removeClass('is-busy').removeAttr('disabled')
                },
                success: function(resp) {
                    if (resp.success) {
                        handle_notice_dismiss()
                        $modal.remove()
                        let msg = 'Sent successfully'
                        if ($.toastr) {
                            $.toastr.success(msg)
                        } else {
                            alert(msg)
                        }
                    } else {
                        if ($.toastr) {
                            $.toastr.error(resp.msg)
                        } else {
                            alert(resp.msg)
                        }
                    }
                },
                error() {
                    let msg = 'Server error, please try again or refresh the page'
                    if ($.toastr) {
                        $.toastr.error(msg)
                    } else {
                        alert(msg)
                    }
                },
            })
        }

        function handle_notice_dismiss() {
            if (pp_is_show_dismiss_button) {
                $.get($notice_dismiss.attr('href'))
                $pp_notice.remove()
            }
        }
    })(jQuery)
</script>