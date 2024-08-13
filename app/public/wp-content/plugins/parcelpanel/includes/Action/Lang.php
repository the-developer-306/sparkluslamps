<?php

namespace ParcelPanel\Action;

use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class Lang
{
    use Singleton;

    public static function langToWordpress($langList, $appName = 'parcelpanel')
    {
        if (empty($langList)) {
            $langList = self::defaultLangList();
        }

        $langListNew = [];
        $locale = apply_filters('plugin_locale', get_locale(), 'parcelpanel');
        // $checkLang = str_contains($locale, 'en');
        $checkLang = strpos($locale, 'en') !== false;
        foreach ($langList as $k => $v) {
            foreach ($v as $kk => $vv) {
                if ($checkLang) {
                    break;
                } else {
                    // $langListNew[$k][$kk] = __($vv, $appName);
                }
            }
        }
        if (empty($langListNew)) {
            $langListNew = $langList;
        }

        return $langListNew;
    }

    // text for WPML translate string
    private static function defaultWPML()
    {
        esc_html__('Order Number', 'pancelpanel');
        esc_html__('Email or Phone Number', 'pancelpanel');
        esc_html__('Or', 'pancelpanel');
        esc_html__('Tracking Number', 'pancelpanel');
        esc_html__('Track', 'pancelpanel');
        esc_html__('Order', 'pancelpanel');
        esc_html__('Status', 'pancelpanel');
        esc_html__('Shipping To', 'pancelpanel');
        esc_html__('Current Location', 'pancelpanel');
        esc_html__('Carrier', 'pancelpanel');
        esc_html__('Product', 'pancelpanel');
        esc_html__('These items have not yet shipped.', 'pancelpanel');
        esc_html__('Waiting for carrier to update tracking information, please try again later.', 'pancelpanel');
        esc_html__('Ordered', 'pancelpanel');
        esc_html__('Order Ready', 'pancelpanel');
        esc_html__('Pending', 'pancelpanel');
        esc_html__('Info Received', 'pancelpanel');
        esc_html__('In Transit', 'pancelpanel');
        esc_html__('Out for Delivery', 'pancelpanel');
        esc_html__('Delivered', 'pancelpanel');
        esc_html__('Exception', 'pancelpanel');
        esc_html__('Failed Attempt', 'pancelpanel');
        esc_html__('Expired', 'pancelpanel');
        esc_html__('Estimated delivery date', 'pancelpanel');
        esc_html__('You may also like...', 'pancelpanel');

        // test text
        esc_html__('Additional text above', 'pancelpanel');
        esc_html__('Additional text below', 'pancelpanel');
        esc_html__('Custom shipment status name 1', 'pancelpanel');
        esc_html__('Custom shipment status info 1', 'pancelpanel');
        esc_html__('Custom shipment status name 2', 'pancelpanel');
        esc_html__('Custom shipment status info 2', 'pancelpanel');
        esc_html__('Custom shipment status name 3', 'pancelpanel');
        esc_html__('Custom shipment status info 3', 'pancelpanel');
        esc_html__('Custom tracking info', 'pancelpanel');

        esc_html__('Could Not Find Order', 'pancelpanel');
        esc_html__('Please enter your order number', 'pancelpanel');
        esc_html__('Please enter your email or phone number', 'pancelpanel');
        esc_html__('Please enter your tracking number', 'pancelpanel');
    }

    private static function defaultLangList()
    {
        return [
            'pageTip' => [
                'common_sync_error' => 'Sync unsuccessfully',
                'common_sync_success' => 'The system is syncing your orders and it needs a few minutes.',

                'track_page_save_error' => 'Saved unsuccessfully',
                'track_page_save_success' => 'Saved successfully',

                'update_order_status_fail' => 'Saved unsuccessfully',
                'update_order_status_success' => 'Saved successfully',

                'account_free_error' => 'Change unsuccessfully',
                'account_free_success' => 'Change successfully',

                'updated_error' => 'Updated unsuccessfully',
                'updated_success' => 'Updated successfully',

                'common_config_save_error' => 'Saved unsuccessfully',
                'common_config_save_success' => 'Saved successfully',

                'toggle_success' => 'Enabled successfully',
                'toggle_fail' => 'Disabled successfully',

                'export_error' => 'Export unsuccessfully',
                'export_success' => 'Export successfully',

                'setting_save_success' => 'Saved successfully',

                'import_step_choose_file' => 'Please choose a CSV file',
                'import_step_choose_file_type' => 'Sorry, this file type is not permitted!',
                'import_step_file_select_order' => 'Order number',
                'import_step_file_select_number' => 'Tracking number',
                'import_step_file_select' => 'These fields are required to map:',

                'email_tip_empty' => 'Required fields can\'t be empty.',
                'email_tip_valid' => 'Please enter a valid email.',

                'email_send_success' => 'Sent successfully',
                'email_send_fail' => 'Sent unsuccessfully',

                'copy_success' => 'Copied successfully',
                'copy_fail' => 'Copied unsuccessfully',

                'binding_success' => 'Binding successfully',
                'binding_fail' => 'Binding unsuccessfully',

                'connected_success' => 'Connected successfully',
                'connected_fail' => 'Connected unsuccessfully',

                'save_error' => 'Saved unsuccessfully',
                'save_success' => 'Saved successfully',

                'verify_error' => 'Verify unsuccessfully',
                'verify_success' => 'Verify successfully',

                'verify_email' => 'Too many requests, please try again later',

                'privacy_success' => 'Thanks for your trust and welcome to ParcelPanel!',
                'privacy_fail' => 'Verify unsuccessfully',
                'privacy_accept_fail' => 'Please check the box to accept first',

                'syncing' => 'Syncing...',

                'error' => 'Unsuccessfully',
                'success' => 'Successfully',

            ],
            'tips' => [
                'feedback_title' => 'We want to provide the best experience for you 👋',
                'feedback_con' => 'Your feedback means a lot to us! Taking a minute to leave your review will inspire us to keep going.',

                'free_upgrade_title' => 'Special offer - Contact us to Free upgrade 🥳',
                'free_upgrade_con' => 'We\'ve so far provided service for over 120,000 Shopify & WooCommerce stores. This is our way of giving back (20 → Unlimited free quota) 🙌',
                'free_upgrade_con_new' => 'We\'ve so far provided service for over 120,000 Shopify & WooCommerce stores. This is our way of giving back (20 → 50 quotas) 🙌',
                'free_upgrade_btn' => 'Free upgrade now',

                'remove_branding_title' => 'Remove ParcelPanel branding for Free 😘',
                'remove_branding_con' => 'Contact support to remove the branding (worth $49/month) from your tracking page.',
                'remove_branding_btn' => 'Contact us',

                'upgrade_reminder_title' => 'Upgrade reminder',
                'upgrade_reminder_con' => 'Howdy partner, there are only <0> quota available in your account, upgrade to sync & track more orders.',
                'upgrade_reminder_con2' => 'Howdy partner, there are only <0> available quotas in your account, upgrade now to enjoy seamless syncing & tracking more orders.',
                'upgrade_reminder_btn' => 'Upgrade now',

                'first_sync_title' => 'Even better - free sync & track your last-30-day orders 🎉',
                'first_sync_con' => 'This will help you know how ParcelPanel performs and provide your old customers with a seamless order tracking experience.',
                'first_sync_tip' => 'Completed on <0>',

                'nps_title' => 'A Quick Word on your ParcelPanel Experience (Only 2 questions ) 🌻',
                'nps_con' => 'We value your opinion! It is highly appreciated if you could take <0>10 seconds<1> to rate your experience with us by participating in our brief Net Promoter Score (NPS) survey.',
                'nps_btn' => 'Take the survey →',

                'price_tip_title' => 'ParcelPanel Paid version V3.6 is coming in September',
                'price_tip_con' => 'Due to rising costs, ParcelPanel Paid version V3.6 is coming in <0>September!<1> Some previously free features will no longer be available. To give back to loyal users, we will provide you with a <2>20% discount<3> on our paid version.',

                'auto_renewal_title' => 'Auto-renewal failed',
                'auto_renewal_con' => 'Howdy partner, your subscription charge failed and was automatically canceled on <0>. You can re-subscribe to any plan again!',

                'resume_next_plan_con' => 'You\'ll be downgraded to the <0>/month plan on <1>. You can ',
                'resume_next_plan_con1' => 'resume',
                'resume_next_plan_con2' => ' your plan anytime.',

                'upgraded_tip_title' => '🎉 Howdy partner, you have upgraded successfully!',
                'upgraded_tip_con' => 'We would love to know your experience with our plugin, share your feedback! 🌻',

                'email_wc_tip_title' => 'Customizable shipping notification template editor is now live!',
                'email_wc_tip_con' => 'With this new functionality, you can now customize ParcelPanel shipping notifications that align with your brand and even create more sales with coupon upsell. Rest assured, all your previous settings are fully compatible, simply navigate to WooCommerce settings to access your familiar setup with ease. Please note that if you have set up the same shipping notifications in both WooCommerce and ParcelPanel, emails will be sent redundantly. <0>Learn more<1>.',

                'remove_branding_con1' => 'Contact support to remove the branding (worth $49/month) from ParcelPanel shipping notifications.',
                'upgraded_tip_title2' => 'Thanks for your trust',

                'verify_your_email_title' => 'Verify your email address to reduce spam.',
                'verify_your_email_con' => 'We\'ve sent a 6-character code to <0><1><2>. The code expires shortly, so please enter it soon.',
                'email_address' => 'Email address',

                // v3.8.2
                'payment_failed' => 'Payment failed',
                'payment_failed_con' => 'Howdy partner, your subscription payment of $<0> has failed. You can complete the payment <1>here<2>. Of course, feel free to re-subscribe to any plan again.',
                'payment_failed_btn' => 'Complete the payment',
                // v3.8.2

                // v3.9.1
                'synced_successfully' => '🎉 <0> orders have been synced successfully!',
                'questionV391_title' => 'Your opinion matters! Complete the survey for a 10% discount! 🙌',
                'questionV391_con' => 'ParcelPanel Order Tracking for WooCommerce invites you to participate in our annual user survey (takes less than 1 minute) to help us enhance our services. Complete the survey for a 10% discount!! 🤩',
                'questionV391_btn' => 'Get 10% discount →',
                'discount50TopTip1' => 'Your trial ends in <0> days. <1>Add a credit card now<2> → for <3>50% Off<4>! 🎊',
                'discount50TopTip2' => 'Your free trial has ended. Choose a plan to restore your settings with <0>one click<1> ✨ ',

                // v3.9.1

                // v4.0.1.
                'plan_tip_update' => 'ParcelPanel Payment Plan Update',
                'plan_tip_update_con1' => 'Howdy partner, we\'ve released new payment plans, featuring annual subscriptions and usage-based charges for usage exceeding the subscription quota.',
                'plan_tip_update_con2' => 'These new plans are designed to ensure that even during fluctuations in your store\'s order volume, you can still provide the best post-purchase experience to your customers.',
                'plan_tip_update_con3' => 'Of course, you can continue using your current plan as before, or switch to the new plan at any time.',
                'upgrade_reminder_con3' => 'Howdy partner, you have only <0> available quotas in your account, additional quota will be charged based on usage.',
                'upgrade_reminder_con4' => 'Howdy partner, you have only <0> available quotas in your account.',
                'upgrade_reminder_con5' => 'To ensure ParcelPanel can provide the best post-purchase experience for your customers, upgrade to sync and track more orders at a lower per-quota price.',
                'plan_downgraded' => 'You\'ll be downgraded to the <0> plan on <1>. If you change your mind, you can <2>resume<3> your current plan before this date.',
                // v4.0.1.
            ],
            'common' => [
                'dismiss' => 'Dismiss',
                'cancel' => 'Cancel',
                'confirm' => 'Confirm',
                'apply' => 'Apply',
                'close' => 'Close',
                'upgrade' => 'Upgrade',
                'upgrade_con' => ' to unlock the data',
                'upgrade_con_1' => ' <0>Upgrade<1> to unlock the data',
                'remaining_total' => 'Remaining / Total',
                'upgrade_note' => 'Note: Remaining means you have <0> available quota.',
                'export' => 'Export',
                'country' => 'Country',
                'courier' => 'Courier',
                'quantity' => 'Quantity',
                'day' => 'Day',
                'destination' => 'Destination',
                'filter' => 'Filter',

                'pending' => 'Pending',
                'in_transit' => 'In transit',
                'delivered' => 'Delivered',
                'out_for_delivery' => 'Out for delivery',
                'info_received' => 'Info received',
                'exception' => 'Exception',
                'failed_attempt' => 'Failed attempt',
                'expired' => 'Expired',

                'enabled' => 'Enabled',
                'disabled' => 'Disabled',
                'enable' => 'Enable',
                'disable' => 'Disable',
                'no_couriers_yet' => 'No couriers yet',
                'no_couriers_yet_note' => 'You have not set up a frequently-used courier',

                'need_any_help' => 'Need any help?',

                'feedback_title' => 'Send your feedback',
                'feedback_con' => 'Please tell us more, we will try the best to get better',
                'feedback_con_eg' => 'Edit your message here...',
                'feedback_email' => 'Your contact email',
                'feedback_email_eg' => 'e.g. parcelpanel100@gmail.com',
                'send' => 'Send',
                'contact_us' => 'Contact us',
                'view_example' => 'View example',
                'learn_more_about_parcel_panel' => 'Learn more about <0>ParcelPanel<1>',
                'new' => 'NEW',
                'hot' => 'HOT',
                'preview' => 'Preview',

                'intercom_title' => 'Start Live Chat',
                'intercom_con' => 'When you click the confirm button, we will open our live chat widget, where you can chat with us in real time to solve your questions, and also potentially collect some personal data.',
                'intercom_con_s' => 'Learn more about our <0>Privacy Policy<1>.',
                'intercom_con_t' => 'Don\'t want to use live chat? Contact us email: <0>support@parcelpanel.org<1>',
                'intercom_con_t_n' => 'Don\'t want to use live chat? Contact us via <0>support forum<1> or email: <2>support@parcelpanel.org<3>',
                'intercom_con_b_cancel' => 'Cancel',
                'intercom_con_b_confirm' => 'Confirm',
                'intercom_alert_user' => '<0>Jessie<1> from ParcelPanel',
                'intercom_alert_status' => 'Active',
                'intercom_alert_title' => 'Welcome to ParcelPanel',
                'intercom_alert_hello' => 'Hello',
                'intercom_alert_con' => 'We\'re so glad you\'re here, let us know if you have any questions.',
                'intercom_alert_input' => 'Live chat with us',
                'intercom_alert_con_shipment' => 'Any questions about orders sync, courier matching or tracking update?',

                'help' => 'Help',
                'help_con' => 'Select a direction.',
                'live_chat_support' => 'Live Chat Support',
                'get_email_support' => 'Get Email Support',
                'parcel_panel_help_docs' => 'ParcelPanel Help Docs',
                'create_a_topic' => 'Create a topic',

                'alert_title_other' => 'Special Gift',
                'alert_title' => 'Free upgrade plan',
                'alert_con' => 'Offer Will Expire Soon',
                'alert_btn' => 'Free Upgrade Now',
                'alert_con_t1' => '<0><1><2>Get<3> <4>unlimited quota worth $999<5>',
                'alert_con_t2' => '<0><1><2>The best for<3> <4>dropshipping<5>',
                'alert_con_t3' => '<0><1><2>Access to<3> <4>1000+ couriers<5>',
                'alert_con_t4' => '<0><1><2>Import widget &<3> <4>CSV import<5>',
                'alert_con_t5' => '<0><1><2>Branded<3> <4>tracking page<5>',
                'alert_con_t6' => '<0><1><2><3><4>Remove ParcelPanel branding<5>',
                'alert_con_t7' => '<0><1><2>Shipping<3> <4>notifications<5>',
                'alert_con_t8' => '<0>24/7<1> <2>live chat<3> <4>support<5>',

                'verified' => 'Verified',
                'verifiedNo' => 'Not verified',
                'edit' => 'Edit',
                'verify' => 'Verify',
                'language' => 'Language',
                'default_language' => 'Default language',

                'note' => 'Note:',
                'edited' => 'Edited',
                'unedited' => 'Unedited',
                'ju_hao' => '.',
                'learn_more' => 'Learn more',
                'field_con_1' => 'This field can\'t be blank',
                'cancel_text' => 'Continue editing',
                'confirm_text' => 'Discard changes',
                'name' => 'Name',
                'field_con_2' => 'This can\'t be undone.',
                'disconnect' => 'Disconnect',
                'connect' => 'Connect',

                'privacy_title' => 'Enable settings?',
                // 'privacy_con' => 'When you click the confirm button, the setting will be enabled, and you can send ParcelPanel shipping notifications to your customers. But also potentially collect your customer\'s email and billing address data to only use this function but nothing else.',
                'privacy_help' => 'Learn more about our <0>Privacy Policy<1>.',
                'privacy_help2' => 'If you have any questions, contact us via email: <0>support@parcelpanel.org<1>.',

                'leave_page_title' => 'Leave page with unsaved changes?',
                'leave_page_confirm' => 'Leave page',
                'leave_page_cancel' => 'Stay',
                'leave_page_con' => 'Leaving this page will delete all unsaved changes.',
                'field_con_3' => 'Please enter a valid email',
                'get_code' => 'Get code',
                'verification_code' => 'Verification code',
                'field_con_4' => 'This field is required',
                'field_con_5' => 'This verification code is invalid',

                'upgrade_title' => 'Upgrade required',
                'upgrade_con1' => 'You are upgrading to the',
                'upgrade_con2' => 'plan',
                'upgrade_con3' => 'You will get <0> quota per month at an average cost of <1> each.',
                'upgrade_con4' => 'All <0> features, plus:',
                'upgrade_btn1' => 'Compare all plans',
                'upgrade_btn2' => 'Upgrade now',

                'privacy_customer_information' => 'Customer information',
                'privacy_name' => 'Name',
                'privacy_email_address' => 'Email address',
                'privacy_phone_number' => 'Phone number',
                'privacy_location' => 'Location',
                'privacy_shipping_address' => 'Shipping address',
                'privacy_billing_address' => 'Billing address',
                'privacy_activity' => 'Activity',
                'privacy_browsing_behavior' => 'Browsing behavior',
                'privacy_store' => 'Store owner & Store information',
                'privacy_store_information' => 'Store information',
                'privacy_site_address' => 'Site address (URL)',
                'privacy_timezone' => 'Timezone',
                'privacy_currency' => 'Currency',
                'privacy_store_address' => 'Store Address',
                'privacy_authorization' => 'Privacy Authorization',
                'privacy_accept_start' => 'Accept & Start',
                'privacy_welcome' => 'Welcome to ParcelPanel! ✨',
                'privacy_con' => 'Prior to using our services, we require your consent in compliance with GDPR and privacy regulations. Kindly review and accept our privacy permissions below: ',
                'privacy_your_store' => 'Your Store',
                'parcel_panel' => 'ParcelPanel',
                'privacy_con2' => 'Your data is encrypted and used solely for our services. We adhere to strict privacy policies and comply with data protection regulations. Review our <0>Privacy Policy<1> and <2>Terms of Service<3> for details.',
                'privacy_con3' => 'Deleting plugin from your store will remove its access, and request the removal of customer information if it was collected.',
                'privacy_details' => 'Privacy details',
                'privacy_con4' => 'What access does ParcelPanel need in your store:',
                'privacy_permission_details' => 'Permission details',
                'privacy_con5' => 'What will ParcelPanel do with these data:',
                'privacy_con6' => 'View and manage orders: Essential for seamless integration and efficient order processing.',
                'privacy_con7' => 'View and manage customers: Necessary for sending ParcelPanel shipping notifications.',
                'privacy_con8' => 'I have read and agreed to all the above terms and conditions.',

                'remove' => 'Remove',
                'add_image' => 'Add image',
                'image_tip' => 'Less than 2MB; Accepts .jpg, .png, .svg, .gif, .jpeg.',
                'image_err_tip' => 'File type should be .jpg, .png, .gif, .jpeg, .svg',

                'today' => 'Today',
                'email_list_msg' => 'email was sent to the customer',
                'insert_variables' => 'Insert variables',

                // v3.8.2
                'sort_by' => 'Sort by',
                'sort' => 'Sort',
                'column' => 'Column',
                'more_views' => 'More views',
                'show_more_details' => 'Show more details',
                'per_page' => 'per page',
                'reply_to' => 'Reply to',
                'from_name' => 'From name',
                // v3.8.2


                // v3.9.1
                'got_it' => 'Got it',
                'exit' => 'Exit',
                'all_tasks_complete' => 'All tasks complete',
                'mark_as_done' => 'Mark as done',
                'mark_as_not_done' => 'Mark as not done',
                'some_tasks_complete' => '<0> of <1> tasks complete',
                'one_click' => 'one click',
                'privacy_con4_close' => 'Access customer information, store owner & store information',
                'privacy_con5_close' => 'View and manage orders & customers',
                // v3.9.1

                // v4.0.1.
                'monthly' => 'Monthly',
                'annually' => 'Annually',
                'plan_save_tip' => '(Save 20%)',
                'active' => 'Active',
                // v4.0.1.

                // v-analysis_version
                'product' => 'Product',
                'clicks' => 'Clicks',
                'carrier' => 'Carrier',
                'p85' => 'P85',
                'avg' => 'Avg.',
                'minute' => 'Min',
                'min' => 'Min',
                'max' => 'Max',
                'd1_3' => '1-3d',
                'd4_7' => '4-7d',
                'd8_15' => '8-15d',
                'd16_30' => '16-30d',
                'd31' => '31d+',
                'a_to_z' => 'A to Z',
                'z_to_a' => 'Z to A',
                'max_to_min' => 'Max to min',
                'min_to_max' => 'Min to max',
                'daily' => 'Daily',
                'weekly' => 'Weekly',
                'monthly' => 'Monthly',
                'delete' => 'Delete',
                'time' => 'Time',
                'timezone' => 'Time zone',
                'sun' => 'Sun',
                'mon' => 'Mon',
                'tue' => 'Tue',
                'wed' => 'Wed',
                'thu' => 'Thu',
                'fir' => 'Fri',
                'sat' => 'Sat',
                'sunday' => 'Sunday',
                'monday' => 'Monday',
                'tuesday' => 'Tuesday',
                'wednesday' => 'Wednesday',
                'thursday' => 'Thursday',
                'friday' => 'Friday',
                'saturday' => 'Saturday',
                // v-analysis_version

            ],
            'home' => [
                'welcome' => 'Welcome to ParcelPanel 👋',
                'welcome_card_title' => 'Welcome!! Get started with ParcelPanel',

                'add_tracking_page' => 'Add tracking page',
                'add_tracking_page_title' => 'Add tracking page to your storefront',
                'add_tracking_page_con' => 'Your branded tracking page is ready, the URL is: <0>, add it to your store menus so your customers can track orders there.',
                'add_tracking_page_con_s' => 'Don\'t know how to do this? Please follow <0>this instruction<1>.',
                'add_tracking_page_btn' => 'Preview tracking page',
                'add_tracking_page_foot' => 'Looks not so good?',

                'add_shipping' => 'Customize notifications',
                'add_shipping_title' => 'Customize ParcelPanel shipping notifications',
                'add_shipping_con' => 'Keep your customers informed in a timely manner with shipment status updates, and boost your sales by incorporating effective marketing assets.',
                'add_shipping_con_s' => 'Want to know how to do this? Please follow <0>this instruction<1>.',

                'drop_shipping_optional' => 'Dropshipping (optional)',
                'drop_shipping_optional_title' => 'Enable dropshipping mode',
                'drop_shipping_optional_con' => 'ParcelPanel is the best for dropshipping, and supports Aliexpress Standard Shipping, Yunexpress, CJ packet & ePacket (China EMS, China Post), and all commonly used couriers for dropshipping merchants.',
                'drop_shipping_optional_con_s' => 'This feature will allow you to hide all Chinese regions easily, bringing your customers an all-around brand shopping experience. <0>Learn more<1>.',

                'how_parcel_panel_works' => 'How ParcelPanel works',
                'how_parcel_panel_works_title' => 'Out-of-box user experience',
                'how_parcel_panel_works_con' => 'Tracking numbers are synced from the Orders section of your WooCommerce admin, please don\'t forget to add them.',
                'how_parcel_panel_works_con_s' => 'For new users, ParcelPanel will automatically sync their last-30-day orders for Free.',
                'how_parcel_panel_works_con_t' => 'New coming orders will be automatically synced in real time.',
                'how_parcel_panel_works_con_f' => 'We fetch the tracking info from couriers\' websites based on the tracking numbers.',
                'how_parcel_panel_works_con_1' => 'Tracking numbers are synchronized from your WooCommerce admin\'s Orders section, please don\'t forget to add them.',
                'how_parcel_panel_works_con_2' => 'For new users, ParcelPanel offers free auto- sync of their last 30 days\' orders.',
                'how_parcel_panel_works_con_3' => 'Additionally, new incoming orders will be seamlessly synced in real-time.',
                'how_parcel_panel_works_con_4' => 'We retrieve tracking info directly from the courier websites based on the provided tracking numbers.',

                'sync_tracking_numbers' => 'Sync tracking numbers',
                'sync_tracking_numbers_con' => 'ParcelPanel will automatically sync tracking numbers from Orders section in your WooCommerce admin once you add there, then track them.',
                'sync_tracking_numbers_t' => 'Orders section in WooCommerce admin',
                'sync_tracking_numbers_foot' => 'Additionally, how to get the tracking number, it\'s not about ParcelPanel. As we know, some merchants fulfilled orders via the 3rd party fulfillment service, some use dropshipping apps, some fulfilled by themselves etc. To know the tracking number of your order, we kindly suggest you asking suppliers or carriers support directly for some help.',

                'import_number_title' => 'Import tracking number of your orders',
                'import_con' => 'Import tracking numbers of your orders in bulk with a CSV file, or manually add one by one in the Edit order page.',
                'import_tracking_number' => 'Import tracking number',
                'import_help_link_con' => 'How to import tracking number with a CSV file?',

                'exception_shipments_to_check' => '<0><1> exception<2> shipments to check',
                'failed_attempt_shipments_to_check' => '<0><1> failed attempt<2> shipments to check',
                'expired_shipments_to_check' => '<0><1> expired<2> shipments to check',
                'pending_shipments_to_check' => '<0><1> pending<2> shipments to check',

                'shipments_lookups' => 'Shipments / Lookups',
                'delivery_performance' => 'Delivery performance',
                'valid_tracking' => 'Valid tracking',
                'shipments_lookups_over_time' => 'SHIPMENT / LOOKUPS OVER TIME',
                'shipment_status' => 'SHIPMENT STATUS',

                'delivery_days_by_destinations' => 'Delivery days by destinations',
                'delivery_days_by_couriers' => 'Delivery days by couriers',

                'upcoming_features' => 'Upcoming features 👏',
                'upcoming_features_t_1' => 'Integration with WPML...',
                'upcoming_features_c_1' => 'Will be launched in July',
                'upcoming_features_t_2' => 'Customized email templates',
                'upcoming_features_c_2' => 'Will be launched in August',
                'upcoming_features_t_3' => 'Notification / Product Recommendation analysis',
                'upcoming_features_c_3' => 'Will be launched in August',

                'upcoming_features_n_t_1' => 'Recently Released',
                'upcoming_features_n_t_c_1' => 'Tracking API',
                'upcoming_features_n_t_c_2' => 'Integration with WPML, Shippo, WooCommerce Shipping...',
                'upcoming_features_n_t_2' => 'In progress',
                'upcoming_features_n_t_2_c_1' => 'Customized ParcelPanel shipping notifications email templates',

                'upcoming_features_v9_con1' => 'Customized ParcelPanel shipping notifications',
                'upcoming_features_v9_con2' => 'More analysis (Tracking page, Shipping notifications, Coupons upsell)',
                'upcoming_features_v9_con3' => 'Integration with WPML, WooCommerce Shipping, Shippo, Sendcloud...',
                'upcoming_features_v9_con4' => 'More integrations...',

                'create_a_topic' => 'Create a topic',
                'create_a_topic_con' => 'Create a topic on support forum, our plugin support will help.',

                'get_email_support' => 'Get Email Support',
                'get_email_support_con' => 'Email us and we\'ll get back to you as soon as possible.',
                'start_live_chat' => 'Start Live Chat',
                'start_live_chat_con' => 'Talk to us directly via live chat to get help with your question.',
                'parcel_panel_help_docs' => 'ParcelPanel Help Docs',
                'parcel_panel_help_docs_con' => 'Find a solution for your problem with ParcelPanel documents and tutorials.',

                'Last_days' => 'Last <0> days',
                'day_range' => 'Day range',
                'starting_date' => 'Starting Date',
                'ending_date' => 'Ending Date',


                'import_card_title' => 'Add tracking numbers to orders',
                'import_card_con1' => 'Manually: add tracking numbers individually on the Edit order page. <0>Learn more<1>.',
                'import_card_con2' => 'Bulk import via CSV: import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.',
                'import_card_con3' => 'Integration: automatically import tracking numbers from integrated <0>plugins<1>.',
                'import_card_con4' => 'API: import tracking numbers programmatically using our <0>tracking API<1>.',

                'number_percentage_tip1' => 'The number and percentage of delivered shipments',
                'number_percentage_tip2' => 'The number and percentage of shipments correctly tracked',
                'tip3_title' => 'Tracking page',
                'number_percentage_tip3' => 'Orders / Revenue attributed to all marketing channels of ParcelPanel\'s tracking page',
                'tip4_title' => 'Shipping notifications',
                'number_percentage_tip4' => 'Orders / Revenue attributed to all marketing and coupons channels of ParcelPanel\'s shipping notifications',
                'orders_revenue_title_tip' => 'Orders / Revenue attributed to ParcelPanel marketing and coupons channels',
                'orders_revenue_title' => 'Total conversion orders / revenue',
                'shipments_lookups_tip' => 'The total number of shipments / The total number of times customers have tracked their shipment through the tracking page',

                'shipping_notifications_c1' => 'Recipients',
                'shipping_notifications_c1_tip' => 'The total number of recipients for shipping notifications',
                'shipping_notifications_c2' => 'Delivered',
                'shipping_notifications_c2_tip' => 'The number and percentage of delivered shipping notifications',
                'shipping_notifications_c3' => 'Opened',
                'shipping_notifications_c3_tip' => 'The number and percentage of opened shipping notifications',
                'shipping_notifications_c4' => 'Clicked',
                'shipping_notifications_c4_tip' => 'The number and percentage of clicked shipping notifications',
                'shipping_notifications_c5' => 'Marketing clicks',
                'shipping_notifications_c5_tip' => 'The total number of clicks your marketing channels in the shipping notifications, including product and product recommendation',

                'shipping_notifications_title' => 'ParcelPanel shipping notifications',
                'shipping_notifications_title_tip' => 'The total number of shipping notifications sent, including sent to customers and yourself',
                'shipping_notifications_param' => 'Performance summary',
                'shipping_notifications_over_time' => 'Shipping notifications over time',
                'shipping_notifications_over_check1' => 'Automatically notify your customers or yourself via email with ParcelPanel shipment status updates',
                'shipping_notifications_over_check2' => 'Unlock all advanced analytics and drive business growth with data-driven insights',
                'shipping_notifications_btn1' => 'Enable this feature',
                'shipping_notifications_btn2' => 'Upgrade now',

                'marketing_click_title_tip' => 'The total number of clicks your marketing channels on the tracking page, including product and product recommendation',
                'marketing_click_title' => 'Tracking page Marketing clicks',
                'marketing_click_over_time' => 'Marketing clicks notifications over time',
                'marketing_click_over_check1' => 'Turn your tracking page into a marketing channel to make more sales',

                'remaining_total_tip' => 'The total number of available quotas / The total number of quotas in the current plan',
                'delivery_days_by_destinations_tip' => 'The total number of delivered shipments and average transit day based on destination',
                'delivery_days_by_couriers_tip' => 'The total number of delivered shipments and average transit day based on couriers',
                'coupons_title_tip' => 'Orders and revenue attributed to the coupons channel of ParcelPanel\'s shipping notifications',
                'coupons_title' => 'Coupons upsell',
                'coupons_check' => 'Enable to boost more sales for Increased Revenue',
                'coupons_table1' => 'Coupons',
                'coupons_table2' => 'Orders',
                'coupons_table3' => 'Revenue',

                'sync_tracking_numbers_con1' => 'Tracking numbers are synchronized from your WooCommerce admin\'s Orders section, please don\'t forget to add them from <0>Edit order page → ParcelPanel section<1>.',
                'sync_tracking_numbers_con2' => 'To get the tracking number, it\'s not within ParcelPanel\'s scope. <0>We know that different merchants use various shipping methods such as third-party platforms, dropshipping apps, or self-fulfillment. To find out the tracking number for your order, we recommend reaching out directly to your <1>shipping provider<2> for assistance.',

                'btn_import_via' => 'Bulk Import via CSV',
                'chart_shipments' => 'Shipments',
                'chart_lookups' => 'Lookups',
                'chart_notifications' => 'Shipping notifications',
                'chart_marketing' => 'Marketing clicks',


                // v3.9.1
                'get_started' => 'Get started',
                'how_work_in_woo' => 'How does ParcelPanel work in WooCommerce?',
                'welcome_card_title_con' => 'In just one minute, you\'ll learn how to enable your customers to track their orders on your store\'s tracking page.',
                'video_tutorial' => 'Video tutorial',
                'how_add_to_store_menu' => 'How to add the tracking page to your store navigation menu?',
                'step_add_to_store_menu' => 'ParcelPanel automatically generates a branded tracking page for your store. Add it to your storefront, enabling customers to track orders independently and reducing support requests.',
                'step_importing_tracking_numbers' => 'ParcelPanel supports multiple methods for importing tracking numbers to orders (WooCommerce admin\'s Orders section), please don\'t forget to add them.',
                'step_shipping_notifications' => 'Here, you can customize shipping notifications to match your brand identity. Once enabled, customers will promptly receive updates on their orders.',
                'step_analysis' => 'Here, various data analysis panels provide insights to optimize channels and gauge ParcelPanel\'s performance.',
                'start_free_trial' => 'Start a free trial',
                'get_even_more' => 'You\'re all set! Get even more from ParcelPanel.',
                'no_credit_card' => 'Unlock our most powerful shipment tracking tools with a free trial, <0>no credit card required!<1> ✨',
                'done_click' => 'I\'ve done this',
                'bulk_import_via_csv' => '<2>Bulk import via CSV<3>: import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.',
                'drop_shipping_optional_n1' => 'Hide all Chinese regions easily, bringing your customers an all-around brand shopping experience. <0>Learn more<1>.',
                'go_to_enable' => 'Go to enable',
                'import_card_con5' => 'Import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.',
                'quick_setup_guide' => 'Quick setup guide',
                'add_tracking_numbers' => 'Add tracking numbers',

                // v3.9.1

                // v-analysis_version
                'recommendation_1_1_title' => 'Grasp your customers\' tracking journey',
                'recommendation_1_1_content' => 'Boost website traffic and upsells by adding a tracking page in your store menu, leveraging customer\'s 3.7+ times order tracking checks.',
                'recommendation_1_2_title' => 'Personalize your brand tracking',
                'recommendation_1_2_content' => 'Customize the experience with a progress bar in your brand\'s color, and beyond, for a tracking journey that\'s uniquely you.',
                'recommendation_1_3_title' => 'Effortless EDD insight',
                'recommendation_1_3_content' => 'Ensure customers have a seamless tracking experience with post-purchase EDD, enhancing their post-purchase satisfaction.',
                'recommendation_1_4_title' => 'Boost more revenue',
                'recommendation_1_4_content' => 'Maximize potential revenue by offering personalized product recommendations to your customers.',
                'recommendation_1_5_title' => 'Localized tracking details',
                'recommendation_1_5_content' => 'Ensure a more localized experience by automatically translating tracking details for your global customers.',
                'recommendation_2_1_title' => 'Track with ease',
                'recommendation_2_1_content' => 'Add tracking numbers to auto-sync and and present detailed tracking information from carriers on your tracking page.',
                'recommendation_2_2_title' => 'Self-Notify before customer complaints',
                'recommendation_2_2_content' => 'Opt for Exception and Failed Attempt email notifications to proactively resolve issues before customer complaints arise.',
                'recommendation_2_3_title' => 'Review your ParcelPanel notification history',
                'recommendation_2_3_content' => 'Simply click the mail icon on the shipment page to view the full history of ParcelPanel emails sent for that shipment.',
                'recommendation_2_4_title' => 'Multilingual email automation',
                'recommendation_2_4_content' => 'Send out ParcelPanel\'s shipping updates in the language your customers feel most comfortable with, all automated and hassle-free.',
                'recommendation_2_5_title' => 'Boost repeat business with coupons',
                'recommendation_2_5_content' => 'Include exclusive coupons in your ParcelPanel shipping updates. It\'s a simple way to entice customers to return for another purchase.',
                'recommendation_3_1_title' => 'Seamless integration for unleashed potential',
                'recommendation_3_1_content' => 'Integrate ParcelPanel effortlessly with multiple integrated plugins, such as <0> to unlock the full potential of your business operations.',
                'recommendation_3_2_title' => 'Streamline your order fulfillment process',
                'recommendation_3_2_content' => 'Customize order statuses to match the unique workflow of your store, ensuring a smoother and more efficient fulfillment experience.',
                'recommendation_3_3_title' => 'Enhance Brand Experience with Dropshipping Mode',
                'recommendation_3_3_content' => 'Eliminate the display of all Chinese regions to provide your customers with a consistent brand shopping experience, tailored to their locale.',
                'recommendation_1_btn' => 'Add tracking page',
                'recommendation_2_btn' => 'Set it up',
                'recommendation_3_btn' => 'Add now',
                'recommendation_4_btn' => 'View Notification History',

                'staffing_time_c_save' => 'Saved staffing time calculate',
                'staffing_time_c_desc' => 'Saved staffing time (working hours) = (Average time per WISMO ticket handled (minute) * Lookups) / 60',
                'staffing_time_c_f_desc' => 'The default value is sourced  from multiple professional reports, but it may not match your actual situation. You can adjust it to better suit your situation.',
                'staffing_time_save' => 'Saved staffing time',
                'staffing_time_tip' => 'Saved staffing time = Average time per WISMO ticket handled (minute) * Lookups',
                'staffing_time_a' => 'Average time per WISMO ticket handled:',
                'staffing_cost_c_save' => 'Saved staffing cost calculate',
                'staffing_cost_c_desc' => 'Saved staffing cost = Average hourly salary for customer service representatives * Saved staffing time (working hours)',
                'staffing_cost_c_f_desc' => 'The default value is the average for US eCommerce companies and currency-adjusted, but it may not match your actual situation. You can adjust it to better suit your situation.',
                'staffing_cost_save' => 'Saved staffing cost',
                'staffing_cost_a' => 'Average hourly salary for customer service representatives:',
                'how_is_it_c' => 'How is it calculated?',
                'recommendation' => 'Recommendation',

                // v-analysis_version

            ],
            'trackPage' => [
                'tracking_page' => 'Tracking page',
                'preview' => 'Preview',
                'save_changes' => 'Save changes',

                'appearance' => 'Appearance',
                'languages' => 'Languages',
                'custom_shipment_status' => 'Custom shipment status',
                'estimated_delivery_time' => 'Estimated delivery time',
                'product_recommendation' => 'Product recommendation',
                'manual_translations' => 'Manual translations',
                'css_html' => 'CSS & HTML',

                'foot_con' => 'How to add tracking page to your store? <0>Click here<1>',

                'style' => 'Style',
                'theme_container_width' => 'Theme container width',
                'progress_bar_color' => 'Progress bar color',
                'theme_mode' => 'Theme mode',
                'light_mode' => 'Light mode',
                'light_mode_con' => 'Choose Light mode if it is dark-colored text on your store theme.',
                'dark_mode' => 'Dark mode',
                'dark_mode_con' => 'Choose Dark mode if it is light-colored text on your store theme.',
                'order_lookup_widget' => 'Order lookup widget',
                'lookup_options' => 'Lookup options',
                'by_order_email' => 'By order number and email',
                'by_number' => 'By tracking number',
                'parcel_panel_branding' => 'ParcelPanel branding',
                'parcel_panel_branding_con' => 'Remove "Powered by ParcelPanel"',
                'parcel_panel_branding_help' => 'to remove ParcelPanel branding for Free 😘',
                'additional_text' => 'Additional text',
                'text_above_title' => 'Text above the order lookup widget',
                'text_above_eg' => 'e.g. Curious about where your package is? Click the button to track!',
                'text_below_title' => 'Text below the order lookup widget',
                'text_below_eg' => 'e.g. Any questions or concerns? Please feel free to contact us!',
                'tracking_results' => 'Tracking results',
                'shipment_display_options' => 'Shipment display options',
                'carrier_name_and_logo' => 'Carrier name and logo',
                'tracking_number' => 'Tracking number',
                'product_info' => 'Product info',
                'tracking_details' => 'Tracking details',
                'google_translate_widget' => 'Google translate widget',
                'map_coordinates' => 'Map coordinates',
                'map_coordinates_con' => 'Show map on your tracking page',
                'current_location' => 'Current location',
                'destination_address' => 'Destination address',
                'hide_keywords' => 'Hide keywords',
                'hide_keywords_eg' => 'e.g. China,Aliexpress,Chinese cities. Separate with comma.',
                'date_and_time_format' => 'Date and time format',
                'date_format' => 'Date format',
                'time_format' => 'Time format',

                'theme_language' => 'Theme language',

                'hot' => 'HOT',
                'custom_shipment_status_con' => 'Add custom status (up to 3) with time interval and description, to timely inform customers about the progress of their orders before you fulfill them. <0>Learn more<1>.',
                'custom_shipment_status_add' => 'Add custom shipment status',
                'custom_shipment_status_con_s' => 'Create additional steps to inform customers of your process prior to shipping',
                'ordered' => 'Ordered',
                'order_ready' => 'Order ready',
                'in_transit' => 'In transit',
                'out_for_delivery' => 'Out for delivery',
                'delivered' => 'Delivered',
                'custom_tracking_info' => 'Custom tracking info',
                'custom_tracking_info_con' => 'Add one custom tracking info with time interval to reduce customer anxiety when the package was stuck in shipping, and it will be shown if the tracking info hasn\'t updated for the days you set.',
                'custom_tracking_info_day' => 'Day(s) since last tracking info',
                'custom_tracking_info_day_eg' => 'eg. 7',
                'custom_tracking_info_eg' => 'e.g. In Transit to Next Facility',

                'estimated_delivery_time_con' => 'Set an estimated time period that will be displayed on your tracking page, to show your customers when they will receive their orders. <0>Learn more<1>.',
                'enable_this_feature' => 'Enable this feature',
                'calculate_from' => 'Calculate from',
                'order_created_time' => 'Order created time',
                'order_shipped_time' => 'Order shipped time',
                'estimated_delivery_time_common' => 'Estimated delivery time: <0> - <1>(d)',
                'advanced_settings_based_destinations' => 'Advanced settings based on destinations',
                'shipping_to' => 'Shipping to',
                'add_another' => 'Add another',

                'product_recommendation_con_f' => 'Turn your tracking page into a marketing channel to make more sales.',
                'product_recommendation_con_s' => '<0>Add categories<1> in your WordPress Products section to recommend. By default the recommendations are based on the customer’s order items, you can also select a category to recommend. <2>Learn more.<3>',
                'display_at_on_the' => 'Display at/on the',
                'top' => 'Top',
                'right' => 'Right',
                'bottom' => 'Bottom',
                'advanced_settings_based_category' => 'Advanced settings based on a category',
                'select_a_category' => 'Select a category',
                'category' => 'Category',

                'manual_translations_con' => 'Here you can manually translate the tracking detailed info by yourself.',
                'manual_translations_con_s' => 'Note: this feature distinguishes the strings based on Space, please don\'t forget the comma and period when you do the translation.',
                'translation_before' => 'Tracking info (before translation)',
                'translation_after' => 'Tracking info (after translation)',
                'translation_before_eg' => 'e.g. Shanghai,CN',
                'translation_after_eg' => 'Sorting Center',

                'css' => 'CSS',
                'contact_us_track' => 'contact us',
                'css_con' => 'View the CSS codes here you used to do the custom change of your tracking page, if you would like to change codes, please',
                'css_con_s' => 'or follow <0>this instruction<1>.',
                'html_top' => 'HTML top of page',
                'html_bottom' => 'HTML bottom of page',


                "tr_order_number" => 'Order number',
                "tr_email" => 'Email or phone number',
                "tr_or" => 'Or',
                "tr_tracking_number" => 'Tracking number',
                "tr_track" => 'Track',
                "tr_order" => 'Order',
                "tr_status" => 'Status',
                "tr_shipping_to" => 'Shipping to',
                "tr_current_location" => 'Current location',
                "tr_carrier" => 'Carrier',
                "tr_product" => 'Product',
                "tr_not_yet_shipped" => 'Not yet shipped',
                "tr_waiting_updated" => 'Waiting for carrier update',

                "tr_ordered" => 'Ordered',
                "tr_order_ready" => 'Order ready',
                "tr_pending" => 'Pending',
                "tr_info_received" => 'Info received',
                "tr_in_transit" => 'In transit',
                "tr_out_for_delivery" => 'Out for delivery',
                "tr_delivered" => 'Delivered',
                "tr_exception" => 'Exception',
                "tr_failed_attempt" => 'Failed attempt',
                "tr_expired" => 'Expired',

                "tr_expected_delivery" => 'Estimated delivery date',
                "tr_may_like" => 'Product recommendation',
                "tr_additional_text_above" => 'Additional text above',
                "tr_additional_text_below" => 'Additional text below',
                "tr_custom_shipment_status_name_1" => 'Custom shipment status name 1',
                "tr_custom_shipment_status_info_1" => 'Custom shipment status info 1',
                "tr_custom_shipment_status_name_2" => 'Custom shipment status name 2',
                "tr_custom_shipment_status_info_2" => 'Custom shipment status info 2',
                "tr_custom_shipment_status_name_3" => 'Custom shipment status name 3',
                "tr_custom_shipment_status_info_3" => 'Custom shipment status info 3',
                "tr_custom_tracking_info" => 'Custom tracking info',

                "tr_order_not_found" => 'Could not find order',
                "tr_enter_your_order" => 'Enter your order number',
                "tr_enter_your_email" => 'Enter your email or phone number',
                "tr_enter_your_tracking_number" => 'Enter your tracking number',


                'progress_bar' => 'Progress bar',
                'color' => 'Color',
                'layout' => 'Layout',
                'layout_horizontal' => 'Horizontal on mobile',
                'layout_vertical' => 'Vertical on mobile',
                'track_email_or_phone' => 'By order number and email/phone number',
                'hidden_word_eg' => 'e.g. China,Aliexpress,Chinese cities. Separate with comma, input Chinese cities will hide all of Chinese cities.',
                'custom_status_name' => 'Custom Status Name',
                'status' => 'Status',
                'tracking_info' => 'Tracking info',
                'tracking_info_eg' => 'e.g. We are currently packing your order',
                'days' => 'Days',
                'days_eg' => 'e.g. 1',
                'custom_shipment_status_con_1' => 'Add up to 3 custom shipment statuses with time intervals and descriptions to inform customers about their order progress before fulfillment. <0>Learn more<1>.',
                'custom_tracking_info_con_1' => 'Add one custom tracking info at specific time intervals to ease customers\' worries when their package is delayed in transit. The info will appear if there hasn\'t been any tracking update for the number of days you specify.',
                'expected_delivery_date' => 'Estimated delivery date',
                'expected_delivery_date_con' => 'Set an estimated delivery date to inform customers when they can expect to receive their orders on your tracking page. <0>Learn more<1>.',
                'expected_delivery_date_eg' => 'Estimated delivery date: <0> - <1>(d)',
                'dynamic_tracking_details' => 'Dynamic tracking details',
                'automatic_translation' => 'Automatic translation',
                'automatic_translation_con' => 'ParcelPanel captures tracking details from carriers\' websites. Professional plans and above support auto-translation based on the tracking page\'s language when customers visit.',
                'manual_translation' => 'Manual translation',
                'manual_translations_con_1' => '1. This feature distinguishes strings based on spaces, so please remember to include commas and periods when translating. <0> 2. If you\'ve enabled automatic translation, please manually review and edit the tracking info after it has been translated.',
                'order_lookup' => 'Order Lookup',
                'shipment_status' => 'SHIPMENT STATUS',
                'features' => 'FEATURES',
                'error_text' => 'Error Text',
                'mont_time_text' => 'month&time Text',
                'change_default_language' => 'Change default language',
                'change_to' => 'Change to',
                'static_text' => 'Static text',
                'static_text_con1' => 'Edit the static text on your tracking page here.',
                'static_text_con2' => 'to add more supported languages 😘',
                'automatic_language_switching' => 'Automatic language switching',
                'automatic_language_switching_con' => 'ParcelPanel supports multilingual tracking pages and auto-switches the language based on the store\'s language when customers visit. If the language is not supported, the default language will be displayed.',
                'the_initial_con1' => 'The initial',
                'the_initial_con2' => 'for the tracking page is English.',
                'default_language' => 'default language',
                'product_recommendation_con1' => 'Transform your tracking page into a revenue-generating marketing channel to increase sales and customer engagement.',
                'product_recommendation_title1' => 'Recommendation logic',
                'product_recommendation_category' => 'Product Category',
                'product_recommendation_b_1' => 'Based on order items',
                'product_recommendation_b_2' => 'Based on specific category',

                'custom_status' => 'Custom status',

                // v-analysis_version
                'category_s' => 'Product category is',
                'category_not_yet' => 'No category yet',
                'category_not_add' => 'You have not set up categories, <0>add categories<1>',
                'category_s_c' => 'Select category',
                'tag_s' => 'Product tag is',
                'tag_not_yet' => 'No tag yet',
                'tag_not_add' => 'You have not set up tags, <0>add tags<1>',
                'tag_s_c' => 'Select tag',
                'select_pro_con' => 'Select product condition',
                'edd_desc' => 'Estimated delivery date = Order created date + Order cutoff and processing time + Transit time',
                'order_fulfilled_date' => 'Order fulfilled date',
                'edd_desc_1' => 'Estimated delivery date = Order fulfilled date + Transit time',
                'post_purchase_edd' => 'Post-purchase EDD',
                'shipping_zone_t' => 'Shipping zone',
                'shipping_zone' => 'All shipping zones',
                'shipping_zone_1' => 'Rest of the shipping zones',
                'days_1' => 'days',
                'in_another_zone' => 'In another zone',
                'no_results_found' => 'No results found',
                'date_range' => 'Date range:',
                'transit_times' => 'Transit times',
                'transit_times_add' => 'Add transit time',
                'transit_times_edit' => 'Edit transit time',
                'order_cutoff_time' => 'Order cutoff time',
                'processing_time' => 'Processing time',
                'business_days' => 'business days',
                'business_days_t' => 'Business days',
                'workflow_edit' => 'Edit fulfillment workflow',
                'order_cutoff_time_d' => 'The deadline at which orders need to be placed to ensure same-day processing.',
                'processing_time_d' => 'Add how long your warehouse needs to process an order.',
                'business_days_t_d' => 'Select which days your warehouse can process an order.',
                'fulfillment_workflow' => 'Fulfillment workflow',
                'recommendation_d' => '<0>Add categories<1>  or <2>Add tags<3> in your WordPress products section  to achieve more precise recommendations.',
                'recommendation_h' => 'Default recommendations are based on customer\'s order items, but you can also set product conditions to make recommendations. <0>Learn more<1>.',
                'b_on_best_selling' => 'Based on best-selling',
                'b_on_pro_condition' => 'Based on product condition',
                'shipping_zone_con' => 'All countries and regions not specifically configured will be assigned here.',
                'search_countries' => 'Search countries and regions',
                // v-analysis_version
            ],
            'shipment' => [
                'shipments' => 'Shipments',
                'columns' => 'Columns',
                'pagination' => 'Pagination',
                'item_per_page' => 'Number of items per page:',
                'screen_options' => 'Screen Options',

                'all' => 'All',
                'import_tracking_number' => 'Import tracking number',
                'search_eg' => 'Filter order number or Tracking number',
                'filter_by_date' => 'Filter by date',
                'filter_by_courier' => 'Courier',
                'filter_by_country' => 'Destination',
                'showing_shipments' => 'Showing <0> shipments',
                'page_of' => 'of <0>',
                'select_sync_time' => 'Select sync time',
                're_sync' => 'Re-sync',
                'shipment_foot' => 'Why are my orders on black Pending status? <0>Click here<1>',
                'no_date_yet' => 'No date yet',
                'no_orders_yet' => 'No shipment yet',
                'table_empty_tip' => 'Try changing the filters or search term',

                'order' => 'Order',
                'tracking_number' => 'Tracking number',
                'courier' => 'Courier',
                'last_check_point' => 'Last check point',
                'transit' => 'Transit',
                'order_date' => 'Order date',
                'shipment_status' => 'Shipment status',

                'export_shipments' => 'Export shipments',
                'export_con' => '<0> shipments data will be exported a CSV table,',
                'export_learn_more' => 'Learn more about <0>CSV table headers<1>.',
                'exporting' => 'Exporting:',
                'exporting_con' => 'Please DO NOT close or refresh this page before it was completed.',

                'import_back' => 'back',
                'import_title' => 'Import tracking number',
                'import_step_1_title' => 'Upload CSV file',
                'import_step_2_title' => 'Column mapping',
                'import_step_3_title' => 'Import',
                'import_step_4_title' => 'Done!',
                'import_step_1_c_title' => 'Select CSV file to import',
                'import_step_1_c_f' => 'Your CSV file should have following columns:',
                'import_step_1_c_required' => '<0>Required:<1> Order number, Tracking number',
                'import_step_1_c_optional' => '<0>Optional:<1> Courier, SKU, Qty, Date shipped, Mark order as Completed',
                'import_step_1_note' => 'Note:',
                'import_step_1_note_f' => 'Product sku and quantity are required if you need to ship the items in one order into multiple packages. <0>Learn more<1>.',
                'import_step_1_note_s' => 'If the total quantity shipped exceeds the total quantity of items in an order, the system will automatically adjust to the maximum shippable quantity of the items.',
                'import_step_1_f_file' => 'Choose a local file',
                'import_step_1_f_file_name' => 'No file chosen',
                'import_step_1_f_choose' => 'Choose File',
                'import_step_1_s_map' => 'Mapping preferences',
                'import_step_1_s_con' => 'Enable this feature to save previous column mapping settings automatically',
                'import_step_1_t_csv' => 'CSV Delimiter',
                'import_step_1_t_con' => 'This sets the separator of your CSV files to separates the data in your file into distinct fields',
                'import_step_1_btn_hid' => 'Hide advanced options',
                'import_step_1_btn_show' => 'Show advanced options',
                'import_step_1_btn_continue' => 'Continue',
                'import_step_2_c_title' => 'Map CSV fields to orders',
                'import_step_2_c_con' => 'Select fields from your CSV file to map against orders fields.',
                'import_step_2_c_top_f' => 'Column name',
                'import_step_2_c_top_s' => 'Map to field',
                'import_step_2_btn' => 'Import',
                'import_step_2_select' => 'Select a column title',
                'import_step_2_show_required' => ' (*Required)',
                'import_step_2_show_optional' => ' (Optional)',
                'import_step_2_order_number' => 'Order number',
                'import_step_2_tracking_number' => 'Tracking number',
                'import_step_2_courier' => 'Courier',
                'import_step_2_sku' => 'SKU',
                'import_step_2_qty' => 'Qty',
                'import_step_2_fulfilled_date' => 'Date shipped',
                'import_step_2_mark_order_as_completed' => 'Mark order as Completed',
                'import_step_3_c_title' => 'Importing',
                'import_step_3_c_con' => 'Your orders are now being imported…',
                'import_step_3_uploading' => 'Uploading:',
                'import_step_3_uploading_con' => 'Please DO NOT close or refresh this page before it was completed.',
                'import_step_4_c_title' => 'Import Completed',
                'import_step_4_c_tip_success' => '<0> tracking numbers imported successfully',
                'import_step_4_c_tip_fail' => '<0> tracking numbers imported failed,',
                'import_step_4_c_tip_model' => 'view details',
                'import_step_4_c_shipments' => 'View shipments',
                'import_step_4_c_again' => 'Upload again',
                'import_step_4_c_records' => 'Import records',
                'import_step_4_mod_title' => 'View details',
                'import_step_4_mod_file' => 'Import file name:',
                'import_step_4_mod_number' => 'Total tracking numbers:',
                'import_step_4_mod_success' => 'Succeeded:',
                'import_step_4_mod_failed' => 'Failed:',
                'import_step_4_mod_details' => 'Details:',
                'import_step_4_mod_close' => 'Close',
                'import_step_4_c_records_list' => '<0> Uploaded <1>, <2> tracking numbers, failed to upload <3>,',

                'manually_update_status' => 'Manually update status',
                'save_changes' => 'Save changes',
                'updating_shipment_title' => 'Updating the status for <0> shipment.',
                'automatic_shipment_status_update' => 'Automatic shipment status update',

                'import_step_1_model' => 'You can also copy or download a sample template to import tracking numbers.',
                'import_step_1_model_btn' => 'View instruction',
                'import_step_1_model_title' => 'Import tracking number',
                'import_step_1_model_con_1' => 'Step 1: Copy the <0>sample template<1> on Google Sheets (strongly recommend) or download <2>this CSV file<3>.',
                'import_step_1_model_con_2' => 'Step 2: Fill in the data following the <0>Import Template Instructions<1>. Tracking number that do not comply with the instructions will not be imported.',
                'import_step_1_model_con_3' => 'Step 3: Download the file in a CSV format and upload it.',
                'import_step_1_model_b_import' => 'Import',
                'import_step_1_model_b_close' => 'Close',

                'order_list_text1' => 'Only ParcelPanel shipping notifications, don\'t include WooCommerce email notifications.',
                'order_list_text2' => 'No notifications yet',
                'order_list_text3' => 'You have not sent any ParcelPanel shipping notifications yet',

                'sync_to_paypal' => 'Sync to PayPal',
                'sync_orders' => 'Sync orders',
                'sync_orders_con' => 'The system will sync your orders, which may take a few minutes depending on the number of orders pending synchronization.',
                'notification_history' => 'Notification history',

                'unsynced' => 'Unsynced',
                'other_payment_methods' => 'Other payment methods',
                'synced_successfully' => 'Synced successfully',
                'sync_failed' => 'Sync failed',
                'manually_sync_to_paypal' => 'Manually sync to PayPal',


                // v3.8.2
                'order_fulfilled_at' => 'Shipped date',
                'country_name' => 'Destination',
                'customer_name' => 'Customer name',
                'last_msg_time' => 'Last check point time',
                'residence_time' => 'Residence time',
                'order_number' => 'Order number',
                'transit_time' => 'Transit time',
                'estimated_delivery_time' => 'Estimated delivery time',
                'menu_title' => 'View on tracking page',
                'view_notification_history' => 'View notification history',
                'shipment_info' => 'Shipment info',
                'customer_info' => 'Customer info',
                'oldest_to_newest' => 'Oldest to newest',
                'newest_to_oldest' => 'Newest to oldest',
                'longest_to_shortest' => 'Longest to shortest',
                'shortest_to_longest' => 'Shortest to longest',
                'more_filter' => 'More Filter',
                'custom' => 'Custom',
                'more_filters' => 'More filters',
                'reset_all_filters' => 'Reset all filters',
                'done_filter' => 'Done & filter',
                'min_day' => 'Min day(s)',
                'max_day' => 'Max day(s)',
                'reset_all' => 'Reset all',
                'sync_save' => 'Sync & save',
                'last_checkpoint_time' => 'Last checkpoint time',
                'search_eg_new' => 'Filter by Order number, Tracking number, Customer name',


                // v3.8.2
            ],
            'setting' => [
                'settings' => 'Settings',
                'delivery_notifications' => 'Delivery notifications',
                'preview' => 'Preview',
                'add_an_order_tracking_switch' => 'Add an order tracking section to WooCommerce email notifications',
                'add_an_order_tracking_select' => 'Select order status to show the tracking section',
                'shipping_email_title' => 'ParcelPanel shipping email notifications',
                'shipping_email_note' => 'This feature will allow you to send email notifications based on ParcelPanel shipment status.',
                'manage_template' => 'Manage template',
                'account_page_tracking' => 'Account page tracking',
                'add_a_order_track_btn' => 'Add a track button to orders history page (Actions column)',
                'add_a_order_track_note' => 'This feature will allow you to add a track button to the orders history page (Actions column) so your customers can track their orders with one click there.',
                'add_a_order_track_model' => 'View example',
                'add_a_order_track_select' => 'Select order status to show the track button',
                'configuring_wooCommerce_orders' => 'Configuring WooCommerce Orders',
                'rename_order_status_switch' => 'Rename order status "Completed" to "Shipped"',
                'rename_order_status_note' => 'This feature will allow you to change the order status label name from "Completed" to "Shipped".',
                'add_a_order_track_wc_btn' => 'Add a track button to WooCommerce orders (Actions column)',
                'add_a_order_track_wc_note' => 'This feature will allow you to add a shortcut button to WooCommerce orders (Actions column), which will make it easier to add tracking information.',
                'drop_shipping_mode' => 'Dropshipping mode',
                'enable_drop_shipping_mode' => 'Enable dropshipping mode',
                'enable_drop_shipping_mode_note' => 'This feature will allow you to hide all Chinese regions to bring your customers an all-around brand shopping experience. <0>Learn more<1>.',
                'courier_matching' => 'Courier matching',
                'courier_matching_note' => 'If you know the couriers you use, enable them for priority matching. Otherwise, leave it blank, and the system will automatically identify suitable couriers for you.',
                'search_couriers' => 'Search couriers',
                'processing' => 'Processing',
                'shipped' => 'Shipped',
                'completed' => 'Completed',
                'partial_shipped' => 'Partially Shipped',
                'cancelled' => 'Cancelled',
                'refunded' => 'Refunded',
                'failed' => 'Failed',
                'draft' => 'Draft',
                'save_changes' => 'Save changes',
                'couriers_selected' => '<0> selected',
                'couriers_selected_Showing' => 'Showing <0> of <1> couriers',

                'model_account_btn_title' => 'How it works?',
                'model_account_btn_con' => 'After enabled, ParcelPanel will add a track button to the orders history page (Actions column), so your customers can track their orders with one click directed to your store tracking page.',
                'model_account_btn_con_s' => 'After enabled, ParcelPanel will add a track button to orders admin (Actions column), you can add tracking info easily without clicking into order details.',

                'ship_title' => 'Shipping notifications',
                'ship_auto_tracking' => 'Automatically add an order tracking section in the email notifications sent by WooCommerce based on the order status. <0>Learn more<1>.',
                'ship_title1' => 'ParcelPanel shipping notifications',
                'ship_con1' => 'Automatically notify your customers or yourself via email with ParcelPanel shipment status updates. <0>Learn more<1>.',
                'ship_title2' => 'Notify yourself',
                'ship_btn2' => 'Notify yourself',
                'ship_con2' => 'Auto-send email notifications to yourself based on ParcelPanel shipment status update.',
                'ship_title3' => 'Notify your customers',
                'ship_btn3' => 'Customize your brand',
                'ship_con3' => 'Auto-send email notifications to your customers based on ParcelPanel shipment status update.',
                'ship_edit_template' => 'Edit template',

                'ship_wc_set_title' => 'Tailored for WooCommerce',
                'ship_wc_set_con1' => 'Add a track button to the orders history page (Actions column) enabling customers to effortlessly track their orders with a single click there.',
                'ship_wc_set_con3' => 'Rename the order status label from "Completed" to "Shipped".',

                'ship_wc_set_model_con1' => 'After enabling this feature, the <0>label name<1> for the order status will be changed from "Completed" to "Shipped". <2>By default, the "Completed" status in WooCommerce indicates that the <3>Order fulfilled and Complete<4> and requires no further action. As a merchant, you have the option to rename this status to "Shipped" to better reflect the current status of the order. "Shipped" is synonymous with "Completed" in terms of order fulfillment.',
                'ship_wc_set_model_note' => '<0>Note<1>: This change only affects the display in your admin interface, and it is fully compatible with other plugins that integrate with the "Completed" status.',

                'ship_email_html_model_title' => 'Revert email template to default?',
                'ship_email_html_model_con' => 'This action can\'t be undone! Are you sure you want to revert this template to the default settings? This action cannot be reversed, and any changes you have made to [Section settings], [Product recommendation], and [Coupons upsell] will all be lost.',

                'ship_email_html_model1' => 'Send test email',
                'ship_email_html_model_con1' => 'Email address',
                'ship_email_html_model2' => 'Leave page with unsaved changes?',
                'ship_email_html_model_btn_stay' => 'Stay',
                'ship_email_html_model_btn_leave' => 'Leave page',
                'ship_email_html_model_con2' => 'Leaving this page will delete all unsaved changes.',

                'ship_email_table_subject' => 'Subject:',
                'ship_email_table_power' => 'Powered by ParcelPanel',
                'ship_email_table_power_click' => 'Click to remove',

                'ship_email_notify_title' => 'Recipient info',
                'ship_email_notify_title1' => 'Notify yourself',
                'ship_email_notify_btn' => 'Save changes',
                'ship_email_notify_title2' => 'Configure notifications',
                'ship_email_notify_con2' => 'Enable desired notifications to stay informed of the latest shipment status updates.',

                'ship_email_reset_default' => 'Reset to default',
                'ship_email_visual' => 'Visual email editor',
                'ship_email_html' => 'HTML email editor',

                'ship_email_customize' => 'Customize your brand:',
                'ship_email_more_actions' => 'More actions',
                'ship_email_sender_info' => 'Sender info',
                'ship_email_branding' => 'ParcelPanel branding',
                'ship_email_branding_con' => 'Remove "Powered by ParcelPanel"',
                'ship_email_remove_con' => 'to remove it for Free 😘',
                'ship_email_table_lang_con' => 'ParcelPanel\'s Auto Multilingual Email Sending',
                'ship_email_table_lang_con1' => 'Auto-send based on your customers\' country. <0>Learn more<1>.',
                'ship_email_table_accent' => 'Accent color',
                'ship_email_table_logo' => 'Logo width',
                'ship_email_table_site_title' => 'Site Title',
                'ship_email_table_site_con' => 'Appears in the header without a logo added.',
                'ship_email_table_d_url' => 'Destination URL',
                'ship_email_table_d_url_con' => 'Leave blank for no link.',
                'ship_email_table_address' => 'Address',
                'ship_email_table_address_con' => 'Adding a physical address can reduce spam.',
                'ship_email_table_footer_d' => 'Footer Description',
                'ship_email_table_section_settings' => 'Section settings',
                'ship_email_table_subject_t' => 'Subject',
                'ship_email_table_subject_con' => 'This field can\'t be blank',
                'ship_email_table_heading' => 'Heading',
                'ship_email_table_description' => 'Description',
                'ship_email_table_button' => 'Button',
                'ship_email_table_button_con' => 'Leave blank for no button.',
                'ship_email_table_additional_text' => 'Additional Text',
                'ship_email_table_shipment_items' => 'Shipment items',
                'ship_email_table_body' => 'Body',
                'ship_email_table_enable_feature' => 'Enable this feature',
                'ship_email_table_recommendation' => 'Recommendation logic',
                'ship_email_table_recommendation1' => 'Based on order items',
                'ship_email_table_recommendation2' => 'Based on specific collection',
                'ship_email_table_category' => 'Select a category',
                'ship_email_table_category_pro' => 'Product Category',
                'ship_email_table_pro_recommendation' => 'Product recommendation',
                'ship_email_table_coupons_upsell' => 'Coupons upsell',
                'ship_email_table_coupons_code' => 'Coupons code',
                'ship_email_table_coupons_create' => 'Create a coupons',
                'ship_email_table_coupons_create_con' => 'in your WooCommerce admin, and enter it above.',
                'ship_email_table_button_text' => 'Button text',
                'ship_email_table_button_d_url' => 'Button Destination URL',
                'ship_email_theme_settings' => 'Theme settings',

                'ship_wc_set_con4' => 'Add a shortcut button to WooCommerce orders (Actions column), which will make it easier to add tracking information.',
                'ship_wc_set_con5' => 'Hide all Chinese regions to bring your customers an all-around brand shopping experience. <0>Learn more<1>.',

                'discard_title' => 'Discard all unsaved changes?',
                'discard_con' => 'If you discard changes, you\'ll delete any edits you made since you last saved.',
                'email_subject' => 'Email subject',
                'email_body' => 'Email body',
                'email_settings' => 'Email settings',
                'enable_this_notification' => 'Enable this notification',

                'wc_email_tip_old' => 'The following emails are developed and sent by ParcelPanel. Rest assured, all your previous settings (shipping emails sent by WooCommerce) are fully compatible, simply navigate to <0>WooCommerce settings<1> to access your familiar setup with ease.<br/> Please note that if you have set up the same shipping notifications in both here and WooCommerce, emails will be sent twice. <2>Learn more<3>.',
                'wc_email_tip_new' => 'The following emails are developed and sent by ParcelPanel. However, if you prefer to use WooCommerce\'s standard <4>wp_mail()<5> email system (ParcelPanel shipping emails sent by WooCommerce), you can easily set it up by navigating to the <0>WooCommerce settings<1>.<br/> Please note that if you have set up the same shipping notifications in both here and WooCommerce, emails will be sent twice. <2>Learn more<3>.',


                // v3.8.2
                'delivered' => 'Delivered',
                'update_to_completed_text' => 'Check this option to automatically update the order status to \'Completed\' when all shipments within the order have been delivered.',
                'update_to_completed_note' => '<0>Note<1>: If you have enabled email notifications for the \'Completed\' status, updating the order status will trigger corresponding emails to notify your customer.',
                'update_to_shipped_text' => 'Check this option to automatically update the order status to \'Shipped\' (equals \'Completed\') when all shipments within the order have been delivered.',
                'update_to_delivered_text' => 'Check this option to automatically update the order status to \'Delivered\' when all shipments within the order have been delivered.',
                'add' => 'Add',
                'no_add' => 'Don\'t add',
                'rename_to_shipped' => 'Rename order status "Completed" to "Shipped"',
                'delivered_and_rename' => '\'Shipped\'(equals \'Completed\')',
                'automate_to' => 'Automate updates to',
                'order_status' => '<0> \'<1>\' order status',
                'email_notification' => 'Enable this email notification',
                'partial_shipped_desc' => 'Add \'Partially Shipped\' order statuses and emails to better reflect the current order fulfillment progress.',
                'email_notification_1' => 'Enable <0>the email notification<1>',
                'shipped_desc' => 'Add \'Shipped\' order status and emails or rename the \'Completed\' order status to \'Shipped\' to better reflect the current order fulfillment progress.',
                'delivered_desc' => 'Add \'Delivered\' order status and auto-update the order status to corresponding status when all shipments within the order have been delivered.',
                'fulfillment_workflow_title' => 'Optimize the order fulfillment workflow',
                'fulfillment_workflow_con' => 'Add relevant order statuses to better align with your store\'s order fulfillment workflow. <0>Learn more<1>.',
                'important_notice' => 'Important Notice',
                'important_notice_con' => 'Don\'t use HTML and CSS to hide content in messages. Hiding content may cause messages to be marked as spam.',
                'modify_code' => 'Modify Code',
                // v3.8.2
            ],
            'integration' => [
                'integration' => 'Integration',
                'featured' => 'Featured',
                'drop_shipping' => 'Dropshipping',
                'shipping' => 'Shipping',
                'custom_order_number' => 'Custom order number',
                'email_customizer' => 'Email customizer',
                'translate' => 'Translate',
                'plugins_integrated_title' => 'Will there be more plugins integrated?',
                'plugins_integrated_con' => 'Yes, ParcelPanel will continue to integrate with more plugins to improve the user experience. Stay tuned!',
                'using_list_title' => 'Is it possible to integrate a plugin that I using but is not on your list?',
                'using_list_con' => 'Let us know which plugin you would like us to integrate with.',
                'contact_us' => 'Contact us',
                'custom_order_number_con' => 'You do not have to do anything, ParcelPanel works with the below plugins by default.  <0>Learn more<1>.',
                'email_customizer_con' => 'You do not have to do anything, ParcelPanel works with the below plugins by default.',

                'api_key' => 'API Key',
                'api_key_note' => 'Developers can use the ParcelPanel API to effectively manage shipments by creating, viewing, and deleting tracking information. Learn <0>API doc<1> for details.',
                'api_key_title' => 'Your API Key',
                'api_key_btn_show' => 'Show',
                'api_key_btn_hidden' => 'Hide',
                'api_key_btn_copy' => 'Copy',
                'klaviyo_page_connect_title' => 'Disconnect ParcelPanel & Klaviyo',
                'klaviyo_page_title' => 'Connect ParcelPanel & Klaviyo',
                'klaviyo_page_label' => 'Klaviyo Public API Key',
                'klaviyo_page_aboveText' => 'By connecting ParcelPanel & Klaviyo, you can create personalized campaigns & flows based on tracking events from ParcelPanel, then adjust your customers\' lifecycle email marketing.',
                'klaviyo_page_linkText' => 'How to connect ParcelPanel for WooCommerce & Klaviyo via API?',
                'omnisend_page_connect_title' => 'Disconnect ParcelPanel & Omnisend',
                'omnisend_page_title' => 'Connect ParcelPanel & Omnisend',
                'omnisend_page_label' => 'Omnisend API Key',
                'omnisend_page_aboveText' => 'By integrating ParcelPanel and Omnisend, you can create personalized campaigns & flows based on tracking events from ParcelPanel, then adjust your customers\' lifecycle email marketing.',
                'omnisend_page_linkText' => 'How to connect ParcelPanel for WooCommerce & Omnisend via API?',
                'email_marketing' => 'Email marketing',
                'payment' => 'Payment',

                'invalid_api_key' => 'Invalid API Key',
                // 3.8.2
                'paypal_page_connect_title' => 'Disconnect ParcelPanel & Paypal',
                // 3.8.2

            ],
            'account' => [
                // 'account' => 'Account',
                // 'account_info' => 'Account info',
                'account' => 'Billing', // v3.8.2
                'account_info' => 'Billing info', // v3.8.2
                'current_plan' => 'Current plan',
                'quota_limit' => 'Quota limit',
                'next_quota_reset_date' => 'Next quota reset date',
                'quota_usage' => 'Quota usage',
                'plan_quota' => 'quota',
                'plan_note' => 'Avg. $<0> per order',
                'month' => 'month',
                'choose' => 'Choose',
                'unlimited_tip' => 'Limited time offer specially for WooCommerce stores✨',
                'unlimited' => 'Unlimited',
                'unlimited_note' => 'Unlimited quota Avg $0.0000 per order',
                'unlimited_btn' => 'Free Upgrade Now 🥳',
                'charge_based_on_title' => 'Does ParcelPanel charge based on order lookups?',
                'charge_based_on_con' => 'No, ParcelPanel counts the quota based on the number of your orders synced to ParcelPanel, and provides unlimited order lookups.',
                'billing_cycle_title' => 'Can I change my plan in the middle of a billing cycle?',
                'billing_cycle_con_new' => 'Yes, you can change your plan at any time based on your needs. If you want to upgrade the plan, the remaining quotas of current plan will be added to the new one automatically. <0>Learn more<1>.',
                'billing_cycle_con' => 'Yes, you can change your plan at any time based on your needs. If you want to change the plan, the remaining quotas of current plan will be added to the new one automatically.',
                'why_unlimited_title' => 'Why is ParcelPanel launching an unlimited plan? When will ParcelPanel charge?',
                'why_unlimited_con' => 'We\'ve provided service for over 120,000 Shopify and WooCommerce stores, but we are still pretty new to WooCommerce for now. We want to give more special offers for WooCommerce merchants.',
                'why_unlimited_con_s' => 'ParcelPanel will not charge for a short time. But please rest assured that if we decide to charge, we will definitely inform you in advance, and there will be no hidden charges.',

                'free_plan_model_title' => 'Downgrade to Starter Free plan',
                'free_plan_model_con' => 'This can\'t be undone!',
                'free_plan_model_btn' => 'Downgrade',

                'current_plan_t' => 'Current Plan',
                'next_plan' => 'Next plan',
                'choose_plan' => 'Choose this plan',
                'free_day_plan' => 'Start <0>-day free trial',
                'discount_plan_f' => 'Get 20% off 🥳',
                'quota' => 'Quota',
                'trial_quota_reset_date' => 'Trial period end date',
                'quota_limit_email' => 'When your available quotas limit drops below',
                'amount' => 'amount',
                'amount_email' => 'Send a recharge reminder email to',
                'to_free_plan' => 'Downgrade to free plan',
                'to_free_plan_title' => 'This can\'t be undone!',
                'to_free_plan_con' => 'By downgrading to the free plan, you will lose access to key features, including :',
                'downgrade' => 'Downgrade',
                'keep_plan' => 'Keep my plan',
                'recharge_reminder' => 'Recharge reminder',
                'recommended_for_you' => 'Recommended for you ✨',
                'plus_plan_list' => 'All <0> features, plus:',
                'con_title_f' => 'What\'s the quota? Does ParcelPanel charge based on order lookups?',
                'con_title_con' => '"1 quota=1 order". ParcelPanel counts the quota based on the number of your orders synced to ParcelPanel, and provides unlimited order lookups.',

                'free' => 'Free',
                'free_con' => 'Key features to start your business',
                'free_plan_1' => 'Access to 1,200+ carriers',
                'free_plan_2' => 'Real-time sync & tracking',
                'free_plan_3' => 'Bulk Import via CSV & Manually add tracking numbers',
                'free_plan_4' => 'Branded tracking page',
                'free_plan_5' => 'Smart dashboard',
                'free_plan_6' => 'Basic analytics',
                'free_plan_7' => 'Tailored for WooCommerce',
                'essential' => 'Essentials',
                'essential_con' => 'Must-have features for growing brands',
                'essential_plan_1' => 'Custom shipment status',
                'essential_plan_2' => 'Estimated delivery time',
                'essential_plan_2_1' => 'Post-purchase EDD', // v-analysis_version
                'essential_plan_3' => 'Product recommendation',
                'essential_plan_4' => 'ParcelPanel shipping notifications',
                // 'essential_plan_5' => 'Advanced analytics',
                'essential_plan_5' => 'Advanced analytics: Delivery days by destinations, Delivery days by couriers and more...', // v3.9.1
                'essential_plan_5_1' => 'Advanced analytics: transit time, tracking page and shipping notifications.', // v-analysis_version
                'essential_plan_6' => 'Includes delivery days by destinations, delivery days by couriers, and more coming...',
                'professional' => 'Professional',
                'professional_con' => 'Full feature set to power your business',
                'professional_plan_1' => 'CSV export',
                'professional_plan_1_1' => 'CSV & PDF export', // v-analysis_version
                'professional_plan_2' => 'Advanced integrations:',
                'professional_plan_3' => 'More integrations, including Shippo, Sendcloud, Ali2Woo, and many more...',
                'professional_plan_4' => 'ALD, DSers, WooCommerce Shipping, WPML and more...',
                // 'professional_plan_4_2' => 'Advanced integrations: PayPal, DSers, WooCommerce Shipping, WPML and more...',
                'professional_plan_4_2' => 'Advanced integrations: PayPal, DSers, WPML and more...', // v3.9.1
                'professional_plan_5' => 'Developer API',
                'professional_plan_6' => 'Remove ParcelPanel branding',

                'enterprise' => 'Enterprise',
                'enterprise_con' => 'Tailored for high-volume companies',
                'enterprise_plan_1' => 'Dedicated tracking channel',
                'enterprise_plan_2' => 'Custom integrations',
                'enterprise_plan_3' => 'Customer success manager',
                'enterprise_plan_4' => 'Dedicated onboarding manager',
                'enterprise_plan_5' => 'Dedicated priority support',

                // v3.8.2
                'previous_plan' => 'Previous plan(s)',
                'gifting_quotas' => 'Gifting quotas',
                'consumed_quotas' => 'Consumed quotas:',
                'subscription_dashboard' => 'Subscription dashboard',
                'remaining_quotas_current_plan' => '<0> remaining quotas in the current plan',
                'remaining_quotas_previous_plan' => '<0> remaining quotas in the previous plan(s)',
                'remaining_quotas_gift' => '<0> remaining gifting quotas in the current plan',
                'account_foot_t1' => 'What does "quota" mean? How can I check the orders I\'ve synchronized?',
                'account_foot_t1_l1' => '1 order = 1 quota. When ParcelPanel syncs 1 order for you, it consumes 1 quota.',
                'account_foot_t1_l2' => 'If an order contains multiple shipments, it is counted as one order, consuming only one quota.',
                'account_foot_t1_l3' => 'Order lookups don\'t consume quota, meaning your customers have unlimited lookups.',
                'account_foot_t1_l4' => 'You can easily check the synchronized orders on the ParcelPanel Shipment page.',
                'account_foot_t2' => 'Can I change my plan in the middle of a billing cycle? How do I cancel my plan?',
                'account_foot_t2_d' => 'Of course, you can change your plan at any time based on your needs. Changing your plan follows these rules:',
                'account_foot_t2_l1' => 'Upgrading your plan takes effect immediately, resetting the billing cycle, and any remaining quota will be added to the new plan.',
                'account_foot_t2_l2' => 'Downgrading your plan will take effect after your current plan ends.',
                'account_foot_t2_l3' => 'Cancelling your plan will take effect after your current plan ends. You can simply choose to downgrade to the free plan.',
                'account_foot_t2_l4' => 'For more details on subscriptions, <0>learn more<1>.',
                'account_foot_t3' => 'What is the free trial, and how does it work?',
                'account_foot_t3_l1' => 'All paid plans share the same free trial period. During the period, you can switch to any paid plan at no cost, and it won\'t consume any quotas.',
                'account_foot_t3_l2' => 'Of course, if you find that ParcelPanel doesn\'t meet your requirements, you can downgrade to the free plan before the trial period ends to avoid any unexpected charges.',
                'professional_plan_7' => 'Automatic language switching',
                'professional_plan_8' => 'Automatic translation',
                // v3.8.2


                // 3.9.1
                'no_credit_card_required' => 'No credit card required',

                // 3.9.1

                // v4.0.1.
                'change_plan' => 'Change plan',
                'subscription_charge' => 'Subscription charge',
                'usage_charges_p' => 'Usage charges per additional quota',
                'not_applicable' => 'Not applicable',
                'usage_charges_l' => 'Spending limit for usage charges',
                'subscription_info' => 'Subscription info',
                'add_credit_card' => 'Add credit card',
                'upgrade_reminder_show' => 'You can set the <0>upgrade reminder<1> to prompt timely upgrades and also set a <2>spending limit<3> for usage charges to balance risks and avoid overspending.',
                'pricing_details' => 'Pricing details',
                'available_features' => 'Available features',
                'see_all_features' => 'See all features',
                'spending_limit' => 'Spending limit',
                'spending_limit_con' => 'We will only charge you after you use up the current plan\'s quota. If usage charges exceed the spending limit, we won\'t continue charging you or syncing new orders.',
                'spending_limit_debit' => 'Debit usage charges:',
                'spending_limit_con1' => 'You have used <0> additional quota.',
                'spending_limit_c' => 'Current spending limit:',
                'spending_limit_con2' => 'You can use up to <0> additional quota at most.',
                'spending_limit_con3' => 'You can use up to <0> additional quota at most, with <1> remaining.',
                'spending_limit_n' => 'New spending limit:',
                'spending_limit_l' => 'Learn more about spending limit',
                'spending_limit_problem' => 'What are Usage charges? How can I change my Spending limit?',
                'spending_limit_problem_con' => 'Usage charges are fees based on your usage. We only charge you after you\'ve used up your plan\'s quota. If your charges exceed the spending limit, we won\'t continue charging you or syncing new orders.',
                'spending_limit_problem_con1' => 'The spending limit for usage charges defaults to the subscription price of your plan. This doesn\'t apply to the Free plan.',
                'spending_limit_problem_con2' => 'You can change the spending limit for usage charges after selecting a paid plan. Please <0>follow this article<1> for guidance.',
                'questions_title' => 'Frequently asked questions',
                'discount_plan_f2' => 'Get 50% off 🥳',
                'additional_quota_used' => 'Additional quota used: <0>',
                'additional_quota_p' => '$<0> per additional quota.',
                'month_text' => '<0> quota/month',
                'year_text' => '<0> quota/year',
                'includes' => 'Includes:',
                // v4.0.1.
            ],
            'feature' => [
                'feature_request' => 'Feature request',
            ],
            'analysis' => [
                // v-analysis_version
                'transit_time' => 'Transit time',
                'tracking_page' => 'Tracking page',
                'shipping_notification' => 'Shipping notifications',
                'analytics' => 'Analytics',
                'export_pdf' => 'Export PDF',
                'export_pdf_con' => 'The data will be exported to a PDF based on your applied filters.',
                'exceptions' => 'Exceptions',
                'exceptions_tip' => 'The number and percentage of exception shipments',
                'shipments_over_time' => 'Shipments over time',
                'shipments_tip' => 'The total number of shipments',
                'conversion_orders' => 'Conversion orders',
                'conversion_orders_tip' => 'Orders attributed to all marketing and discount channels of ParcelPanel\'s shipping notifications',
                'conversion_orders_tip_1' => 'Orders attributed to all marketing channels of ParcelPanel\'s shipping notifications',
                'conversion_revenue' => 'Conversion revenue',
                'conversion_revenue_tip' => 'Revenue attributed to all marketing and discount channels of ParcelPanel\'s shipping notifications',
                'conversion_revenue_tip_1' => 'Revenue attributed to all marketing channels of ParcelPanel\'s shipping notifications',
                'marketing_ctr' => 'Marketing CTR',
                'marketing_ctr_tip' => 'Marketing clicks divided by opened shipping notifications',
                'lookups_label' => 'Shipping notifications time',
                'lookups_label_1' => 'Marketing clicks over time',
                'lookups_label_2' => 'Lookups over time',
                'marketing_ctr_text' => 'Marketing clicks divided by Lookups',
                'top_product_t' => 'Top product recommendation by clicks',
                'p85_chart_title' => 'P85 transit time',
                'p85_title' => 'P85 transit time (d)',
                'p85_tip' => 'Indicates that 85% of the delivered shipments have a shorter transit time than this',
                'average_chart_title' => 'Average transit time',
                'average_title' => 'Average transit time (d)',
                'average_tip' => 'The average transit time of all delivered shipments',
                'transit_time_d' => 'Transit time(d)',
                'transit_time_d_1' => 'Transit time distribution (%)',
                'transit_time_over' => 'Transit time (d) over time',
                'transit_time_details' => 'Transit time details',
                'shipments_tip_1' => 'The total number of times customers have tracked their shipment through the tracking page',
                'shipments_tip_2' => 'Orders attributed to all marketing channels of ParcelPanel\'s tracking page',
                'shipments_tip_3' => 'Revenue attributed to all marketing channels of ParcelPanel\'s tracking page',
                'shipments_tip_4' => 'Orders and revenue attributed to the discount channel of ParcelPanel\'s shipping notifications',


                // v-analysis_version
            ],
        ];
    }

    private static function langNew_pageTip()
    {
        // pageTip ----------
        __('Sync unsuccessfully', 'parcelpanel');
        __('The system is syncing your orders and it needs a few minutes.', 'parcelpanel');

        __('Saved unsuccessfully', 'parcelpanel');
        __('Saved successfully', 'parcelpanel');

        __('Change unsuccessfully', 'parcelpanel');
        __('Change successfully', 'parcelpanel');

        __('Enabled successfully', 'parcelpanel');
        __('Disabled successfully', 'parcelpanel');

        __('Export unsuccessfully', 'parcelpanel');
        __('Export successfully', 'parcelpanel');

        __('Please choose a CSV file', 'parcelpanel');
        __('Sorry, this file type is not permitted!', 'parcelpanel');
        __('These fields are required to map:', 'parcelpanel');
        __('Order number', 'parcelpanel');
        __('Tracking number', 'parcelpanel');
        __('Required fields can\'t be empty.', 'parcelpanel');
        __('Please enter a valid email.', 'parcelpanel');
        __('Sent successfully', 'parcelpanel');
        __('Sent unsuccessfully', 'parcelpanel');
        __('Copied successfully', 'parcelpanel');
        __('Copied unsuccessfully', 'parcelpanel');
        __('Binding successfully', 'parcelpanel');
        __('Binding unsuccessfully', 'parcelpanel');
        __('Updated successfully', 'parcelpanel');
        __('Updated unsuccessfully', 'parcelpanel');
        __('Connected successfully', 'parcelpanel');
        __('Connected unsuccessfully', 'parcelpanel');
        __('Verify successfully', 'parcelpanel');
        __('Verify unsuccessfully', 'parcelpanel');
        __('Too many requests, please try again later', 'parcelpanel');
        __('Thanks for your trust and welcome to ParcelPanel!', 'parcelpanel');
        __('Verify unsuccessfully', 'parcelpanel');
        __('Please check the box to accept first', 'parcelpanel');

        __('Syncing...', 'parcelpanel');
        __('Unsuccessfully', 'parcelpanel');
        __('Successfully', 'parcelpanel');
        // pageTip ----------
    }

    private static function langNew_tips()
    {
        // tips ----------
        __('We want to provide the best experience for you 👋', 'parcelpanel');
        __('Your feedback means a lot to us! Taking a minute to leave your review will inspire us to keep going.', 'parcelpanel');
        __('Special offer - Contact us to Free upgrade 🥳', 'parcelpanel');
        __('We\'ve so far provided service for over 120,000 Shopify & WooCommerce stores. This is our way of giving back (20 → Unlimited free quota) 🙌', 'parcelpanel');
        __('We\'ve so far provided service for over 120,000 Shopify & WooCommerce stores. This is our way of giving back (20 → 50 quotas) 🙌', 'parcelpanel');
        __('Free upgrade now', 'parcelpanel');
        __('Remove ParcelPanel branding for Free 😘', 'parcelpanel');
        __('Contact support to remove the branding (worth $49/month) from your tracking page.', 'parcelpanel');
        __('Contact us', 'parcelpanel');
        __('Upgrade reminder', 'parcelpanel');
        __('Howdy partner, there are only <0> quota available in your account, upgrade to sync & track more orders.', 'parcelpanel');
        __('Howdy partner, there are only <0> available quotas in your account, upgrade now to enjoy seamless syncing & tracking more orders.', 'parcelpanel');
        __('Upgrade now', 'parcelpanel');
        __('Even better - free sync & track your last-30-day orders 🎉', 'parcelpanel');
        __('This will help you know how ParcelPanel performs and provide your old customers with a seamless order tracking experience.', 'parcelpanel');
        __('Completed on <0>', 'parcelpanel');
        __('A Quick Word on your ParcelPanel Experience (Only 2 questions ) 🌻', 'parcelpanel');
        __('We value your opinion! It is highly appreciated if you could take <0>10 seconds<1> to rate your experience with us by participating in our brief Net Promoter Score (NPS) survey.', 'parcelpanel');
        __('Take the survey →', 'parcelpanel');
        __('ParcelPanel Paid version V3.6 is coming in September', 'parcelpanel');
        __('Due to rising costs, ParcelPanel Paid version V3.6 is coming in <0>September!<1> Some previously free features will no longer be available. To give back to loyal users, we will provide you with a <2>20% discount<3> on our paid version.', 'parcelpanel');


        __('Auto-renewal failed', 'parcelpanel');
        __('Howdy partner, your subscription charge failed and was automatically canceled on <0>. You can re-subscribe to any plan again!', 'parcelpanel');
        __('You\'ll be downgraded to the <0>/month plan on <1>. You can ', 'parcelpanel');
        __('resume', 'parcelpanel');
        __(' your plan anytime.', 'parcelpanel');
        __('🎉 Howdy partner, you have upgraded successfully!', 'parcelpanel');
        __('We would love to know your experience with our plugin, share your feedback! 🌻', 'parcelpanel');
        __('Customizable shipping notification template editor is now live!', 'parcelpanel');
        __('With this new functionality, you can now customize ParcelPanel shipping notifications that align with your brand and even create more sales with coupon upsell. Rest assured, all your previous settings are fully compatible, simply navigate to WooCommerce settings to access your familiar setup with ease. Please note that if you have set up the same shipping notifications in both WooCommerce and ParcelPanel, emails will be sent redundantly. <0>Learn more<1>.', 'parcelpanel');

        __('Contact support to remove the branding (worth $49/month) from ParcelPanel shipping notifications.', 'parcelpanel');
        __('Thanks for your trust', 'parcelpanel');
        __('Verify your email address to reduce spam.', 'parcelpanel');
        __('We\'ve sent a 6-character code to <0><1><2>. The code expires shortly, so please enter it soon.', 'parcelpanel');
        __('Email address', 'parcelpanel');

        __('Payment failed', 'parcelpanel');
        __('Howdy partner, your subscription payment of $<0> has failed. You can complete the payment <1>here<2>. Of course, feel free to re-subscribe to any plan again.', 'parcelpanel');
        __('Complete the payment', 'parcelpanel');

        __('🎉 <0> orders have been synced successfully!', 'parcelpanel');
        __('Your opinion matters! Complete the survey for a 10% discount! 🙌', 'parcelpanel');
        __('ParcelPanel Order Tracking for WooCommerce invites you to participate in our annual user survey (takes less than 1 minute) to help us enhance our services. Complete the survey for a 10% discount!! 🤩', 'parcelpanel');
        __('Get 10% discount →', 'parcelpanel');
        __('Your trial ends in <0> days. <1>Add a credit card now<2> → for <3>50% Off<4>! 🎊', 'parcelpanel');
        __('Your free trial has ended. Choose a plan to restore your settings with <0>one click<1> ✨ ', 'parcelpanel');

        __('ParcelPanel Payment Plan Update', 'parcelpanel');
        __('Howdy partner, we\'ve released new payment plans, featuring annual subscriptions and usage-based charges for usage exceeding the subscription quota.', 'parcelpanel');
        __('These new plans are designed to ensure that even during fluctuations in your store\'s order volume, you can still provide the best post-purchase experience to your customers.', 'parcelpanel');
        __('Of course, you can continue using your current plan as before, or switch to the new plan at any time.', 'parcelpanel');
        __('Howdy partner, you have only <0> available quotas in your account, additional quota will be charged based on usage.', 'parcelpanel');
        __('Howdy partner, you have only <0> available quotas in your account.', 'parcelpanel');
        __('To ensure ParcelPanel can provide the best post-purchase experience for your customers, upgrade to sync and track more orders at a lower per-quota price.', 'parcelpanel');
        __('You\'ll be downgraded to the <0> plan on <1>. If you change your mind, you can <2>resume<3> your current plan before this date.', 'parcelpanel');

        // tips ----------
    }

    private static function langNew_common()
    {
        // common ----------
        __('Dismiss', 'parcelpanel');
        __('Confirm', 'parcelpanel');
        __('Cancel', 'parcelpanel');
        __('Apply', 'parcelpanel');
        __('Close', 'parcelpanel');
        __('Upgrade', 'parcelpanel');
        __(' to unlock the data', 'parcelpanel');
        __(' <0>Upgrade<1> to unlock the data', 'parcelpanel');
        __('Remaining / Total', 'parcelpanel');
        __('Note: Remaining means you have <0> available quota.', 'parcelpanel');
        __('Export', 'parcelpanel');
        __('Country', 'parcelpanel');
        __('Courier', 'parcelpanel');
        __('Quantity', 'parcelpanel');
        __('Day', 'parcelpanel');
        __('Destination', 'parcelpanel');
        __('Filter', 'parcelpanel');

        __('Pending', 'parcelpanel');
        __('In transit', 'parcelpanel');
        __('Delivered', 'parcelpanel');
        __('Out for delivery', 'parcelpanel');
        __('Info received', 'parcelpanel');
        __('Exception', 'parcelpanel');
        __('Failed attempt', 'parcelpanel');
        __('Expired', 'parcelpanel');

        __('Enabled', 'parcelpanel');
        __('Disabled', 'parcelpanel');
        __('Enable', 'parcelpanel');
        __('Disable', 'parcelpanel');
        __('No couriers yet', 'parcelpanel');
        __('You have not set up a frequently-used courier', 'parcelpanel');

        __('Need any help?', 'parcelpanel');

        __('Send your feedback', 'parcelpanel');
        __('Please tell us more, we will try the best to get better', 'parcelpanel');
        __('Edit your message here...', 'parcelpanel');
        __('Your contact email', 'parcelpanel');
        __('e.g. parcelpanel100@gmail.com', 'parcelpanel');
        __('Send', 'parcelpanel');
        __('Contact us', 'parcelpanel');
        __('View example', 'parcelpanel');
        __('Learn more about <0>ParcelPanel<1>', 'parcelpanel');
        __('NEW', 'parcelpanel');
        __('HOT', 'parcelpanel');
        __('Preview', 'parcelpanel');

        __('Start Live Chat', 'parcelpanel');
        __('When you click the confirm button, we will open our live chat widget, where you can chat with us in real time to solve your questions, and also potentially collect some personal data.', 'parcelpanel');
        __('Learn more about our <0>Privacy Policy<1>.', 'parcelpanel');
        __('Don\'t want to use live chat? Contact us email: <0>support@parcelpanel.org<1>', 'parcelpanel');
        __('Don\'t want to use live chat? Contact us via <0>support forum<1> or email: <2>support@parcelpanel.org<3>', 'parcelpanel');
        __('Cancel', 'parcelpanel');
        __('Confirm', 'parcelpanel');
        __('<0>Jessie<1> from ParcelPanel', 'parcelpanel');
        __('Active', 'parcelpanel');
        __('Welcome to ParcelPanel', 'parcelpanel');
        __('Hello', 'parcelpanel');
        __('We\'re so glad you\'re here, let us know if you have any questions.', 'parcelpanel');
        __('Live chat with us', 'parcelpanel');
        __('Any questions about orders sync, courier matching or tracking update?', 'parcelpanel');

        __('Help', 'parcelpanel');
        __('Select a direction.', 'parcelpanel');
        __('Live Chat Support', 'parcelpanel');
        __('Get Email Support', 'parcelpanel');
        __('ParcelPanel Help Docs', 'parcelpanel');
        __('Create a topic', 'parcelpanel');

        __('Special Gift', 'parcelpanel');
        __('Free upgrade plan', 'parcelpanel');
        __('Offer Will Expire Soon', 'parcelpanel');
        __('Free Upgrade Now', 'parcelpanel');
        __('<0><1><2>Get<3> <4>unlimited quota worth $999<5>', 'parcelpanel');
        __('<0><1><2>The best for<3> <4>dropshipping<5>', 'parcelpanel');
        __('<0><1><2>Access to<3> <4>1000+ couriers<5>', 'parcelpanel');
        __('<0><1><2>Import widget &<3> <4>CSV import<5>', 'parcelpanel');
        __('<0><1><2>Branded<3> <4>tracking page<5>', 'parcelpanel');
        __('<0><1><2><3><4>Remove ParcelPanel branding<5>', 'parcelpanel');
        __('<0><1><2>Shipping<3> <4>notifications<5>', 'parcelpanel');
        __('<0>24/7<1> <2>live chat<3> <4>support<5>', 'parcelpanel');


        __('Verified', 'parcelpanel');
        __('Not verified', 'parcelpanel');
        __('Edit', 'parcelpanel');
        __('Verify', 'parcelpanel');
        __('Language', 'parcelpanel');
        __('Default language', 'parcelpanel');


        __('Note:', 'parcelpanel');
        __('Edited', 'parcelpanel');
        __('Unedited', 'parcelpanel');
        __('.', 'parcelpanel');
        __('Learn more', 'parcelpanel');
        __('This field can\'t be blank', 'parcelpanel');
        __('Continue editing', 'parcelpanel');
        __('Discard changes', 'parcelpanel');
        __('Name', 'parcelpanel');
        __('This can\'t be undone.', 'parcelpanel');
        __('Disconnect', 'parcelpanel');
        __('Connect', 'parcelpanel');
        __('Enable settings?', 'parcelpanel');
        __('Learn more about our <0>Privacy Policy<1>.', 'parcelpanel');
        __('If you have any questions, contact us via email: <0>support@parcelpanel.org<1>.', 'parcelpanel');
        __('Leave page with unsaved changes?', 'parcelpanel');
        __('Leave page', 'parcelpanel');
        __('Stay', 'parcelpanel');
        __('Leaving this page will delete all unsaved changes.', 'parcelpanel');
        __('Please enter a valid email', 'parcelpanel');
        __('Get code', 'parcelpanel');
        __('Verification code', 'parcelpanel');
        __('This field is required', 'parcelpanel');
        __('This verification code is invalid', 'parcelpanel');
        __('Upgrade required', 'parcelpanel');
        __('You are upgrading to the', 'parcelpanel');
        __('plan', 'parcelpanel');
        __('You will get <0> quota per month at an average cost of <1> each.', 'parcelpanel');
        __('All <0> features, plus:', 'parcelpanel');
        __('Compare all plans', 'parcelpanel');
        __('Upgrade now', 'parcelpanel');

        __('Customer information', 'parcelpanel');
        __('Name', 'parcelpanel');
        __('Email address', 'parcelpanel');
        __('Phone number', 'parcelpanel');
        __('Location', 'parcelpanel');
        __('Shipping address', 'parcelpanel');
        __('Billing address', 'parcelpanel');
        __('Activity', 'parcelpanel');
        __('Browsing behavior', 'parcelpanel');
        __('Store owner & Store information', 'parcelpanel');
        __('Store information', 'parcelpanel');
        __('Site address (URL)', 'parcelpanel');
        __('Timezone', 'parcelpanel');
        __('Currency', 'parcelpanel');
        __('Store Address', 'parcelpanel');
        __('Privacy Authorization', 'parcelpanel');
        __('Accept & Start', 'parcelpanel');
        __('Welcome to ParcelPanel! ✨', 'parcelpanel');
        __('Prior to using our services, we require your consent in compliance with GDPR and privacy regulations. Kindly review and accept our privacy permissions below: ', 'parcelpanel');
        __('Your Store', 'parcelpanel');
        __('ParcelPanel', 'parcelpanel');
        __('Your data is encrypted and used solely for our services. We adhere to strict privacy policies and comply with data protection regulations. Review our <0>Privacy Policy<1> and <2>Terms of Service<3> for details.', 'parcelpanel');
        __('Deleting plugin from your store will remove its access, and request the removal of customer information if it was collected.', 'parcelpanel');
        __('Privacy details', 'parcelpanel');
        __('What access does ParcelPanel need in your store:', 'parcelpanel');
        __('Permission details', 'parcelpanel');
        __('What will ParcelPanel do with these data:', 'parcelpanel');
        __('View and manage orders: Essential for seamless integration and efficient order processing.', 'parcelpanel');
        __('View and manage customers: Necessary for sending ParcelPanel shipping notifications.', 'parcelpanel');
        __('I have read and agreed to all the above terms and conditions.', 'parcelpanel');

        __('Remove', 'parcelpanel');
        __('Add image', 'parcelpanel');
        __('Less than 2MB; Accepts .jpg, .png, .svg, .gif, .jpeg.', 'parcelpanel');
        __('File type should be .jpg, .png, .gif, .jpeg, .svg', 'parcelpanel');

        __('Today', 'parcelpanel');
        __('email was sent to the customer', 'parcelpanel');

        __('Insert variables', 'parcelpanel');

        __('Sort by', 'parcelpanel');
        __('Sort', 'parcelpanel');
        __('Column', 'parcelpanel');
        __('More views', 'parcelpanel');
        __('Show more details', 'parcelpanel');
        __('per page', 'parcelpanel');
        __('Reply to', 'parcelpanel');
        __('From name', 'parcelpanel');

        __('Got it', 'parcelpanel');
        __('Exit', 'parcelpanel');
        __('All tasks complete', 'parcelpanel');
        __('Mark as done', 'parcelpanel');
        __('Mark as not done', 'parcelpanel');
        __('<0> of <1> tasks complete', 'parcelpanel');
        __('one click', 'parcelpanel');
        __('Access customer information, store owner & store information', 'parcelpanel');
        __('View and manage orders & customers', 'parcelpanel');

        __('Monthly', 'parcelpanel');
        __('Annually', 'parcelpanel');
        __('(Save 20%)', 'parcelpanel');
        __('Active', 'parcelpanel');

        __('Product', 'parcelpanel');
        __('Clicks', 'parcelpanel');
        __('Carrier', 'parcelpanel');
        __('P85', 'parcelpanel');
        __('Avg.', 'parcelpanel');
        __('Min', 'parcelpanel');
        __('Max', 'parcelpanel');
        __('1-3d', 'parcelpanel');
        __('4-7d', 'parcelpanel');
        __('8-15d', 'parcelpanel');
        __('16-30d', 'parcelpanel');
        __('31d+', 'parcelpanel');
        __('A to Z', 'parcelpanel');
        __('Z to A', 'parcelpanel');
        __('Max to min', 'parcelpanel');
        __('Min to max', 'parcelpanel');
        __('Daily', 'parcelpanel');
        __('Weekly', 'parcelpanel');
        __('Monthly', 'parcelpanel');
        __('Delete', 'parcelpanel');
        __('Time', 'parcelpanel');
        __('Time zone', 'parcelpanel');
        __('Sun', 'parcelpanel');
        __('Mon', 'parcelpanel');
        __('Tue', 'parcelpanel');
        __('Wed', 'parcelpanel');
        __('Thu', 'parcelpanel');
        __('Fri', 'parcelpanel');
        __('Sat', 'parcelpanel');
        __('Sunday', 'parcelpanel');
        __('Monday', 'parcelpanel');
        __('Tuesday', 'parcelpanel');
        __('Wednesday', 'parcelpanel');
        __('Thursday', 'parcelpanel');
        __('Friday', 'parcelpanel');
        __('Saturday', 'parcelpanel');
        // common ----------
    }

    private static function langNew_home()
    {
        // home ----------
        __('Welcome to ParcelPanel 👋', 'parcelpanel');
        __('Welcome!! Get started with ParcelPanel', 'parcelpanel');

        __('Add tracking page', 'parcelpanel');
        __('Add tracking page to your storefront', 'parcelpanel');
        __('Your branded tracking page is ready, the URL is: <0>, add it to your store menus so your customers can track orders there.', 'parcelpanel');
        __('Don\'t know how to do this? Please follow <0>this instruction<1>.', 'parcelpanel');
        __('Preview tracking page', 'parcelpanel');
        __('Looks not so good?', 'parcelpanel');

        __('Customize notifications', 'parcelpanel');
        __('Customize ParcelPanel shipping notifications', 'parcelpanel');
        __('Keep your customers informed in a timely manner with shipment status updates, and boost your sales by incorporating effective marketing assets.', 'parcelpanel');
        __('Want to know how to do this? Please follow <0>this instruction<1>.', 'parcelpanel');

        __('Dropshipping (optional)', 'parcelpanel');
        __('Enable dropshipping mode', 'parcelpanel');
        __('ParcelPanel is the best for dropshipping, and supports Aliexpress Standard Shipping, Yunexpress, CJ packet & ePacket (China EMS, China Post), and all commonly used couriers for dropshipping merchants.', 'parcelpanel');
        __('This feature will allow you to hide all Chinese regions easily, bringing your customers an all-around brand shopping experience. <0>Learn more<1>.', 'parcelpanel');

        __('How ParcelPanel works', 'parcelpanel');
        __('Out-of-box user experience', 'parcelpanel');
        __('Tracking numbers are synced from the Orders section of your WooCommerce admin, please don\'t forget to add them.', 'parcelpanel');
        __('For new users, ParcelPanel will automatically sync their last-30-day orders for Free.', 'parcelpanel');
        __('New coming orders will be automatically synced in real time.', 'parcelpanel');
        __('We fetch the tracking info from couriers\' websites based on the tracking numbers.', 'parcelpanel');
        __('Tracking numbers are synchronized from your WooCommerce admin\'s Orders section, please don\'t forget to add them.', 'parcelpanel');
        __('For new users, ParcelPanel offers free auto- sync of their last 30 days\' orders.', 'parcelpanel');
        __('Additionally, new incoming orders will be seamlessly synced in real-time.', 'parcelpanel');
        __('We retrieve tracking info directly from the courier websites based on the provided tracking numbers.', 'parcelpanel');

        __('Sync tracking numbers', 'parcelpanel');
        __('ParcelPanel will automatically sync tracking numbers from Orders section in your WooCommerce admin once you add there, then track them.', 'parcelpanel');
        __('Orders section in WooCommerce admin', 'parcelpanel');
        __('Additionally, how to get the tracking number, it\'s not about ParcelPanel. As we know, some merchants fulfilled orders via the 3rd party fulfillment service, some use dropshipping apps, some fulfilled by themselves etc. To know the tracking number of your order, we kindly suggest you asking suppliers or carriers support directly for some help.', 'parcelpanel');

        __('Import tracking number of your orders', 'parcelpanel');
        __('Import tracking numbers of your orders in bulk with a CSV file, or manually add one by one in the Edit order page.', 'parcelpanel');
        __('Import tracking number', 'parcelpanel');
        __('How to import tracking number with a CSV file?', 'parcelpanel');

        __('<0><1> exception<2> shipments to check', 'parcelpanel');
        __('<0><1> failed attempt<2> shipments to check', 'parcelpanel');
        __('<0><1> expired<2> shipments to check', 'parcelpanel');
        __('<0><1> pending<2> shipments to check', 'parcelpanel');


        __('Shipments / Lookups', 'parcelpanel');
        __('Delivery performance', 'parcelpanel');
        __('Valid tracking', 'parcelpanel');
        __('SHIPMENT / LOOKUPS OVER TIME', 'parcelpanel');
        __('SHIPMENT STATUS', 'parcelpanel');

        __('Delivery days by destinations', 'parcelpanel');
        __('Delivery days by couriers', 'parcelpanel');

        __('Upcoming features 👏', 'parcelpanel');
        __('Integration with WPML...', 'parcelpanel');
        __('Will be launched in July', 'parcelpanel');
        __('Customized email templates', 'parcelpanel');
        __('Will be launched in August', 'parcelpanel');
        __('Notification / Product Recommendation analysis', 'parcelpanel');
        __('Will be launched in August', 'parcelpanel');

        __('Recently Released', 'parcelpanel');
        __('Tracking API', 'parcelpanel');
        __('Integration with WPML, Shippo, WooCommerce Shipping...', 'parcelpanel');
        __('In progress', 'parcelpanel');
        __('Customized ParcelPanel shipping notifications email templates', 'parcelpanel');


        __('Customized ParcelPanel shipping notifications', 'parcelpanel');
        __('More analysis (Tracking page, Shipping notifications, Coupons upsell)', 'parcelpanel');
        __('Integration with WPML, WooCommerce Shipping, Shippo, Sendcloud...', 'parcelpanel');
        __('More integrations...', 'parcelpanel');

        __('Create a topic', 'parcelpanel');
        __('Create a topic on support forum, our plugin support will help.', 'parcelpanel');
        __('Get Email Support', 'parcelpanel');
        __('Email us and we\'ll get back to you as soon as possible.', 'parcelpanel');
        __('Start Live Chat', 'parcelpanel');
        __('Talk to us directly via live chat to get help with your question.', 'parcelpanel');
        __('ParcelPanel Help Docs', 'parcelpanel');
        __('Find a solution for your problem with ParcelPanel documents and tutorials.', 'parcelpanel');

        __('Last <0> days', 'parcelpanel');
        __('Day range', 'parcelpanel');
        __('Starting Date', 'parcelpanel');
        __('Ending Date', 'parcelpanel');

        __('Add tracking numbers to orders', 'parcelpanel');
        __('Manually: add tracking numbers individually on the Edit order page. <0>Learn more<1>.', 'parcelpanel');
        __('Bulk import via CSV: import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.', 'parcelpanel');
        __('Integration: automatically import tracking numbers from integrated <0>plugins<1>.', 'parcelpanel');
        __('API: import tracking numbers programmatically using our <0>tracking API<1>.', 'parcelpanel');

        __('The number and percentage of delivered shipments', 'parcelpanel');
        __('The number and percentage of shipments correctly tracked', 'parcelpanel');
        __('Tracking page', 'parcelpanel');
        __('Orders / Revenue attributed to all marketing channels of ParcelPanel\'s tracking page', 'parcelpanel');
        __('Shipping notifications', 'parcelpanel');
        __('Orders / Revenue attributed to all marketing and coupons channels of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Orders / Revenue attributed to ParcelPanel marketing and coupons channels', 'parcelpanel');
        __('Total conversion orders / revenue', 'parcelpanel');
        __('The total number of shipments / The total number of times customers have tracked their shipment through the tracking page', 'parcelpanel');

        __('Recipients', 'parcelpanel');
        __('The total number of recipients for shipping notifications', 'parcelpanel');
        __('Delivered', 'parcelpanel');
        __('The number and percentage of delivered shipping notifications', 'parcelpanel');
        __('Opened', 'parcelpanel');
        __('The number and percentage of opened shipping notifications', 'parcelpanel');
        __('Clicked', 'parcelpanel');
        __('The number and percentage of clicked shipping notifications', 'parcelpanel');
        __('Marketing clicks', 'parcelpanel');
        __('The total number of clicks your marketing channels in the shipping notifications, including product and product recommendation', 'parcelpanel');

        __('ParcelPanel shipping notifications', 'parcelpanel');
        __('The total number of shipping notifications sent, including sent to customers and yourself', 'parcelpanel');
        __('Performance summary', 'parcelpanel');
        __('Shipping notifications over time', 'parcelpanel');
        __('Automatically notify your customers or yourself via email with ParcelPanel shipment status updates', 'parcelpanel');
        __('Unlock all advanced analytics and drive business growth with data-driven insights', 'parcelpanel');
        __('Enable this feature', 'parcelpanel');
        __('Upgrade now', 'parcelpanel');

        __('The total number of clicks your marketing channels on the tracking page, including product and product recommendation', 'parcelpanel');
        __('Tracking page Marketing clicks', 'parcelpanel');
        __('Marketing clicks notifications over time', 'parcelpanel');
        __('Turn your tracking page into a marketing channel to make more sales', 'parcelpanel');

        __('The total number of available quotas / The total number of quotas in the current plan', 'parcelpanel');
        __('The total number of delivered shipments and average transit day based on destination', 'parcelpanel');
        __('The total number of delivered shipments and average transit day based on couriers', 'parcelpanel');
        __('Orders and revenue attributed to the coupons channel of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Coupons upsell', 'parcelpanel');
        __('Enable to boost more sales for Increased Revenue', 'parcelpanel');
        __('Coupons', 'parcelpanel');
        __('Orders', 'parcelpanel');
        __('Revenue', 'parcelpanel');

        __('Tracking numbers are synchronized from your WooCommerce admin\'s Orders section, please don\'t forget to add them from <0>Edit order page → ParcelPanel section<1>.', 'parcelpanel');
        __('To get the tracking number, it\'s not within ParcelPanel\'s scope. <0>We know that different merchants use various shipping methods such as third-party platforms, dropshipping apps, or self-fulfillment. To find out the tracking number for your order, we recommend reaching out directly to your <1>shipping provider<2> for assistance.', 'parcelpanel');

        __('Bulk Import via CSV', 'parcelpanel');
        __('Shipments', 'parcelpanel');
        __('Lookups', 'parcelpanel');
        __('Shipping notifications', 'parcelpanel');
        __('Marketing clicks', 'parcelpanel');

        __('Get started', 'parcelpanel');
        __('How does ParcelPanel work in WooCommerce?', 'parcelpanel');
        __('In just one minute, you\'ll learn how to enable your customers to track their orders on your store\'s tracking page.', 'parcelpanel');
        __('Video tutorial', 'parcelpanel');
        __('How to add the tracking page to your store navigation menu?', 'parcelpanel');
        __('ParcelPanel automatically generates a branded tracking page for your store. Add it to your storefront, enabling customers to track orders independently and reducing support requests.', 'parcelpanel');
        __('ParcelPanel supports multiple methods for importing tracking numbers to orders (WooCommerce admin\'s Orders section), please don\'t forget to add them.', 'parcelpanel');
        __('Here, you can customize shipping notifications to match your brand identity. Once enabled, customers will promptly receive updates on their orders.', 'parcelpanel');
        __('Here, various data analysis panels provide insights to optimize channels and gauge ParcelPanel\'s performance.', 'parcelpanel');
        __('Start a free trial', 'parcelpanel');
        __('You\'re all set! Get even more from ParcelPanel.', 'parcelpanel');
        __('Unlock our most powerful shipment tracking tools with a free trial, <0>no credit card required!<1> ✨', 'parcelpanel');
        __('I\'ve done this', 'parcelpanel');
        __('<2>Bulk import via CSV<3>: import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.', 'parcelpanel');
        __('Hide all Chinese regions easily, bringing your customers an all-around brand shopping experience. <0>Learn more<1>.', 'parcelpanel');
        __('Go to enable', 'parcelpanel');
        __('Import multiple tracking numbers efficiently using a CSV file. <0>Learn more<1>.', 'parcelpanel');

        __('Grasp your customers\' tracking journey', 'parcelpanel');
        __('Boost website traffic and upsells by adding a tracking page in your store menu, leveraging customer\'s 3.7+ times order tracking checks.', 'parcelpanel');
        __('Personalize your brand tracking', 'parcelpanel');
        __('Customize the experience with a progress bar in your brand\'s color, and beyond, for a tracking journey that\'s uniquely you.', 'parcelpanel');
        __('Effortless EDD insight', 'parcelpanel');
        __('Ensure customers have a seamless tracking experience with post-purchase EDD, enhancing their post-purchase satisfaction.', 'parcelpanel');
        __('Boost more revenue', 'parcelpanel');
        __('Maximize potential revenue by offering personalized product recommendations to your customers.', 'parcelpanel');
        __('Localized tracking details', 'parcelpanel');
        __('Ensure a more localized experience by automatically translating tracking details for your global customers.', 'parcelpanel');
        __('Track with ease', 'parcelpanel');
        __('Add tracking numbers to auto-sync and and present detailed tracking information from carriers on your tracking page.', 'parcelpanel');
        __('Self-Notify before customer complaints', 'parcelpanel');
        __('Opt for Exception and Failed Attempt email notifications to proactively resolve issues before customer complaints arise.', 'parcelpanel');
        __('Review your ParcelPanel notification history', 'parcelpanel');
        __('Simply click the mail icon on the shipment page to view the full history of ParcelPanel emails sent for that shipment.', 'parcelpanel');
        __('Multilingual email automation', 'parcelpanel');
        __('Send out ParcelPanel\'s shipping updates in the language your customers feel most comfortable with, all automated and hassle-free.', 'parcelpanel');
        __('Boost repeat business with coupons', 'parcelpanel');
        __('Include exclusive coupons in your ParcelPanel shipping updates. It\'s a simple way to entice customers to return for another purchase.', 'parcelpanel');
        __('Seamless integration for unleashed potential', 'parcelpanel');
        __('Integrate ParcelPanel effortlessly with multiple integrated plugins, such as <0> to unlock the full potential of your business operations.', 'parcelpanel');
        __('Streamline your order fulfillment process', 'parcelpanel');
        __('Customize order statuses to match the unique workflow of your store, ensuring a smoother and more efficient fulfillment experience.', 'parcelpanel');
        __('Enhance Brand Experience with Dropshipping Mode', 'parcelpanel');
        __('Eliminate the display of all Chinese regions to provide your customers with a consistent brand shopping experience, tailored to their locale.', 'parcelpanel');
        __('Add tracking page', 'parcelpanel');
        __('Set it up', 'parcelpanel');
        __('Add now', 'parcelpanel');
        __('View Notification History', 'parcelpanel');
        __('Saved staffing time calculate', 'parcelpanel');
        __('Saved staffing time (working hours) = (Average time per WISMO ticket handled (minute) * Lookups) / 60', 'parcelpanel');
        __('The default value is sourced  from multiple professional reports, but it may not match your actual situation. You can adjust it to better suit your situation.', 'parcelpanel');
        __('Saved staffing time', 'parcelpanel');
        __('Saved staffing time = Average time per WISMO ticket handled (minute) * Lookups', 'parcelpanel');
        __('Average time per WISMO ticket handled:', 'parcelpanel');
        __('Saved staffing cost calculate', 'parcelpanel');
        __('Saved staffing cost = Average hourly salary for customer service representatives * Saved staffing time (working hours)', 'parcelpanel');
        __('The default value is the average for US eCommerce companies and currency-adjusted, but it may not match your actual situation. You can adjust it to better suit your situation.', 'parcelpanel');
        __('Saved staffing cost', 'parcelpanel');
        __('Average hourly salary for customer service representatives:', 'parcelpanel');
        __('How is it calculated?', 'parcelpanel');
        __('Recommendation', 'parcelpanel');

        // home ----------
    }

    private static function langNew_trackPage()
    {

        // trackPage ----------
        __('Tracking page', 'parcelpanel');
        __('Preview', 'parcelpanel');
        __('Save changes', 'parcelpanel');

        __('Appearance', 'parcelpanel');
        __('Languages', 'parcelpanel');
        __('Custom shipment status', 'parcelpanel');
        __('Estimated delivery time', 'parcelpanel');
        __('Product recommendation', 'parcelpanel');
        __('Manual translations', 'parcelpanel');
        __('CSS & HTML', 'parcelpanel');

        __('How to add tracking page to your store? <0>Click here<1>', 'parcelpanel');

        __('Style', 'parcelpanel');
        __('Theme container width', 'parcelpanel');
        __('Progress bar color', 'parcelpanel');
        __('Theme mode', 'parcelpanel');
        __('Light mode', 'parcelpanel');
        __('Choose Light mode if it is dark-colored text on your store theme.', 'parcelpanel');
        __('Dark mode', 'parcelpanel');
        __('Choose Dark mode if it is light-colored text on your store theme.', 'parcelpanel');
        __('Order lookup widget', 'parcelpanel');
        __('Lookup options', 'parcelpanel');
        __('By order number and email', 'parcelpanel');
        __('By tracking number', 'parcelpanel');
        __('ParcelPanel branding', 'parcelpanel');
        __('Remove "Powered by ParcelPanel"', 'parcelpanel');
        __('to remove ParcelPanel branding for Free 😘', 'parcelpanel');
        __('Additional text', 'parcelpanel');
        __('Text above the order lookup widget', 'parcelpanel');
        __('e.g. Curious about where your package is? Click the button to track!', 'parcelpanel');
        __('Text below the order lookup widget', 'parcelpanel');
        __('e.g. Any questions or concerns? Please feel free to contact us!', 'parcelpanel');
        __('Tracking results', 'parcelpanel');
        __('Shipment display options', 'parcelpanel');
        __('Carrier name and logo', 'parcelpanel');
        __('Tracking number', 'parcelpanel');
        __('Product info', 'parcelpanel');
        __('Tracking details', 'parcelpanel');
        __('Google translate widget', 'parcelpanel');
        __('Map coordinates', 'parcelpanel');
        __('Show map on your tracking page', 'parcelpanel');
        __('Current location', 'parcelpanel');
        __('Destination address', 'parcelpanel');
        __('Hide keywords', 'parcelpanel');
        __('e.g. China,Aliexpress,Chinese cities. Separate with comma.', 'parcelpanel');
        __('Date and time format', 'parcelpanel');
        __('Date format', 'parcelpanel');
        __('Time format', 'parcelpanel');

        __('Theme language', 'parcelpanel');

        __('HOT', 'parcelpanel');
        __('Add custom status (up to 3) with time interval and description, to timely inform customers about the progress of their orders before you fulfill them. <0>Learn more<1>.', 'parcelpanel');
        __('Add custom shipment status', 'parcelpanel');
        __('Create additional steps to inform customers of your process prior to shipping', 'parcelpanel');
        __('Ordered', 'parcelpanel');
        __('Order ready', 'parcelpanel');
        __('In transit', 'parcelpanel');
        __('Out for delivery', 'parcelpanel');
        __('Delivered', 'parcelpanel');
        __('Custom tracking info', 'parcelpanel');
        __('Add one custom tracking info with time interval to reduce customer anxiety when the package was stuck in shipping, and it will be shown if the tracking info hasn\'t updated for the days you set.', 'parcelpanel');
        __('Day(s) since last tracking info', 'parcelpanel');
        __('eg. 7', 'parcelpanel');
        __('e.g. In Transit to Next Facility', 'parcelpanel');

        __('Set an estimated time period that will be displayed on your tracking page, to show your customers when they will receive their orders. <0>Learn more<1>.', 'parcelpanel');
        __('Enable this feature', 'parcelpanel');
        __('Calculate from', 'parcelpanel');
        __('Order created time', 'parcelpanel');
        __('Order shipped time', 'parcelpanel');
        __('Estimated delivery time: <0> - <1>(d)', 'parcelpanel');
        __('Advanced settings based on destinations', 'parcelpanel');
        __('Shipping to', 'parcelpanel');
        __('Add another', 'parcelpanel');

        __('Turn your tracking page into a marketing channel to make more sales.', 'parcelpanel');
        __('<0>Add categories<1> in your WordPress Products section to recommend. By default the recommendations are based on the customer’s order items, you can also select a category to recommend. <2>Learn more.<3>', 'parcelpanel');
        __('Display at/on the', 'parcelpanel');
        __('Top', 'parcelpanel');
        __('Right', 'parcelpanel');
        __('Bottom', 'parcelpanel');
        __('Advanced settings based on a category', 'parcelpanel');
        __('Select a category', 'parcelpanel');
        __('Category', 'parcelpanel');

        __('Here you can manually translate the tracking detailed info by yourself.', 'parcelpanel');
        __('Note: this feature distinguishes the strings based on Space, please don\'t forget the comma and period when you do the translation.', 'parcelpanel');
        __('Tracking info (before translation)', 'parcelpanel');
        __('Tracking info (after translation)', 'parcelpanel');
        __('e.g. Shanghai,CN', 'parcelpanel');
        __('Sorting Center', 'parcelpanel');

        __('CSS', 'parcelpanel');
        __('contact us', 'parcelpanel');
        __('View the CSS codes here you used to do the custom change of your tracking page, if you would like to change codes, please', 'parcelpanel');
        __('or follow <0>this instruction<1>.', 'parcelpanel');
        __('HTML top of page', 'parcelpanel');
        __('HTML bottom of page', 'parcelpanel');

        __('Order number', 'parcelpanel');
        __('Email or phone number', 'parcelpanel');
        __('Or', 'parcelpanel');
        __('Tracking number', 'parcelpanel');
        __('Track', 'parcelpanel');
        __('Order', 'parcelpanel');
        __('Status', 'parcelpanel');
        __('Shipping to', 'parcelpanel');
        __('Current location', 'parcelpanel');
        __('Carrier', 'parcelpanel');
        __('Product', 'parcelpanel');
        __('Not yet shipped', 'parcelpanel');
        __('Waiting for carrier update', 'parcelpanel');

        __('Ordered', 'parcelpanel');
        __('Order ready', 'parcelpanel');
        __('Pending', 'parcelpanel');
        __('Info received', 'parcelpanel');
        __('In transit', 'parcelpanel');
        __('Out for delivery', 'parcelpanel');
        __('Delivered', 'parcelpanel');
        __('Exception', 'parcelpanel');
        __('Failed attempt', 'parcelpanel');
        __('Expired', 'parcelpanel');

        __('Estimated delivery date', 'parcelpanel');
        __('Product recommendation', 'parcelpanel');
        __('Additional text above', 'parcelpanel');
        __('Additional text below', 'parcelpanel');
        __('Custom shipment status name 1', 'parcelpanel');
        __('Custom shipment status info 1', 'parcelpanel');
        __('Custom shipment status name 2', 'parcelpanel');
        __('Custom shipment status info 2', 'parcelpanel');
        __('Custom shipment status name 3', 'parcelpanel');
        __('Custom shipment status info 3', 'parcelpanel');
        __('Custom tracking info', 'parcelpanel');

        __('Could not find order', 'parcelpanel');
        __('Enter your order number', 'parcelpanel');
        __('Enter your email or phone number', 'parcelpanel');
        __('Enter your tracking number', 'parcelpanel');

        __('Progress bar', 'parcelpanel');
        __('Color', 'parcelpanel');
        __('Layout', 'parcelpanel');
        __('Horizontal on mobile', 'parcelpanel');
        __('Vertical on mobile', 'parcelpanel');
        __('By order number and email/phone number', 'parcelpanel');
        __('e.g. China,Aliexpress,Chinese cities. Separate with comma, input Chinese cities will hide all of Chinese cities.', 'parcelpanel');
        __('Custom Status Name', 'parcelpanel');
        __('Tracking info', 'parcelpanel');
        __('e.g. We are currently packing your order', 'parcelpanel');
        __('Days', 'parcelpanel');
        __('e.g. 1', 'parcelpanel');
        __('Add up to 3 custom shipment statuses with time intervals and descriptions to inform customers about their order progress before fulfillment. <0>Learn more<1>.', 'parcelpanel');
        __('Add one custom tracking info at specific time intervals to ease customers\' worries when their package is delayed in transit. The info will appear if there hasn\'t been any tracking update for the number of days you specify.', 'parcelpanel');
        __('Estimated delivery date', 'parcelpanel');
        __('Set an estimated delivery date to inform customers when they can expect to receive their orders on your tracking page. <0>Learn more<1>.', 'parcelpanel');
        __('Estimated delivery date: <0> - <1>(d)', 'parcelpanel');
        __('Dynamic tracking details', 'parcelpanel');
        __('Automatic translation', 'parcelpanel');
        __('ParcelPanel captures tracking details from carriers\' websites. Professional plans and above support auto-translation based on the tracking page\'s language when customers visit.', 'parcelpanel');
        __('Manual translation', 'parcelpanel');
        __('1. This feature distinguishes strings based on spaces, so please remember to include commas and periods when translating. <0> 2. If you\'ve enabled automatic translation, please manually review and edit the tracking info after it has been translated.', 'parcelpanel');
        __('Order Lookup', 'parcelpanel');
        __('SHIPMENT STATUS', 'parcelpanel');
        __('FEATURES', 'parcelpanel');
        __('Error Text', 'parcelpanel');
        __('month&time Text', 'parcelpanel');
        __('Change default language', 'parcelpanel');
        __('Change to', 'parcelpanel');
        __('Static text', 'parcelpanel');
        __('Edit the static text on your tracking page here.', 'parcelpanel');
        __('to add more supported languages 😘', 'parcelpanel');
        __('Automatic language switching', 'parcelpanel');
        __('ParcelPanel supports multilingual tracking pages and auto-switches the language based on the store\'s language when customers visit. If the language is not supported, the default language will be displayed.', 'parcelpanel');
        __('The initial', 'parcelpanel');
        __('for the tracking page is English.', 'parcelpanel');
        __('default language', 'parcelpanel');
        __('Transform your tracking page into a revenue-generating marketing channel to increase sales and customer engagement.', 'parcelpanel');
        __('Recommendation logic', 'parcelpanel');
        __('Product Category', 'parcelpanel');
        __('Based on order items', 'parcelpanel');
        __('Based on specific category', 'parcelpanel');

        __('Custom status', 'parcelpanel');

        __('Product category is', 'parcelpanel');
        __('No category yet', 'parcelpanel');
        __('You have not set up categories, <0>add categories<1>', 'parcelpanel');
        __('Select category', 'parcelpanel');
        __('Product tag is', 'parcelpanel');
        __('No tag yet', 'parcelpanel');
        __('You have not set up tags, <0>add tags<1>', 'parcelpanel');
        __('Select tag', 'parcelpanel');
        __('Select product condition', 'parcelpanel');
        __('Estimated delivery date = Order created date + Order cutoff and processing time + Transit time', 'parcelpanel');
        __('Order fulfilled date', 'parcelpanel');
        __('Estimated delivery date = Order fulfilled date + Transit time', 'parcelpanel');
        __('Post-purchase EDD', 'parcelpanel');
        __('Shipping zone', 'parcelpanel');
        __('All shipping zones', 'parcelpanel');
        __('Rest of the shipping zones', 'parcelpanel');
        __('days', 'parcelpanel');
        __('In another zone', 'parcelpanel');
        __('No results found', 'parcelpanel');
        __('Date range:', 'parcelpanel');
        __('Transit times', 'parcelpanel');
        __('Add transit time', 'parcelpanel');
        __('Edit transit time', 'parcelpanel');
        __('Order cutoff time', 'parcelpanel');
        __('Processing time', 'parcelpanel');
        __('business days', 'parcelpanel');
        __('Business days', 'parcelpanel');
        __('Edit fulfillment workflow', 'parcelpanel');
        __('The deadline at which orders need to be placed to ensure same-day processing.', 'parcelpanel');
        __('Add how long your warehouse needs to process an order.', 'parcelpanel');
        __('Select which days your warehouse can process an order.', 'parcelpanel');
        __('Fulfillment workflow', 'parcelpanel');
        __('<0>Add categories<1>  or <2>Add tags<3> in your WordPress products section  to achieve more precise recommendations.', 'parcelpanel');
        __('Default recommendations are based on customer\'s order items, but you can also set product conditions to make recommendations. <0>Learn more<1>.', 'parcelpanel');
        __('Based on best-selling', 'parcelpanel');
        __('Based on product condition', 'parcelpanel');
        __('All countries and regions not specifically configured will be assigned here.', 'parcelpanel');
        __('Search countries and regions', 'parcelpanel');
        // trackPage ----------
    }

    private static function langNew_shipment()
    {
        // shipment ----------
        __('Shipments', 'parcelpanel');
        __('Columns', 'parcelpanel');
        __('Pagination', 'parcelpanel');
        __('Number of items per page:', 'parcelpanel');
        __('Screen Options', 'parcelpanel');

        __('All', 'parcelpanel');
        __('Import tracking number', 'parcelpanel');
        __('Filter order number or Tracking number', 'parcelpanel');
        __('Filter by date', 'parcelpanel');
        __('Courier', 'parcelpanel');
        __('Destination', 'parcelpanel');
        __('Showing <0> shipments', 'parcelpanel');
        __('of <0>', 'parcelpanel');
        __('Select sync time', 'parcelpanel');
        __('Re-sync', 'parcelpanel');
        __('Why are my orders on black Pending status? <0>Click here<1>', 'parcelpanel');
        __('No date yet', 'parcelpanel');
        __('No shipment yet', 'parcelpanel');
        __('Try changing the filters or search term', 'parcelpanel');

        __('Order', 'parcelpanel');
        __('Tracking number', 'parcelpanel');
        __('Courier', 'parcelpanel');
        __('Last check point', 'parcelpanel');
        __('Transit', 'parcelpanel');
        __('Order date', 'parcelpanel');
        __('Shipment status', 'parcelpanel');

        __('Export shipments', 'parcelpanel');
        __('<0> shipments data will be exported a CSV table,', 'parcelpanel');
        __('Learn more about <0>CSV table headers<1>.', 'parcelpanel');
        __('Exporting:', 'parcelpanel');
        __('Please DO NOT close or refresh this page before it was completed.', 'parcelpanel');

        __('back', 'parcelpanel');
        __('Import tracking number', 'parcelpanel');
        __('Upload CSV file', 'parcelpanel');
        __('Column mapping', 'parcelpanel');
        __('Import', 'parcelpanel');
        __('Done!', 'parcelpanel');
        __('Select CSV file to import', 'parcelpanel');
        __('Your CSV file should have following columns:', 'parcelpanel');
        __('<0>Required:<1> Order number, Tracking number', 'parcelpanel');
        __('<0>Optional:<1> Courier, SKU, Qty, Date shipped, Mark order as Completed', 'parcelpanel');
        __('Note:', 'parcelpanel');
        __('Product sku and quantity are required if you need to ship the items in one order into multiple packages. <0>Learn more<1>.', 'parcelpanel');
        __('If the total quantity shipped exceeds the total quantity of items in an order, the system will automatically adjust to the maximum shippable quantity of the items.', 'parcelpanel');
        __('Choose a local file', 'parcelpanel');
        __('No file chosen', 'parcelpanel');
        __('Choose File', 'parcelpanel');
        __('Mapping preferences', 'parcelpanel');
        __('Enable this feature to save previous column mapping settings automatically', 'parcelpanel');
        __('CSV Delimiter', 'parcelpanel');
        __('This sets the separator of your CSV files to separates the data in your file into distinct fields', 'parcelpanel');
        __('Hide advanced options', 'parcelpanel');
        __('Show advanced options', 'parcelpanel');
        __('Continue', 'parcelpanel');
        __('Map CSV fields to orders', 'parcelpanel');
        __('Select fields from your CSV file to map against orders fields.', 'parcelpanel');
        __('Column name', 'parcelpanel');
        __('Map to field', 'parcelpanel');
        __('Import', 'parcelpanel');
        __('Select a column title', 'parcelpanel');
        __(' (*Required)', 'parcelpanel');
        __(' (Optional)', 'parcelpanel');
        __('Order number', 'parcelpanel');
        __('Tracking number', 'parcelpanel');
        __('Courier', 'parcelpanel');
        __('SKU', 'parcelpanel');
        __('Qty', 'parcelpanel');
        __('Date shipped', 'parcelpanel');
        __('Mark order as Completed', 'parcelpanel');
        __('Importing', 'parcelpanel');
        __('Your orders are now being imported…', 'parcelpanel');
        __('Uploading:', 'parcelpanel');
        __('Please DO NOT close or refresh this page before it was completed.', 'parcelpanel');
        __('Import Completed', 'parcelpanel');
        __('<0> tracking numbers imported successfully', 'parcelpanel');
        __('<0> tracking numbers imported failed,', 'parcelpanel');
        __('view details', 'parcelpanel');
        __('View shipments', 'parcelpanel');
        __('Upload again', 'parcelpanel');
        __('Import records', 'parcelpanel');
        __('View details', 'parcelpanel');
        __('Import file name:', 'parcelpanel');
        __('Total tracking numbers:', 'parcelpanel');
        __('Succeeded:', 'parcelpanel');
        __('Failed:', 'parcelpanel');
        __('Details:', 'parcelpanel');
        __('Close', 'parcelpanel');
        __('<0> Uploaded <1>, <2> tracking numbers, failed to upload <3>,', 'parcelpanel');

        __('Manually update status', 'parcelpanel');
        __('Save changes', 'parcelpanel');
        __('Updating the status for <0> shipment.', 'parcelpanel');
        __('Automatic shipment status update', 'parcelpanel');

        __('You can also copy or download a sample template to import tracking numbers.', 'parcelpanel');
        __('View instruction', 'parcelpanel');
        __('Import tracking number', 'parcelpanel');
        __('Step 1: Copy the <0>sample template<1> on Google Sheets (strongly recommend) or download <2>this CSV file<3>.', 'parcelpanel');
        __('Step 2: Fill in the data following the <0>Import Template Instructions<1>. Tracking number that do not comply with the instructions will not be imported.', 'parcelpanel');
        __('Step 3: Download the file in a CSV format and upload it.', 'parcelpanel');
        __('Import', 'parcelpanel');
        __('Close', 'parcelpanel');
        __('Only ParcelPanel shipping notifications, don\'t include WooCommerce email notifications.', 'parcelpanel');
        __('No notifications yet', 'parcelpanel');
        __('You have not sent any ParcelPanel shipping notifications yet', 'parcelpanel');


        __('Sync to PayPal', 'parcelpanel');
        __('Sync orders', 'parcelpanel');
        __('The system will sync your orders, which may take a few minutes depending on the number of orders pending synchronization.', 'parcelpanel');
        __('Notification history', 'parcelpanel');

        __('Unsynced', 'parcelpanel');
        __('Other payment methods', 'parcelpanel');
        __('Synced successfully', 'parcelpanel');
        __('Sync failed', 'parcelpanel');
        __('Manually sync to PayPal', 'parcelpanel');

        __('Shipped date', 'parcelpanel');
        __('Destination', 'parcelpanel');
        __('Customer name', 'parcelpanel');
        __('Last check point time', 'parcelpanel');
        __('Residence time', 'parcelpanel');
        __('Order number', 'parcelpanel');
        __('Transit time', 'parcelpanel');
        __('Estimated delivery time', 'parcelpanel');
        __('View on tracking page', 'parcelpanel');
        __('View notification history', 'parcelpanel');
        __('Shipment info', 'parcelpanel');
        __('Customer info', 'parcelpanel');
        __('Oldest to newest', 'parcelpanel');
        __('Newest to oldest', 'parcelpanel');
        __('Longest to shortest', 'parcelpanel');
        __('Shortest to longest', 'parcelpanel');
        __('More Filter', 'parcelpanel');
        __('Custom', 'parcelpanel');
        __('More filters', 'parcelpanel');
        __('Reset all filters', 'parcelpanel');
        __('Done & filter', 'parcelpanel');
        __('Min day(s)', 'parcelpanel');
        __('Max day(s)', 'parcelpanel');
        __('Reset all', 'parcelpanel');
        __('Sync & save', 'parcelpanel');
        __('Last checkpoint time', 'parcelpanel');
        __('Filter by Order number, Tracking number, Customer name', 'parcelpanel');
        // shipment ----------
    }

    private static function langNew_setting()
    {
        // setting ----------
        __('Settings', 'parcelpanel');
        __('Delivery notifications', 'parcelpanel');
        __('Preview', 'parcelpanel');
        __('Add an order tracking section to WooCommerce email notifications', 'parcelpanel');
        __('Select order status to show the tracking section', 'parcelpanel');
        __('ParcelPanel shipping email notifications', 'parcelpanel');
        __('This feature will allow you to send email notifications based on ParcelPanel shipment status.', 'parcelpanel');
        __('Manage template', 'parcelpanel');
        __('Account page tracking', 'parcelpanel');
        __('Add a track button to orders history page (Actions column)', 'parcelpanel');
        __('This feature will allow you to add a track button to the orders history page (Actions column) so your customers can track their orders with one click there.', 'parcelpanel');
        __('View example', 'parcelpanel');
        __('Select order status to show the track button', 'parcelpanel');
        __('Configuring WooCommerce Orders', 'parcelpanel');
        __('Rename order status "Completed" to "Shipped"', 'parcelpanel');
        __('This feature will allow you to change the order status label name from "Completed" to "Shipped".', 'parcelpanel');
        __('Add a track button to WooCommerce orders (Actions column)', 'parcelpanel');
        __('This feature will allow you to add a shortcut button to WooCommerce orders (Actions column), which will make it easier to add tracking information.', 'parcelpanel');
        __('Dropshipping mode', 'parcelpanel');
        __('Enable dropshipping mode', 'parcelpanel');
        __('This feature will allow you to hide all Chinese regions to bring your customers an all-around brand shopping experience. <0>Learn more<1>.', 'parcelpanel');
        __('Courier matching', 'parcelpanel');
        __('If you know the couriers you use, enable them for priority matching. Otherwise, leave it blank, and the system will automatically identify suitable couriers for you.', 'parcelpanel');
        __('Search couriers', 'parcelpanel');
        __('Processing', 'parcelpanel');
        __('Shipped', 'parcelpanel');
        __('Completed', 'parcelpanel');
        __('Partially Shipped', 'parcelpanel');
        __('Cancelled', 'parcelpanel');
        __('Refunded', 'parcelpanel');
        __('Failed', 'parcelpanel');
        __('Draft', 'parcelpanel');
        __('Save changes', 'parcelpanel');
        __('<0> selected', 'parcelpanel');
        __('Showing <0> of <1> couriers', 'parcelpanel');

        __('How it works?', 'parcelpanel');
        __('After enabled, ParcelPanel will add a track button to the orders history page (Actions column), so your customers can track their orders with one click directed to your store tracking page.', 'parcelpanel');
        __('After enabled, ParcelPanel will add a track button to orders admin (Actions column), you can add tracking info easily without clicking into order details.', 'parcelpanel');

        __('Shipping notifications', 'parcelpanel');
        __('Automatically add an order tracking section in the email notifications sent by WooCommerce based on the order status. <0>Learn more<1>.', 'parcelpanel');
        __('ParcelPanel shipping notifications', 'parcelpanel');
        __('Automatically notify your customers or yourself via email with ParcelPanel shipment status updates. <0>Learn more<1>.', 'parcelpanel');
        __('Notify yourself', 'parcelpanel');
        __('Auto-send email notifications to yourself based on ParcelPanel shipment status update.', 'parcelpanel');
        __('Notify your customers', 'parcelpanel');
        __('Customize your brand', 'parcelpanel');
        __('Auto-send email notifications to your customers based on ParcelPanel shipment status update.', 'parcelpanel');
        __('Edit template', 'parcelpanel');

        __('Tailored for WooCommerce', 'parcelpanel');
        __('Add a track button to the orders history page (Actions column) enabling customers to effortlessly track their orders with a single click there.', 'parcelpanel');
        __('Rename the order status label from "Completed" to "Shipped".', 'parcelpanel');

        __('After enabling this feature, the <0>label name<1> for the order status will be changed from "Completed" to "Shipped". <2>By default, the "Completed" status in WooCommerce indicates that the <3>Order fulfilled and Complete<4> and requires no further action. As a merchant, you have the option to rename this status to "Shipped" to better reflect the current status of the order. "Shipped" is synonymous with "Completed" in terms of order fulfillment.', 'parcelpanel');
        __('<0>Note<1>: This change only affects the display in your admin interface, and it is fully compatible with other plugins that integrate with the "Completed" status.', 'parcelpanel');

        __('Revert email template to default?', 'parcelpanel');
        __('This action can\'t be undone! Are you sure you want to revert this template to the default settings? This action cannot be reversed, and any changes you have made to [Section settings], [Product recommendation], and [Coupons upsell] will all be lost.', 'parcelpanel');

        __('Send test email', 'parcelpanel');
        __('Email address', 'parcelpanel');
        __('Leave page with unsaved changes?', 'parcelpanel');
        __('Stay', 'parcelpanel');
        __('Leave page', 'parcelpanel');
        __('Leaving this page will delete all unsaved changes.', 'parcelpanel');

        __('Subject:', 'parcelpanel');
        __('Powered by ParcelPanel', 'parcelpanel');
        __('Click to remove', 'parcelpanel');

        __('Recipient info', 'parcelpanel');
        __('Notify yourself', 'parcelpanel');
        __('Save changes', 'parcelpanel');
        __('Configure notifications', 'parcelpanel');
        __('Enable desired notifications to stay informed of the latest shipment status updates.', 'parcelpanel');

        __('Reset to default', 'parcelpanel');
        __('Visual email editor', 'parcelpanel');
        __('HTML email editor', 'parcelpanel');

        __('Customize your brand:', 'parcelpanel');
        __('More actions', 'parcelpanel');
        __('Sender info', 'parcelpanel');
        __('ParcelPanel branding', 'parcelpanel');
        __('Remove "Powered by ParcelPanel"', 'parcelpanel');
        __('to remove it for Free 😘', 'parcelpanel');
        __('ParcelPanel\'s Auto Multilingual Email Sending', 'parcelpanel');
        __('Auto-send based on your customers\' country. <0>Learn more<1>.', 'parcelpanel');
        __('Accent color', 'parcelpanel');
        __('Logo width', 'parcelpanel');
        __('Site Title', 'parcelpanel');
        __('Appears in the header without a logo added.', 'parcelpanel');
        __('Destination URL', 'parcelpanel');
        __('Leave blank for no link.', 'parcelpanel');
        __('Address', 'parcelpanel');
        __('Adding a physical address can reduce spam.', 'parcelpanel');
        __('Footer Description', 'parcelpanel');
        __('Section settings', 'parcelpanel');
        __('Subject', 'parcelpanel');
        __('This field can\'t be blank', 'parcelpanel');
        __('Heading', 'parcelpanel');
        __('Description', 'parcelpanel');
        __('Button', 'parcelpanel');
        __('Leave blank for no button.', 'parcelpanel');
        __('Additional Text', 'parcelpanel');
        __('Shipment items', 'parcelpanel');
        __('Body', 'parcelpanel');
        __('Enable this feature', 'parcelpanel');
        __('Recommendation logic', 'parcelpanel');
        __('Based on order items', 'parcelpanel');
        __('Based on specific collection', 'parcelpanel');
        __('Select a category', 'parcelpanel');
        __('Product Category', 'parcelpanel');
        __('Product recommendation', 'parcelpanel');
        __('Coupons upsell', 'parcelpanel');
        __('Coupons code', 'parcelpanel');
        __('Create a coupons', 'parcelpanel');
        __('in your WooCommerce admin, and enter it above.', 'parcelpanel');
        __('Button text', 'parcelpanel');
        __('Button Destination URL', 'parcelpanel');
        __('Theme settings', 'parcelpanel');
        __('Add a shortcut button to WooCommerce orders (Actions column), which will make it easier to add tracking information.', 'parcelpanel');
        __('Hide all Chinese regions to bring your customers an all-around brand shopping experience. <0>Learn more<1>.', 'parcelpanel');

        __('Discard all unsaved changes?', 'parcelpanel');
        __('If you discard changes, you\'ll delete any edits you made since you last saved.', 'parcelpanel');
        __('Email subject', 'parcelpanel');
        __('Email body', 'parcelpanel');
        __('Email settings', 'parcelpanel');
        __('Enable this notification', 'parcelpanel');

        __('The following emails are developed and sent by ParcelPanel. Rest assured, all your previous settings (shipping emails sent by WooCommerce) are fully compatible, simply navigate to <0>WooCommerce settings<1> to access your familiar setup with ease.<br/> Please note that if you have set up the same shipping notifications in both here and WooCommerce, emails will be sent twice. <2>Learn more<3>.', 'parcelpanel');
        __('The following emails are developed and sent by ParcelPanel. However, if you prefer to use WooCommerce\'s standard <4>wp_mail()<5> email system (ParcelPanel shipping emails sent by WooCommerce), you can easily set it up by navigating to the <0>WooCommerce settings<1>.<br/> Please note that if you have set up the same shipping notifications in both here and WooCommerce, emails will be sent twice. <2>Learn more<3>.', 'parcelpanel');

        __('Delivered', 'parcelpanel');
        __('Check this option to automatically update the order status to \'Completed\' when all shipments within the order have been delivered.', 'parcelpanel');
        __('<0>Note<1>: If you have enabled email notifications for the \'Completed\' status, updating the order status will trigger corresponding emails to notify your customer.', 'parcelpanel');
        __('Check this option to automatically update the order status to \'Shipped\' (equals \'Completed\') when all shipments within the order have been delivered.', 'parcelpanel');
        __('Check this option to automatically update the order status to \'Delivered\' when all shipments within the order have been delivered.', 'parcelpanel');
        __('Add', 'parcelpanel');
        __('Don\'t add', 'parcelpanel');
        __('Rename order status "Completed" to "Shipped"', 'parcelpanel');
        __('\'Shipped\'(equals \'Completed\')', 'parcelpanel');
        __('Automate updates to', 'parcelpanel');
        __('<0> \'<1>\' order status', 'parcelpanel');
        __('Enable this email notification', 'parcelpanel');
        __('Add \'Partially Shipped\' order statuses and emails to better reflect the current order fulfillment progress.', 'parcelpanel');
        __('Enable <0>the email notification<1>', 'parcelpanel');
        __('Add \'Shipped\' order status and emails or rename the \'Completed\' order status to \'Shipped\' to better reflect the current order fulfillment progress.', 'parcelpanel');
        __('Add \'Delivered\' order status and auto-update the order status to corresponding status when all shipments within the order have been delivered.', 'parcelpanel');
        __('Optimize the order fulfillment workflow', 'parcelpanel');
        __('Add relevant order statuses to better align with your store\'s order fulfillment workflow. <0>Learn more<1>.', 'parcelpanel');
        __('Important Notice', 'parcelpanel');
        __('Don\'t use HTML and CSS to hide content in messages. Hiding content may cause messages to be marked as spam.', 'parcelpanel');
        __('Modify Code', 'parcelpanel');
        // setting ----------
    }

    private static function langNew_integration()
    {
        // integration ----------
        __('Integration', 'parcelpanel');
        __('Featured', 'parcelpanel');
        __('Dropshipping', 'parcelpanel');
        __('Shipping', 'parcelpanel');
        __('Custom order number', 'parcelpanel');
        __('Email customizer', 'parcelpanel');
        __('Translate', 'parcelpanel');
        __('Will there be more plugins integrated?', 'parcelpanel');
        __('Yes, ParcelPanel will continue to integrate with more plugins to improve the user experience. Stay tuned!', 'parcelpanel');
        __('Is it possible to integrate a plugin that I using but is not on your list?', 'parcelpanel');
        __('Let us know which plugin you would like us to integrate with.', 'parcelpanel');
        __('Contact us', 'parcelpanel');
        __('You do not have to do anything, ParcelPanel works with the below plugins by default.  <0>Learn more<1>.', 'parcelpanel');
        __('You do not have to do anything, ParcelPanel works with the below plugins by default.', 'parcelpanel');

        __('API Key', 'parcelpanel');
        __('Developers can use the ParcelPanel API to effectively manage shipments by creating, viewing, and deleting tracking information. Learn <0>API doc<1> for details.', 'parcelpanel');
        __('Your API Key', 'parcelpanel');
        __('Show', 'parcelpanel');
        __('Hide', 'parcelpanel');
        __('Copy', 'parcelpanel');
        __('Disconnect ParcelPanel & Klaviyo', 'parcelpanel');
        __('Connect ParcelPanel & Klaviyo', 'parcelpanel');
        __('Klaviyo Public API Key', 'parcelpanel');
        __('By connecting ParcelPanel & Klaviyo, you can create personalized campaigns & flows based on tracking events from ParcelPanel, then adjust your customers\' lifecycle email marketing.', 'parcelpanel');
        __('How to connect ParcelPanel for WooCommerce & Klaviyo via API?', 'parcelpanel');
        __('Disconnect ParcelPanel & Omnisend', 'parcelpanel');
        __('Connect ParcelPanel & Omnisend', 'parcelpanel');
        __('Omnisend API Key', 'parcelpanel');
        __('By integrating ParcelPanel and Omnisend, you can create personalized campaigns & flows based on tracking events from ParcelPanel, then adjust your customers\' lifecycle email marketing.', 'parcelpanel');
        __('How to connect ParcelPanel for WooCommerce & Omnisend via API?', 'parcelpanel');
        __('Email marketing', 'parcelpanel');
        __('Payment', 'parcelpanel');

        __('Invalid API Key', 'parcelpanel');
        __('Disconnect ParcelPanel & Paypal', 'parcelpanel');
        // integration ----------
    }

    private static function langNew_account()
    {
        // account ----------
        // __('Account', 'parcelpanel');
        // __('Account info', 'parcelpanel');
        __('Billing', 'parcelpanel');
        __('Billing info', 'parcelpanel');
        __('Current plan', 'parcelpanel');
        __('Quota limit', 'parcelpanel');
        __('Next quota reset date', 'parcelpanel');
        __('Quota usage', 'parcelpanel');
        __('quota', 'parcelpanel');
        __('Avg. $<0> per order', 'parcelpanel');
        __('month', 'parcelpanel');
        __('Choose', 'parcelpanel');
        __('Limited time offer specially for WooCommerce stores✨', 'parcelpanel');
        __('Unlimited', 'parcelpanel');
        __('Unlimited quota Avg $0.0000 per order', 'parcelpanel');
        __('Free Upgrade Now 🥳', 'parcelpanel');
        __('Does ParcelPanel charge based on order lookups?', 'parcelpanel');
        __('No, ParcelPanel counts the quota based on the number of your orders synced to ParcelPanel, and provides unlimited order lookups.', 'parcelpanel');
        __('Can I change my plan in the middle of a billing cycle?', 'parcelpanel');
        __('Yes, you can change your plan at any time based on your needs. If you want to change the plan, the remaining quotas of current plan will be added to the new one automatically.', 'parcelpanel');
        __('Yes, you can change your plan at any time based on your needs. If you want to upgrade the plan, the remaining quotas of current plan will be added to the new one automatically. <0>Learn more<1>.');
        __('Why is ParcelPanel launching an unlimited plan? When will ParcelPanel charge?', 'parcelpanel');
        __('We\'ve provided service for over 120,000 Shopify and WooCommerce stores, but we are still pretty new to WooCommerce for now. We want to give more special offers for WooCommerce merchants.', 'parcelpanel');
        __('ParcelPanel will not charge for a short time. But please rest assured that if we decide to charge, we will definitely inform you in advance, and there will be no hidden charges.', 'parcelpanel');

        __('Downgrade to Starter Free plan', 'parcelpanel');
        __('This can\'t be undone!', 'parcelpanel');
        __('Downgrade', 'parcelpanel');
        // account ----------
        // account ---------- new
        __('Current Plan', 'parcelpanel');
        __('Next plan', 'parcelpanel');
        __('Choose this plan', 'parcelpanel');
        __('Start <0>-day free trial', 'parcelpanel');
        __('Get 20% off 🥳', 'parcelpanel');
        __('Quota', 'parcelpanel');
        __('Trial period end date', 'parcelpanel');
        __('When your available quotas limit drops below', 'parcelpanel');

        __('Send a recharge reminder email to', 'parcelpanel');
        __('Downgrade to free plan', 'parcelpanel');
        __('This can\'t be undone!', 'parcelpanel');
        __('By downgrading to the free plan, you will lose access to key features, including :', 'parcelpanel');
        __('Downgrade', 'parcelpanel');
        __('Keep my plan', 'parcelpanel');
        __('Recharge reminder', 'parcelpanel');
        __('Recommended for you ✨', 'parcelpanel');
        __('All <0> features, plus:', 'parcelpanel');
        __('What\'s the quota? Does ParcelPanel charge based on order lookups?', 'parcelpanel');
        __('"1 quota=1 order". ParcelPanel counts the quota based on the number of your orders synced to ParcelPanel, and provides unlimited order lookups.', 'parcelpanel');
        // account ---------- new

        // account ---------- plan
        __('Free', 'parcelpanel');
        __('Key features to start your business', 'parcelpanel');
        __('Access to 1,200+ carriers', 'parcelpanel');
        __('Real-time sync & tracking', 'parcelpanel');
        __('Bulk Import via CSV & Manually add tracking numbers', 'parcelpanel');
        __('Branded tracking page', 'parcelpanel');
        __('Smart dashboard', 'parcelpanel');
        __('Basic analytics', 'parcelpanel');
        __('Tailored for WooCommerce', 'parcelpanel');
        __('Essentials', 'parcelpanel');
        __('Must-have features for growing brands', 'parcelpanel');
        __('Custom shipment status', 'parcelpanel');
        __('Estimated delivery time', 'parcelpanel');
        __('Product recommendation', 'parcelpanel');
        __('ParcelPanel shipping notifications', 'parcelpanel');
        // __('Advanced analytics', 'parcelpanel');
        __('Post-purchase EDD', 'parcelpanel'); // v-analysis_version
        __('Advanced analytics: transit time, tracking page and shipping notifications.', 'parcelpanel'); // v-analysis_version
        __('CSV & PDF export', 'parcelpanel'); // v-analysis_version
        __('Advanced analytics: Delivery days by destinations, Delivery days by couriers and more...', 'parcelpanel');
        __('Includes delivery days by destinations, delivery days by couriers, and more coming...', 'parcelpanel');
        __('Professional', 'parcelpanel');
        __('Full feature set to power your business', 'parcelpanel');
        __('CSV export', 'parcelpanel');
        __('Advanced integrations:', 'parcelpanel');
        __('More integrations, including Shippo, Sendcloud, Ali2Woo, and many more...', 'parcelpanel');
        __('ALD, DSers, WooCommerce Shipping, WPML and more...', 'parcelpanel');
        // __('Advanced integrations: PayPal, DSers, WooCommerce Shipping, WPML and more...', 'parcelpanel');
        __('Advanced integrations: PayPal, DSers, WPML and more...', 'parcelpanel');
        __('Developer API', 'parcelpanel');
        __('Remove ParcelPanel branding', 'parcelpanel');
        __('Enterprise', 'parcelpanel');
        __('Tailored for high-volume companies', 'parcelpanel');
        __('Dedicated tracking channel', 'parcelpanel');
        __('Custom integrations', 'parcelpanel');
        __('Customer success manager', 'parcelpanel');
        __('Dedicated onboarding manager', 'parcelpanel');
        __('Dedicated priority support', 'parcelpanel');
        // account ---------- plan

        // v3.8.2
        __('Previous plan(s)', 'parcelpanel');
        __('Gifting quotas', 'parcelpanel');
        __('Consumed quotas:', 'parcelpanel');
        __('Subscription dashboard', 'parcelpanel');
        __('<0> remaining quotas in the current plan', 'parcelpanel');
        __('<0> remaining quotas in the previous plan(s', 'parcelpanel');
        __('<0> remaining gifting quotas in the current plan', 'parcelpanel');
        __('What does "quota" mean? How can I check the orders I\'ve synchronized?', 'parcelpanel');
        __('1 order = 1 quota. When ParcelPanel syncs 1 order for you, it consumes 1 quota.', 'parcelpanel');
        __('If an order contains multiple shipments, it is counted as one order, consuming only one quota.', 'parcelpanel');
        __('Order lookups don\'t consume quota, meaning your customers have unlimited lookups.', 'parcelpanel');
        __('You can easily check the synchronized orders on the ParcelPanel Shipment page.', 'parcelpanel');
        __('Can I change my plan in the middle of a billing cycle? How do I cancel my plan?', 'parcelpanel');
        __('Of course, you can change your plan at any time based on your needs. Changing your plan follows these rules:', 'parcelpanel');
        __('Upgrading your plan takes effect immediately, resetting the billing cycle, and any remaining quota will be added to the new plan.', 'parcelpanel');
        __('Downgrading your plan will take effect after your current plan ends.', 'parcelpanel');
        __('Cancelling your plan will take effect after your current plan ends. You can simply choose to downgrade to the free plan.', 'parcelpanel');
        __('For more details on subscriptions, <0>learn more<1>.', 'parcelpanel');
        __('What is the free trial, and how does it work?', 'parcelpanel');
        __('All paid plans share the same free trial period. During the period, you can switch to any paid plan at no cost, and it won\'t consume any quotas.', 'parcelpanel');
        __('Of course, if you find that ParcelPanel doesn\'t meet your requirements, you can downgrade to the free plan before the trial period ends to avoid any unexpected charges.', 'parcelpanel');
        __('Automatic language switching', 'parcelpanel');
        __('Automatic translation', 'parcelpanel');
        // v3.8.2

        __('No credit card required', 'parcelpanel');

        __('Change plan', 'parcelpanel');
        __('Subscription charge', 'parcelpanel');
        __('Usage charges per additional quota', 'parcelpanel');
        __('Not applicable', 'parcelpanel');
        __('Spending limit for usage charges', 'parcelpanel');
        __('Subscription info', 'parcelpanel');
        __('Add credit card', 'parcelpanel');
        __('You can set the <0>upgrade reminder<1> to prompt timely upgrades and also set a <2>spending limit<3> for usage charges to balance risks and avoid overspending', 'parcelpanel');
        __('Pricing details', 'parcelpanel');
        __('Available features', 'parcelpanel');
        __('See all features', 'parcelpanel');
        __('Spending limit', 'parcelpanel');
        __('We will only charge you after you use up the current plan\'s quota. If usage charges exceed the spending limit, we won\'t continue charging you or syncing new orders.', 'parcelpanel');
        __('Debit usage charges:', 'parcelpanel');
        __('You have used <0> additional quota.', 'parcelpanel');
        __('Current spending limit:', 'parcelpanel');
        __('You can use up to <0> additional quota at most.', 'parcelpanel');
        __('You can use up to <0> additional quota at most, with <1> remaining.', 'parcelpanel');
        __('New spending limit:', 'parcelpanel');
        __('Learn more about spending limit', 'parcelpanel');
        __('What are Usage charges? How can I change my Spending limit?', 'parcelpanel');
        __('Usage charges are fees based on your usage. We only charge you after you\'ve used up your plan\'s quota. If your charges exceed the spending limit, we won\'t continue charging you or syncing new orders.', 'parcelpanel');
        __('The spending limit for usage charges defaults to the subscription price of your plan. This doesn\'t apply to the Free plan.', 'parcelpanel');
        __('You can change the spending limit for usage charges after selecting a paid plan. Please <0>follow this article<1> for guidance', 'parcelpanel');
        __('Frequently asked questions', 'parcelpanel');
        __('Get 50% off 🥳', 'parcelpanel');
        __('Additional quota used: <0>', 'parcelpanel');
        __('$<0> per additional quota.', 'parcelpanel');
        __('<0> quota/month', 'parcelpanel');
        __('<0> quota/year', 'parcelpanel');
        __('Includes:', 'parcelpanel');
    }

    private static function langNew_feature()
    {
        __('Feature request', 'parcelpanel');
    }

    private static function langNew_analysis()
    {
        __('Transit time', 'parcelpanel');
        __('Tracking page', 'parcelpanel');
        __('Shipping notifications', 'parcelpanel');
        __('Analytics', 'parcelpanel');
        __('Export PDF', 'parcelpanel');
        __('The data will be exported to a PDF based on your applied filters.', 'parcelpanel');
        __('Exceptions', 'parcelpanel');
        __('The number and percentage of exception shipments', 'parcelpanel');
        __('Shipments over time', 'parcelpanel');
        __('The total number of shipments', 'parcelpanel');
        __('Conversion orders', 'parcelpanel');
        __('Orders attributed to all marketing and discount channels of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Orders attributed to all marketing channels of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Conversion revenue', 'parcelpanel');
        __('Revenue attributed to all marketing and discount channels of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Revenue attributed to all marketing channels of ParcelPanel\'s shipping notifications', 'parcelpanel');
        __('Marketing CTR', 'parcelpanel');
        __('Marketing clicks divided by opened shipping notifications', 'parcelpanel');
        __('Shipping notifications time', 'parcelpanel');
        __('Marketing clicks over time', 'parcelpanel');
        __('Lookups over time', 'parcelpanel');
        __('Marketing clicks divided by Lookups', 'parcelpanel');
        __('Top product recommendation by clicks', 'parcelpanel');
        __('P85 transit time', 'parcelpanel');
        __('P85 transit time (d)', 'parcelpanel');
        __('Indicates that 85% of the delivered shipments have a shorter transit time than this', 'parcelpanel');
        __('Average transit time', 'parcelpanel');
        __('Average transit time (d)', 'parcelpanel');
        __('The average transit time of all delivered shipments', 'parcelpanel');
        __('Transit time(d)', 'parcelpanel');
        __('Transit time distribution (%)', 'parcelpanel');
        __('Transit time (d) over time', 'parcelpanel');
        __('Transit time details', 'parcelpanel');
        __('The total number of times customers have tracked their shipment through the tracking page', 'parcelpanel');
        __('Orders attributed to all marketing channels of ParcelPanel\'s tracking page', 'parcelpanel');
        __('Revenue attributed to all marketing channels of ParcelPanel\'s tracking page', 'parcelpanel');
        __('Orders and revenue attributed to the discount channel of ParcelPanel\'s shipping notifications', 'parcelpanel');
    }
}
