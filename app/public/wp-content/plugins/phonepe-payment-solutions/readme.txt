=== PhonePe Payment Solutions === 
Contributors: PhonePe Team
Tags: PhonePe, PhonePe Payments, PayWithPhonePe, PhonePe WooCommerce, PhonePe Plugin, PhonePe Payment Gateway
Requires PHP: 5.6 or later
Plugin Name: PhonePe Payment Solutions
Authors: PhonePe
Tested up to: 6.4
Stable tag: 2.0.11
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Using this plugin you can accept payments through PhonePe. After activating this plugin, you can see the PhonePe option linked to the checkout page of woocommerce site. On configuring with the provided Merchant credentials, you can enable this plugin in Preprod/Production environment.

== Compatibilities and Dependencies ==

* Wordpress v5.4.1 or higher
* Woocommerce v4.14 or higher
* PHP v5.6.0 or higher

== Getting Started == 

New to PhonePe Payment Gateway? Follow the below steps to access PhonePe Merchant Dashboard.

== Registration and Login ==

* Check your registered mail ID for a mail from the “PhonePe team email id no-reply@phonepe.com” with the subject line: “PhonePe dashboard access - ”. This mail will contain a link to go to login page. Click on the link page and enter your Email ID or registered phone number. You can login either using the OTP option or by setting up a password by clicking on Forgot Password.


Note: PhonePe will provide Merchant Id, SaltKey & keyIndex for the test and live modes. No money is deducted from your account in test mode.


== Plugin Installation == 

There are 2 ways of installing the PhonePe payment gateway plugin:-
i)  Download the plugin repository from https://wordpress.org/plugins/phonepe-payment-solutions/
            OR
ii) Install the plugin directly from the Wordpress dashboard

Note: In case you have installed the plugin directly from the wordpress dashboard, skip to Configuration. In case you have downloaded the repository from here, follow the steps below to complete the installation.

== Steps after downloading the plugin ==

* Unzip and open the downloaded folder.
* Upload all plugin files in "wp-content/plugins/" directory
* Install and activate the plugin from Wordpress admin panel
* Visit the WooCommerce > Settings page to configure PhonePe – Pay Securely using UPI and Cards.
* Your PhonePe Payment Gateway plugin is now setup. You can now accept payments through PhonePe.

== Configuration ==

* Log into your WordPress admin and activate the PhonePe – Pay Securely using UPI and Cards plugin in WordPress Plugin Manager.
* Log into your WooCommerce Webstore account, navigate to Settings and click the Checkout/Payment Gateways tab
* Scroll down to the Checkout page and go to the setting option of PhonePe – Pay Securely using UPI and Cards under Gateway Display
* Click on PhonePe – Pay Securely using UPI and Cards to edit the settings. If you do not see PhonePe in the list at the top of the screen make sure you have activated the plugin in the WordPress Plugin Manager

* Fill in the following credentials.
    * Enable - Enable check box
    * Merchant ID - Staging/Production MID provided by PhonePe
    * Salt Key - Staging/Production Key provided by PhonePe
    * Salt Key Index - Staging/Production provided by PhonePe
    * Environment - Select environment type

Your PhonePe payment gateway is enabled. Now you can accept payment through PhonePe.
In case of any issues with integration, please [get in touch](mailto:merchant-integration@phonepe.com).

== Changelog ==

= Version 2.0.11 =
* Ensured seamless rendering of PhonePe Payment Solutions within WooCommerce's new wc block-based checkout, resolving issues that rendering PhonePe PG in payment options. Enhance your customers' checkout experience with this compatibility update.

= Version 2.0.10 =
* Added FRA (Fraud Risk Assessment) granular error messages to order notes for WooCommerce merchants, enhancing transparency and facilitating smoother transaction management.

= Version 2.0.9 =
* Merchants can customize Payment page open mode either Open on top of the current page or Redirect to a full-length payment page
* BugFix: Check status button 

= Version 2.0.8 =
* BugFix: IFrame on WooCommerce Checkout was aligned to bottom left
* Order notes by the payment gateway are prefixed with PhonePe Payment solution

= Version 2.0.7 =
* Previous versions added in plugin

= Version 2.0.6 =
* Added CTA links to phonepe business dashboard 
* Hosted all image assets to phonepe CDN reducing filesize of plugin 
* Added step 4 in Refund education

= Version 2.0.5 = 
* Merchant support email id updated
* UAT environment support added

= Version 2.0.4 = 
* Refund education prompt added
* Improvisation in redirection after payment

= Version 2.0.3 =
* Merchant troubleshooting journey features added 
* Added transaction id in order notes
* BugFix: handling for error codes fixed
* Order once marked completed will not be modified by plugin in any case

= Version 2.0.2 =
* BugFix: Guzzle Https library calls migrated to Wordpress native wp_remote network calls
* Moved PhonePe PG Settings to the sidebar
* New logo
* BugFix: replaced deprecated Wordpress function for getting redirect URL with its alternative.

= Version 2.0.1 =
* New Logo and description 
* Settings link on installed plugins for easy navigation 
* merchant transaction id removed from order notes
