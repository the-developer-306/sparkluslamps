<?php

defined('ABSPATH') || exit;

global $wp_list_table;

$pp_param = wp_json_encode([
  'import_template_file_link' => parcelpanel_get_assets_path('templates/sample-template.csv'),
  'upload_nonce'              => wp_create_nonce('pp-upload-csv'),
  'import_nonce'              => wp_create_nonce('pp-import-csv-tracking-number'),
  'get_history_nonce'         => wp_create_nonce('pp-get-import-tracking-number-records'),
  'export_nonce'              => wp_create_nonce('pp-export-csv'),
  'resync_nonce'              => wp_create_nonce('pp-resync'),
  'ajax_nonce' => wp_create_nonce('pp-ajax'),
  'shipments_page_link' => parcelpanel_get_admin_shipments_url(),
], 320);
?>
<script>
  var pp_param = <?php echo esc_js(wc_esc_json($pp_param, true)) ?>;
  var total_items = <?php echo esc_js($wp_list_table->get_pagination_arg('total_items')) ?>;
</script>
<template id="pp-app">
  <pp-page-import-tracking v-if="route.path === '/import-tracking'"></pp-page-import-tracking>
  <div v-else id="pp-shipments" class="pp-wrap pp-wrap--wide">

    <h2><?php esc_html_e('Shipments', 'parcelpanel') ?></h2>

    <hr class="wp-header-end" />

    <?php $wp_list_table->views(); ?>

    <div class="" style="float:right">

      <pp-button variant="secondary" class="pp-m-r-1" @click="isOpenExportModal=true"><?php esc_html_e('Export', 'parcelpanel') ?></pp-button>
      <pp-button @click="handleImportTrackingNumberButtonClick" variant="primary"><?php esc_html_e('Import tracking number', 'parcelpanel') ?></pp-button>

    </div>

    <div class="clear"></div>

    <form method="get">
      <input type="hidden" name="page" value="pp-shipments" />

      <input type="hidden" name="status" value="<?php echo esc_attr($_REQUEST['status'] ?? ''); // phpcs:ignore 
                                                ?>" />

      <?php $wp_list_table->display(); ?>
    </form>

    <!-- export shipments -->
    <modal :open="isOpenExportModal" @cancel="isOpenExportModal=false" title="Export shipments" cancel="" confirm="">
      <p><strong>{{ totalShipments }}</strong> <?php esc_html_e('shipments data will be exported a CSV table,', 'parcelpanel') ?></p>
      <p class="pp-m-t-4">
        <?php
        // translators: %1$s is html %2$s is html.
        echo sprintf(esc_html__('Learn more about %1$sCSV table headers%2$s.', 'parcelpanel'), '<a href="https://docs.parcelpanel.com/woocommerce/article/69" target="_blank">', '</a>')
        ?>
      </p>
      <div v-show="isExporting" class="pp-m-t-4" style="width: 100%">
        <div class="pp-m-b-1" style="display:flex">
          <div>
            <p><?php esc_html_e('Exporting:', 'parcelpanel') ?></p>
          </div>
          <div style="flex: 1;text-align: right;">
            <p>{{exportPercentage}}%</p>
          </div>
        </div>
        <pp-progress :w="exportPercentage"></pp-progress>

        <p class="pp-m-t-1"><strong><?php esc_html_e('Please DO NOT close or refresh this page before it was completed.', 'parcelpanel') ?></strong></p>
      </div>
      <template slot="footer">
        <pp-button variant="secondary" @click="isOpenExportModal=false"><?php esc_html_e('Close', 'parcelpanel') ?></pp-button>
        <pp-button variant="primary" :is-busy="isExporting" :disabled="isExporting" @click="onExportShipments"><?php esc_html_e('Export shipments', 'parcelpanel') ?></pp-button>
      </template>
    </modal>

    <pp-post-layer :is-show="showPostLayer" :template="3" @show="handlePostLayerShow"></pp-post-layer>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>