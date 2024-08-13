<?php
/**
 * Order details table shown in emails.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-order-details.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 3.7.0
 */

/**
 * @var bool $sent_to_admin
 * @var \WC_Order $order
 */

defined( 'ABSPATH' ) || exit;

$text_align = is_rtl() ? 'right' : 'left';

if ( ! empty( $shipment_items ) ):
    $line_items = [];
    $is_full_qty_item_ids = [];
    /** @var object[] $shipment_items */
    foreach ( $shipment_items as $shipment_item ) {
        foreach ( $shipment_item->product as $item ) {
            if ( in_array( $item->id, $is_full_qty_item_ids ) ) {
                continue;
            }
            if ( $item->id == 0 ) {
                $line_items = [];
                foreach ( $order->get_items() as $order_item ) {
                    $line_items[ $order_item->get_id() ] = $order_item->get_quantity();
                }
                $is_full_shipped = true;
                break;
            }
            if ( $item->quantity == 0 ) {
                $order_item = $order->get_item( $item->id, false );
                if ( ! $order_item ) {
                    continue;
                }
                $line_items[ $item->id ] = $order_item->get_quantity();
                $is_full_qty_item_ids[] = $item->id;
                continue;
            }
            if ( ! array_key_exists( $item->id, $line_items ) ) {
                $line_items[ $item->id ] = 0;
            }
            $line_items[ $item->id ] += $item->quantity;
        }
        if ( ! empty( $is_full_shipped ) ) {
            break;
        }
    }
    ?>
  <h2>
      <?php
      if ( $sent_to_admin ) {
          $before = '<a class="link" href="' . esc_url( $order->get_edit_order_url() ) . '">';
          $after = '</a>';
      } else {
          $before = '';
          $after = '';
      }
      /* translators: %s: Order ID. */
      echo wp_kses_post( $before . sprintf( __( '[Order #%s]', 'woocommerce' ) . $after . ' (<time datetime="%s">%s</time>)', $order->get_order_number(), $order->get_date_created()->format( 'c' ), wc_format_datetime( $order->get_date_created() ) ) );
      ?>
  </h2>

  <div style="margin-bottom:40px;">
    <table class="td" cellspacing="0" cellpadding="6" style="width:100%;border-collapse:collapse">
      <thead>
      <tr>
        <th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
        <th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>"><?php esc_html_e( 'Quantity', 'woocommerce' ); ?></th>
      </tr>
      </thead>
      <tbody>
      <?php
      foreach ( $line_items as $item_id => $quantity ):
          $item = $order->get_item( $item_id, false );
          if ( empty( $item ) ) {
              continue;
          }
          ?>
        <tr>
          <td class="td" style="text-align:<?php echo esc_attr( $text_align ); ?>; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap:break-word;">
              <?php echo wp_kses_post( apply_filters( 'woocommerce_order_item_name', $item->get_name(), $item, false ) ) ?>
          </td>
          <td class="td" style="text-align:<?php echo esc_attr( $text_align ); ?>; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap:break-word;">
              <?php echo esc_html( $quantity ) ?>
          </td>
        </tr>
      <?php
      endforeach;
      ?>
      </tbody>
    </table>
  </div>
<?php
endif;
