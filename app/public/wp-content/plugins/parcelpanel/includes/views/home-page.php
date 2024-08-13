<?php

/**
 * @author Chuwen
 * @date   2021/7/21 10:39
 */

defined('ABSPATH') || exit;
?>
<script>
  const pp_bind_account = "<?php echo esc_js(wp_create_nonce('pp-bind-account')) ?>"
  const pp_enable_dropshipping_nonce = "<?php echo esc_js(wp_create_nonce('pp-enable-dropshipping-mode')) ?>"

  // Determine whether the account has been bound
  const pp_is_empty_api_kay = "<?php echo esc_js(empty(get_option(\ParcelPanel\OptionName\API_KEY, ''))) ?>"
  const pp_auth_key = "<?php echo esc_js(wc_clean($_GET['auth_key'] ?? '')); // phpcs:ignore 
                        ?>"
</script>
<template id="pp-app">
  <pp-page-import-tracking v-if="route.path === '/import-tracking'"></pp-page-import-tracking>
  <div v-else id="pp-home" class="pp-wrap">

    <!-- <div class="pp-mask" v-show="isShow"></div> -->
    <h2><?php esc_html_e('Welcome to Parcel Panel', 'parcelpanel') ?></h2>
    <?php settings_errors() ?>

    <!-- section Add tracking page to your storefront -->
    <div class="pp-card pp-m-t-5">
      <h3 class="pp-card-title"><?php esc_html_e('Add tracking page to your storefront', 'parcelpanel') ?></h3>
      <div class="pp-card-body">
        <p>
          <?php
          // translators: %1$s is tracking url.
          echo sprintf(esc_html__('Your branded tracking page is ready, the URL is %1$s, add it to your store menus so your customers can track orders there.', 'parcelpanel'), '<a :href="pageParam.track_page_link" target="_blank">{{pageParam.track_page_link}}</a>')
          ?>
        </p>
        <p class="pp-m-t-2">
          <?php
          // translators: %1$s is url html %2$s is url html.
          echo sprintf(esc_html__('Don’t know how to do this? Please follow %1$sthis instruction%2$s.', 'parcelpanel'), '<a href="https://docs.parcelpanel.com/woocommerce/article/56" target="_blank">', '</a>')
          ?>
        </p>
        <pp-button @click="previewTrackPage" variant="primary" class="pp-m-t-5 pp-m-b-5"><?php esc_html_e('Preview tracking page', 'parcelpanel') ?></pp-button>
        <p><?php esc_html_e('Looks not so good?', 'parcelpanel') ?>&nbsp;<a @click="onContactUs" href="javascript:"><?php esc_html_e('Contact us.', 'parcelpanel') ?></a></p>
      </div>
    </div>

    <!-- section Import tracking number of your orders -->
    <div class="pp-card">
      <h3 class="pp-card-title" style="display:flex;align-items:center"><?php esc_html_e('Import tracking number of your orders', 'parcelpanel') ?><pp-new-badge end-time="1662768000000"></pp-new-badge></h3>
      <div class="pp-card-body">
        <p>
          <?php
          // translators: %1$s is url html %2$s is url html.
          echo sprintf(esc_html__('Use mapping feature to bulk import tracking number with a CSV file, or manually add one by one in the Edit order page. %1$sLearn more%2$s.', 'parcelpanel'), '<a href="https://docs.parcelpanel.com/woocommerce/article/how-does-parcelpanel-work-in-woocommerce/" target="_blank">', '</a>')
          ?>
        </p>
        <pp-button @click="modal" variant="primary" class="pp-m-t-5"><?php esc_html_e('Import tracking number', 'parcelpanel') ?></pp-button>
      </div>
    </div>

    <!-- section Dropshipping -->
    <div class="pp-card">
      <h3 class="pp-card-title"><?php esc_html_e('Dropshipping (optional)', 'parcelpanel') ?></h3>
      <div class="pp-card-body">
        <div class="pp-m-l-4">
          <ul class="pp-m-t-0 pp-m-b-5" style="list-style: decimal">
            <li><?php esc_html_e('Support Aliexpress Standard Shipping, Yunexpress, CJ packet &amp; ePacket(China EMS, China Post), and all commonly used couriers for dropshipping merchants.', 'parcelpanel') ?></li>
            <li class="pp-m-t-1">
              <?php
              // translators: %1$s is url html %2$s is url html.
              echo sprintf(esc_html__('Hide all Chinese origin easily, brings your customers an all-around brand shopping experience. %1$sLearn more%2$s.', 'parcelpanel'), '<a href="https://docs.parcelpanel.com/woocommerce/article/61" target="_blank">', '</a>')
              ?>
            </li>
          </ul>
        </div>
        <pp-button @click="onClickEnableDropshippingMode" variant="primary" :loading="isDropshippingModeBtnLoading"><?php esc_html_e('1-click dropshipping mode', 'parcelpanel') ?></pp-button>
      </div>
    </div>

    <pp-post-layer :is-show="showPostLayer" :template="2" @show="handlePostLayerShow"></pp-post-layer>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>