<?php

defined('ABSPATH') || exit;

$WP_Screen = get_current_screen();

$url_dismiss = wp_nonce_url(@add_query_arg(['pp-hide-notice' => 'feedback_notice', '_expired_at' => 9999999999]), 'parcelpanel_hide_notices_nonce', '_pp_notice_nonce');
$current_user = wp_get_current_user();

$show_dismiss_button = $WP_Screen->id !== 'parcelpanel_page_pp-account';
?>
<script>
    const pp_feedback_confirm_nonce = "<?php echo esc_js(wp_create_nonce('pp-feedback-confirm')) ?>"
    const pp_is_show_dismiss_button = <?php echo $show_dismiss_button ? 'true' : 'false' ?>
</script>
<style>
    @font-face {
        font-family: "pp-iconfont-rate";
        src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANQAAsAAAAABzwAAAMCAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGVgCCfgqCIIIQATYCJAMMCwgABCAFhGcHORtdBhHVk/VkXxzYxopDZ92R6kl9UPojxCklFTIlvefggfS+3mBBZYUDlT8HABWAiqggJAEC5rrhZ5HZ1pyVMzJClWRvDj3rhzxw04waYKyZnU/cT16dT+D5HCuDWiPBJvqBFh2Eu/kEfYvs7iAu4hIE4E0BFZHVa9a38e/TcUg/otHY9QKyVNGnZ/eOeEoeNBrHPRG4N0zUiK/cQM6UA/Ojz4s3FAlPkLgp7K0ad6vRhdPPqzyvqiY4E7RRj5gwnwtAJKCAnP3ohGm0NEYlkRwU3npEkwr7aiXgeVXH4XmVgLPbPzwQSBDu2Mm+AGRgsbwjrifh1rh4ChIABYB7EjPASKIIHdtQWD5prq0+RTR3LQ0eu3t9tGm+fP26XZYxy3bN2hFq21t2rFkb5rJXrG3VvNTL1dFuaezWo5dtC+9k/OxZW0LtDku2rFjZ6l2ycuvWCejbV4dnrv5geYcGvbjax1n4RVDot2tJ1ttdO48P2nAw+GVSlxvjv1hfxofMNBh8cMOg47WNrLdJ13p9e5k8dfhPyhCUceF8bsinicxgIOWa/CsXv5HUQS/r1I/Yt+QHkboxfpiZfmR/thMzNbfj1mcjno5Y4k3DqTHZTs2w4YYOADipc6pYFFsdUf7839C58+P57QPKf/P00QA8urXPH7ucNDAbeN6eRcCvlgKs0Abf1iqtcTyOZVMUjjRJwCzJjoPtCObJeFkIOBkEnoRkkHgQA4UnySRNy4IbPhTBHU8qwJtsakz3IYQBKIT2AiwmIwgC2QmJP0egCOQSSdPuwo1wXsCdQP7BG2PyW8yHlQdCwahB/sGrWowr54joFe07CaoLPpE2j/0w9WM5fsGCNMWQ7WNnZgOGaoYz3w5TqtCoBlTcO+a2DINpekuvau4OCBIY0oD0BzylKkxQm4vfd4Wst0QgIOkZIRuPiYNJbwSQLpICyrmTZTYf1owxAxiEYhk4S+1QklSgNbcLkMJ6bkSoWQxOLQOV9OvL8tdjiwLsFVRSKKHRs6DdCF+sp+46AAA=') format('woff2');
    }

    .pp-rate {
        display: inline-flex;
        margin: 4px 0 16px;
        flex-flow: row-reverse;
        cursor: pointer;
    }

    .pp-rate i {
        font-family: "pp-iconfont-rate";
        font-size: 24px;
        padding-right: 4px;
        font-style: normal;
        float: left;
        transition: transform 0.2s ease;
    }

    .pp-rate i::after {
        content: "\e641";
        color: #ffcb67;
        transition: color 0.4s ease;
    }

    .pp-rate i:hover::after,
    .pp-rate i:hover~i::after {
        content: "\e642";
    }

    .pp-rate i:hover {
        transform: scale(1.2);
    }
</style>
<div class="notice notice-info notice-alt <?php echo $show_dismiss_button ? 'is-dismissible' : '' ?> parcelpanel-message" id="pp-notice-feedback">
    <h3><?php esc_html_e('We want to provide the best experience for you', 'parcelpanel') ?></h3>
    <p><?php esc_html_e('Your feedback means a lot to us! Take a minute to leave your review.', 'parcelpanel') ?></p>
    <div class="pp-rate"><i data-value="5"></i><i data-value="4"></i><i data-value="3"></i><i data-value="2"></i><i data-value="1"></i></div>
    <?php echo $show_dismiss_button ? '<a href="' . esc_url($url_dismiss) . '" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice</span></a>' : '' ?>
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
        const $pp_notice = $('#pp-notice-feedback'),
            $notice_dismiss = $pp_notice.children('.notice-dismiss')
        const $feedback_msg = $('#pp-modal-feedback__msg')
        const $feedback_email = $('#pp-modal-feedback__email')
        const $modal = $('#pp-modal-feedback')
        let is_sending = false
        let selected_rating = 0
        $pp_notice.on('click', '.pp-rate i', function() {
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
                type: 1,
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

        function handle_notice_dismiss() {
            if (pp_is_show_dismiss_button) {
                $.get($notice_dismiss.attr('href'))
                $pp_notice.remove()
            }
        }
    })(jQuery)
</script>