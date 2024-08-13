<?php

/**
 * @author Chuwen
 * @date   2021/7/26 16:37
 */

defined('ABSPATH') || exit;
?>
<script>
  const pp_tracking_page_save_nonce = "<?php echo esc_js(wp_create_nonce('pp-tracking-page-save')) ?>";
</script>
<!--<div style="height:70px;width:100%;background-color:white;position:-webkit-sticky;position:sticky;top:0;margin-top:-70px;z-index:9"></div>-->
<template id="pp-app">
  <div id="pp-tracking-page" class="pp-wrap">

    <div style="width:300px">
      <div>
        <h2><?php esc_html_e('Tracking Page', 'parcelpanel') ?></h2>
      </div>
    </div>
    <div class="top-content-bar-box" style="position:-webkit-sticky;position:sticky;top:48px;z-index:1001;display:flex;margin-top:-55px;align-self:center">
      <div style="text-align:right;flex:1">
        <pp-button @click="previewTrackPage" variant="secondary"><?php esc_html_e('Preview', 'parcelpanel') ?></pp-button>
      </div>
      <div style="text-align: right;" class="pp-p-l-2">
        <pp-button @click="saveData" variant="primary" :is-busy="sendingApi" :disabled="sendingApi"><?php esc_html_e('Save changes', 'parcelpanel') ?></pp-button>
      </div>
    </div>

    <modal @cancel="closeModal" :open="isOpenModal" title="<?php esc_html_e('Custom status', 'parcelpanel') ?>" cancel="Cancel" confirm="Confirm" @ok="inputCustomStatus">
      <div>
        <div>
          <inputtext w="100%" @change_value="saveCustomStatus_status" :input-value='status' pvalue="Status" placeholder="<?php esc_html_e('Custom Status Name', 'parcelpanel') ?>"></inputtext>
        </div>

        <div class="pp-m-t-4">
          <inputtext w="100%" @change_value="saveCustomStatus_trackingInfo" :input-value='trackingInfo' pvalue="Tracking info" placeholder="<?php esc_html_e('e.g. We are currently packing your order', 'parcelpanel') ?>"></inputtext>
        </div>
        <div class="pp-m-t-4">
          <inputtext w="100%" @change_value="saveCustomStatus_days" :input-value='days' pvalue="Days" placeholder="<?php esc_html_e('e.g. 1', 'parcelpanel') ?>"></inputtext>
        </div>
      </div>
    </modal>

    <!-- Display options -->
    <div class="pp-card pp-m-t-5">
      <panel-toggle title="<?php esc_html_e('Display options', 'parcelpanel') ?>">
        <!-- style="padding-left: 4px; padding-right: 4px; padding-top: 16px;" -->
        <div class="pp-taggle">
          <!--Theme container width-->
          <div class="pp-row">
            <div class="pp-col-xs-12 pp-col-md-4  pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label" for="theme-container-width"><?php esc_html_e('Theme container width', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith" style="display:flex">
              <div style="padding-right: 12px">
                <inputtext class="theme-container-input" w="312px" minw="300px" :showtext="false" :input-value="containerWidth" @change_value="widthValueChange"></inputtext>
              </div>
              <div>
                <pp-radio-group>
                  <pp-radio-button @click="changeWidthType(val.value)" v-for="(val, index) in radioGroups" :key="val.value" :selected="val.value == widthType" style="padding:6px 16px">{{val.value}}</pp-radio-button>
                </pp-radio-group>
              </div>
            </div>
          </div>

          <!--Progress bar color-->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4  pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label" for="progress-bar-color"><?php esc_html_e('Progress bar color', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith " style="display: flex">
              <div>
                <input @input="colorValueChange($event.target.value)" id="progress-bar-color" class="components-placeholder__input pp-m-r-2" type="color" :value="barColor" style="width: 36px; height:36px; padding: 0; border-radius: 2px;">
              </div>
              <label class="pp-label" for="progress-bar-color-value"></label>
              <inputtext class="progress-bar-color-input" w="355px" minw="285px" :showtext="false" placeholder="#008000" :input-value="barColor" @change_value="colorValueChange">
            </div>
          </div>

          <!--UI styles-->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4  pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('UI styles', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <div v-for="(val, index) in UIStylesList">
                <input @click="getRadioVal($event.target.id)" class="pp-radio components-radio-control__input" type="radio" :id="val.id" name="ui-styles" :checked="settings.display_option.ui_style == val.index" /> <label :for="val.id">{{val.value}}</label>
              </div>
            </div>
          </div>

          <!-- Look up options -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Look up options') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.b_od_nb_a_em" label="<?php esc_html_e('By order number and email') ?>" class="pp-m-r-4"></checkbox-control>
              <checkbox-control v-model="settings.display_option.b_tk_nb" label="<?php esc_html_e('By tracking number') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>

          <!-- Carrier details -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Carrier details', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.carrier_details" label="<?php esc_html_e('Show carrier name and logo on your tracking page', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>

          <!-- Tracking number -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Tracking number', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.tracking_number" label="<?php esc_html_e('Show tracking number on your tracking page', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>


          <!-- Package contents details -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Package contents details', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.package_contents_details" label="<?php esc_html_e('Show the product and quantity contents of the package', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>

          <!-- Tracking detailed info -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Tracking detailed info', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.tracking_detailed_info" label="<?php esc_html_e('Show tracking detailed info on your tracking page', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>


          <!-- Google translate widget -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Google translate widget', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
              <checkbox-control v-model="settings.display_option.google_translate_widget" label="<?php esc_html_e('Show widget', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
            </div>
          </div>

          <!-- Map coordinates -->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label"><?php esc_html_e('Map coordinates', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8">
              <div class="pp-taggle-body-min-wdith pp-taggle-input">
                <checkbox-control v-model="settings.display_option.map_coordinates" label="<?php esc_html_e('Show map on your tracking page when the address is correctly recognized', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
              </div>
              <div class="pp-taggle-body-min-wdith pp-taggle-input map-coordinates-select-box" style="display:flex;margin-left:32px;">
                <div v-for="(val, index) in mapCoordinatesPosition">
                  <input @click="getMapCoordinatesPosition($event.target.id)" class="pp-radio components-radio-control__input" type="radio" :id="val.id" name="Position" :checked="settings.display_option.map_coordinates_position == val.index" /> <label :for="val.id">{{val.value}}</label>
                </div>
              </div>
            </div>
          </div>


          <!--Hide keywords-->
          <div class="pp-row pp-m-t-5">
            <div class="pp-col-xs-12 pp-col-md-4  pp-taggle-input pp-taggle-body-min-wdith">
              <label for="keywords" class="pp-label"><?php esc_html_e('Hide keywords', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <inputtext @change_value="getKeywords" :input-value="settings.display_option.hide_keywords" id="keywords" w="100%" minw="330px" :showtext="false" placeholder="<?php esc_html_e('e.g. China,Aliexpress,Chinese cities. Separate with comma.', 'parcelpanel') ?>">
            </div>
          </div>

        </div>
      </panel-toggle>
    </div>

    <!-- Tracking page translations -->
    <div class="pp-card">
      <panel-toggle title="<?php esc_html_e('Tracking page translations', 'parcelpanel') ?>">
        <div class="mdui-container-fluid">
          <div class="pp-taggle" style="display:flex;margin-bottom:-20px;flex-wrap:wrap;">
            <div class="pp-col-xs-12 pp-tpt-theme-language">
              <select-control @change_value="themeLangValChange" :def="settings.theme_language.val" :list="langList" label="Theme language"></select-control>
            </div>
            <!-- Input component with text above -->
            <div v-for="(value,key,index) in settings.tracking_page_translations" class="pp-col-xs-12 pp-col-md-6  pp-tpt-input-grid">
              <inputtext @change_value="settings.tracking_page_translations[key] = $event" :placeholder="trackingPageTranslationsDefault[key]" w="100%" minw="140px" maxw="100%" :pvalue="key" :input-value="value">
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>

    <!-- Custom order status -->
    <div class="pp-card">
      <panel-toggle>
        <span slot="title" style="display:flex;align-items:center"><?php esc_html_e('Custom shipment status', 'parcelpanel') ?><pp-new-badge end-time="1662768000000"></pp-new-badge></span>
        <div class="pp-taggle">
          <div class="mdui-container-fluid">
            <div class="pp-row" type="flex">
              <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-body-min-wdith">
                <div>
                  <p class="pp-taggle-subtitle"><?php esc_html_e('Custom shipment status', 'parcelpanel') ?></p>
                  <p><?php esc_html_e('Add custom status(up to 3) with time interval and description, to timely inform customers about the progress of their orders before you fulfill them.', 'parcelpanel') ?>&nbsp;<a href="https://docs.parcelpanel.com/woocommerce/article/58" target="_blank"><?php esc_html_e('Learn more', 'parcelpanel') ?></a>.
                  </p>
                </div>
                <div class="pp-m-y-3">
                  <pp-button v-if="customStatusData.length < 3" @click="openModal" value="Add custom status" variant="secondary" style="width: 140px; height: 36px"><?php esc_html_e('Add custom status', 'parcelpanel') ?></pp-button>
                </div>
              </div>
              <div class="pp-col-xs-12 pp-col-md-8">
                <div class="pp-order-status">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px;width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#4a4949" d="M17 18c-.551 0-1-.449-1-1 0-.551.449-1 1-1 .551 0 1 .449 1 1 0 .551-.449 1-1 1zM4 17c0 .551-.449 1-1 1-.551 0-1-.449-1-1 0-.551.449-1 1-1 .551 0 1 .449 1 1zM17.666 5.841L16.279 10H4V4.133l13.666 1.708zM17 14H4v-2h13a1 1 0 0 0 .949-.684l2-6a1 1 0 0 0-.825-1.308L4 2.117V1a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1v12.184A2.996 2.996 0 0 0 0 17c0 1.654 1.346 3 3 3s3-1.346 3-3c0-.353-.072-.686-.184-1h8.368A2.962 2.962 0 0 0 14 17c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3z"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('Ordered', 'parcelpanel') ?></p>
                  </div>
                </div>

                <div v-show="isEmpty" class="pp-order-status" style=" justify-content: center; background: #FFFFFF;">
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('Create additional steps to inform customers of your process prior to shipping', 'parcelpanel') ?></p>
                  </div>
                </div>
                <div style="display:flex;background: #FFFFFF" v-show="!isEmpty" class="pp-order-status" v-for="(val, index) in customStatusData">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px; width: 20px;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4a4949" d="M17.707 9.293l-5-5a.999.999 0 1 0-1.414 1.414L14.586 9H3a1 1 0 1 0 0 2h11.586l-3.293 3.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414" fill-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3" style="flex:1;word-break:break-all">
                    <p>{{val.status}} ({{val.days}}d)</p>
                  </div>
                  <div style="display: flex; justify-content: flex-end;">
                    <pp-radio-group class="pp-p-r-4">
                      <pp-button @click="updateCustomStatusData(index)" variant="secondary">
                        <template slot="icon">
                          <svg style="height: 18px; width: 18px;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.877 3.123l3.001 3.002.5-.5a2.123 2.123 0 10-3.002-3.002l-.5.5zM15.5 7.5l-3.002-3.002-9.524 9.525L2 17.999l3.976-.974L15.5 7.5z" />
                          </svg>
                        </template>
                      </pp-button>
                      <pp-button @click="deleteCustomStatusData(index)" variant="secondary">
                        <template slot="icon">
                          <svg style="height: 20px; width: 20px;" viewBox="0 0 20 20">
                            <path d="M16 6H4a1 1 0 1 0 0 2h1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1a1 1 0 1 0 0-2zM9 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9zm2 12h2V8h-2v8zm-4 0h2V8H7v8z" fill-rule="evenodd"></path>
                          </svg>
                        </template>
                      </pp-button>
                    </pp-radio-group>
                  </div>
                </div>

                <div class="pp-order-status ">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px;width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#4a4949" d="M19.901 4.581c-.004-.009-.002-.019-.006-.028l-2-4A1.001 1.001 0 0 0 17 0H3c-.379 0-.725.214-.895.553l-2 4c-.004.009-.002.019-.006.028A.982.982 0 0 0 0 5v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a.982.982 0 0 0-.099-.419zM2 18V6h7v1a1 1 0 0 0 2 0V6h7v12H2zM3.618 2H9v2H2.618l1-2zm13.764 2H11V2h5.382l1 2zM9 14H5a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2m-4-2h2a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('Order ready', 'parcelpanel') ?></p>
                  </div>
                </div>
                <div class="pp-order-status">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px;width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#4a4949" d="M17.816 14c-.415-1.162-1.514-2-2.816-2s-2.4.838-2.816 2H12v-4h6v4h-.184zM15 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM2 4h8v10H7.816C7.4 12.838 6.302 12 5 12s-2.4.838-2.816 2H2V4zm13.434 1l1.8 3H12V5h3.434zm4.424 3.485l-3-5C16.678 3.185 16.35 3 16 3h-4a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1.185C2.6 17.162 3.698 18 5 18s2.4-.838 2.816-2h4.37c.413 1.162 1.512 2 2.814 2s2.4-.838 2.816-2H19a1 1 0 0 0 1-1V9c0-.18-.05-.36-.142-.515z"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('In transit', 'parcelpanel') ?></p>
                  </div>
                </div>
                <div class="pp-order-status ">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px;width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#4a4949" d="M10 0C5.589 0 2 3.589 2 8c0 7.495 7.197 11.694 7.504 11.869a.996.996 0 0 0 .992 0C10.803 19.694 18 15.495 18 8c0-4.412-3.589-8-8-8m-.001 17.813C8.478 16.782 4 13.296 4 8c0-3.31 2.691-6 6-6s6 2.69 6 6c0 5.276-4.482 8.778-6.001 9.813M10 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2m0-6C7.794 4 6 5.794 6 8s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('Out for delivery', 'parcelpanel') ?></p>
                  </div>
                </div>
                <div class="pp-order-status ">
                  <div class="pp-m-l-4">
                    <svg style="height: 20px;width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#4a4949" d="M10 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6m-1 9a.997.997 0 0 1-.707-.293l-2-2a.999.999 0 1 1 1.414-1.414L9 10.586l3.293-3.293a.999.999 0 1 1 1.414 1.414l-4 4A.997.997 0 0 1 9 13"></path>
                    </svg>
                  </div>
                  <div class="pp-m-l-3">
                    <p><?php esc_html_e('Delivered'); ?></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="pp-row" type="flex" style="margin:20px -20px 0;padding:20px 20px 0;border-top:1px solid #dddddd">
              <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-body-min-wdith">
                <div>
                  <p class="pp-taggle-subtitle"><?php esc_html_e('Custom tracking info', 'parcelpanel') ?></p>
                  <p><?php esc_html_e('Add one custom tracking info with time interval to reduce customer anxiety when the package was stuck in shipping, and it will be shown if the tracking info hasn\'t updated for the days you set.', 'parcelpanel') ?></p>
                </div>
              </div>
              <div class="pp-col-xs-12 pp-col-md-8">
                <inputtext @change_value="settings.custom_tracking_info.days=$event" :input-value="settings.custom_tracking_info.days" w="100%" minw="140px" h="36px" placeholder="e.g. 7" pvalue="Day(s) since last tracking info"></inputtext>
                <inputtext @change_value="settings.custom_tracking_info.info=$event" :input-value="settings.custom_tracking_info.info" w="100%" minw="140px" h="36px" placeholder="e.g. In Transit to Next Facility" pvalue="Tracking info" class="pp-m-t-5"></inputtext>
              </div>
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>


    <!-- Estimated delivery time -->
    <div class="pp-card">
      <panel-toggle>
        <span slot="title" style="display:flex;align-items:center"><?php esc_html_e('Estimated delivery time', 'parcelpanel') ?><pp-new-badge end-time="1662768000000"></pp-new-badge></span>
        <div class="pp-taggle">

          <div class="pp-row" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-body-min-wdith">
              <p><?php esc_html_e('Set an estimated time period that will be displayed on your tracking page, to show your customers when they will receive their orders.', 'parcelpanel') ?>&nbsp;<a href="https://docs.parcelpanel.com/woocommerce/article/59" target="_blank"><?php esc_html_e('Learn more', 'parcelpanel') ?></a>.
              </p>
            </div>

            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <label style="display:inline-flex;vertical-align:top;"><span class="pp-label pp-p-r-5"><?php esc_html_e('Enable this feature', 'parcelpanel') ?></span><toggle-control v-model="settings.estimated_delivery_time.enabled"></toggle-control></label>
              <div class="pp-m-t-2 pp-edt-calc-from-wrapper">
                <p class="pp-label pp-edt-calc-from-label pp-m-b-1">Calculate from</p>
                <div class="pp-edt-calc-from-radios-wrapper pp-stack">
                  <div v-for="(val, index) in EDTCalculateFromOptions" class="pp-stack__item">
                    <label><input :checked="settings.estimated_delivery_time.calc_from === val.id" :id="val.id" @click="settings.estimated_delivery_time.calc_from = parseInt($event.target.id)" name="edt-calc-from-radio" type="radio" class="pp-radio components-radio-control__input" />{{val.value}}</label>
                  </div>
                </div>
              </div>
              <pp-edt-time-slider v-model="settings.estimated_delivery_time.e_d_t" class="pp-m-y-2"></pp-edt-time-slider>

              <checkbox-control v-model="settings.estimated_delivery_time.bod_enabled" @change="handleEDTBODEnabledCheckboxChange" label="Advanced setting based on destinations"></checkbox-control>

              <div v-if="settings.estimated_delivery_time.bod_enabled" class="pp-m-t-5">
                <div v-for="(v, index) in settings.estimated_delivery_time.bod_items" class="pp-m-t-5" :key="v.to">
                  <pp-stack style="align-items:center">
                    <pp-stack-item fill>
                      <div>
                        <p class="pp-label pp-m-b-1"><?php esc_html_e('Shipping to:', 'parcelpanel') ?></p>
                        <select-control @change_value="v.to = $event" :def="v.to" :list="countryList" style="flex:1"></select-control>
                      </div>
                    </pp-stack-item>
                    <pp-stack-item>
                      <pp-button @click="handleEDTBODItemRemoveClick(index)" variant="secondary">
                        <template slot="icon">
                          <svg style="height:20px;width:20px;" viewBox="0 0 20 20">
                            <path d="M16 6H4a1 1 0 1 0 0 2h1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1a1 1 0 1 0 0-2zM9 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9zm2 12h2V8h-2v8zm-4 0h2V8H7v8z" fill-rule="evenodd"></path>
                          </svg>
                        </template>
                      </pp-button>
                    </pp-stack-item>
                  </pp-stack>
                  <pp-edt-time-slider v-model="v.edt" class="pp-m-t-2"></pp-edt-time-slider>
                </div>
                <div class="pp-m-t-5">
                  <pp-button @click="handleEDTBODItemAddClick" variant="secondary" style="height: 36px"><?php esc_html_e('Add another', 'parcelpanel') ?></pp-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>


    <!-- Product recommendation -->
    <div class="pp-card">
      <panel-toggle>
        <span slot="title" style="display:flex;align-items:center"><?php esc_html_e('Product recommendation', 'parcelpanel') ?><pp-new-badge end-time="1662768000000"></pp-new-badge></span>
        <div class="pp-taggle">

          <div class="pp-row" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-body-min-wdith">
              <p><?php esc_html_e('Turn your tracking page into a marketing channel to make more sales.', 'parcelpanel') ?></p>
              <p>

                <?php
                // translators: %1$s is html %2$s is html.
                echo sprintf(esc_html__('%1$sAdd category%2$s in your WordPress Products section to recommend.', 'parcelpanel'), '<a href="' . esc_url(admin_url('edit-tags.php?taxonomy=product_cat&post_type=product')) . '" target="_blank">', '</a>') ?>
              </p>
              <p><?php esc_html_e('By default the recommendations are based on the customer’s order items, you can also select a category to recommend.', 'parcelpanel') ?></p>
            </div>

            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">

              <div>
                <label style="display:inline-flex;vertical-align:top;"><span class="pp-label pp-p-r-5"><?php esc_html_e('Enable this feature', 'parcelpanel') ?></span><toggle-control v-model="settings.product_recommend.enabled"></toggle-control></label>
              </div>

              <div class="pp-m-b-1 pp-m-t-2">
                <p class="pp-label pp-m-b-1"><?php esc_html_e('Display at/on the', 'parcelpanel') ?></p>
              </div>
              <div class="pp-edt-calc-from-radios-wrapper pp-stack pp-stack--spacing-extra-loose">
                <div v-for="(val, index) in prodRecommendationDisplayPositionOptions" class="pp-stack__item">
                  <label><input :checked="settings.product_recommend.position === val.id" :id="val.id" @click="settings.product_recommend.position = parseInt($event.target.id)" name="prod-reco-display-position-radio" type="radio" class="pp-radio components-radio-control__input" />{{val.value}}</label>
                </div>
              </div>

              <div class="pp-row pp-m-t-2">
                <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith pp-taggle-input">
                  <checkbox-control v-model="settings.product_recommend.advanced" label="<?php esc_html_e('Advanced settings based on a category', 'parcelpanel') ?>" class="pp-m-r-4"></checkbox-control>
                </div>
              </div>

              <div class="pp-m-t-2">
                <p class="pp-m-b-1 pp-label"><?php esc_html_e('Select a category', 'parcelpanel') ?></p>
                <select-control @change_value="settings.product_recommend.product_cat_id = $event" :def="settings.product_recommend.product_cat_id" :list="productCategories"></select-control>
              </div>

            </div>

          </div>

        </div>
      </panel-toggle>
    </div>

    <!-- Additional text setting -->
    <div class="pp-card">
      <panel-toggle title="<?php esc_html_e('Additional text setting', 'parcelpanel') ?>">
        <div class="pp-taggle">
          <div class="pp-row" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-body-min-wdith">
              <p><?php esc_html_e('Use these fields to add additional content above and below the order lookup section.', 'parcelpanel') ?></p>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith" style="display: flex; flex-direction: column;">
              <text-area-control @change_value="textAboveValue" :message="textAbove" labeltext="<?php esc_html_e('Text above', 'parcelpanel') ?>" placeholder="<?php esc_html_e('e.g. Curious about where your package is? Click the button to track!', 'parcelpanel') ?>"></text-area-control>
              <text-area-control @change_value="textBelowValue" :message="textBelow" labeltext="<?php esc_html_e('Text below', 'parcelpanel') ?>" placeholder="<?php esc_html_e('e.g. Any questions or concerns? Please feel free to contact us!', 'parcelpanel') ?>" class="pp-m-t-5"></text-area-control>
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>


    <!-- Date and time format -->
    <div class="pp-card">
      <panel-toggle title="<?php esc_html_e('Date and time format', 'parcelpanel') ?>">
        <div class="pp-taggle">
          <div class="pp-row" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label" for="theme-container-width"><?php esc_html_e('date_format', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <select-control @change_value="dateChange" :def="dateTimeFormat1Default" :list="dateTimeFormat1"></select-control>
            </div>
          </div>
          <div class="pp-row pp-m-t-5" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4  pp-p-r-5 pp-taggle-input pp-taggle-body-min-wdith">
              <label class="pp-label" for="theme-container-width"><?php esc_html_e('time_format', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <select-control @change_value="timeChange" :def="dateTimeFormat2Default" :list="dateTimeFormat2"></select-control>
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>

    <!-- Manually translate tracking detailed info -->
    <div class="pp-card">
      <panel-toggle title="<?php esc_html_e('Manually translate tracking detailed info', 'parcelpanel') ?>">
        <div class="pp-taggle">
          <div>
            <p><?php esc_html_e('Here you can manually translate the tracking detailed info by yourself.', 'parcelpanel') ?></p>
          </div>
          <div>
            <p><?php esc_html_e('Note: this feature distinguishes the strings based on Space, please don\'t forget the comma and period when you do the translation.', 'parcelpanel') ?></p>
          </div>
          <div class="pp-row" style="display:flex; align-items:flex-end;margin-top: 12px;">
            <div class="pp-col-xs-6 pp-col-sm-12 pp-col-md-6 mttdi-card-word-before">
              <p><?php esc_html_e('Tracking info (before translation)', 'parcelpanel') ?></p>
            </div>
            <div class="pp-col-xs-6 pp-col-sm-12 pp-col-md-6 mttdi-card-word-after">
              <p><?php esc_html_e('Tracking info (after translation)', 'parcelpanel') ?></p>
            </div>
            <div class="pp-col-xs-1 pp-col-sm-1 pp-col-md-1 pp-col-lg-1">
              <!-- Added to match the input box -->
            </div>
          </div>
          <div class="pp-row pp-m-b-2" style="display:flex; align-items:flex-end;" v-for="(val, index) in trackingDetailedInfoList">
            <!-- Input component with text above   -->
            <div class="pp-col-xs-6 mttdi-card-input-before">
              <inputtext @change_value="val.before = $event" :input-value="val.before" w="100%" minw="140px" h="36px" placeholder="e.g. Shanghai,CN" :showtext="false">
            </div>
            <div class="pp-col-xs-6 mttdi-card-input-after">
              <inputtext @change_value="val.after = $event" :input-value="val.after" w="100%" minw="140px" h="36px" placeholder="Sorting Center" :showtext="false">
            </div>
            <div class="pp-col-xs-4 pp-col-sm-1 pp-col-md-1 pp-col-lg-1">
              <pp-button @click="deleteManually(index)" variant="secondary">
                <template slot="icon">
                  <svg style="height:20px;width:20px;" viewBox="0 0 20 20">
                    <path d="M16 6H4a1 1 0 1 0 0 2h1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1a1 1 0 1 0 0-2zM9 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9zm2 12h2V8h-2v8zm-4 0h2V8H7v8z" fill-rule="evenodd"></path>
                  </svg>
                </template>
              </pp-button>
            </div>
          </div>
          <div class="pp-m-t-4">
            <pp-button @click="addManually" variant="secondary" style="height: 36px"><?php esc_html_e('Add another', 'parcelpanel') ?></pp-button>
          </div>
        </div>
      </panel-toggle>
    </div>


    <!-- Custom CSS and HTML -->
    <div class="pp-card" v-if="customCode.css || customCode.htmlTop || customCode.htmlBottom">
      <panel-toggle title="<?php esc_html_e('Custom CSS and HTML', 'parcelpanel') ?>">
        <div class="pp-taggle">
          <div class="pp-row" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4 pp-p-r-5 pp-taggle-body-min-wdith">
              <label class="pp-label pp-m-b-1"><?php esc_html_e('CSS', 'parcelpanel') ?></label>
              <p><?php
                  // translators: %1$s is html %2$s is html.
                  echo sprintf(esc_html__('View the CSS codes here you used to do the custom change of your tracking page, if you would like to change codes, please %1$scontact us%2$s or follow %3$sthis instruction%4$s.', 'parcelpanel'), '<a @click="onContactUs" href="javascript:">', '</a>', '<a href="https://docs.parcelpanel.com/woocommerce/article/customize-your-tracking-page-via-css-codes/" target="_blank">', '</a>')
                  ?></p>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <textarea class="code" readonly="readonly" disabled="disabled" v-model="customCode.css"></textarea>
            </div>
          </div>
          <div class="pp-row pp-m-t-5" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4 pp-p-r-5 pp-taggle-body-min-wdith">
              <label class="pp-label pp-m-b-1"><?php esc_html_e('HTML top of page', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <textarea class="code" readonly="readonly" disabled="disabled" v-model="customCode.htmlTop"></textarea>
            </div>
          </div>
          <div class="pp-row pp-m-t-5" type="flex">
            <div class="pp-col-xs-12 pp-col-md-4 pp-p-r-5 pp-taggle-body-min-wdith">
              <label class="pp-label pp-m-b-1"><?php esc_html_e('HTML bottom of page', 'parcelpanel') ?></label>
            </div>
            <div class="pp-col-xs-12 pp-col-md-8 pp-taggle-body-min-wdith">
              <textarea class="code" readonly="readonly" disabled="disabled" v-model="customCode.htmlBottom"></textarea>
            </div>
          </div>
        </div>
      </panel-toggle>
    </div>

    <!-- footer button -->
    <div>
      <div style="display: flex; align-items:flex-end;">
        <div style="flex: 1; text-align: right;">
          <pp-button @click="previewTrackPage" variant="secondary"><?php esc_html_e('Preview', 'parcelpanel') ?></pp-button>
        </div>
        <div style="text-align: right;" class="pp-p-l-2">
          <pp-button @click="saveData" variant="primary" :is-busy="sendingApi" :disabled="sendingApi"><?php esc_html_e('Save changes', 'parcelpanel') ?></pp-button>
        </div>
      </div>
    </div>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>