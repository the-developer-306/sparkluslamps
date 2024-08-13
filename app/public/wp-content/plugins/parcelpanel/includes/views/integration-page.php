<?php
defined('ABSPATH') || exit;
?>
<script>
  const pp_integration_switch_nonce = "<?php echo esc_js(wp_create_nonce('pp-integration-switch')) ?>"
</script>
<template id="pp-app">
  <div id="pp-integration" class="pp-wrap">
    <?php settings_errors() ?>

    <!-- <div class="pp-mask" v-show="isShow"></div> -->
    <h2><?php esc_html_e('Integration', 'parcelpanel') ?><svg style="margin-left:8px" width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="20" rx="4" fill="#F36A5A" />
        <path d="M7.76758 14L7.76758 8.53613H7.8457L11.6689 14H12.5234V6.9541H11.6543V12.4375H11.5762L7.75293 6.9541H6.89844L6.89844 14H7.76758ZM18.6855 13.209H15.1992V10.7871H18.5049V10.0059H15.1992V7.74512H18.6855V6.9541H14.3203V14H18.6855V13.209ZM24.1885 8.43848H24.2471L25.8682 14H26.6982L28.6172 6.9541H27.6992L26.2979 12.6816H26.2393L24.6621 6.9541H23.7734L22.1963 12.6816H22.1377L20.7363 6.9541H19.8184L21.7373 14L22.5674 14L24.1885 8.43848Z" fill="white" />
      </svg></h2>

    <div class="pp-card">
      <div class="my-tab-panel">
        <ul class="components-tab-panel__tabs pp-m-y-0 pp-p-x-5" style="border-bottom: 1px solid #e1e1e1;">
          <li class="components-button components-tab-panel__tabs-item tab-one" :class="{'is-active': activatedTabIndex===0}" @click="activeTab(0)"><?php esc_html_e('Dropshipping', 'parcelpanel') ?></li>
          <li class="components-button components-tab-panel__tabs-item tab-one" :class="{'is-active': activatedTabIndex===1}" @click="activeTab(1)"><?php esc_html_e('Custom order number', 'parcelpanel') ?></li>
        </ul>
      </div>

      <div class="pp-card-body list-box" style="padding-bottom:32px" v-if="activatedTabIndex === 0">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=AliExpress Dropshipping with Ali2Woo Lite" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/ali2woo-lite/assets/icon-128x128.png?rev=2469557">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=AliExpress Dropshipping with Ali2Woo Lite" target="_blank" rel="noopener noreferrer"><?php esc_html_e('AliExpress Dropshipping with Ali2Woo Lite', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('Looking for AliExpress Dropshipping plugin for WordPress and WooCommerce stores? Ali2Woo is the right choice! Import any products with reviews from Al …', 'parcelpanel') ?></p>
            <p class="pp-m-t-2"><a href="https://docs.parcelpanel.com/woocommerce/article/how-integration-with-aliexpress-dropshipping-with-ali2woo-lite-works/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('How integration with AliExpress Dropshipping with Ali2Woo Lite works?', 'parcelpanel') ?></a></p>
          </div>
          <toggle-control v-model="pluginIntegrationEnable[1001]" @change="savePluginIntegrationEnabled(1001, $event)" :disabled="toggleDisabled[1001]" class="pp-m-l-4"></toggle-control>
        </div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=ALD – Dropshipping and Fulfillment for AliExpress and WooCommerce" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/woo-alidropship/assets/icon-128x128.png?rev=2418475">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=ALD – Dropshipping and Fulfillment for AliExpress and WooCommerce" target="_blank" rel="noopener noreferrer"><?php esc_html_e('ALD – Dropshipping and Fulfillment for AliExpress and WooCommerce', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('ALD – Dropshipping and Fulfillment for AliExpress and WooCommerce allows shop owners to import products from AliExpress to their own WooCommerce store …', 'parcelpanel') ?></p>
            <p class="pp-m-t-2"><a href="https://docs.parcelpanel.com/woocommerce/article/how-integration-with-ald-%E2%80%93-dropshipping-and-fulfillment-for-aliexpress-and-woocommerce-works/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('How integration with ALD – Dropshipping and Fulfillment for AliExpress and WooCommerce works?', 'parcelpanel') ?></a></p>
          </div>
          <toggle-control v-model="pluginIntegrationEnable[1002]" @change="savePluginIntegrationEnabled(1002, $event)" :disabled="toggleDisabled[1002]" class="pp-m-l-4"></toggle-control>
        </div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <img class="plugin-list-plugin-icon" src="https://ps.w.org/dsers/assets/icon-256x256.png">
          <div style="flex:1" class="pp-m-l-4">
            <p><span><?php esc_html_e('DSers Dropshipping Solution: Find products on AliExpress for WooCommerce', 'parcelpanel') ?></span></p>
            <p class="pp-m-t-1"><?php esc_html_e('DSers is AliExpress official dropshipping partner. It\'s the best way to place 100s of orders at once to AliExpress, find products, and more!', 'parcelpanel') ?></p>
            <p class="pp-m-t-2"><a href="https://docs.parcelpanel.com/woocommerce/article/how-integration-with-dsers-dropshipping-solution-find-products-on-aliexpress-for-woocommerce-works/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('How integration with DSers Dropshipping Solution: Find products on AliExpress for WooCommerce works?', 'parcelpanel') ?></a></p>
          </div>
          <toggle-control v-model="pluginIntegrationEnable[1003]" @change="savePluginIntegrationEnabled(1003, $event)" :disabled="toggleDisabled[1003]" class="pp-m-l-4"></toggle-control>
        </div>
      </div>

      <div class="pp-card-body list-box" style="padding-bottom:32px" v-if="activatedTabIndex === 1">
        <div><?php esc_html_e('You do not have to do anything, ParcelPanel works with the below plugins by default.', 'parcelpanel') ?> <a href="https://docs.parcelpanel.com/woocommerce/article/how-integration-with-custom-order-numbers-plugins-works/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Learn more.', 'parcelpanel') ?></a></div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Sequential Order Number for WooCommerce" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/wt-woocommerce-sequential-order-numbers/assets/icon-128x128.png?rev=2599891">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Sequential Order Number for WooCommerce" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Sequential Order Number for WooCommerce', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('Sequential order number for WooCommerce is the best plugin to generate sequential or custom order numbers for existing and new WooCommerce orders.', 'parcelpanel') ?></p>
          </div>
        </div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Sequential Order Number for WooCommerce" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/woocommerce-sequential-order-numbers/assets/icon-256x256.png?rev=2436799">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Sequential Order Number for WooCommerce" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Sequential Order Number for WooCommerce', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('This plugin extends WooCommerce by setting sequential order numbers for new orders.', 'parcelpanel') ?></p>
          </div>
        </div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Custom Order Numbers for WooCommerce" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/custom-order-numbers-for-woocommerce/assets/icon-128x128.jpg?rev=2825614">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Custom Order Numbers for WooCommerce" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Custom Order Numbers for WooCommerce', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('Custom order numbers for WooCommerce.', 'parcelpanel') ?></p>
          </div>
        </div>
        <hr class="pp-divider">
        <div style="display:flex;">
          <a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Booster for WooCommerce" target="_blank" rel="noopener noreferrer">
            <img class="plugin-list-plugin-icon" src="https://ps.w.org/woocommerce-jetpack/assets/icon-128x128.png?rev=1813426">
          </a>
          <div style="flex:1" class="pp-m-l-4">
            <p><a href="<?php echo esc_url(admin_url()); ?>plugin-install.php?tab=search&type=term&s=Booster for WooCommerce" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Booster for WooCommerce', 'parcelpanel') ?></a></p>
            <p class="pp-m-t-1"><?php esc_html_e('One plugin to replace them all. Upgrade your WooCommerce website with the ultimate customization bundle, with 110+ features in one single WordPress Wo …', 'parcelpanel') ?></p>
          </div>
        </div>
      </div>
    </div>

    <div class="pp-card">
      <h3 class="pp-card-title pp-p-b-2"><?php esc_html_e('Will there be more plugins integrated?', 'parcelpanel') ?></h3>
      <div class="pp-card-body pp-p-b-4">
        <p><?php esc_html_e('Yes, ParcelPanel will continue to integrate with more plugins to improve the user experience. Stay tuned!', 'parcelpanel') ?></p>
      </div>
    </div>

    <div class="pp-card">
      <h3 class="pp-card-title pp-p-b-2"><?php esc_html_e('Is it possible to integrate a plugin that I using but is not on your list?', 'parcelpanel') ?></h3>
      <div class="pp-card-body pp-p-b-4">
        <p><?php esc_html_e('Let us know which plugin you would like us to integrate with.', 'parcelpanel') ?> <a @click="onContactUs" href="javascript:"><?php esc_html_e('Contact us.', 'parcelpanel') ?></a></p>
      </div>
    </div>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>