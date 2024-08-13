<?php

/**
 * @author Chuwen
 * @date   2021/7/26 16:37
 */

defined('ABSPATH') || exit;
?>
<script>
  const pp_settings_save_nonce = "<?php echo esc_js(wp_create_nonce('pp-settings-save')) ?>"
  const pp_courier_matching_save_nonce = "<?php echo esc_js(wp_create_nonce('pp-courier-matching-save')) ?>"
</script>
<template id="pp-app">
  <div id="pp-setting" class="pp-wrap">

    <h2><?php esc_html_e('Settings', 'parcelpanel') ?></h2>

    <!-- Delivery notifications -->
    <div class="pp-card">
      <div class="pp-card-header">
        <h3><?php esc_html_e('Delivery notifications', 'parcelpanel') ?></h3>
        <a :href="pageParam.preview_email_url" target="_blank"><?php esc_html_e('Preview', 'parcelpanel') ?></a>
      </div>

      <div class="pp-card-body">
        <div class="pp-row pp-m-b-4">
          <div class="pp-col-xs-11">
            <p class="pp-label"><?php esc_html_e('Add an order tracking section to WooCommerce email notifications', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-1">
            <toggle-control v-model="emailNotificationAddTrackingSection" @change="saveEmailNotificationAddTrackingSection" :disabled="emailNotificationsDisabled.email_notification_add_tracking_section" style="flex: 1; text-align: right;"></toggle-control>
          </div>
        </div>

        <div class="pp-row">
          <div>
            <pp-select v-model="trackingSectionOrderStatus" :options="trackingSectionOrderStatusList" :reduce="obj => obj.id" @input="changeTrackingSectionOrderStatus" :close-on-select="false" multiple>
              <template #header>
                <p class="pp-m-b-1"><?php esc_html_e('Select order status to show the tracking section', 'parcelpanel') ?></p>
              </template>
            </pp-select>
          </div>
        </div>

        <hr class="pp-divider" />

        <div class="pp-row">
          <div>
            <p class="pp-label"><?php esc_html_e('ParcelPanel shipping email notifications', 'parcelpanel') ?></p>
          </div>
        </div>
        <div class="pp-row pp-m-t-1">
          <p class="pp-text-subdued"><?php esc_html_e('This feature will allow you to send email notifications based on ParcelPanel shipment status.', 'parcelpanel') ?></p>
        </div>

        <div class="pp-row" style="display: flex;height: 56px; border-bottom: 1px solid #F0F0F0;">
          <div class="pp-col-xs-8 pp-col-md-9" style="display: flex; align-self: center;">
            <p><?php esc_html_e('In transit', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-3" style="display: flex; align-self: center;">
            <div style="flex: 1; text-align: right;">
              <p><a href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=email&section=wc_email_customer_pp_in_transit')) ?>"><?php esc_html_e('Manage template', 'parcelpanel') ?></a></p>
            </div>
            <div style="display:flex; text-align: right;" class="pp-p-l-4">
              <toggle-control v-model="emailNotifications.in_transit" @change="saveEmailNotificationSwitch('in_transit')" :disabled="emailNotificationsDisabled.in_transit" style="flex: 1; text-align: right; align-self: center;"></toggle-control>
            </div>
          </div>
        </div>

        <div class="pp-row" style="display: flex;height: 56px; border-bottom: 1px solid #F0F0F0;">
          <div class="pp-col-xs-8 pp-col-md-9" style="display: flex; align-self: center;">
            <p><?php esc_html_e('Out for delivery', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-3" style="display: flex; align-self: center;">
            <div style="flex: 1; text-align: right;">
              <p><a href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=email&section=wc_email_customer_pp_out_for_delivery')) ?>"><?php esc_html_e('Manage template', 'parcelpanel') ?></a></p>
            </div>
            <div style="display:flex; text-align: right;" class="pp-p-l-4">
              <toggle-control v-model="emailNotifications.out_for_delivery" @change="saveEmailNotificationSwitch('out_for_delivery')" :disabled="emailNotificationsDisabled.out_for_delivery" style="flex: 1; text-align: right; align-self: center;"></toggle-control>
            </div>
          </div>
        </div>

        <div class="pp-row" style="display: flex;height: 56px; border-bottom: 1px solid #F0F0F0;">
          <div class="pp-col-xs-8 pp-col-md-9" style="display: flex; align-self: center;">
            <p><?php esc_html_e('Delivered', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-3" style="display: flex; align-self: center;">
            <div style="flex: 1; text-align: right;">
              <p><a href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=email&section=wc_email_customer_pp_delivered')) ?>"><?php esc_html_e('Manage template', 'parcelpanel') ?></a></p>
            </div>
            <div style="display:flex; text-align: right;" class="pp-p-l-4">
              <toggle-control v-model="emailNotifications.delivered" @change="saveEmailNotificationSwitch('delivered')" :disabled="emailNotificationsDisabled.delivered" style="flex: 1; text-align: right; align-self: center;"></toggle-control>
            </div>
          </div>
        </div>

        <div class="pp-row" style="display: flex;height: 56px; border-bottom: 1px solid #F0F0F0;">
          <div class="pp-col-xs-8 pp-col-md-9" style="display: flex; align-self: center;">
            <p><?php esc_html_e('Exception', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-3" style="display: flex; align-self: center;">
            <div style="flex: 1; text-align: right;">
              <p><a href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=email&section=wc_email_customer_pp_exception')) ?>"><?php esc_html_e('Manage template', 'parcelpanel') ?></a></p>
            </div>
            <div style="display:flex; text-align: right;" class="pp-p-l-4">
              <toggle-control v-model="emailNotifications.exception" @change="saveEmailNotificationSwitch('exception')" :disabled="emailNotificationsDisabled.exception" style="flex: 1; text-align: right; align-self: center;"></toggle-control>
            </div>
          </div>
        </div>

        <div class="pp-row" style="display: flex;height: 56px; border-bottom: 1px solid #F0F0F0;">
          <div class="pp-col-xs-8 pp-col-md-9" style="display: flex; align-self: center;">
            <p><?php esc_html_e('Failed attempt', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-3" style="display: flex; align-self: center;">
            <div style="flex: 1; text-align: right;">
              <p><a href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=email&section=wc_email_customer_pp_failed_attempt')) ?>"><?php esc_html_e('Manage template', 'parcelpanel') ?></a></p>
            </div>
            <div style="display:flex; text-align: right;" class="pp-p-l-4">
              <toggle-control v-model="emailNotifications.failed_attempt" @change="saveEmailNotificationSwitch('failed_attempt')" :disabled="emailNotificationsDisabled.failed_attempt" style="flex: 1; text-align: right; align-self: center;"></toggle-control>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account page tracking -->
    <div class="pp-card">

      <div class="pp-card-header">
        <h3><?php esc_html_e('Account page tracking', 'parcelpanel') ?></h3>
      </div>

      <div class="pp-card-body">
        <div class="pp-row">
          <div class="pp-col-xs-11">
            <p class="pp-label"><?php esc_html_e('Add a track button to orders history page (Actions column)', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-1">
            <toggle-control v-model="ordersPageAddTrackButton" @change="saveOrdersPageAddTrackButton" :disabled="emailNotificationsDisabled.orders_page_add_track_button" style="flex: 1; text-align: right;"></toggle-control>
          </div>
        </div>
        <div class="pp-row pp-m-t-1">
          <p class="pp-text-subdued">
            <?php esc_html_e('This feature will allow you to add a track button to the orders history page (Actions column) so your customers can track their orders with one click there.', 'parcelpanel') ?>&nbsp;<a @click="isOpenViewExampleModalOrderTrackButton=true" style="cursor:pointer"><?php esc_html_e('View example', 'parcelpanel') ?></a>
          </p>
        </div>

        <div class="pp-row pp-m-t-4">
          <div>
            <pp-select v-model="trackButtonOrderStatus" :options="trackButtonOrderStatusList" :reduce="obj => obj.id" @input="changeTrackButtonOrderStatus" :close-on-select="false" multiple>
              <template #header>
                <p class="pp-m-b-1"><?php esc_html_e('Select order status to show the track button', 'parcelpanel') ?></p>
              </template>
            </pp-select>
          </div>
        </div>
      </div>
    </div>


    <!-- Configuring WooCommerce Orders -->
    <div class="pp-card">
      <div class="pp-card-header">
        <h3><?php esc_html_e('Configuring WooCommerce Orders', 'parcelpanel') ?></h3>
      </div>

      <div class="pp-card-body">
        <div class="pp-row">
          <div class="pp-col-xs-11">
            <p class="pp-label"><?php esc_html_e('Rename order status "Completed" to "Shipped"', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-1">
            <toggle-control v-model="isStatusShipped" @change="saveIsStatusShipped" :disabled="emailNotificationsDisabled.status_shipped" style="flex: 1; text-align: right;"></toggle-control>
          </div>
        </div>
        <div class="pp-row pp-m-t-1">
          <p class="pp-text-subdued">
            <?php esc_html_e('This feature will allow you to change the order status label name from "Completed" to "Shipped".', 'parcelpanel') ?>
          </p>
        </div>

        <hr class="pp-divider" />

        <div class="pp-row">
          <div class="pp-col-xs-11">
            <p class="pp-label"><?php esc_html_e('Add a track button to WooCommerce orders (Actions column)', 'parcelpanel') ?></p>
          </div>
          <div class="pp-col-xs-1">
            <toggle-control v-model="adminOrderActionsAddTrack" @change="saveAdminOrderActionsAddTrack" :disabled="emailNotificationsDisabled.admin_order_actions_add_track" style="flex: 1; text-align: right;"></toggle-control>
          </div>
        </div>
        <div class="pp-row pp-m-t-1">
          <p class="pp-text-subdued">
            <?php esc_html_e('This feature will allow you to add a shortcut button to WooCommerce orders (Actions column), which will make it easier to add tracking information.', 'parcelpanel') ?>&nbsp;<a @click="isOpenViewExampleModalAdminOrdersAddTrackButton=true" style="cursor:pointer"><?php esc_html_e('View example', 'parcelpanel') ?></a>
          </p>
        </div>

        <div class="pp-row pp-m-t-4">
          <div>
            <pp-select v-model="adminOrderActionsAddTrackOrderStatus" :options="trackButtonOrderStatusList" :reduce="obj => obj.id" @input="changeAdminOrderActionsAddTrackOrderStatus" :close-on-select="false" multiple>
              <template #header>
                <p class="pp-m-b-1"><?php esc_html_e('Select order status to show the track button', 'parcelpanel') ?></p>
              </template>
            </pp-select>
          </div>
        </div>
      </div>
    </div>


    <!-- Section Courier matching -->
    <div class="pp-card">
      <div class="pp-card-header pp-p-b-0 pp-m-b-0" style="display:flex;flex-direction:column;align-items:flex-start;box-shadow:none;">
        <h3><?php esc_html_e('Courier matching', 'parcelpanel') ?></h3>
        <div class="pp-m-t-1 pp-m-b-1">
          <p class="pp-text-subdued"><?php esc_html_e('Enable frequently-used couriers if you exactly know which couriers you are using. If not, please just leave this empty, the system will automatically recognize suitable couriers for you.', 'parcelpanel') ?></p>
        </div>
      </div>
      <div class="pp-card-body" style="position:relative">

        <select-tab :bool="isShowDisabled" @enabled="isShowDisabled = $event" tab1-text="<?php esc_html_e('Enabled', 'parcelpanel') ?>" tab2-text="<?php esc_html_e('Disabled', 'parcelpanel') ?>"></select-tab>

        <div class="pp-m-t-4">
          <inputtext :disabled="!isSearching && !resultList.length" :input-value="searchKeyword" @change_value="changeCourierSearchInput" w="100%" minw="140px" maxw="100%" :showtext="false" placeholder="<?php esc_html_e('Search courier', 'parcelpanel') ?>"></inputtext>
        </div>

        <!-- Disabled -->
        <div v-show="isShowDisabled && resultList.length" class="pp-m-t-4 pp-p-b-4" style="height: 36px;display: flex;align-items: center;border-bottom: 1px solid #F0F0F0;">
          <checkbox-control v-model="isSelectAll" @change="disabledControlData"></checkbox-control>

          <label v-show="count==0 && !this.isSearching">
            <?php
            // translators: %1$s is length %2$s is listTotal.
            echo sprintf(esc_html__('Showing %1$s of %2$s couriers', 'parcelpanel'), '{{resultList.length}}', '{{listTotal}}')
            ?>
          </label>

          <label v-show="count==0 && this.isSearching">
            <?php
            // translators: %1$s is listTotal.
            echo sprintf(esc_html__('Showing %1$s couriers', 'parcelpanel'), '{{listTotal}}') ?>
          </label>

          <label v-show="count>0">
            <?php
            // translators: %1$s is count.
            echo sprintf(esc_html__('%1$s selected', 'parcelpanel'), '{{count}}') ?>
          </label>

          <div v-show="count>0" class="pp-m-l-2">
            <pp-button @click="enableMoreExpress" variant="primary"><?php esc_html_e('Enable', 'parcelpanel') ?></pp-button>
          </div>
        </div>
        <div v-show="isShowDisabled && resultList.length" style="margin-left:-16px;padding-left:16px;height:700px;overflow-y:auto">
          <div v-for="(val, index) in resultList">
            <div :for="index" class="pp-m-t-4 pp-p-b-4" style="border-bottom: 1px solid #F0F0F0; display: flex; align-items:center">
              <div>
                <checkbox-control @get_id="disabledCheckboxValueChange" :id="val.express" :checked="selectAllList[val.express]"></checkbox-control>
              </div>
              <div><img :src="val.logo" style="display:block;width:50px;height:50px" /></div>
              <div class="pp-p-l-5">
                <label>{{val.name}}</label>
              </div>
              <div style="margin-left:auto;margin-right: 8px">
                <pp-button @click="enableExpress(val.express)" variant="secondary"><?php esc_html_e('Enable', 'parcelpanel') ?></pp-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Enabled -->
        <div v-show="!isShowDisabled && resultList.length" class="pp-m-t-4 pp-p-b-4" style="height: 36px; display: flex;align-items: center;border-bottom: 1px solid #F0F0F0;">
          <checkbox-control v-model="isSelectAll" @change="enabledControlData"></checkbox-control>

          <label v-show="count==0">
            <?php
            // translators: %1$s is length.
            echo sprintf(esc_html__('Showing %1$s couriers', 'parcelpanel'), '{{resultList.length}}') ?>
          </label>

          <label v-show="count>0">
            <?php
            // translators: %1$s is count.
            echo sprintf(esc_html__('%1$s selected', 'parcelpanel'), '{{count}}') ?>
          </label>

          <div v-show="count>0" class="pp-m-l-2">
            <pp-button @click="disableMoreExpress" variant="primary"><?php esc_html_e('Disable', 'parcelpanel') ?></pp-button>
          </div>
        </div>
        <div v-show="!isShowDisabled && resultList.length" style="margin-left:-16px;padding-left:16px;height:700px;overflow-y:auto">
          <div v-for="(val, index) in resultList">
            <div class="pp-m-t-4 pp-p-b-4" style="border-bottom: 1px solid #F0F0F0; display: flex; align-items:center">
              <div>
                <checkbox-control @get_id="enabledCheckboxValueChange" :id="val.express" :checked="selectAllList[val.express]"></checkbox-control>
              </div>
              <div><img :src="val.logo" style="display:block;width:50px;height:50px" /></div>
              <div class="pp-p-l-5 tk-logistics-name">
                <label>{{val.name}}</label>
              </div>
              <div style="margin-left:auto; display:flex; margin-right: 8px">
                <pp-radio-group>
                  <pp-icon-button id=1 :disabled="index==resultList.length-1" @click="swapPos(index, index+1)">
                    <svg style="height:20px;width:20px" viewBox="0 0 20 20">
                      <path d="M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0" fill-rule="evenodd"></path>
                    </svg>
                  </pp-icon-button>
                  <!-- disabled="disabled" -->
                  <pp-icon-button id=1 :disabled="index==0" @click="swapPos(index, index-1)">
                    <svg style="height:20px;width:20px" viewBox="0 0 20 20">
                      <path d="M11 17V5.414l3.293 3.293a.999.999 0 1 0 1.414-1.414l-5-5a.999.999 0 0 0-1.414 0l-5 5a.997.997 0 0 0 0 1.414.999.999 0 0 0 1.414 0L9 5.414V17a1 1 0 1 0 2 0" fill-rule="evenodd"></path>
                    </svg>
                  </pp-icon-button>
                </pp-radio-group>
              </div>
            </div>
          </div>
        </div>
        <!-- Empty state: Enabled -->
        <div v-show="!isShowDisabled && !resultList.length" class="pp-empty-state__wrapper pp-m-t-4">
          <svg width="60" height="60" viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 0C17 0 8.66671 8.33333 8.66671 18.3333C8.66671 22 9.66671 25.3333 11.6667 28.3333L0.333374 38.3333L3.66671 42L15 32.3333C18.3334 35.3333 22.3334 37 27 37C37 37 45.3334 28.6667 45.3334 18.6667C45.3334 8.33333 37 0 27 0ZM27 31.6667C19.6667 31.6667 13.6667 25.6667 13.6667 18.3333C13.6667 11 19.6667 5 27 5C34.3334 5 40.3334 11 40.3334 18.3333C40.3334 25.6667 34.3334 31.6667 27 31.6667Z" fill="#d9d9d9" />
          </svg>
          <p class="pp-m-t-5 pp-empty-state__title"><?php esc_html_e('No couriers yet', 'parcelpanel') ?></p>
          <p class="pp-m-t-2 pp-text-subdued"><?php esc_html_e('You have not set up a frequently-used courier', 'parcelpanel') ?></p>
        </div>
        <!-- Empty state: Disabled -->
        <div v-show="isShowDisabled && !resultList.length" class="pp-empty-state__wrapper pp-m-t-4">
          <svg width="60" height="60" viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 0C17 0 8.66671 8.33333 8.66671 18.3333C8.66671 22 9.66671 25.3333 11.6667 28.3333L0.333374 38.3333L3.66671 42L15 32.3333C18.3334 35.3333 22.3334 37 27 37C37 37 45.3334 28.6667 45.3334 18.6667C45.3334 8.33333 37 0 27 0ZM27 31.6667C19.6667 31.6667 13.6667 25.6667 13.6667 18.3333C13.6667 11 19.6667 5 27 5C34.3334 5 40.3334 11 40.3334 18.3333C40.3334 25.6667 34.3334 31.6667 27 31.6667Z" fill="#d9d9d9" />
          </svg>
          <p class="pp-m-t-5 pp-empty-state__title"><?php esc_html_e('No couriers yet', 'parcelpanel') ?></p>
        </div>


        <!-- Pagination -->
        <div v-show="this.isShowDisabled && !this.isSearching" style="margin-top:16px;text-align:center">
          <pp-radio-group>
            <pp-icon-button id=1 :disabled="page==0" @click="changePages(-1)">
              <svg style="height:20px;width:20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9H5.414l3.293-3.293a.999.999 0 10-1.414-1.414l-5 5a.999.999 0 000 1.414l5 5a.997.997 0 001.414 0 .999.999 0 000-1.414L5.414 11H17a1 1 0 100-2z" />
              </svg>
            </pp-icon-button>
            <pp-icon-button id=1 :disabled="page*pageSize+pageSize>=listTotal" @click="changePages(1)">
              <svg style="height:20px;width:20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z" />
              </svg>
            </pp-icon-button>
          </pp-radio-group>
        </div>

        <div v-show="courierListLoading" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255, 255, 255, 0.4)">
          <span class="pp-spinner"></span>
        </div>
      </div>
    </div>

    <modal :open="isOpenViewExampleModalOrderTrackButton" title="<?php esc_html_e('How it works?', 'parcelpanel') ?>" cancel="Close" @cancel="isOpenViewExampleModalOrderTrackButton=false">
      <p><?php esc_html_e('After enabled, ParcelPanel will add a track button to the orders history page (Actions column), so your customers can track their orders with one click directed to your store tracking page.', 'parcelpanel') ?></p>
      <img src="<?php echo esc_url(parcelpanel_get_assets_path('imgs/settings/my-orders.png')); ?>" alt="My orders" width="100%" class="pp-m-t-4" />
    </modal>

    <modal :open="isOpenViewExampleModalAdminOrdersAddTrackButton" title="<?php esc_html_e('How it works?', 'parcelpanel') ?>" cancel="Close" @cancel="isOpenViewExampleModalAdminOrdersAddTrackButton=false">
      <p><?php esc_html_e('After enabled, ParcelPanel will add a track button to orders admin (Actions column), you can add tracking info easily without clicking into order details.', 'parcelpanel') ?></p>
      <img src="<?php echo esc_url(parcelpanel_get_assets_path('imgs/settings/admin-orders.png')); ?>" alt="Admin orders" width="100%" class="pp-m-t-4" />
    </modal>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>